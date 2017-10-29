import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import {InMemoryWebApiModule, InMemoryBackendConfigArgs} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './modules/services/in-memory-data.service';

// import './rxjs-extensions';
import { AppComponent } from './modules/app.component';
import { AppRoutingModule, routedComponents } from './modules/app-routing.module';
import { HeroService } from './modules/hero/services/hero.service';
import { HeroSearchComponent } from './modules/hero/hero-search.component';
import { WordMapComponent } from './modules/map/word-map.compoment';
import {WordSearchComponent} from "./modules/map/word-search.component";
import {WordService} from "./modules/map/services/word.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService, <InMemoryBackendConfigArgs>{delay: 600}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHTn8-O4U-OZYUcS5sLDESrZsPuFa194M'
    })
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    WordSearchComponent,
    HeroSearchComponent,
    WordMapComponent,
    routedComponents
  ],
  providers: [
    JsonpModule, HeroService, WordService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
