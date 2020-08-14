import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { SimulatorParams } from '../models/simulator-params';
import * as i0 from "@angular/core";
export declare class SimulationComponent implements OnInit, AfterViewInit {
    canvas: ElementRef<HTMLCanvasElement>;
    canvasContainer: ElementRef<HTMLElement>;
    chart: ChartComponent;
    simulatorParams: SimulatorParams;
    randomNumberGenerator?: () => number;
    private rightBorder;
    private leftBorder;
    private ctx;
    private persons;
    private currentFrame;
    private updateInterval;
    private resizeTimeout;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    toggleRightBorder(): void;
    toggleLeftBorder(): void;
    start(): void;
    private shuffleBalls;
    private update;
    private resizeEventHandler;
    private draw;
    private drawOutline;
    private drawLine;
    private drawBorder;
    private drawCanvasBoundaries;
    private drawBall;
    private simulationEnd;
    static ɵfac: i0.ɵɵFactoryDef<SimulationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SimulationComponent, "cosi-simulation", never, { "simulatorParams": "simulatorParams"; "randomNumberGenerator": "randomNumberGenerator"; }, {}, never, never>;
}