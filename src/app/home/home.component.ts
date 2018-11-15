import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButton, MatDrawer } from '@angular/material';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
