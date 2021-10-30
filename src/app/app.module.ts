import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppBoostrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppBoostrapModule, HttpClientModule],
  declarations: [ AppComponent, AuthComponent, LoadingComponent ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
