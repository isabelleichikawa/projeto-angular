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

  constructor(
    public dialogRef: MatDialogRef<NovaRespostaComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
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
    this.dialogRef.close();
  }

  save() {
    const fData = this.form.value;
    console.log(fData);
    // const cliente = {
    //   customer: fData.customer,
    //   contactCustomer: fData.contactCustomer,
    //   date: fData.date
    // };
    // this.clienteService.put(this.data.id, cliente, this.data.category)
    //   .subscribe(data => {
    //     this.dialogRef.close({});
    //   });
  }

}
