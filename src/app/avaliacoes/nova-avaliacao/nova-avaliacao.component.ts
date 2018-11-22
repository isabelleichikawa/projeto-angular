import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Avaliacao } from '../shared/avaliacao.model';
import { AvaliacaoService } from '../shared/avaliacao.service';
import { ClienteService } from 'src/app/clientes/shared/cliente.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit {

  @ViewChild('month') month: MatSelect;
  @ViewChild('year') year: MatSelect;
  @ViewChild('customers') customers: ElementRef;
  @ViewChild('scale') scale: ElementRef;
  @ViewChild('reason') reason: ElementRef;

  toppings = new FormControl();
  customersList = [];
  customersFiltered = [];
  detailsCustomers = [];
  // customerSelected = [];
  i = 0;

  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maior',
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
    @Inject(MAT_DIALOG_DATA) public data: Avaliacao,
  ) {
    this.form = new FormGroup({
      month: new FormControl(10),
      year: new FormControl(2018),
      customers: new FormControl(null),
      scale: new FormControl(null),
      reason: new FormControl(null)
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.listCustomers();
    if (this.data) {
      // this.data.customers = this.form.value.customers;
      this.form.patchValue(this.data);
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  save() {
    const fData = this.form.value;
    if (!fData.month || !fData.year || !fData.scale || !fData.reason) {
      return null;
    }
    const avaliacao = {
      month: fData.month,
      year: fData.year,
      scale: fData.scale,
      reason: fData.reason
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
      // console.log(this.customerSelected);
    }
  }

  listCustomers() {
    this.clienteService.get().subscribe(result => {
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        const customer = { id: keys[i], ...values[i] };
        this.customersList.push(customer);
        console.log('teste');
        console.log(customer);
      }
      this.form.controls.customers.reset();
    });
  }

  // setCategoryCustomer(customerSelected: any) {
  //   const fData = this.form.value;
  //   this.clienteService.get().subscribe(result => {
  //     const keys = Object.keys(result);
  //     const values = Object.values(result);
  //     for (let i = 0; i < keys.length; i++) {
  //       for (let j = 0; j < customerSelected.length; j++) {
  //         if (values[i].customer === customerSelected[j]) {
  //           console.log(j + customerSelected[j]);
  //           console.log('teste');
  //           console.log(keys[i]);
  //         }
  //       }
  //     }
  //   });
  // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.customer.toLowerCase().includes(filterValue));
  }

  // selectCustomer(customer: any) {
  //   this.customerSelected[this.i++] = customer.customer;
  //   this.clearCustomer();
  //   console.log(this.customerSelected);
  // }

  clearCustomer(setFocus: boolean = true) {
    this.customers.nativeElement.value = '';
    if (setFocus)
      this.customers.nativeElement.focus();
    this.form.controls.customers.reset();
    this.form.controls.customers.setValue('');
  }

  selectYear(year) {
    console.log(year);
  }

  selectMonth(month) {

    console.log(month);
  }

}

