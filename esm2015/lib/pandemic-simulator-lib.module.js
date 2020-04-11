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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZGVtaWMtc2ltdWxhdG9yLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYW5kZW1pYy1zaW11bGF0b3ItbGliLyIsInNvdXJjZXMiOlsibGliL3BhbmRlbWljLXNpbXVsYXRvci1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBZTNELE1BQU0sT0FBTywwQkFBMEI7OzhEQUExQiwwQkFBMEI7bUlBQTFCLDBCQUEwQixrQkFONUI7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1NBQ3BCO3dGQUdVLDBCQUEwQixtQkFWbkMsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixjQUFjO1FBQ2QsbUJBQW1CLGFBRW5CLFlBQVk7UUFDWixtQkFBbUIsYUFFWCxrQkFBa0I7a0RBRWpCLDBCQUEwQjtjQVp0QyxRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLG1CQUFtQjtpQkFBQztnQkFDdEIsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jaGFydC9jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFyYW1zQ29tcG9uZW50IH0gZnJvbSAnLi9wYXJhbXMvcGFyYW1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW11bGF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zaW11bGF0aW9uL3NpbXVsYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXVsYXRvckNvbXBvbmVudCB9IGZyb20gJy4vc2ltdWxhdG9yLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGFyYW1zQ29tcG9uZW50LFxuICAgIFNpbXVsYXRvckNvbXBvbmVudCxcbiAgICBDaGFydENvbXBvbmVudCxcbiAgICBTaW11bGF0aW9uQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtTaW11bGF0b3JDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmRlbWljU2ltdWxhdG9yTGliTW9kdWxlIHtcbn1cbiJdfQ==