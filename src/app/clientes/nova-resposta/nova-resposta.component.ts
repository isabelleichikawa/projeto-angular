import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClienteService } from '../shared/cliente.service';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from '../shared/cliente.model';

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
      console.log(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  save() {
    const fData = this.form.value;
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
  }

}
