import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ClientesComponent } from './clientes/clientes.component';
import { AvaliacoesComponent } from './avaliacoes/avaliacoes.component';

const APP_ROUTES: Routes = [
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'clientes', component: ClientesComponent },
            { path: 'avaliacoes', component: AvaliacoesComponent }]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
