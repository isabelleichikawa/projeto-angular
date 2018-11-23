import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';
import { AvaliacaoService } from './shared/avaliacao.service';
import { Avaliacao } from './shared/avaliacao.model';
import * as moment from 'moment';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  displayedColumns = ['month', 'year', 'customers', 'nps', 'actions'];

  evaluations = [];
  data = [];

  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  constructor(
    public dialog: MatDialog,
    private avaliacaoService: AvaliacaoService
  ) { }

  openDialog(avaliacao: any = null): void {
    console.log(avaliacao);
    const dialogRef = this.dialog.open(NovaAvaliacaoComponent);
    dialogRef.componentInstance.data = avaliacao;
    dialogRef.afterClosed().subscribe(result => {
      if (result)
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
      if (!result)
      return;
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        const dados = {
          id: keys[i],
          customersFormated: '',
          ...values[i]
        };
        dados.customers = dados.customers || [];
        dados.customersFormated = dados.customers.map(c => c.customer).join(', ');
        dados.month = this.months[dados.month];
        this.data.push(dados);
      }
      this.evaluations = this.data;
      console.log(this.evaluations);
    });
  }

  remove(id: string) {
    this.avaliacaoService.delete(id).subscribe(result => {
      this.refresh();
    });
  }

}
