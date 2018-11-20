import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';
import { AvaliacaoService } from './shared/avaliacao.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  displayedColumns = ['code', 'date_ref', 'customers', 'result'];
  dataSource = ELEMENT_DATA;

  evaluations = [];
  data = [];

  customer: string;
  contact_customer: string;
  date: Date;

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

}

export interface PeriodicElement {
  customers: string;
  date_ref: string;
  code: number;
  result: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: 1, date_ref: '05/2018', customers: 'VWG, ABC, LEMPE, Ambientalis', result: 'Meta atingida - 80%'},
  {code: 2, date_ref: '06/2018', customers: 'K&L, LRM, Calibratec, Cimeq', result: 'Meta dentro da tolerância - 65%'},
  {code: 3, date_ref: '07/2018', customers: 'Megasteam, ABSI, MAERSK, Disotax', result: 'Meta não atingida - 30%'}
];

