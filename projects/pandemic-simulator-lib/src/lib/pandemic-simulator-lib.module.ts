import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { ParamsComponent } from './params/params.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulatorComponent } from './simulator.component';


@NgModule({
  declarations: [
    ParamsComponent,
    SimulatorComponent,
    ChartComponent,
    SimulationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SimulatorComponent]
})
export class PandemicSimulatorLibModule {
}
