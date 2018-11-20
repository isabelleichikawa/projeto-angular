import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ClienteService } from './shared/cliente.service';
import { Cliente } from './shared/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns = ['customer', 'contactCustomer', 'date', 'category'];
  dataSource: Cliente[];

  customers = [];
  data = [];

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  openDialog(customer = null): void {
    const dialogRef = this.dialog.open(NovoClienteComponent, {
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.clienteService.get().subscribe(result => {
      console.log(result);
      // this.customers = result;
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        this.data.push({id: keys[i], ...values[i]});
      }
      this.customers = this.data;
      console.log(this.customers);
    });
  }

  edit(id: string) {
    console.log(id);
  }

}



