import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClienteService } from '../shared/cliente.service';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from '../shared/cliente.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-nova-resposta',
  templateUrl: './nova-resposta.component.html',
  styleUrls: ['./nova-resposta.component.scss']
})
export class NovaRespostaComponent implements OnInit {

  @ViewChild('date') date: ElementRef;
  @ViewChild('scale') scale: ElementRef;
  @ViewChild('reason') reason: ElementRef;

  form: FormGroup;

  customers = [];
  data: Cliente;

  constructor(
    public dialogRef: MatDialogRef<NovaRespostaComponent>,
    public snackBar: MatSnackBar,
    private clienteService: ClienteService
  ) {
    this.form = new FormGroup({
      date: new FormControl(new Date()),
      scale: new FormControl(null),
      reason: new FormControl(null)
    });
  }

  ngOnInit() {
    if (this.data) {
      this.data.date = new Date(this.data.date);
      this.form.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  save() {
    const fData = this.form.value;
    const isValidDate = this.isValidDate(fData.date, this.data);
    if (!fData.scale || !fData.date || !fData.reason || !isValidDate) {
      if (!fData.scale || !fData.date || !fData.reason) {
        this.snackBar.open('Preencha todos os campos!', 'Ok', {
          duration: 5000,
        });
      } else {
        this.snackBar.open('Data inválida', 'Ok', {
          duration: 5000,
        });
      }
      return;
    }
    const category = fData.scale <= 6 ? 'Detrator' : fData.scale <= 8 ? 'Neutro' : 'Promotor';
    const answers = this.data.answers || [];
    answers.push({ date: fData.date.toISOString(), category: category, scale: fData.scale, reason: fData.reason });
    answers.sort((a, b) => {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    const cliente = {
      customer: this.data.customer,
      contactCustomer: this.data.contactCustomer,
      date: this.data.date,
      category: answers[answers.length - 1].category,
      answers: answers
    };
    this.clienteService.put(this.data.id, cliente)
      .subscribe(data => {
        this.dialogRef.close(true);
      });
    this.snackBar.open('Resposta cadastrado com sucesso', 'Ok', {
      duration: 2500,
    });
  }

  isValidDate(date, customer: any) {
    if (!customer.answers)
      return true;
    const month = moment(date).month();
    const year = moment(date).year();
    for (let j = 0; j < customer.answers.length; j++) {
      const answerMonth = moment(customer.answers[j].date).month();
      const answerYear = moment(customer.answers[j].date).year();
      if (month === answerMonth && year === answerYear)
        return false;
    }
    return true;
  }

}
