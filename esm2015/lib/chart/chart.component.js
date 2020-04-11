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
    } }, styles: [".chart-container[_ngcontent-%COMP%]{width:450px;height:45px;margin:20px auto}@media screen and (max-width:480px){.chart-container[_ngcontent-%COMP%]{width:250px;height:25px}}@media screen and (max-width:1000px){#chart-stats[_ngcontent-%COMP%]{text-align:center}}.number[_ngcontent-%COMP%], .parameters-text[_ngcontent-%COMP%], .parameters-title[_ngcontent-%COMP%]{font-weight:700}.border-on-right[_ngcontent-%COMP%]{border-right:2px solid gray}#healthy-number[_ngcontent-%COMP%]{color:#aed581}#sick-number[_ngcontent-%COMP%]{color:#e53935}#recovered-number[_ngcontent-%COMP%]{color:#ff9800}#dead-number[_ngcontent-%COMP%]{color:#000}"] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGFuZGVtaWMtc2ltdWxhdG9yLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jaGFydC9jaGFydC5jb21wb25lbnQudHMiLCJsaWIvY2hhcnQvY2hhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQyxTQUFTLEVBQWMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBa0IsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQU8vQyxNQUFNLE9BQU8sY0FBYztJQWtCekIsWUFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7SUFDNUMsQ0FBQztJQUVELGVBQWU7UUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNoQixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUs7UUFDSCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBK0I7UUFDcEMsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcs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QUwxQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQ3RDOztrQkFHRSxTQUFTO21CQUFDLGVBQWU7O2tCQUN6QixTQUFTO21CQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNoYXJ0U2FmZUxpbWl0LCBjb2xvcnMsIFRPVEFMX0ZSQU1FUyB9IGZyb20gJy4uL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgSGVhbHRoIH0gZnJvbSAnLi4vbW9kZWxzL2hlYWx0aC5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29zaS1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGFydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoYXJ0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBAVmlld0NoaWxkKCdjYW52YXNFbGVtZW50JykgY2hhcnRDYW52YXM6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBkZWFkQWJzb2x1dGU6IG51bWJlcjtcbiAgcmVjb3ZlcmVkQWJzb2x1dGU6IG51bWJlcjtcbiAgc2lja0Fic29sdXRlOiBudW1iZXI7XG4gIGhlYWx0aHlBYnNvbHV0ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgY3VycmVudFN0ZXA6IG51bWJlcjtcbiAgcHJpdmF0ZSBkYW5nZXJTaWNrOiBudW1iZXJbXTtcbiAgLy8gcHJpdmF0ZSBzYWZlU2ljazogbnVtYmVyW107XG4gIHByaXZhdGUgaGVhbHRoeTogbnVtYmVyW107XG4gIHByaXZhdGUgcmVjb3ZlcmVkOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgbWF4VmFsdWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2hhcnRDYW52YXMubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChjdHgpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IGN0eDtcbiAgICB9XG4gIH1cblxuICBpbml0KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBpbml0IHBhcmFtZXRlcnNcbiAgICB0aGlzLm1heFZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICAvLyBjbGVhbiBjaGFydCBzdGF0ZXNcbiAgICB0aGlzLmRhbmdlclNpY2sgPSBbXTtcbiAgICAvLyB0aGlzLnNhZmVTaWNrID0gW107XG4gICAgdGhpcy5oZWFsdGh5ID0gW107XG4gICAgdGhpcy5yZWNvdmVyZWQgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcbiAgfVxuXG4gIHVwZGF0ZShkYXRhOiB7IFtLIGluIEhlYWx0aF06IG51bWJlciB9KTogdm9pZCB7XG4gICAgLy8gc2F2ZSB0aGUgdmFsdWVzIGFzIHBlcmNlbnRhZ2VzXG4gICAgdGhpcy5kZWFkQWJzb2x1dGUgPSBkYXRhW0hlYWx0aC5ERUFEXTtcbiAgICB0aGlzLnJlY292ZXJlZEFic29sdXRlID0gZGF0YVtIZWFsdGguUkVDT1ZFUkVEXTtcbiAgICB0aGlzLnNpY2tBYnNvbHV0ZSA9IGRhdGFbSGVhbHRoLlNJQ0tdO1xuICAgIHRoaXMuaGVhbHRoeUFic29sdXRlID0gZGF0YVtIZWFsdGguSEVBTFRIWV07XG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBsZXQgc2lja1ZhbHVlID0gdGhpcy5tYXhWYWx1ZSAtIGRhdGFbSGVhbHRoLlNJQ0tdO1xuICAgIGxldCBoZWFsdGh5VmFsdWUgPSBzaWNrVmFsdWUgLSBkYXRhW0hlYWx0aC5IRUFMVEhZXTtcbiAgICBsZXQgcmVjb3ZlcmVkVmFsdWUgPSBoZWFsdGh5VmFsdWUgLSBkYXRhW0hlYWx0aC5SRUNPVkVSRURdO1xuICAgIHNpY2tWYWx1ZSAvPSB0aGlzLm1heFZhbHVlO1xuICAgIGhlYWx0aHlWYWx1ZSAvPSB0aGlzLm1heFZhbHVlO1xuICAgIHJlY292ZXJlZFZhbHVlIC89IHRoaXMubWF4VmFsdWU7XG5cbiAgICB0aGlzLmRhbmdlclNpY2sucHVzaChzaWNrVmFsdWUpO1xuICAgIC8vIHRoaXMuc2FmZVNpY2sucHVzaChNYXRoLm1heChzaWNrVmFsdWUsIGNoYXJ0U2FmZUxpbWl0KSk7XG4gICAgdGhpcy5oZWFsdGh5LnB1c2goaGVhbHRoeVZhbHVlKTtcbiAgICB0aGlzLnJlY292ZXJlZC5wdXNoKHJlY292ZXJlZFZhbHVlKTtcbiAgfVxuXG4gIGRyYXcoKTogdm9pZCB7XG4gICAgLy8gVGhlIGNoYXJ0IGNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGNhbiBiZSBmb3VuZCB1c2luZyBvZmZzZXRXaWR0aCBhbmQgb2Zmc2V0SGVpZ2h0XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3Qgc3RlcFNpemUgPSB3aWR0aCAvIChUT1RBTF9GUkFNRVMgLSAxKTsgLy8gbWludXMgdGhlIGZpcnN0IGZyYW1lL3Jlc3VsdCwgYmVjYXVzZSB0aGF0J3MgdGhlIHN0YXJ0IG9mIHRoZSBjaGFydFxuICAgIGNvbnN0IGN1cnJlbnRTdGVwU2l6ZSA9IHRoaXMuY3VycmVudFN0ZXAgKiBzdGVwU2l6ZTtcblxuICAgIC8vIHVwZGF0ZSBkaW1lbnNpb25zIGFuZCBjbGVhciBjYW52YXNcbiAgICAvLyB0aGUgY2FudmFzIGlzIGNsZWFyZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhdHRhY2hlZCB0byBkaW1lbnNpb25zIChubyBtYXR0ZXIgaWYgYSBzYW1lIHZhbHVlKVxuICAgIHRoaXMuY2hhcnRDYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuY2hhcnRDYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAvLyBkcmF3IGVtcHR5IHJlY3QgKHRoZSB1cGNvbWluZyB0aW1lKVxuICAgIHRoaXMuZHJhd1JlY3QoY29sb3JzLmNoYXJ0LmVtcHR5LCBjdXJyZW50U3RlcFNpemUsIDAsIHdpZHRoIC0gY3VycmVudFN0ZXBTaXplLCBoZWlnaHQpO1xuXG4gICAgLy8gZHJhdyBkZWFkIHBhcnQgKGEgd2hvbGUgcmVjdGFuZ2xlLCB0aGUgZWxhcHNlZCB0aW1lKVxuICAgIHRoaXMuZHJhd1JlY3QoY29sb3JzLmNoYXJ0LmRlYWQsIDAsIDAsIGN1cnJlbnRTdGVwU2l6ZSwgaGVpZ2h0KTtcblxuICAgIC8vIGRyYXcgcmVjb3ZlcmVkIHBhcnRcbiAgICB0aGlzLmRyYXdQb2x5Z29uKHRoaXMucmVjb3ZlcmVkLCBjb2xvcnMuY2hhcnQucmVjb3ZlcmVkLCBoZWlnaHQsIHN0ZXBTaXplKTtcblxuICAgIC8vIGRyYXcgaGVhbHRoeSBwYXJ0XG4gICAgdGhpcy5kcmF3UG9seWdvbih0aGlzLmhlYWx0aHksIGNvbG9ycy5jaGFydC5oZWFsdGh5LCBoZWlnaHQsIHN0ZXBTaXplKTtcblxuICAgIC8vIGRyYXcgZGFuZ2VyIHNpY2sgcGFydFxuICAgIHRoaXMuZHJhd1BvbHlnb24odGhpcy5kYW5nZXJTaWNrLCBjb2xvcnMuY2hhcnQuZGFuZ2VyU2ljaywgaGVpZ2h0LCBzdGVwU2l6ZSk7XG5cbiAgICAvLyBkcmF3IFwic2FmZVwiIHNpY2sgcGFydFxuICAgIC8vIHRoaXMuZHJhd1BvbHlnb24odGhpcy5zYWZlU2ljaywgY29sb3JzLmNoYXJ0LnNhZmVTaWNrLCBoZWlnaHQsIHN0ZXBTaXplKTtcblxuICAgIC8vIGRyYXcgXCJzYWZlXCIgbGluZVxuICAgIC8vIHRoaXMuZHJhd0xpbmUoaGVpZ2h0ICogY2hhcnRTYWZlTGltaXQsIDAsIGN1cnJlbnRTdGVwU2l6ZSk7XG5cbiAgICB0aGlzLmN1cnJlbnRTdGVwKys7XG4gIH1cblxuICBwcml2YXRlIGRyYXdMaW5lKGhlaWdodDogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhmcm9tLCBoZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8odG8sIGhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3JzLmNoYXJ0LnNhZmVMaW5lO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd1JlY3QoY29sb3I6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd1BvbHlnb24oZGF0YTogbnVtYmVyW10sIGNvbG9yOiBzdHJpbmcsIGhlaWdodDogbnVtYmVyLCBzdGVwU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oMCwgaGVpZ2h0KTtcblxuICAgIGxldCBzdGVwID0gLXN0ZXBTaXplO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdGVwICs9IHN0ZXBTaXplO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGVwLCBkYXRhW2ldICogaGVpZ2h0KTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQubGluZVRvKHN0ZXAsIGhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyKCk6IHZvaWQge1xuICAgIC8vIGNsZWFyIGNhbnZhc1xuICAgIHRoaXMuY2hhcnRDYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IHRoaXMuY2hhcnRDYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSAwO1xuICB9XG5cbn1cbiIsIjxkaXYgaWQ9XCJjaGFydC1zdGF0c1wiPlxuICA8c3BhbiBjbGFzcz1cImJvcmRlci1vbi1yaWdodFwiPlxuICAgIEhlYWx0aHlcbiAgICA8c3BhbiBpZD1cImhlYWx0aHktbnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIj57e2hlYWx0aHlBYnNvbHV0ZX19PC9zcGFuPlxuICA8L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwiYm9yZGVyLW9uLXJpZ2h0XCI+XG4gICAgU2lja1xuICAgIDxzcGFuIGlkPVwic2ljay1udW1iZXJcIiBjbGFzcz1cIm51bWJlclwiPnt7c2lja0Fic29sdXRlfX08L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJib3JkZXItb24tcmlnaHRcIj5cbiAgICBSZWNvdmVyZWRcbiAgICA8c3BhbiBpZD1cInJlY292ZXJlZC1udW1iZXJcIiBjbGFzcz1cIm51bWJlclwiPnt7cmVjb3ZlcmVkQWJzb2x1dGV9fTwvc3Bhbj5cbiAgPC9zcGFuPlxuICA8c3Bhbj5cbiAgICBEZWFkXG4gICAgPHNwYW4gaWQ9XCJkZWFkLW51bWJlclwiIGNsYXNzPVwibnVtYmVyXCI+e3tkZWFkQWJzb2x1dGV9fTwvc3Bhbj5cbiAgPC9zcGFuPlxuPC9kaXY+XG5cbjxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImNoYXJ0LWNvbnRhaW5lclwiPlxuICA8Y2FudmFzICNjYW52YXNFbGVtZW50PjwvY2FudmFzPlxuPC9kaXY+XG4iXX0=