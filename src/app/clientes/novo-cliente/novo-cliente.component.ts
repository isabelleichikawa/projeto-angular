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
    console.log(this.data);
    if (this.data) {
        this.data.date = new Date(this.data.date);
      this.form.patchValue(this.data);
    }
  }

  save() {
    const fData = this.form.value;
    console.log(fData);
    if (!this.customer.nativeElement.value || !this.contactCustomer.nativeElement.value || !this.date.nativeElement.value) {
      return null;
    }
    this.clienteService.post(this.customer.nativeElement.value, this.contactCustomer.nativeElement.value, this.date.nativeElement.value)
      .subscribe(data => {
        this.dialogRef.close({ id: data.id });
      });
  }

  // edit(element: any) {
  //   if (!this.customer.nativeElement.value || !this.contactCustomer.nativeElement.value || !this.date.nativeElement.value) {
  //     return null;
  //   }
  //   this.clienteService.put(element.id, this.customer.nativeElement.value, this.contactCustomer.nativeElement.value, this.date.nativeElement.value)
  //     .subscribe(data => {
  //       // console.log(element.id);
  //       // console.log(element.customer);
  //       // this.dialogRef.close({ id: data.id });
  //     });
  // }


}


