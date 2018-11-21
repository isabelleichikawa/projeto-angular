import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';
import { AvaliacaoService } from './shared/avaliacao.service';
import { Avaliacao } from './shared/avaliacao.model';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  displayedColumns = ['month', 'year', 'customers', 'scale', 'reason', 'actions'];

  evaluations = [];
  data = [];

  constructor(
    public dialog: MatDialog,
    private avaliacaoService: AvaliacaoService
  ) { }

  openDialog(evaluations = null): void {
    const dialogRef = this.dialog.open(NovaAvaliacaoComponent, {
      data: evaluations
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.evaluations = [];
    this.data = [];
    this.avaliacaoService.get().subscribe(result => {
      // this.customers = result
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        this.data.push({id: keys[i], ...values[i]});
      }
      this.evaluations = this.data;
    });
  }

  remove(id: string) {
    this.avaliacaoService.delete(id).subscribe(result => {
      this.refresh();
    });
  }

  edit(objCustomer: any) {
    const dialogRef = this.dialog.open(NovaAvaliacaoComponent, {
      // data: objCustomer
    });
    dialogRef.componentInstance.data = objCustomer;
    // this.avaliacaoService.put(objCustomer.id, objCustomer.month, objCustomer.year, objCustomer.scale, objCustomer.reason, objCustomer.customer)
    //   .subscribe(data => {
    // });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

}
