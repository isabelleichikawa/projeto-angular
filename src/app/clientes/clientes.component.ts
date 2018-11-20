import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ClienteService } from './shared/cliente.service';
import { Cliente } from './shared/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns = ['customer', 'contactCustomer', 'date', 'category', 'actions'];
  dataSource: Cliente[];

  customers = [];
  data = [];
  // teste: any;

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  openDialog(customer = null): void {
    const dialogRef = this.dialog.open(NovoClienteComponent, {
      data: customer
    });
    // console.log(this.listCustomers());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
  }

  edit(id: string) {
    console.log(id);
  }

  refresh() {
    this.customers = [];
    this.data = [];
    this.clienteService.get().subscribe(result => {
      console.log(result);
      // this.customers = result;
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        this.data.push({ id: keys[i], ...values[i] });
      }
      this.customers = this.data;
      console.log(this.customers);
    });
  }

  remove(id: string) {
    console.log(id);
    this.clienteService.delete(id).subscribe(result => {
      console.log(result);
      console.log(this.customers);
      this.refresh();
    });
  }

}



