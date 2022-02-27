import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { ParamsComponent } from './params/params.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulatorComponent } from './simulator.component';
import * as i0 from "@angular/core";
export class PandemicSimulatorLibModule {
}
PandemicSimulatorLibModule.ɵmod = i0.ɵɵdefineNgModule({ type: PandemicSimulatorLibModule });
PandemicSimulatorLibModule.ɵinj = i0.ɵɵdefineInjector({ factory: function PandemicSimulatorLibModule_Factory(t) { return new (t || PandemicSimulatorLibModule)(); }, imports: [[
            CommonModule,
            ReactiveFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PandemicSimulatorLibModule, { declarations: [ParamsComponent,
        SimulatorComponent,
        ChartComponent,
        SimulationComponent], imports: [CommonModule,
        ReactiveFormsModule], exports: [SimulatorComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PandemicSimulatorLibModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ParamsComponent,
                    SimulatorComponent,
                    ChartComponent,
                    SimulationComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule
                ],
                exports: [SimulatorComponent]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZGVtaWMtc2ltdWxhdG9yLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2dpdGh1Yi93b3Jrc3BhY2UvcHJvamVjdHMvcGFuZGVtaWMtc2ltdWxhdG9yLWxpYi9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFuZGVtaWMtc2ltdWxhdG9yLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFlM0QsTUFBTSxPQUFPLDBCQUEwQjs7OERBQTFCLDBCQUEwQjttSUFBMUIsMEJBQTBCLGtCQU41QjtZQUNQLFlBQVk7WUFDWixtQkFBbUI7U0FDcEI7d0ZBR1UsMEJBQTBCLG1CQVZuQyxlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxtQkFBbUIsYUFFbkIsWUFBWTtRQUNaLG1CQUFtQixhQUVYLGtCQUFrQjtrREFFakIsMEJBQTBCO2NBWnRDLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsbUJBQW1CO2lCQUFDO2dCQUN0QixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NoYXJ0L2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXJhbXNDb21wb25lbnQgfSBmcm9tICcuL3BhcmFtcy9wYXJhbXMuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXVsYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3NpbXVsYXRpb24vc2ltdWxhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltdWxhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zaW11bGF0b3IuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQYXJhbXNDb21wb25lbnQsXG4gICAgU2ltdWxhdG9yQ29tcG9uZW50LFxuICAgIENoYXJ0Q29tcG9uZW50LFxuICAgIFNpbXVsYXRpb25Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1NpbXVsYXRvckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZGVtaWNTaW11bGF0b3JMaWJNb2R1bGUge1xufVxuIl19