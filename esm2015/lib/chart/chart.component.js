import { Component, ViewChild } from '@angular/core';
import { colors, TOTAL_FRAMES } from '../models/constants';
import { Health } from '../models/health.enum';
import * as i0 from "@angular/core";
const _c0 = ["canvasElement"];
const _c1 = ["container"];
export class ChartComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
    }
    ngAfterViewInit() {
        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (ctx) {
            this.context = ctx;
        }
    }
    init(value) {
        // init parameters
        this.maxValue = value;
    }
    start() {
        // clean chart states
        this.dangerSick = [];
        // this.safeSick = [];
        this.healthy = [];
        this.recovered = [];
        this.currentStep = 0;
    }
    update(data) {
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
    draw() {
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
    drawLine(height, from, to) {
        this.context.beginPath();
        this.context.moveTo(from, height);
        this.context.lineTo(to, height);
        this.context.closePath();
        this.context.strokeStyle = colors.chart.safeLine;
        this.context.stroke();
    }
    drawRect(color, x, y, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }
    drawPolygon(data, color, height, stepSize) {
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
    clear() {
        // clear canvas
        this.chartCanvas.nativeElement.width = this.chartCanvas.nativeElement.height = 0;
    }
}
ChartComponent.ɵfac = function ChartComponent_Factory(t) { return new (t || ChartComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
ChartComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ChartComponent, selectors: [["cosi-chart"]], viewQuery: function ChartComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chartCanvas = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.containerElement = _t.first);
    } }, decls: 21, vars: 4, consts: [["id", "chart-stats"], [1, "border-on-right"], ["id", "healthy-number", 1, "number"], ["id", "sick-number", 1, "number"], ["id", "recovered-number", 1, "number"], ["id", "dead-number", 1, "number"], [1, "chart-container"], ["container", ""], ["canvasElement", ""]], template: function ChartComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "span", 1);
        i0.ɵɵtext(2, " Healthy ");
        i0.ɵɵelementStart(3, "span", 2);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 1);
        i0.ɵɵtext(6, " Sick ");
        i0.ɵɵelementStart(7, "span", 3);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "span", 1);
        i0.ɵɵtext(10, " Recovered ");
        i0.ɵɵelementStart(11, "span", 4);
        i0.ɵɵtext(12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "span");
        i0.ɵɵtext(14, " Dead ");
        i0.ɵɵelementStart(15, "span", 5);
        i0.ɵɵtext(16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 6, 7);
        i0.ɵɵelement(19, "canvas", null, 8);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.healthyAbsolute);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.sickAbsolute);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.recoveredAbsolute);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.deadAbsolute);
    } }, styles: [".chart-container[_ngcontent-%COMP%]{height:45px;margin:20px auto;width:450px}@media screen and (max-width:480px){.chart-container[_ngcontent-%COMP%]{height:25px;width:250px}}@media screen and (max-width:1000px){#chart-stats[_ngcontent-%COMP%]{text-align:center}}.number[_ngcontent-%COMP%], .parameters-text[_ngcontent-%COMP%], .parameters-title[_ngcontent-%COMP%]{font-weight:700}.border-on-right[_ngcontent-%COMP%]{border-right:2px solid grey}#healthy-number[_ngcontent-%COMP%]{color:#aed581}#sick-number[_ngcontent-%COMP%]{color:#e53935}#recovered-number[_ngcontent-%COMP%]{color:#ff9800}#dead-number[_ngcontent-%COMP%]{color:#000}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ChartComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-chart',
                templateUrl: './chart.component.html',
                styleUrls: ['./chart.component.scss']
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { chartCanvas: [{
            type: ViewChild,
            args: ['canvasElement']
        }], containerElement: [{
            type: ViewChild,
            args: ['container']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9naXRodWIvd29ya3NwYWNlL3Byb2plY3RzL3BhbmRlbWljLXNpbXVsYXRvci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudC50cyIsImxpYi9jaGFydC9jaGFydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9DLFNBQVMsRUFBYyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFrQixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBTy9DLE1BQU0sT0FBTyxjQUFjO0lBa0J6QixZQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtJQUM1QyxDQUFDO0lBRUQsZUFBZTtRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFhO1FBQ2hCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSztRQUNILHFCQUFxQjtRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUErQjtRQUNwQyxpQ0FBaUM7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QUFoQixzQ0FBZ0I7O2tERE43QyxjQUFjO2NBTDFCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7YUFDdEM7b0VBRzZCLFdBQVc7a0JBQXRDLFNBQVM7bUJBQUMsZUFBZTtZQUNGLGdCQUFnQjtrQkFBdkMsU0FBUzttQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjaGFydFNhZmVMaW1pdCwgY29sb3JzLCBUT1RBTF9GUkFNRVMgfSBmcm9tICcuLi9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IEhlYWx0aCB9IGZyb20gJy4uL21vZGVscy9oZWFsdGguZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nvc2ktY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hhcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGFydC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzRWxlbWVudCcpIGNoYXJ0Q2FudmFzOiBFbGVtZW50UmVmPEhUTUxDYW52YXNFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgZGVhZEFic29sdXRlOiBudW1iZXI7XG4gIHJlY292ZXJlZEFic29sdXRlOiBudW1iZXI7XG4gIHNpY2tBYnNvbHV0ZTogbnVtYmVyO1xuICBoZWFsdGh5QWJzb2x1dGU6IG51bWJlcjtcblxuICBwcml2YXRlIGN1cnJlbnRTdGVwOiBudW1iZXI7XG4gIHByaXZhdGUgZGFuZ2VyU2ljazogbnVtYmVyW107XG4gIC8vIHByaXZhdGUgc2FmZVNpY2s6IG51bWJlcltdO1xuICBwcml2YXRlIGhlYWx0aHk6IG51bWJlcltdO1xuICBwcml2YXRlIHJlY292ZXJlZDogbnVtYmVyW107XG4gIHByaXZhdGUgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIG1heFZhbHVlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmNoYXJ0Q2FudmFzLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY3R4KSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjdHg7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gaW5pdCBwYXJhbWV0ZXJzXG4gICAgdGhpcy5tYXhWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgLy8gY2xlYW4gY2hhcnQgc3RhdGVzXG4gICAgdGhpcy5kYW5nZXJTaWNrID0gW107XG4gICAgLy8gdGhpcy5zYWZlU2ljayA9IFtdO1xuICAgIHRoaXMuaGVhbHRoeSA9IFtdO1xuICAgIHRoaXMucmVjb3ZlcmVkID0gW107XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IDA7XG4gIH1cblxuICB1cGRhdGUoZGF0YTogeyBbSyBpbiBIZWFsdGhdOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIC8vIHNhdmUgdGhlIHZhbHVlcyBhcyBwZXJjZW50YWdlc1xuICAgIHRoaXMuZGVhZEFic29sdXRlID0gZGF0YVtIZWFsdGguREVBRF07XG4gICAgdGhpcy5yZWNvdmVyZWRBYnNvbHV0ZSA9IGRhdGFbSGVhbHRoLlJFQ09WRVJFRF07XG4gICAgdGhpcy5zaWNrQWJzb2x1dGUgPSBkYXRhW0hlYWx0aC5TSUNLXTtcbiAgICB0aGlzLmhlYWx0aHlBYnNvbHV0ZSA9IGRhdGFbSGVhbHRoLkhFQUxUSFldO1xuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgbGV0IHNpY2tWYWx1ZSA9IHRoaXMubWF4VmFsdWUgLSBkYXRhW0hlYWx0aC5TSUNLXTtcbiAgICBsZXQgaGVhbHRoeVZhbHVlID0gc2lja1ZhbHVlIC0gZGF0YVtIZWFsdGguSEVBTFRIWV07XG4gICAgbGV0IHJlY292ZXJlZFZhbHVlID0gaGVhbHRoeVZhbHVlIC0gZGF0YVtIZWFsdGguUkVDT1ZFUkVEXTtcbiAgICBzaWNrVmFsdWUgLz0gdGhpcy5tYXhWYWx1ZTtcbiAgICBoZWFsdGh5VmFsdWUgLz0gdGhpcy5tYXhWYWx1ZTtcbiAgICByZWNvdmVyZWRWYWx1ZSAvPSB0aGlzLm1heFZhbHVlO1xuXG4gICAgdGhpcy5kYW5nZXJTaWNrLnB1c2goc2lja1ZhbHVlKTtcbiAgICAvLyB0aGlzLnNhZmVTaWNrLnB1c2goTWF0aC5tYXgoc2lja1ZhbHVlLCBjaGFydFNhZmVMaW1pdCkpO1xuICAgIHRoaXMuaGVhbHRoeS5wdXNoKGhlYWx0aHlWYWx1ZSk7XG4gICAgdGhpcy5yZWNvdmVyZWQucHVzaChyZWNvdmVyZWRWYWx1ZSk7XG4gIH1cblxuICBkcmF3KCk6IHZvaWQge1xuICAgIC8vIFRoZSBjaGFydCBjYW52YXMgd2lkdGggYW5kIGhlaWdodCBjYW4gYmUgZm91bmQgdXNpbmcgb2Zmc2V0V2lkdGggYW5kIG9mZnNldEhlaWdodFxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jb250YWluZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jb250YWluZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHN0ZXBTaXplID0gd2lkdGggLyAoVE9UQUxfRlJBTUVTIC0gMSk7IC8vIG1pbnVzIHRoZSBmaXJzdCBmcmFtZS9yZXN1bHQsIGJlY2F1c2UgdGhhdCdzIHRoZSBzdGFydCBvZiB0aGUgY2hhcnRcbiAgICBjb25zdCBjdXJyZW50U3RlcFNpemUgPSB0aGlzLmN1cnJlbnRTdGVwICogc3RlcFNpemU7XG5cbiAgICAvLyB1cGRhdGUgZGltZW5zaW9ucyBhbmQgY2xlYXIgY2FudmFzXG4gICAgLy8gdGhlIGNhbnZhcyBpcyBjbGVhcmVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYXR0YWNoZWQgdG8gZGltZW5zaW9ucyAobm8gbWF0dGVyIGlmIGEgc2FtZSB2YWx1ZSlcbiAgICB0aGlzLmNoYXJ0Q2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmNoYXJ0Q2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgLy8gZHJhdyBlbXB0eSByZWN0ICh0aGUgdXBjb21pbmcgdGltZSlcbiAgICB0aGlzLmRyYXdSZWN0KGNvbG9ycy5jaGFydC5lbXB0eSwgY3VycmVudFN0ZXBTaXplLCAwLCB3aWR0aCAtIGN1cnJlbnRTdGVwU2l6ZSwgaGVpZ2h0KTtcblxuICAgIC8vIGRyYXcgZGVhZCBwYXJ0IChhIHdob2xlIHJlY3RhbmdsZSwgdGhlIGVsYXBzZWQgdGltZSlcbiAgICB0aGlzLmRyYXdSZWN0KGNvbG9ycy5jaGFydC5kZWFkLCAwLCAwLCBjdXJyZW50U3RlcFNpemUsIGhlaWdodCk7XG5cbiAgICAvLyBkcmF3IHJlY292ZXJlZCBwYXJ0XG4gICAgdGhpcy5kcmF3UG9seWdvbih0aGlzLnJlY292ZXJlZCwgY29sb3JzLmNoYXJ0LnJlY292ZXJlZCwgaGVpZ2h0LCBzdGVwU2l6ZSk7XG5cbiAgICAvLyBkcmF3IGhlYWx0aHkgcGFydFxuICAgIHRoaXMuZHJhd1BvbHlnb24odGhpcy5oZWFsdGh5LCBjb2xvcnMuY2hhcnQuaGVhbHRoeSwgaGVpZ2h0LCBzdGVwU2l6ZSk7XG5cbiAgICAvLyBkcmF3IGRhbmdlciBzaWNrIHBhcnRcbiAgICB0aGlzLmRyYXdQb2x5Z29uKHRoaXMuZGFuZ2VyU2ljaywgY29sb3JzLmNoYXJ0LmRhbmdlclNpY2ssIGhlaWdodCwgc3RlcFNpemUpO1xuXG4gICAgLy8gZHJhdyBcInNhZmVcIiBzaWNrIHBhcnRcbiAgICAvLyB0aGlzLmRyYXdQb2x5Z29uKHRoaXMuc2FmZVNpY2ssIGNvbG9ycy5jaGFydC5zYWZlU2ljaywgaGVpZ2h0LCBzdGVwU2l6ZSk7XG5cbiAgICAvLyBkcmF3IFwic2FmZVwiIGxpbmVcbiAgICAvLyB0aGlzLmRyYXdMaW5lKGhlaWdodCAqIGNoYXJ0U2FmZUxpbWl0LCAwLCBjdXJyZW50U3RlcFNpemUpO1xuXG4gICAgdGhpcy5jdXJyZW50U3RlcCsrO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TGluZShoZWlnaHQ6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oZnJvbSwgaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKHRvLCBoZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9ycy5jaGFydC5zYWZlTGluZTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdSZWN0KGNvbG9yOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdQb2x5Z29uKGRhdGE6IG51bWJlcltdLCBjb2xvcjogc3RyaW5nLCBoZWlnaHQ6IG51bWJlciwgc3RlcFNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKDAsIGhlaWdodCk7XG5cbiAgICBsZXQgc3RlcCA9IC1zdGVwU2l6ZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgc3RlcCArPSBzdGVwU2l6ZTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RlcCwgZGF0YVtpXSAqIGhlaWdodCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGVwLCBoZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcigpOiB2b2lkIHtcbiAgICAvLyBjbGVhciBjYW52YXNcbiAgICB0aGlzLmNoYXJ0Q2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLmNoYXJ0Q2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gMDtcbiAgfVxuXG59XG4iLCI8ZGl2IGlkPVwiY2hhcnQtc3RhdHNcIj5cbiAgPHNwYW4gY2xhc3M9XCJib3JkZXItb24tcmlnaHRcIj5cbiAgICBIZWFsdGh5XG4gICAgPHNwYW4gaWQ9XCJoZWFsdGh5LW51bWJlclwiIGNsYXNzPVwibnVtYmVyXCI+e3toZWFsdGh5QWJzb2x1dGV9fTwvc3Bhbj5cbiAgPC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImJvcmRlci1vbi1yaWdodFwiPlxuICAgIFNpY2tcbiAgICA8c3BhbiBpZD1cInNpY2stbnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIj57e3NpY2tBYnNvbHV0ZX19PC9zcGFuPlxuICA8L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwiYm9yZGVyLW9uLXJpZ2h0XCI+XG4gICAgUmVjb3ZlcmVkXG4gICAgPHNwYW4gaWQ9XCJyZWNvdmVyZWQtbnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIj57e3JlY292ZXJlZEFic29sdXRlfX08L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPHNwYW4+XG4gICAgRGVhZFxuICAgIDxzcGFuIGlkPVwiZGVhZC1udW1iZXJcIiBjbGFzcz1cIm51bWJlclwiPnt7ZGVhZEFic29sdXRlfX08L3NwYW4+XG4gIDwvc3Bhbj5cbjwvZGl2PlxuXG48ZGl2ICNjb250YWluZXIgY2xhc3M9XCJjaGFydC1jb250YWluZXJcIj5cbiAgPGNhbnZhcyAjY2FudmFzRWxlbWVudD48L2NhbnZhcz5cbjwvZGl2PlxuIl19