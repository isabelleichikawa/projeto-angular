import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ClientesComponent } from './clientes/clientes.component';
import { AvaliacoesComponent } from './avaliacoes/avaliacoes.component';
import { NovaAvaliacaoComponent } from './avaliacoes/nova-avaliacao/nova-avaliacao.component';
import { NovoClienteComponent } from './clientes/novo-cliente/novo-cliente.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'clientes', component: ClientesComponent, children: [{ path: 'novo-cliente', component: NovoClienteComponent }] },
            { path: 'avaliacoes', component: AvaliacoesComponent, children: [{ path: 'nova-avaliacao', component: NovaAvaliacaoComponent }] },
            { path: '', redirectTo: 'clientes', pathMatch: 'full' }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
