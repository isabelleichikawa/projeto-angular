import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  displayedColumns = ['code', 'date_ref', 'customers', 'result'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
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

