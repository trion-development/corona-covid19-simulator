import { ApplicationRef } from '@angular/core';
import { SimulatorParams } from './models/simulator-params';
import { SimulationComponent } from './simulation/simulation.component';
import * as i0 from "@angular/core";
export declare class SimulatorComponent {
    private appRef;
    charts: SimulationComponent[];
    randomSeed: number;
    rng1: any;
    rng2: any;
    is2ndVisible: boolean;
    private readonly initialState;
    mainParams: SimulatorParams;
    secondParams: SimulatorParams;
    constructor(appRef: ApplicationRef);
    start(simulator1: HTMLDivElement): void;
    show2nd(simulator2: HTMLDivElement): void;
    changeMainParams($event: SimulatorParams): void;
    changeSecondParams($event: SimulatorParams): void;
    static ɵfac: i0.ɵɵFactoryDef<SimulatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SimulatorComponent, "cosi-simulator", never, {}, {}, never, never>;
}
