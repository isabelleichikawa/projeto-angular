import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  @ViewChild('customer') customer: ElementRef;
  @ViewChild('contactCustomer') contactCustomer: ElementRef;
  @ViewChild('date') date: ElementRef;
  form: FormGroup;
  data: Cliente;

  constructor(
    public dialogRef: MatDialogRef<NovoClienteComponent>,
    public snackBar: MatSnackBar,
    private clienteService: ClienteService
  ) {

    this.form = new FormGroup({
      customer: new FormControl(null),
      contactCustomer: new FormControl(null),
      date: new FormControl(new Date())
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    if (this.data) {
      this.data.date = new Date(this.data.date);
      this.form.patchValue(this.data);
    }
  }

  save() {
    const fData = this.form.value;
    if (!fData.customer || !fData.contactCustomer || !fData.date)
      return;
    const answers = this.data ? this.data.answers || [] : [];
    const cliente = {
      customer: fData.customer,
      contactCustomer: fData.contactCustomer,
      date: fData.date,
      answers: answers,
      category: this.data ? this.data.category || 'Nenhum' : 'Nenhum'
    };
    if (!this.data) {
      this.clienteService.post(cliente)
        .subscribe(data => {
          this.dialogRef.close(true);
        });
        this.snackBar.open('Cliente cadastrado com sucesso!', 'Ok', {
          duration: 2500,
        });
    } else {
      this.clienteService.put(this.data.id, cliente)
        .subscribe(data => {
          this.dialogRef.close(true);
        });
        this.snackBar.open('Cliente alterado com sucesso!', 'Ok', {
          duration: 2500,
        });
    }
  }

}
