import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ClienteService } from './shared/cliente.service';
import { Cliente } from './shared/cliente.model';
import * as moment from 'moment';
import { NovaRespostaComponent } from './nova-resposta/nova-resposta.component';

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
    public snackBar: MatSnackBar,
    private clienteService: ClienteService
  ) { }

  openDialog(customer: any = null): void {
    const dialogRef = this.dialog.open(NovoClienteComponent);
    dialogRef.componentInstance.data = customer;
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.refresh();
    });
  }

  openDialogNV(customer: any = null): void {
    const dialogRef = this.dialog.open(NovaRespostaComponent);
    dialogRef.componentInstance.data = customer;
    dialogRef.afterClosed().subscribe(result => {
      if (result)
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
      if (!result)
        return;
      const keys = Object.keys(result);
      const values = Object.values(result);
      // console.log(Object.values(result));
      for (let i = 0; i < keys.length; i++) {
        if (values[i].date)
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
    this.snackBar.open('Cliente removido com sucesso!', 'Ok', {
      duration: 2500,
    });
  }

}

