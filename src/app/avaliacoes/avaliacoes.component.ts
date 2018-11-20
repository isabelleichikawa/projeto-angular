import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';
import { AvaliacaoService } from './shared/avaliacao.service';
import { Avaliacao } from './shared/avaliacao.model';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  displayedColumns = ['month', 'year', 'customers', 'scale', 'reason'];
  dataSource: Avaliacao[];

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
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.avaliacaoService.get().subscribe(result => {
      console.log(result);
      // this.customers = result;
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        this.data.push({id: keys[i], ...values[i]});
      }
      this.evaluations = this.data;
      console.log(this.evaluations);
    });
  }

  edit(id: string) {
    console.log(id);
  }

}
