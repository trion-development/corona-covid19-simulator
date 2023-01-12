import { Component, ViewChildren } from '@angular/core';
import seedrandom from 'seedrandom';
import { DEATH_RATE, INFECTION_RATE } from './models/constants';
import { SimulationComponent } from './simulation/simulation.component';
import * as i0 from "@angular/core";
import * as i1 from "./params/params.component";
import * as i2 from "./simulation/simulation.component";
import * as i3 from "@angular/common";
function SimulatorComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1);
    i0.ɵɵelementStart(2, "cosi-params", 2);
    i0.ɵɵlistener("paramsChanged", function SimulatorComponent_ng_container_13_Template_cosi_params_paramsChanged_2_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.changeSecondParams($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 3);
    i0.ɵɵelementStart(4, "button", 4);
    i0.ɵɵlistener("click", function SimulatorComponent_ng_container_13_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r5 = i0.ɵɵnextContext(); const _r0 = i0.ɵɵreference(9); return ctx_r5.start(_r0); });
    i0.ɵɵtext(5, "(Re)Start simulation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div");
    i0.ɵɵelement(7, "cosi-simulation", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("initialParams", ctx_r2.secondParams);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("simulatorParams", ctx_r2.secondParams)("randomNumberGenerator", ctx_r2.rng2);
} }
export class SimulatorComponent {
    constructor(appRef) {
        this.appRef = appRef;
        this.randomSeed = Math.random();
        this.rng1 = seedrandom(this.randomSeed);
        this.rng2 = seedrandom(this.randomSeed);
        this.initialState = {
            population: 200,
            distancing: 0,
            deathRate: DEATH_RATE,
            infectionRate: INFECTION_RATE
        };
        this.mainParams = this.initialState;
        this.secondParams = this.initialState;
    }
    start(simulator1) {
        this.randomSeed = Math.random();
        this.rng1 = seedrandom(this.randomSeed);
        this.rng2 = seedrandom(this.randomSeed);
        this.charts.forEach(chart => chart.start());
        simulator1.scrollIntoView();
        this.appRef.tick();
    }
    show2nd(simulator2) {
        this.is2ndVisible = !this.is2ndVisible;
        if (this.is2ndVisible) {
            simulator2.scrollIntoView({ block: 'center' });
        }
        this.appRef.tick();
    }
    changeMainParams($event) {
        this.mainParams = $event;
        this.appRef.tick();
    }
    changeSecondParams($event) {
        this.secondParams = $event;
        this.appRef.tick();
    }
}
SimulatorComponent.ɵfac = function SimulatorComponent_Factory(t) { return new (t || SimulatorComponent)(i0.ɵɵdirectiveInject(i0.ApplicationRef)); };
SimulatorComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SimulatorComponent, selectors: [["cosi-simulator"]], viewQuery: function SimulatorComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(SimulationComponent, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.charts = _t);
    } }, decls: 14, vars: 4, consts: [[1, "flex"], [1, "param-container"], [3, "initialParams", "paramsChanged"], [1, "flex", "column"], [1, "start-button", 3, "click"], [1, "secondary-button", 3, "click"], ["tabindex", "1"], ["simulator1", ""], [3, "simulatorParams", "randomNumberGenerator"], ["tabindex", "1", 1, "flex"], ["simulator2", ""], [4, "ngIf"]], template: function SimulatorComponent_Template(rf, ctx) { if (rf & 1) {
        const _r6 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "cosi-params", 2);
        i0.ɵɵlistener("paramsChanged", function SimulatorComponent_Template_cosi_params_paramsChanged_2_listener($event) { return ctx.changeMainParams($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "button", 4);
        i0.ɵɵlistener("click", function SimulatorComponent_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const _r0 = i0.ɵɵreference(9); return ctx.start(_r0); });
        i0.ɵɵtext(5, "(Re)Start simulation");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "button", 5);
        i0.ɵɵlistener("click", function SimulatorComponent_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r6); const _r1 = i0.ɵɵreference(12); return ctx.show2nd(_r1); });
        i0.ɵɵtext(7, "Toggle second simulation");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 6, 7);
        i0.ɵɵelement(10, "cosi-simulation", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 9, 10);
        i0.ɵɵtemplate(13, SimulatorComponent_ng_container_13_Template, 8, 3, "ng-container", 11);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("initialParams", ctx.mainParams);
        i0.ɵɵadvance(8);
        i0.ɵɵproperty("simulatorParams", ctx.mainParams)("randomNumberGenerator", ctx.rng1);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.is2ndVisible);
    } }, directives: [i1.ParamsComponent, i2.SimulationComponent, i3.NgIf], styles: ["[_nghost-%COMP%]{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box;color:#333;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:14px}.flex[_ngcontent-%COMP%]{display:flex}.flex.column[_ngcontent-%COMP%]{flex-direction:column}.flex.column[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:15px}@media screen and (max-width:1000px){.flex[_ngcontent-%COMP%]{flex-direction:column}.flex[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:30px}}.param-container[_ngcontent-%COMP%]{margin:79px 20px 20px}@media screen and (max-width:1000px){.param-container[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:space-around;margin:20px}}.start-button[_ngcontent-%COMP%]{background-color:#eef7ff;border:1px solid #1976d2;color:#093692;padding:5px}.secondary-button[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #616161;color:#212121;padding:5px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SimulatorComponent, [{
        type: Component,
        args: [{
                selector: 'cosi-simulator',
                templateUrl: './simulator.component.html',
                styleUrls: ['./simulator.component.scss']
            }]
    }], function () { return [{ type: i0.ApplicationRef }]; }, { charts: [{
            type: ViewChildren,
            args: [SimulationComponent]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvZ2l0aHViL3dvcmtzcGFjZS9wcm9qZWN0cy9wYW5kZW1pYy1zaW11bGF0b3ItbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zaW11bGF0b3IuY29tcG9uZW50LnRzIiwibGliL3NpbXVsYXRvci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7SUNVdEUsNkJBQ0U7SUFBQSw4QkFDRTtJQUFBLHNDQUF1RztJQUEzRCx5T0FBNEM7SUFBQyxpQkFBYztJQUN2Ryw4QkFDRTtJQUFBLGlDQUF5RDtJQUE1Qiw2TkFBMkI7SUFBQyxvQ0FBb0I7SUFBQSxpQkFBUztJQUN4RixpQkFBTTtJQUNSLGlCQUFNO0lBQ04sMkJBQ0U7SUFBQSxxQ0FFa0I7SUFDcEIsaUJBQU07SUFDUiwwQkFBZTs7O0lBVkUsZUFBOEI7SUFBOUIsbURBQThCO0lBTTFCLGVBQWdDO0lBQWhDLHFEQUFnQyxzQ0FBQTs7QURYdkQsTUFBTSxPQUFPLGtCQUFrQjtJQWlCN0IsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFiMUMsZUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxTQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsQixpQkFBWSxHQUFHO1lBQzlCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsVUFBVSxFQUFFLENBQUM7WUFDYixTQUFTLEVBQUUsVUFBVTtZQUNyQixhQUFhLEVBQUUsY0FBYztTQUM5QixDQUFDO1FBQ0YsZUFBVSxHQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2hELGlCQUFZLEdBQW9CLElBQUksQ0FBQyxZQUFZLENBQUM7SUFHbEQsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUEwQjtRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDNUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUEwQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBdUI7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBdUI7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOztvRkE3Q1Usa0JBQWtCO3VEQUFsQixrQkFBa0I7dUJBRWYsbUJBQW1COzs7Ozs7UUNkbkMsOEJBQ0U7UUFBQSw4QkFDRTtRQUFBLHNDQUFtRztRQUF6RCwwSEFBaUIsNEJBQXdCLElBQUM7UUFBQyxpQkFBYztRQUNuRyw4QkFDRTtRQUFBLGlDQUF5RDtRQUE1QixxSkFBUyxjQUFpQixJQUFDO1FBQUMsb0NBQW9CO1FBQUEsaUJBQVM7UUFDdEYsaUNBQStEO1FBQTlCLHNKQUFTLGdCQUFtQixJQUFDO1FBQUMsd0NBQXdCO1FBQUEsaUJBQVM7UUFDbEcsaUJBQU07UUFDUixpQkFBTTtRQUNOLGlDQUNFO1FBQUEsc0NBRWtCO1FBQ3BCLGlCQUFNO1FBQ1IsaUJBQU07UUFDTixtQ0FDRTtRQUFBLHdGQUNFO1FBWUosaUJBQU07O1FBMUJXLGVBQTRCO1FBQTVCLDhDQUE0QjtRQU94QixlQUE4QjtRQUE5QixnREFBOEIsbUNBQUE7UUFNbkMsZUFBb0I7UUFBcEIsdUNBQW9COztrRERIdkIsa0JBQWtCO2NBTDlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixXQUFXLEVBQUUsNEJBQTRCO2dCQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzthQUMxQztpRUFHb0MsTUFBTTtrQkFBeEMsWUFBWTttQkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHNlZWRyYW5kb20gZnJvbSAnc2VlZHJhbmRvbSc7XG5pbXBvcnQgeyBERUFUSF9SQVRFLCBJTkZFQ1RJT05fUkFURSB9IGZyb20gJy4vbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBTaW11bGF0b3JQYXJhbXMgfSBmcm9tICcuL21vZGVscy9zaW11bGF0b3ItcGFyYW1zJztcbmltcG9ydCB7IFNpbXVsYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3NpbXVsYXRpb24vc2ltdWxhdGlvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb3NpLXNpbXVsYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaW11bGF0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaW11bGF0b3IuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaW11bGF0b3JDb21wb25lbnQge1xuXG4gIEBWaWV3Q2hpbGRyZW4oU2ltdWxhdGlvbkNvbXBvbmVudCkgY2hhcnRzOiBTaW11bGF0aW9uQ29tcG9uZW50W107XG5cbiAgcmFuZG9tU2VlZCA9IE1hdGgucmFuZG9tKCk7XG4gIHJuZzEgPSBzZWVkcmFuZG9tKHRoaXMucmFuZG9tU2VlZCk7XG4gIHJuZzIgPSBzZWVkcmFuZG9tKHRoaXMucmFuZG9tU2VlZCk7XG4gIGlzMm5kVmlzaWJsZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsU3RhdGUgPSB7XG4gICAgcG9wdWxhdGlvbjogMjAwLFxuICAgIGRpc3RhbmNpbmc6IDAsXG4gICAgZGVhdGhSYXRlOiBERUFUSF9SQVRFLFxuICAgIGluZmVjdGlvblJhdGU6IElORkVDVElPTl9SQVRFXG4gIH07XG4gIG1haW5QYXJhbXM6IFNpbXVsYXRvclBhcmFtcyA9IHRoaXMuaW5pdGlhbFN0YXRlO1xuICBzZWNvbmRQYXJhbXM6IFNpbXVsYXRvclBhcmFtcyA9IHRoaXMuaW5pdGlhbFN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICB9XG5cbiAgc3RhcnQoc2ltdWxhdG9yMTogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnJhbmRvbVNlZWQgPSBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMucm5nMSA9IHNlZWRyYW5kb20odGhpcy5yYW5kb21TZWVkKTtcbiAgICB0aGlzLnJuZzIgPSBzZWVkcmFuZG9tKHRoaXMucmFuZG9tU2VlZCk7XG4gICAgdGhpcy5jaGFydHMuZm9yRWFjaChjaGFydCA9PiBjaGFydC5zdGFydCgpKTtcbiAgICBzaW11bGF0b3IxLnNjcm9sbEludG9WaWV3KCk7XG4gICAgdGhpcy5hcHBSZWYudGljaygpO1xuICB9XG5cbiAgc2hvdzJuZChzaW11bGF0b3IyOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaXMybmRWaXNpYmxlID0gIXRoaXMuaXMybmRWaXNpYmxlO1xuICAgIGlmICh0aGlzLmlzMm5kVmlzaWJsZSkge1xuICAgICAgc2ltdWxhdG9yMi5zY3JvbGxJbnRvVmlldyh7YmxvY2s6ICdjZW50ZXInfSk7XG4gICAgfVxuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgfVxuXG4gIGNoYW5nZU1haW5QYXJhbXMoJGV2ZW50OiBTaW11bGF0b3JQYXJhbXMpIHtcbiAgICB0aGlzLm1haW5QYXJhbXMgPSAkZXZlbnQ7XG4gICAgdGhpcy5hcHBSZWYudGljaygpO1xuICB9XG5cbiAgY2hhbmdlU2Vjb25kUGFyYW1zKCRldmVudDogU2ltdWxhdG9yUGFyYW1zKSB7XG4gICAgdGhpcy5zZWNvbmRQYXJhbXMgPSAkZXZlbnQ7XG4gICAgdGhpcy5hcHBSZWYudGljaygpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZmxleFwiPlxuICA8ZGl2IGNsYXNzPVwicGFyYW0tY29udGFpbmVyXCI+XG4gICAgPGNvc2ktcGFyYW1zIFtpbml0aWFsUGFyYW1zXT1cIm1haW5QYXJhbXNcIiAocGFyYW1zQ2hhbmdlZCk9XCJjaGFuZ2VNYWluUGFyYW1zKCRldmVudClcIj48L2Nvc2ktcGFyYW1zPlxuICAgIDxkaXYgY2xhc3M9XCJmbGV4IGNvbHVtblwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0LWJ1dHRvblwiIChjbGljayk9XCJzdGFydChzaW11bGF0b3IxKVwiPihSZSlTdGFydCBzaW11bGF0aW9uPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2Vjb25kYXJ5LWJ1dHRvblwiIChjbGljayk9XCJzaG93Mm5kKHNpbXVsYXRvcjIpXCI+VG9nZ2xlIHNlY29uZCBzaW11bGF0aW9uPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICNzaW11bGF0b3IxIHRhYmluZGV4PVwiMVwiPlxuICAgIDxjb3NpLXNpbXVsYXRpb24gW3NpbXVsYXRvclBhcmFtc109XCJtYWluUGFyYW1zXCJcbiAgICAgICAgICAgICAgICAgICAgIFtyYW5kb21OdW1iZXJHZW5lcmF0b3JdPVwicm5nMVwiPlxuICAgIDwvY29zaS1zaW11bGF0aW9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIiAjc2ltdWxhdG9yMiB0YWJpbmRleD1cIjFcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzMm5kVmlzaWJsZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJwYXJhbS1jb250YWluZXJcIj5cbiAgICAgIDxjb3NpLXBhcmFtcyBbaW5pdGlhbFBhcmFtc109XCJzZWNvbmRQYXJhbXNcIiAocGFyYW1zQ2hhbmdlZCk9XCJjaGFuZ2VTZWNvbmRQYXJhbXMoJGV2ZW50KVwiPjwvY29zaS1wYXJhbXM+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBjb2x1bW5cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0LWJ1dHRvblwiIChjbGljayk9XCJzdGFydChzaW11bGF0b3IxKVwiPihSZSlTdGFydCBzaW11bGF0aW9uPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGNvc2ktc2ltdWxhdGlvbiBbc2ltdWxhdG9yUGFyYW1zXT1cInNlY29uZFBhcmFtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtyYW5kb21OdW1iZXJHZW5lcmF0b3JdPVwicm5nMlwiPlxuICAgICAgPC9jb3NpLXNpbXVsYXRpb24+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbiJdfQ==