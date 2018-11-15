import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
  }

  changeTitle(title: string) {
    this.appComponent.titulo = title;
  }

  itemSelected1(item: string) {
    return this.appComponent.titulo === item;
  }

}
