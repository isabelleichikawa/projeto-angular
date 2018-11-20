import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { routing } from './app.routing';
import { ClientesComponent } from './clientes/clientes.component';
import { AvaliacoesComponent } from './avaliacoes/avaliacoes.component';
import { MenuComponent } from './header/menu/menu.component';
import { NovaAvaliacaoComponent } from './avaliacoes/nova-avaliacao/nova-avaliacao.component';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';
import { ClienteService } from './clientes/shared/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProviders } from './http-interceptors';
import { AvaliacaoService } from './avaliacoes/shared/avaliacao.service';


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
    HttpClientModule,
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    routing
  ],
  exports: [
    MatNativeDateModule
  ],
  providers: [
    HttpInterceptorProviders,
    ClienteService,
    AvaliacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
