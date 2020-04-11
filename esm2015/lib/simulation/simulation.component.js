import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { borderWidthHalf, colors, FULL_ANGLE, lightGrayColor, oneThirdWidth, PERSON_RADIUS, TOTAL_FRAMES, twoThirdsWidth, updateIntervallMs, WIDTH } from '../models/constants';
import { Health } from '../models/health.enum';
import { Person } from '../models/person';
import * as i0 from "@angular/core";
import * as i1 from "../chart/chart.component";
const _c0 = ["canvasElement"];
const _c1 = ["container"];
export class SimulationComponent {
    constructor() {
        this.rightBorder = {
            position: twoThirdsWidth,
            leftWall: twoThirdsWidth - borderWidthHalf,
            rightWall: twoThirdsWidth + borderWidthHalf,
            ballLeftPosition: twoThirdsWidth - borderWidthHalf - PERSON_RADIUS,
            ballRightPosition: twoThirdsWidth + borderWidthHalf + PERSON_RADIUS,
            closed: false,
            color: lightGrayColor
        };
        this.leftBorder = {
            position: oneThirdWidth,
            leftWall: oneThirdWidth - borderWidthHalf,
            rightWall: oneThirdWidth + borderWidthHalf,
            ballLeftPosition: oneThirdWidth - borderWidthHalf - PERSON_RADIUS,
            ballRightPosition: oneThirdWidth + borderWidthHalf + PERSON_RADIUS,
            closed: false,
            color: lightGrayColor
        };
        this.persons = [];
        this.currentFrame = 0;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        const ctx = this.canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
            this.drawOutline();
        }
    }
    toggleRightBorder() {
        this.rightBorder.closed = !this.rightBorder.closed;
        this.rightBorder.color = this.rightBorder.closed ? colors.border.closed : colors.border.opened;
    }
    toggleLeftBorder() {
        this.leftBorder.closed = !this.leftBorder.closed;
        this.leftBorder.color = this.leftBorder.closed ? colors.border.closed : colors.border.opened;
    }
    start() {
        clearInterval(this.updateInterval);
        this.chart.init(this.simulatorParams.population);
        // clean simulation states
        this.persons = [];
        this.currentFrame = 0;
        // create sick and healthy balls
        let ballIdx = 0;
        while (ballIdx < 1) {
            if (this.randomNumberGenerator) {
                this.persons.push(new Person(Health.SICK, this.randomNumberGenerator));
            }
            else {
                this.persons.push(new Person(Health.SICK));
            }
            ballIdx++;
        }
        while (ballIdx < this.simulatorParams.population) {
            if (this.randomNumberGenerator) {
                this.persons.push(new Person(Health.HEALTHY, this.randomNumberGenerator));
            }
            else {
                this.persons.push(new Person(Health.HEALTHY));
            }
            ballIdx++;
        }
        // shuffle balls
        this.shuffleBalls();
        const socialDistancingTotal = Math.floor(this.simulatorParams.population * this.simulatorParams.distancing);
        // make socialDistancing balls
        for (let i = 0; i < socialDistancingTotal; i++) {
            this.persons[i].socialDistancing = true;
        }
        // start chart
        // start chart
        this.chart.start();
        // set interval
        this.updateInterval = setInterval(() => this.update(this.simulatorParams.infectionRate, this.simulatorParams.deathRate), updateIntervallMs);
    }
    shuffleBalls() {
        // Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
        for (let i = 0; i < this.persons.length; i++) {
            const rand = Math.floor((this.randomNumberGenerator ? this.randomNumberGenerator() : Math.random()) * this.persons.length);
            const temp = this.persons[i];
            this.persons[i] = this.persons[rand];
            this.persons[rand] = temp;
        }
    }
    update(infectionRate, deathrate) {
        // This O(N^2) method could be faster using
        // Binary Space Partitioning (https://en.wikipedia.org/wiki/Binary_space_partitioning)
        // or Quadtrees (https://en.wikipedia.org/wiki/Quadtree)
        for (let i = 0; i < this.persons.length; i++) {
            for (let j = i + 1; j < this.persons.length; j++) {
                // check collision and update states, positions & velocities
                this.persons[i].ballsCollision(this.persons[j], infectionRate);
            }
        }
        const statsData = { [Health.SICK]: 0, [Health.HEALTHY]: 0, [Health.RECOVERED]: 0, [Health.DEAD]: 0 };
        this.persons.forEach(person => {
            // count stats
            statsData[person.health]++;
            // update ball positions & velocities
            person.move();
            person.checkHealth(deathrate);
            // check canvas boundaries collision
            person.canvasBoundariesCollision();
            // check borders collision
            person.bordersCollision(this.leftBorder, this.rightBorder);
        });
        // update chart
        this.chart.update(statsData);
        // draw everything
        this.draw();
        // stop simulation if needed
        this.currentFrame++;
        if (this.currentFrame === TOTAL_FRAMES) {
            clearInterval(this.updateInterval);
            window.addEventListener('resize', () => this.resizeEventHandler());
            this.simulationEnd();
        }
    }
    resizeEventHandler() {
        // this mechanism is to prevent/delay many drawings of the same things when resizing the browser
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.draw();
        }, updateIntervallMs);
    }
    draw() {
        const dimensions = this.drawOutline();
        // draw dead balls (they should be under all other balls in the canvas)
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].health === Health.DEAD) {
                this.drawBall(this.persons[i], dimensions.scaleWidthRatio);
            }
        }
        // draw other balls
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].health !== Health.DEAD) {
                this.drawBall(this.persons[i], dimensions.scaleWidthRatio);
            }
        }
        // draw chart
        this.chart.draw();
    }
    drawOutline() {
        const dimensions = {
            width: this.canvasContainer.nativeElement.offsetWidth,
            height: this.canvasContainer.nativeElement.offsetHeight,
            scaleWidthRatio: this.canvas.nativeElement.offsetWidth / WIDTH
        };
        // update dimensions and clear canvas
        // the canvas is cleared when a new value is attached to dimensions (no matter if a same value)
        this.canvas.nativeElement.width = dimensions.width;
        this.canvas.nativeElement.height = dimensions.height;
        dimensions.scaleWidthRatio = this.canvas.nativeElement.offsetWidth / WIDTH;
        // draw borders
        this.drawBorder(this.leftBorder, dimensions);
        this.drawBorder(this.rightBorder, dimensions);
        // draw canvas boundaries
        this.drawCanvasBoundaries(dimensions);
        return dimensions;
    }
    drawLine(color, position, dimensions) {
        const scaledPosition = position * dimensions.scaleWidthRatio;
        this.ctx.beginPath();
        this.ctx.moveTo(scaledPosition, 0);
        this.ctx.lineTo(scaledPosition, dimensions.height);
        this.ctx.closePath();
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    drawBorder(border, dimensions) {
        this.drawLine(border.color, border.leftWall, dimensions);
        this.drawLine(border.color, border.rightWall, dimensions);
    }
    drawCanvasBoundaries(dimensions) {
        this.ctx.strokeStyle = colors.canvasBoundary;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
    }
    drawBall(ball, scaleWidthRatio) {
        const scaledX = ball.position.x * scaleWidthRatio;
        const scaledY = ball.position.y * scaleWidthRatio;
        const scaledRadius = PERSON_RADIUS * scaleWidthRatio;
        this.ctx.beginPath();
        this.ctx.arc(scaledX, scaledY, scaledRadius, 0, FULL_ANGLE);
        this.ctx.closePath();
        this.ctx.fillStyle = colors.states[ball.health];
        this.ctx.fill();
    }
    simulationEnd() {
        // hide(borderBtnsContainer);
        // show(simulationEndBtnsContainer);
    }
}
SimulationComponent.ɵfac = function SimulationComponent_Factory(t) { return new (t || SimulationComponent)(); };
SimulationComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SimulationComponent, selectors: [["cosi-simulation"]], viewQuery: function SimulationComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(_c1, true);
        i0.ɵɵviewQuery(ChartComponent, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvasContainer = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chart = _t.first);
    } }, inputs: { simulatorParams: "simulatorParams", randomNumberGenerator: "randomNumberGenerator" }, decls: 11, vars: 0, consts: [[1, "button-container"], [1, "secondary-button", 3, "click"], ["id", "simulation-dimensions", 1, "simulation-container"], ["container", ""], ["canvasElement", ""]], template: function SimulationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵelementStart(1, "div", 0);
        i0.ɵɵelementStart(2, "button", 1);
        i0.ɵɵlistener("click", function SimulationComponent_Template_button_click_2_listener() { return ctx.toggleLeftBorder(); });
        i0.ɵɵtext(3, "Border Left");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "button", 1);
        i0.ɵɵlistener("click", function SimulationComponent_Template_button_click_4_listener() { return ctx.toggleRightBorder(); });
        i0.ɵɵtext(5, "Border Right");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 2, 3);
        i0.ɵɵelement(8, "canvas", null, 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(10, "cosi-chart");
        i0.ɵɵelementEnd();
    } }, directives: [i1.ChartComponent], styles: [".button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;margin-top:20px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}@media screen and (max-width:480px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:300px;height:200px}}@media screen and (min-width:481px) and (max-width:630px){#simulation-dimensions[_ngcontent-%COMP%]{margin:20px auto 0;width:400px;height:266px}}@media screen and (min-width:631px) and (max-width:1500px){#simulation-dimensions[_ngcontent-%COMP%]{margin:25px auto 0;width:600px;height:399px}}@media only screen and (min-width:1501px){#simulation-dimensions[_ngcontent-%COMP%]{margin:30px auto 0;width:750px;height:500px}}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SimulationComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-simulation',
                templateUrl: './simulation.component.html',
                styleUrls: ['./simulation.component.scss']
            }]
    }], null, { canvas: [{
            type: ViewChild,
            args: ['canvasElement']
        }], canvasContainer: [{
            type: ViewChild,
            args: ['container']
        }], chart: [{
            type: ViewChild,
            args: [ChartComponent]
        }], simulatorParams: [{
            type: Input
        }], randomNumberGenerator: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYW5kZW1pYy1zaW11bGF0b3ItbGliLyIsInNvdXJjZXMiOlsibGliL3NpbXVsYXRpb24vc2ltdWxhdGlvbi5jb21wb25lbnQudHMiLCJsaWIvc2ltdWxhdGlvbi9zaW11bGF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLEtBQUssRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFDTCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLGlCQUFpQixFQUNqQixLQUFLLEVBQ04sTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztBQVExQyxNQUFNLE9BQU8sbUJBQW1CO0lBTGhDO1FBY1UsZ0JBQVcsR0FBVztZQUM1QixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsY0FBYyxHQUFHLGVBQWU7WUFDMUMsU0FBUyxFQUFFLGNBQWMsR0FBRyxlQUFlO1lBQzNDLGdCQUFnQixFQUFFLGNBQWMsR0FBRyxlQUFlLEdBQUcsYUFBYTtZQUNsRSxpQkFBaUIsRUFBRSxjQUFjLEdBQUcsZUFBZSxHQUFHLGFBQWE7WUFDbkUsTUFBTSxFQUFFLEtBQUs7WUFDYixLQUFLLEVBQUUsY0FBYztTQUN0QixDQUFDO1FBQ00sZUFBVSxHQUFXO1lBQzNCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxhQUFhLEdBQUcsZUFBZTtZQUN6QyxTQUFTLEVBQUUsYUFBYSxHQUFHLGVB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QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7YUFDM0M7O2tCQUdFLFNBQVM7bUJBQUMsZUFBZTs7a0JBQ3pCLFNBQVM7bUJBQUMsV0FBVzs7a0JBQ3JCLFNBQVM7bUJBQUMsY0FBYzs7a0JBRXhCLEtBQUs7O2tCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jaGFydC9jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSAnLi4vbW9kZWxzL2JvcmRlcic7XG5pbXBvcnQge1xuICBib3JkZXJXaWR0aEhhbGYsXG4gIGNvbG9ycyxcbiAgRlVMTF9BTkdMRSxcbiAgbGlnaHRHcmF5Q29sb3IsXG4gIG9uZVRoaXJkV2lkdGgsXG4gIFBFUlNPTl9SQURJVVMsXG4gIFRPVEFMX0ZSQU1FUyxcbiAgdHdvVGhpcmRzV2lkdGgsXG4gIHVwZGF0ZUludGVydmFsbE1zLFxuICBXSURUSFxufSBmcm9tICcuLi9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IEhlYWx0aCB9IGZyb20gJy4uL21vZGVscy9oZWFsdGguZW51bSc7XG5pbXBvcnQgeyBQZXJzb24gfSBmcm9tICcuLi9tb2RlbHMvcGVyc29uJztcbmltcG9ydCB7IFNpbXVsYXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9zaW11bGF0b3ItcGFyYW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29zaS1zaW11bGF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpbXVsYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaW11bGF0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2ltdWxhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzRWxlbWVudCcpIGNhbnZhczogRWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNhbnZhc0NvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoQ2hhcnRDb21wb25lbnQpIGNoYXJ0OiBDaGFydENvbXBvbmVudDtcblxuICBASW5wdXQoKSBzaW11bGF0b3JQYXJhbXM6IFNpbXVsYXRvclBhcmFtcztcbiAgQElucHV0KCkgcmFuZG9tTnVtYmVyR2VuZXJhdG9yPzogKCkgPT4gbnVtYmVyO1xuXG4gIHByaXZhdGUgcmlnaHRCb3JkZXI6IEJvcmRlciA9IHtcbiAgICBwb3NpdGlvbjogdHdvVGhpcmRzV2lkdGgsXG4gICAgbGVmdFdhbGw6IHR3b1RoaXJkc1dpZHRoIC0gYm9yZGVyV2lkdGhIYWxmLFxuICAgIHJpZ2h0V2FsbDogdHdvVGhpcmRzV2lkdGggKyBib3JkZXJXaWR0aEhhbGYsXG4gICAgYmFsbExlZnRQb3NpdGlvbjogdHdvVGhpcmRzV2lkdGggLSBib3JkZXJXaWR0aEhhbGYgLSBQRVJTT05fUkFESVVTLFxuICAgIGJhbGxSaWdodFBvc2l0aW9uOiB0d29UaGlyZHNXaWR0aCArIGJvcmRlcldpZHRoSGFsZiArIFBFUlNPTl9SQURJVVMsXG4gICAgY2xvc2VkOiBmYWxzZSxcbiAgICBjb2xvcjogbGlnaHRHcmF5Q29sb3JcbiAgfTtcbiAgcHJpdmF0ZSBsZWZ0Qm9yZGVyOiBCb3JkZXIgPSB7XG4gICAgcG9zaXRpb246IG9uZVRoaXJkV2lkdGgsXG4gICAgbGVmdFdhbGw6IG9uZVRoaXJkV2lkdGggLSBib3JkZXJXaWR0aEhhbGYsXG4gICAgcmlnaHRXYWxsOiBvbmVUaGlyZFdpZHRoICsgYm9yZGVyV2lkdGhIYWxmLFxuICAgIGJhbGxMZWZ0UG9zaXRpb246IG9uZVRoaXJkV2lkdGggLSBib3JkZXJXaWR0aEhhbGYgLSBQRVJTT05fUkFESVVTLFxuICAgIGJhbGxSaWdodFBvc2l0aW9uOiBvbmVUaGlyZFdpZHRoICsgYm9yZGVyV2lkdGhIYWxmICsgUEVSU09OX1JBRElVUyxcbiAgICBjbG9zZWQ6IGZhbHNlLFxuICAgIGNvbG9yOiBsaWdodEdyYXlDb2xvclxuICB9O1xuXG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgcGVyc29uczogUGVyc29uW10gPSBbXTtcbiAgcHJpdmF0ZSBjdXJyZW50RnJhbWUgPSAwO1xuICBwcml2YXRlIHVwZGF0ZUludGVydmFsOiBudW1iZXI7XG4gIHByaXZhdGUgcmVzaXplVGltZW91dDogbnVtYmVyO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY3R4KSB7XG4gICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgIHRoaXMuZHJhd091dGxpbmUoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVSaWdodEJvcmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnJpZ2h0Qm9yZGVyLmNsb3NlZCA9ICF0aGlzLnJpZ2h0Qm9yZGVyLmNsb3NlZDtcbiAgICB0aGlzLnJpZ2h0Qm9yZGVyLmNvbG9yID0gdGhpcy5yaWdodEJvcmRlci5jbG9zZWQgPyBjb2xvcnMuYm9yZGVyLmNsb3NlZCA6IGNvbG9ycy5ib3JkZXIub3BlbmVkO1xuICB9XG5cbiAgdG9nZ2xlTGVmdEJvcmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmxlZnRCb3JkZXIuY2xvc2VkID0gIXRoaXMubGVmdEJvcmRlci5jbG9zZWQ7XG4gICAgdGhpcy5sZWZ0Qm9yZGVyLmNvbG9yID0gdGhpcy5sZWZ0Qm9yZGVyLmNsb3NlZCA/IGNvbG9ycy5ib3JkZXIuY2xvc2VkIDogY29sb3JzLmJvcmRlci5vcGVuZWQ7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlSW50ZXJ2YWwpO1xuXG4gICAgdGhpcy5jaGFydC5pbml0KHRoaXMuc2ltdWxhdG9yUGFyYW1zLnBvcHVsYXRpb24pO1xuXG4gICAgLy8gY2xlYW4gc2ltdWxhdGlvbiBzdGF0ZXNcbiAgICB0aGlzLnBlcnNvbnMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XG5cbiAgICAvLyBjcmVhdGUgc2ljayBhbmQgaGVhbHRoeSBiYWxsc1xuICAgIGxldCBiYWxsSWR4ID0gMDtcbiAgICB3aGlsZSAoYmFsbElkeCA8IDEpIHtcbiAgICAgIGlmICh0aGlzLnJhbmRvbU51bWJlckdlbmVyYXRvcikge1xuICAgICAgICB0aGlzLnBlcnNvbnMucHVzaChuZXcgUGVyc29uKEhlYWx0aC5TSUNLLCB0aGlzLnJhbmRvbU51bWJlckdlbmVyYXRvcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wZXJzb25zLnB1c2gobmV3IFBlcnNvbihIZWFsdGguU0lDSykpO1xuICAgICAgfVxuICAgICAgYmFsbElkeCsrO1xuICAgIH1cbiAgICB3aGlsZSAoYmFsbElkeCA8IHRoaXMuc2ltdWxhdG9yUGFyYW1zLnBvcHVsYXRpb24pIHtcbiAgICAgIGlmICh0aGlzLnJhbmRvbU51bWJlckdlbmVyYXRvcikge1xuICAgICAgICB0aGlzLnBlcnNvbnMucHVzaChuZXcgUGVyc29uKEhlYWx0aC5IRUFMVEhZLCB0aGlzLnJhbmRvbU51bWJlckdlbmVyYXRvcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wZXJzb25zLnB1c2gobmV3IFBlcnNvbihIZWFsdGguSEVBTFRIWSkpO1xuICAgICAgfVxuICAgICAgYmFsbElkeCsrO1xuICAgIH1cblxuICAgIC8vIHNodWZmbGUgYmFsbHNcbiAgICB0aGlzLnNodWZmbGVCYWxscygpO1xuXG4gICAgY29uc3Qgc29jaWFsRGlzdGFuY2luZ1RvdGFsID0gTWF0aC5mbG9vcih0aGlzLnNpbXVsYXRvclBhcmFtcy5wb3B1bGF0aW9uICogdGhpcy5zaW11bGF0b3JQYXJhbXMuZGlzdGFuY2luZyk7XG4gICAgLy8gbWFrZSBzb2NpYWxEaXN0YW5jaW5nIGJhbGxzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb2NpYWxEaXN0YW5jaW5nVG90YWw7IGkrKykge1xuICAgICAgdGhpcy5wZXJzb25zW2ldLnNvY2lhbERpc3RhbmNpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IGNoYXJ0XG4gICAgLy8gc3RhcnQgY2hhcnRcbiAgICB0aGlzLmNoYXJ0LnN0YXJ0KCk7XG5cbiAgICAvLyBzZXQgaW50ZXJ2YWxcbiAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoXG4gICAgICAoKSA9PiB0aGlzLnVwZGF0ZSh0aGlzLnNpbXVsYXRvclBhcmFtcy5pbmZlY3Rpb25SYXRlLCB0aGlzLnNpbXVsYXRvclBhcmFtcy5kZWF0aFJhdGUpLFxuICAgICAgdXBkYXRlSW50ZXJ2YWxsTXNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzaHVmZmxlQmFsbHMoKTogdm9pZCB7XG4gICAgLy8gRmlzaGVy4oCTWWF0ZXMgc2h1ZmZsZSAoaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVyJUUyJTgwJTkzWWF0ZXNfc2h1ZmZsZSlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGVyc29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoKHRoaXMucmFuZG9tTnVtYmVyR2VuZXJhdG9yID8gdGhpcy5yYW5kb21OdW1iZXJHZW5lcmF0b3IoKSA6IE1hdGgucmFuZG9tKCkpICogdGhpcy5wZXJzb25zLmxlbmd0aCk7XG4gICAgICBjb25zdCB0ZW1wID0gdGhpcy5wZXJzb25zW2ldO1xuICAgICAgdGhpcy5wZXJzb25zW2ldID0gdGhpcy5wZXJzb25zW3JhbmRdO1xuICAgICAgdGhpcy5wZXJzb25zW3JhbmRdID0gdGVtcDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZShpbmZlY3Rpb25SYXRlOiBudW1iZXIsIGRlYXRocmF0ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gVGhpcyBPKE5eMikgbWV0aG9kIGNvdWxkIGJlIGZhc3RlciB1c2luZ1xuICAgIC8vIEJpbmFyeSBTcGFjZSBQYXJ0aXRpb25pbmcgKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JpbmFyeV9zcGFjZV9wYXJ0aXRpb25pbmcpXG4gICAgLy8gb3IgUXVhZHRyZWVzIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9RdWFkdHJlZSlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGVyc29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgdGhpcy5wZXJzb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIC8vIGNoZWNrIGNvbGxpc2lvbiBhbmQgdXBkYXRlIHN0YXRlcywgcG9zaXRpb25zICYgdmVsb2NpdGllc1xuICAgICAgICB0aGlzLnBlcnNvbnNbaV0uYmFsbHNDb2xsaXNpb24odGhpcy5wZXJzb25zW2pdLCBpbmZlY3Rpb25SYXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdGF0c0RhdGEgPSB7W0hlYWx0aC5TSUNLXTogMCwgW0hlYWx0aC5IRUFMVEhZXTogMCwgW0hlYWx0aC5SRUNPVkVSRURdOiAwLCBbSGVhbHRoLkRFQURdOiAwfTtcbiAgICB0aGlzLnBlcnNvbnMuZm9yRWFjaChwZXJzb24gPT4ge1xuICAgICAgLy8gY291bnQgc3RhdHNcbiAgICAgIHN0YXRzRGF0YVtwZXJzb24uaGVhbHRoXSsrO1xuXG4gICAgICAvLyB1cGRhdGUgYmFsbCBwb3NpdGlvbnMgJiB2ZWxvY2l0aWVzXG4gICAgICBwZXJzb24ubW92ZSgpO1xuICAgICAgcGVyc29uLmNoZWNrSGVhbHRoKGRlYXRocmF0ZSk7XG5cbiAgICAgIC8vIGNoZWNrIGNhbnZhcyBib3VuZGFyaWVzIGNvbGxpc2lvblxuICAgICAgcGVyc29uLmNhbnZhc0JvdW5kYXJpZXNDb2xsaXNpb24oKTtcblxuICAgICAgLy8gY2hlY2sgYm9yZGVycyBjb2xsaXNpb25cbiAgICAgIHBlcnNvbi5ib3JkZXJzQ29sbGlzaW9uKHRoaXMubGVmdEJvcmRlciwgdGhpcy5yaWdodEJvcmRlcik7XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgY2hhcnRcbiAgICB0aGlzLmNoYXJ0LnVwZGF0ZShzdGF0c0RhdGEpO1xuXG4gICAgLy8gZHJhdyBldmVyeXRoaW5nXG4gICAgdGhpcy5kcmF3KCk7XG5cbiAgICAvLyBzdG9wIHNpbXVsYXRpb24gaWYgbmVlZGVkXG4gICAgdGhpcy5jdXJyZW50RnJhbWUrKztcbiAgICBpZiAodGhpcy5jdXJyZW50RnJhbWUgPT09IFRPVEFMX0ZSQU1FUykge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB0aGlzLnJlc2l6ZUV2ZW50SGFuZGxlcigpKTtcbiAgICAgIHRoaXMuc2ltdWxhdGlvbkVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplRXZlbnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIC8vIHRoaXMgbWVjaGFuaXNtIGlzIHRvIHByZXZlbnQvZGVsYXkgbWFueSBkcmF3aW5ncyBvZiB0aGUgc2FtZSB0aGluZ3Mgd2hlbiByZXNpemluZyB0aGUgYnJvd3NlclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpO1xuICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfSwgdXBkYXRlSW50ZXJ2YWxsTXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3KCk6IHZvaWQge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmRyYXdPdXRsaW5lKCk7XG5cbiAgICAvLyBkcmF3IGRlYWQgYmFsbHMgKHRoZXkgc2hvdWxkIGJlIHVuZGVyIGFsbCBvdGhlciBiYWxscyBpbiB0aGUgY2FudmFzKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wZXJzb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wZXJzb25zW2ldLmhlYWx0aCA9PT0gSGVhbHRoLkRFQUQpIHtcbiAgICAgICAgdGhpcy5kcmF3QmFsbCh0aGlzLnBlcnNvbnNbaV0sIGRpbWVuc2lvbnMuc2NhbGVXaWR0aFJhdGlvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZHJhdyBvdGhlciBiYWxsc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wZXJzb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wZXJzb25zW2ldLmhlYWx0aCAhPT0gSGVhbHRoLkRFQUQpIHtcbiAgICAgICAgdGhpcy5kcmF3QmFsbCh0aGlzLnBlcnNvbnNbaV0sIGRpbWVuc2lvbnMuc2NhbGVXaWR0aFJhdGlvKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkcmF3IGNoYXJ0XG4gICAgdGhpcy5jaGFydC5kcmF3KCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdPdXRsaW5lKCk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNjYWxlV2lkdGhSYXRpbzogbnVtYmVyIH0ge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB7XG4gICAgICB3aWR0aDogdGhpcy5jYW52YXNDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5jYW52YXNDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICBzY2FsZVdpZHRoUmF0aW86IHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyBXSURUSFxuICAgIH07XG5cbiAgICAvLyB1cGRhdGUgZGltZW5zaW9ucyBhbmQgY2xlYXIgY2FudmFzXG4gICAgLy8gdGhlIGNhbnZhcyBpcyBjbGVhcmVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYXR0YWNoZWQgdG8gZGltZW5zaW9ucyAobm8gbWF0dGVyIGlmIGEgc2FtZSB2YWx1ZSlcbiAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIGRpbWVuc2lvbnMuc2NhbGVXaWR0aFJhdGlvID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAvIFdJRFRIO1xuXG4gICAgLy8gZHJhdyBib3JkZXJzXG4gICAgdGhpcy5kcmF3Qm9yZGVyKHRoaXMubGVmdEJvcmRlciwgZGltZW5zaW9ucyk7XG4gICAgdGhpcy5kcmF3Qm9yZGVyKHRoaXMucmlnaHRCb3JkZXIsIGRpbWVuc2lvbnMpO1xuXG4gICAgLy8gZHJhdyBjYW52YXMgYm91bmRhcmllc1xuICAgIHRoaXMuZHJhd0NhbnZhc0JvdW5kYXJpZXMoZGltZW5zaW9ucyk7XG4gICAgcmV0dXJuIGRpbWVuc2lvbnM7XG4gIH1cblxuICBwcml2YXRlIGRyYXdMaW5lKGNvbG9yOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIsIGRpbWVuc2lvbnM6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNjYWxlV2lkdGhSYXRpbzogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICBjb25zdCBzY2FsZWRQb3NpdGlvbiA9IHBvc2l0aW9uICogZGltZW5zaW9ucy5zY2FsZVdpZHRoUmF0aW87XG5cbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5tb3ZlVG8oc2NhbGVkUG9zaXRpb24sIDApO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhzY2FsZWRQb3NpdGlvbiwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0JvcmRlcihib3JkZXI6IEJvcmRlciwgZGltZW5zaW9uczogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2NhbGVXaWR0aFJhdGlvOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIHRoaXMuZHJhd0xpbmUoYm9yZGVyLmNvbG9yLCBib3JkZXIubGVmdFdhbGwsIGRpbWVuc2lvbnMpO1xuICAgIHRoaXMuZHJhd0xpbmUoYm9yZGVyLmNvbG9yLCBib3JkZXIucmlnaHRXYWxsLCBkaW1lbnNpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0NhbnZhc0JvdW5kYXJpZXMoZGltZW5zaW9uczogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2NhbGVXaWR0aFJhdGlvOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzLmNhbnZhc0JvdW5kYXJ5O1xuICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QoMCwgMCwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3QmFsbChiYWxsOiBQZXJzb24sIHNjYWxlV2lkdGhSYXRpbzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgc2NhbGVkWCA9IGJhbGwucG9zaXRpb24ueCAqIHNjYWxlV2lkdGhSYXRpbztcbiAgICBjb25zdCBzY2FsZWRZID0gYmFsbC5wb3NpdGlvbi55ICogc2NhbGVXaWR0aFJhdGlvO1xuICAgIGNvbnN0IHNjYWxlZFJhZGl1cyA9IFBFUlNPTl9SQURJVVMgKiBzY2FsZVdpZHRoUmF0aW87XG5cbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5hcmMoc2NhbGVkWCwgc2NhbGVkWSwgc2NhbGVkUmFkaXVzLCAwLCBGVUxMX0FOR0xFKTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9ycy5zdGF0ZXNbYmFsbC5oZWFsdGhdO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2ltdWxhdGlvbkVuZCgpOiB2b2lkIHtcbiAgICAvLyBoaWRlKGJvcmRlckJ0bnNDb250YWluZXIpO1xuICAgIC8vIHNob3coc2ltdWxhdGlvbkVuZEJ0bnNDb250YWluZXIpO1xuICB9XG59XG4iLCI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgIDxidXR0b24gY2xhc3M9XCJzZWNvbmRhcnktYnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZUxlZnRCb3JkZXIoKVwiPkJvcmRlciBMZWZ0PC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInNlY29uZGFyeS1idXR0b25cIiAoY2xpY2spPVwidG9nZ2xlUmlnaHRCb3JkZXIoKVwiPkJvcmRlciBSaWdodDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiAjY29udGFpbmVyIGlkPVwic2ltdWxhdGlvbi1kaW1lbnNpb25zXCIgY2xhc3M9XCJzaW11bGF0aW9uLWNvbnRhaW5lclwiPlxuICAgIDxjYW52YXMgI2NhbnZhc0VsZW1lbnQ+PC9jYW52YXM+XG4gIDwvZGl2PlxuICA8Y29zaS1jaGFydD48L2Nvc2ktY2hhcnQ+XG48L2Rpdj5cbiJdfQ==