import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { chartSafeLimit, colors, TOTAL_FRAMES } from '../models/constants';
import { Health } from '../models/health.enum';

@Component({
  selector: 'cosi-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @ViewChild('canvasElement') chartCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') containerElement: ElementRef<HTMLElement>;

  deadAbsolute: number;
  recoveredAbsolute: number;
  sickAbsolute: number;
  healthyAbsolute: number;

  private currentStep: number;
  private dangerSick: number[];
  // private safeSick: number[];
  private healthy: number[];
  private recovered: number[];
  private context: CanvasRenderingContext2D;
  private maxValue: number;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.context = ctx;
    }
  }

  init(value: number): void {
    // init parameters
    this.maxValue = value;
  }

  start(): void {
    // clean chart states
    this.dangerSick = [];
    // this.safeSick = [];
    this.healthy = [];
    this.recovered = [];
    this.currentStep = 0;
  }

  update(data: { [K in Health]: number }): void {
    // save the values as percentages
    this.deadAbsolute = data[Health.DEAD];
    this.recoveredAbsolute = data[Health.RECOVERED];
    this.sickAbsolute = data[Health.SICK];
    this.healthyAbsolute = data[Health.HEALTHY];
    this.cdRef.detectChanges();

    let sickValue = this.maxValue - data[Health.SICK];
    let healthyValue = sickValue - data[Health.HEALTHY];
    let recoveredValue = healthyValue - data[Health.RECOVERED];
    sickValue /= this.maxValue;
    healthyValue /= this.maxValue;
    recoveredValue /= this.maxValue;

    this.dangerSick.push(sickValue);
    // this.safeSick.push(Math.max(sickValue, chartSafeLimit));
    this.healthy.push(healthyValue);
    this.recovered.push(recoveredValue);
  }

  draw(): void {
    // The chart canvas width and height can be found using offsetWidth and offsetHeight
    const width = this.containerElement.nativeElement.offsetWidth;
    const height = this.containerElement.nativeElement.offsetHeight;
    const stepSize = width / (TOTAL_FRAMES - 1); // minus the first frame/result, because that's the start of the chart
    const currentStepSize = this.currentStep * stepSize;

    // update dimensions and clear canvas
    // the canvas is cleared when a new value is attached to dimensions (no matter if a same value)
    this.chartCanvas.nativeElement.width = width;
    this.chartCanvas.nativeElement.height = height;

    // draw empty rect (the upcoming time)
    this.drawRect(colors.chart.empty, currentStepSize, 0, width - currentStepSize, height);

    // draw dead part (a whole rectangle, the elapsed time)
    this.drawRect(colors.chart.dead, 0, 0, currentStepSize, height);

    // draw recovered part
    this.drawPolygon(this.recovered, colors.chart.recovered, height, stepSize);

    // draw healthy part
    this.drawPolygon(this.healthy, colors.chart.healthy, height, stepSize);

    // draw danger sick part
    this.drawPolygon(this.dangerSick, colors.chart.dangerSick, height, stepSize);

    // draw "safe" sick part
    // this.drawPolygon(this.safeSick, colors.chart.safeSick, height, stepSize);

    // draw "safe" line
    // this.drawLine(height * chartSafeLimit, 0, currentStepSize);

    this.currentStep++;
  }

  private drawLine(height: number, from: number, to: number): void {
    this.context.beginPath();
    this.context.moveTo(from, height);
    this.context.lineTo(to, height);
    this.context.closePath();

    this.context.strokeStyle = colors.chart.safeLine;
    this.context.stroke();
  }

  private drawRect(color: string, x: number, y: number, width: number, height: number): void {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  private drawPolygon(data: number[], color: string, height: number, stepSize: number): void {
    this.context.beginPath();
    this.context.moveTo(0, height);

    let step = -stepSize;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      step += stepSize;
      this.context.lineTo(step, data[i] * height);
    }

    this.context.lineTo(step, height);
    this.context.closePath();

    this.context.fillStyle = color;
    this.context.fill();
  }

  private clear(): void {
    // clear canvas
    this.chartCanvas.nativeElement.width = this.chartCanvas.nativeElement.height = 0;
  }

}
