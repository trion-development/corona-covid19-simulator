import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PandemicSimulatorLibModule } from 'pandemic-simulator-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PandemicSimulatorLibModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
