import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns = ['code', 'customer', 'contact_customer', 'date'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}

export interface PeriodicElement {
  customer: string;
  code: number;
  contact_customer: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: 1, customer: 'ABC', contact_customer: 'Isabelle', date: '22/01/2018'},
  {code: 2, customer: 'K&L', contact_customer: 'Ana', date: '22/01/2018'},
  {code: 3, customer: 'CTM', contact_customer: 'Amauri', date: '22/01/2018'},
  {code: 4, customer: 'VWG', contact_customer: 'Ronaldo', date: '22/01/2018'},
  {code: 5, customer: 'Calibratec', contact_customer: 'Nelson', date: '22/01/2018'},
  {code: 6, customer: 'Omicron', contact_customer: 'William', date: '22/01/2018'},
  {code: 7, customer: 'Megasteam', contact_customer: 'Alex', date: '22/01/2018'},
  {code: 8, customer: 'MAERSK', contact_customer: 'Paulo', date: '22/01/2018'},
  {code: 9, customer: 'LRM', contact_customer: 'Lucas', date: '22/01/2018'},
  {code: 10, customer: 'ACCPR', contact_customer: 'Priscila', date: '22/01/2018'},
  {code: 11, customer: 'LEMPE', contact_customer: 'Natália', date: '22/01/2018'},
  {code: 12, customer: 'ANCAL', contact_customer: 'Fábio', date: '22/01/2018'},
  {code: 13, customer: 'CERTIFIC', contact_customer: 'Marcelo', date: '22/01/2018'},
  {code: 14, customer: 'SENAI - CETEMP', contact_customer: 'Andrey', date: '22/01/2018'},
  {code: 15, customer: 'PRESERTEC', contact_customer: 'Rafael', date: '22/01/2018'},
  {code: 16, customer: 'ABSI', contact_customer: 'Victor', date: '22/01/2018'},
  {code: 17, customer: 'Ambientalis', contact_customer: 'Hugo', date: '22/01/2018'},
  {code: 18, customer: 'Cimeq', contact_customer: 'Vinicius', date: '22/01/2018'},
  {code: 19, customer: 'Excelmetro', contact_customer: 'Marcela', date: '22/01/2018'},
  {code: 20, customer: 'AirLiquide', contact_customer: 'Camila', date: '22/01/2018'}
];
