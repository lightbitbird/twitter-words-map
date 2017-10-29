import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './hero/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { WordMapComponent } from './map/word-map.compoment';
import {WordDetailComponent} from "./map/word-detail.component";
import {WordsComponent} from "./map/words.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: WordDetailComponent
  },
  {
    path: 'words',
    component: WordsComponent
  },
  {
    path: 'word-map',
    component: WordMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [DashboardComponent, WordsComponent, WordDetailComponent, WordMapComponent];
