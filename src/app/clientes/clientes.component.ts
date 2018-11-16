import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  titulo = this.homeComponent.titulo;

  constructor(
    private homeComponent: HomeComponent
  ) { }

  ngOnInit() {
  }

}
