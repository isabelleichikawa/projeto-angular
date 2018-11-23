import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Avaliacao } from '../shared/avaliacao.model';
import { AvaliacaoService } from '../shared/avaliacao.service';
import { ClienteService } from 'src/app/clientes/shared/cliente.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit {

  @ViewChild('month') month: MatSelect;
  @ViewChild('year') year: MatSelect;
  @ViewChild('customers') customers: ElementRef;
  @ViewChild('nps') nps: ElementRef;

  toppings = new FormControl();
  customersList = [];
  customersFiltered = [];
  detailsCustomers = [];
  evaluations = [];
  dataEvaluations = [];

  calcNps = 0;
  promoters = 0;
  detractors = 0;
  i = 0;
  monthSelected: number;
  yearSelected: number;
  existAnswers = false;
  validDate: any;
  colorNps = '';

  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options = this.customersList;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NovaAvaliacaoComponent>,
    private avaliacaoService: AvaliacaoService,
    private clienteService: ClienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Avaliacao,
  ) {
    this.form = new FormGroup({
      month: new FormControl(null),
      year: new FormControl(null),
      customers: new FormControl(null),
      nps: new FormControl(null)
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.listCustomers();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    // console.log(this.data);

  }

  save() {
    const fData = this.form.value;
    this.validDate = this.isValidDate(fData.month, fData.year);
    if (!fData.month || !fData.year || !this.validDate) {
      console.log(this.validDate);
      if (!this.existAnswers) {
        this.snackBar.open('Não existem respostas para essa data!', 'Ok', {
          duration: 2500,
        });
      } else if (!this.validDate) {
        this.snackBar.open('Já existe uma avaliação correspondente a essa data!', 'Ok', {
          duration: 2500,
        });
      }
      return null;
    }
    const avaliacao = {
      month: fData.month,
      monthFormated: this.months[fData.month],
      year: fData.year,
      customers: this.customersFiltered,
      nps: this.calcNps,
      colorNPS: this.colorNps
    };
    if (this.data === null) {
      this.avaliacaoService.post(avaliacao)
        .subscribe(data => {
          this.dialogRef.close(true);
        });
    } else {
      this.avaliacaoService.put(avaliacao, this.data.id)
        .subscribe(data => {
          this.dialogRef.close(true);
        });
    }
  }

  listCustomers() {
    this.clienteService.get().subscribe(result => {

      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        const customer = { id: keys[i], ...values[i] };
        this.customersList.push(customer);
        // console.log(this.customersList);
      }
      this.form.controls.customers.reset();
      if (this.data) {
        this.form.patchValue(this.data);
        this.monthSelected = this.data.month;
        this.yearSelected = this.data.year;
        this.checkAnswers();
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.customer.toLowerCase().includes(filterValue));
  }

  clearCustomer(setFocus: boolean = true) {
    this.customers.nativeElement.value = '';
    if (setFocus)
      this.customers.nativeElement.focus();
    this.form.controls.customers.reset();
    this.form.controls.customers.setValue('');
  }

  selectYear(year) {
    this.yearSelected = year;
    this.checkAnswers();
  }

  selectMonth(month) {
    this.monthSelected = month;
    this.checkAnswers();
  }

  checkAnswers() {
    this.customersFiltered = [];
    for (let i = 0; i < this.customersList.length; i++) {
      if (!this.customersList[i].answers)
        continue;
      for (let j = 0; j < this.customersList[i].answers.length; j++) {
        const date = moment(this.customersList[i].answers[j].date);
        if (this.monthSelected === date.month() && this.yearSelected === date.year()) {
          const customer = {
            customer: this.customersList[i].customer,
            contactCustomer: this.customersList[i].contactCustomer,
            date: this.customersList[i].date,
            category: this.customersList[i].category,
            answers: [
              this.customersList[i].answers[j]
            ]
          };
          this.customersFiltered.push(customer);
        }
      }
    }
    this.existAnswers = this.customersFiltered.length > 0;
    this.calcNPS();
    // console.log(this.existAnswers);
  }

  isValidDate(monthSelected, yearSelected) {
    this.dataEvaluations = [];
    if (!this.data)
    return false;
    if (this.data.month === monthSelected && this.data.year === yearSelected)
    return true;
    this.avaliacaoService.get().subscribe(result => {
      const values = Object.values(result);
      for (let i = 0; i < values.length; i++) {
        if (values[i].month === monthSelected && values[i].year === yearSelected) {
          this.snackBar.open('Já existe avaliação correspondente a essa data!', 'Ok', {
            duration: 2500,
          });
          return false;
        }
      }
      return true;
    });
  }

  calcNPS() {
    const totalCustomers = this.customersFiltered.length;
    this.promoters = 0;
    this.detractors = 0;
    this.calcNps = 0;
    const nps = 0;
    for (let i = 0; i < totalCustomers; i++) {
      if (this.customersFiltered[i].answers[0].category === 'Promotor') {
        this.promoters++;
      } else if (this.customersFiltered[i].answers[0].category === 'Detrator') {
        this.detractors++;
      } else {
        continue;
      }
    }
    this.calcNps = ((this.promoters - this.detractors) / totalCustomers) * 100;
    this.setColor();
  }

  setColor() {
    if (this.calcNps >= 80) {
      this.colorNps = 'green';
    } else if (this.calcNps < 80 && this.calcNps >= 60) {
      this.colorNps = 'yellow';
    } else {
      this.colorNps = 'red';
    }
  }

}

