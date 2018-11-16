import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSidenavActive = true;
  isClientesActive = false;
  isAvaliacoesActive = false;

  constructor() { }

  ngOnInit() {
  }

  clientesActive(item: String) {
    if (item === 'Clientes') {
      if (this.isClientesActive === true) {
        this.isClientesActive = true;
        this.isAvaliacoesActive = false;
      } else {
        this.isClientesActive = !this.isClientesActive;
        this.isAvaliacoesActive = !this.isClientesActive;
      }
    }
    console.log('Cliente ' + this.isClientesActive);
    console.log('Avaliações ' + this.isAvaliacoesActive);
  }

  avaliacoesActive(item: String) {
    if (item === 'Avaliações') {
      if (this.isAvaliacoesActive === true) {
        this.isClientesActive = false;
        this.isAvaliacoesActive = true;
      } else {
        this.isAvaliacoesActive = !this.isAvaliacoesActive;
        this.isClientesActive = !this.isAvaliacoesActive;
      }
    }
    console.log('Cliente ' + this.isClientesActive);
    console.log('Avaliações ' + this.isAvaliacoesActive);
  }

}
