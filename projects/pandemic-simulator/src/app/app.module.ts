import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartComponent } from './chart/chart.component';
import { ParamsComponent } from './params/params.component';
import { SimulationComponent } from './simulation/simulation.component';

import { SimulatorComponent } from './simulator.component';

@NgModule({
  declarations: [
    ParamsComponent,
    SimulatorComponent,
    ChartComponent,
    SimulationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
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
