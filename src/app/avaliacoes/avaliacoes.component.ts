import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  titulo = this.homeComponent.titulo;

  constructor(
    private homeComponent: HomeComponent
  ) { }

  ngOnInit() {
  }

}
