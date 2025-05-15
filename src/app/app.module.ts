import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent);
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component'; // Si estás usando Angular Material

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppComponent
  ],
  providers: [],

})
export class AppModule { }
