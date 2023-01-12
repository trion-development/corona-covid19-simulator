import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Health } from '../models/health.enum';
import * as i0 from "@angular/core";
export declare class ChartComponent implements AfterViewInit {
    private cdRef;
    chartCanvas: ElementRef<HTMLCanvasElement>;
    containerElement: ElementRef<HTMLElement>;
    deadAbsolute: number;
    recoveredAbsolute: number;
    sickAbsolute: number;
    healthyAbsolute: number;
    private currentStep;
    private dangerSick;
    private healthy;
    private recovered;
    private context;
    private maxValue;
    constructor(cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    init(value: number): void;
    start(): void;
    update(data: {
        [K in Health]: number;
    }): void;
    draw(): void;
    private drawLine;
    private drawRect;
    private drawPolygon;
    private clear;
    static ɵfac: i0.ɵɵFactoryDef<ChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ChartComponent, "cosi-chart", never, {}, {}, never, never>;
}
