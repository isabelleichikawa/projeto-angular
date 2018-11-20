import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  @ViewChild('customer') customer: ElementRef;
  @ViewChild('contactCustomer') contactCustomer: ElementRef;
  @ViewChild('date') date: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<NovoClienteComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
  }

  save() {
    if (!this.customer.nativeElement.value || !this.contactCustomer.nativeElement.value || !this.date.nativeElement.value) {
      return null;
    }
    this.clienteService.post(this.customer.nativeElement.value, this.contactCustomer.nativeElement.value, this.date.nativeElement.value)
      .subscribe(data => {
        console.log(data.id);
        this.dialogRef.close({ id: data.id });
      });
  }


}


