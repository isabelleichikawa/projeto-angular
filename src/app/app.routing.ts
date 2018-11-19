import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ClientesComponent } from './clientes/clientes.component';
import { AvaliacoesComponent } from './avaliacoes/avaliacoes.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { NovaAvaliacaoComponent } from './nova-avaliacao/nova-avaliacao.component';

const APP_ROUTES: Routes = [
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'clientes', component: ClientesComponent, children: [{ path: 'novo-cliente', component: NovoClienteComponent }] },
            { path: 'avaliacoes', component: AvaliacoesComponent, children: [{ path: 'nova-avaliacao', component: NovaAvaliacaoComponent }]
        }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
