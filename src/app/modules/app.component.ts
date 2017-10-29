import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/words" routerLinkActive="active">Words</a>
      <a routerLink="/word-map" routerLinkActive="active">WordsMap</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['../css/app.component.css']
})
export class AppComponent {
  title = 'Tour of Twitter Words';
}
