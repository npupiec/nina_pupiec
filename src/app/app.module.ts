import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';
import {HttpClientModule} from '@angular/common/http';
import {CharacterModule} from './character/character.module';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CharacterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
