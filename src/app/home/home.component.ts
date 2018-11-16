import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ativo = true;
  titulo = '';

  constructor() { }

  ngOnInit() {
  }

  itemSelected1(opcao: string) {
    return this.titulo = opcao;
  }

}
