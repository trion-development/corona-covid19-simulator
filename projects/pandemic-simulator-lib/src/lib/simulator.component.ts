import { ApplicationRef, Component, ViewChildren } from '@angular/core';

import seedrandom from 'seedrandom';
import { DEATH_RATE, INFECTION_RATE } from './models/constants';
import { SimulatorParams } from './models/simulator-params';
import { SimulationComponent } from './simulation/simulation.component';

@Component({
  selector: 'cosi-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent {

  @ViewChildren(SimulationComponent) charts: SimulationComponent[];

  randomSeed = Math.random();
  rng1 = seedrandom(this.randomSeed);
  rng2 = seedrandom(this.randomSeed);
  is2ndVisible: boolean;
  private readonly initialState = {
    population: 200,
    distancing: 0,
    deathRate: DEATH_RATE,
    infectionRate: INFECTION_RATE
  };
  mainParams: SimulatorParams = this.initialState;
  secondParams: SimulatorParams = this.initialState;

  constructor(private appRef: ApplicationRef) {
  }

  start(simulator1: HTMLDivElement): void {
    this.randomSeed = Math.random();
    this.rng1 = seedrandom(this.randomSeed);
    this.rng2 = seedrandom(this.randomSeed);
    this.charts.forEach(chart => chart.start());
    simulator1.scrollIntoView();
    this.appRef.tick();
  }

  show2nd(simulator2: HTMLDivElement): void {
    this.is2ndVisible = !this.is2ndVisible;
    if (this.is2ndVisible) {
      simulator2.scrollIntoView({block: 'center'});
    }
    this.appRef.tick();
  }

  changeMainParams($event: SimulatorParams) {
    this.mainParams = $event;
    this.appRef.tick();
  }

  changeSecondParams($event: SimulatorParams) {
    this.secondParams = $event;
    this.appRef.tick();
  }
}
