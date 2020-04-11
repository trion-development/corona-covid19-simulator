import { Border } from './border';
import { Health } from './health.enum';

export const fps = 60; // Note: if you change this, you'll need to addapt ball speed
export const updateIntervallMs = 1000 / fps;
export const simulationSeconds = 30; // the simulation lasts 30 seconds
export const TOTAL_FRAMES = fps * simulationSeconds;
export const safeLimitPercentage = 0.3; // that's 30 percents capacity
export const chartSafeLimit = 1 - safeLimitPercentage;

// loval units
export const WIDTH = 100;
export const HEIGHT = 100 * 2 / 3; // the canvas ratio is always 3:2
export const PERSON_RADIUS = 0.8;
export const PERSON_SPEED = 0.2;
export const PERSON_GAP = 0.001; // a small value used to create gaps between balls
export const FULL_ANGLE = 2 * Math.PI;
export const borderWidth = 1;

export const oneThirdWidth = WIDTH / 3;
export const twoThirdsWidth = 2 * oneThirdWidth;
export const borderWidthHalf = borderWidth / 2;

// colors
export const blackColor = '#000000';
export const lightGrayColor = '#EEEEEE';
export const healthyColor = '#a6db68';
export const sickColor = '#E53935';
export const recoveredColor = '#69a7db';
export const dangerSickColor = '#B71C1C';

export const colors = {
  border: {
    opened: lightGrayColor,
    closed: blackColor
  },
  states: {
    [Health.HEALTHY]: healthyColor,
    [Health.SICK]: sickColor,
    [Health.RECOVERED]: recoveredColor,
    [Health.DEAD]: blackColor
  },
  chart: {
    healthy: healthyColor,
    safeSick: sickColor,
    dangerSick: dangerSickColor,
    recovered: recoveredColor,
    dead: blackColor,
    empty: lightGrayColor,
    safeLine: lightGrayColor
  },
  canvasBoundary: blackColor
};


export const INFECTION_RATE = 1;
export const DEATH_RATE = 0.03;

export const sicknessInterval = {
  from: 6 * fps,
  to: 8 * fps
};
