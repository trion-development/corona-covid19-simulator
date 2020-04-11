import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { PandemicSimulatorLibModule } from 'pandemic-simulator-lib';

import { SimulatorComponent } from 'pandemic-simulator-lib';

@NgModule({
  imports: [
    BrowserModule,
    PandemicSimulatorLibModule
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap(): void {
    const ngElement = createCustomElement(SimulatorComponent, {
      injector: this.injector
    });
    customElements.define('cosim-simulator', ngElement);
  }
}
