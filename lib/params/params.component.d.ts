import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimulatorParams } from '../models/simulator-params';
import * as i0 from "@angular/core";
export declare class ParamsComponent implements OnInit, OnDestroy {
    initialParams: SimulatorParams;
    paramsChanged: EventEmitter<SimulatorParams>;
    paramsForm: FormGroup;
    private paramsSubs;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<ParamsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ParamsComponent, "cosi-params", never, { "initialParams": "initialParams"; }, { "paramsChanged": "paramsChanged"; }, never, never>;
}
