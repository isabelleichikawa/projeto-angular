import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<NovoClienteComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {

    this.form = new FormGroup({
      customer: new FormControl(null),
      contactCustomer: new FormControl(null),
      date: new FormControl(new Date())
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.clienteService.get()
    // console.log(this.data);
    if (this.data) {
      this.data.date = new Date(this.data.date);
      this.form.patchValue(this.data);
    }
  }

  save() {
    const fData = this.form.value;
    // console.log(fData);
    if (!fData.customer || !fData.contactCustomer || !fData.date) {
      return null;
    } else if (this.data === null) {
      // console.log('novo cliente');
      const cliente = {
        customer: fData.customer,
        contactCustomer: fData.contactCustomer,
        date: fData.date
      };
      this.clienteService.post(cliente, 'Nenhum')
        .subscribe(data => {
          this.dialogRef.close({ id: fData.id });
        });
    } else {
      const cliente = {
        customer: fData.customer,
        contactCustomer: fData.contactCustomer,
        date: fData.date
      };
      this.clienteService.put(this.data.id, cliente, this.data.category)
        .subscribe(data => {
          this.dialogRef.close({});
        });
    }
  }

}
