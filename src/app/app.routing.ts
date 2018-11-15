import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Item1Component } from './item1/item1.component';
import { Item2Component } from './item2/item2.component';

const APP_ROUTES: Routes = [
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'item1', component: Item1Component },
            { path: 'item2', component: Item2Component }]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
