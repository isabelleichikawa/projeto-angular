import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { routing } from './app.routing';
import { ClientesComponent } from './clientes/clientes.component';
import { AvaliacoesComponent } from './avaliacoes/avaliacoes.component';
import { MenuComponent } from './header/menu/menu.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ClientesComponent,
    AvaliacoesComponent,
    MenuComponent,
    NovoClienteComponent,
    NovaAvaliacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
