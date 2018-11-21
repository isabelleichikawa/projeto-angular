import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ClienteService } from './shared/cliente.service';
import { Cliente } from './shared/cliente.model';
import * as moment from 'moment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns = ['customer', 'contactCustomer', 'dateFormated', 'category', 'actions'];
  dataSource: Cliente[];

  customers = [];
  data = [];

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  // openDialog(customer = null): void {
  //   const dialogRef = this.dialog.open(NovoClienteComponent, {
  //     data: customer
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.refresh();
  //   });
  // }

  openDialog(customer: any = null): void {
    const dialogRef = this.dialog.open(NovoClienteComponent, {
      data: customer
    });
    dialogRef.componentInstance.data = customer;
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.customers = [];
    this.data = [];
    this.clienteService.get().subscribe(result => {
      // this.customers = result;
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        values[i].dateFormated = moment(values[i].date.toString()).format('DD/MM/YYYY');
        this.data.push({ id: keys[i], ...values[i] });
      }
      this.customers = this.data;
    });
  }

  remove(id: string) {
    this.clienteService.delete(id).subscribe(result => {
      this.refresh();
    });
  }

  // edit(objCustomer: any) {
  //   const dialogRef = this.dialog.open(NovoClienteComponent, {
  //   });
  //   dialogRef.componentInstance.data = objCustomer;
  //   // this.clienteService.put(objCustomer.id, objCustomer.customer, objCustomer.contactCustomer, objCustomer.date)
  //   //   .subscribe(data => {
  //   // });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.refresh();
  //   });
  // }

}

