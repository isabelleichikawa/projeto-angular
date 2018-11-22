import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-resposta',
  templateUrl: './nova-resposta.component.html',
  styleUrls: ['./nova-resposta.component.scss']
})
export class NovaRespostaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  function2() {
    console.log('teste');
  }

}
