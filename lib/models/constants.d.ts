import { Health } from './health.enum';
export declare const fps = 60;
export declare const updateIntervallMs: number;
export declare const simulationSeconds = 30;
export declare const TOTAL_FRAMES: number;
export declare const safeLimitPercentage = 0.3;
export declare const chartSafeLimit: number;
export declare const WIDTH = 100;
export declare const HEIGHT: number;
export declare const PERSON_RADIUS = 0.8;
export declare const PERSON_SPEED = 0.2;
export declare const PERSON_GAP = 0.001;
export declare const FULL_ANGLE: number;
export declare const borderWidth = 1;
export declare const oneThirdWidth: number;
export declare const twoThirdsWidth: number;
export declare const borderWidthHalf: number;
export declare const blackColor = "#000000";
export declare const lightGrayColor = "#EEEEEE";
export declare const healthyColor = "#a6db68";
export declare const sickColor = "#E53935";
export declare const recoveredColor = "#69a7db";
export declare const dangerSickColor = "#B71C1C";
export declare const colors: {
    border: {
        opened: string;
        closed: string;
    };
    states: {
        1: string;
        0: string;
        2: string;
        3: string;
    };
    chart: {
        healthy: string;
        safeSick: string;
        dangerSick: string;
        recovered: string;
        dead: string;
        empty: string;
        safeLine: string;
    };
    canvasBoundary: string;
};
export declare const INFECTION_RATE = 1;
export declare const DEATH_RATE = 0.03;
export declare const sicknessInterval: {
    from: number;
    to: number;
};
