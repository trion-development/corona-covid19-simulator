var _a;
import { Health } from './health.enum';
export var fps = 60; // Note: if you change this, you'll need to addapt ball speed
export var updateIntervallMs = 1000 / fps;
export var simulationSeconds = 30; // the simulation lasts 30 seconds
export var TOTAL_FRAMES = fps * simulationSeconds;
export var safeLimitPercentage = 0.3; // that's 30 percents capacity
export var chartSafeLimit = 1 - safeLimitPercentage;
// loval units
export var WIDTH = 100;
export var HEIGHT = 100 * 2 / 3; // the canvas ratio is always 3:2
export var PERSON_RADIUS = 0.8;
export var PERSON_SPEED = 0.2;
export var PERSON_GAP = 0.001; // a small value used to create gaps between balls
export var FULL_ANGLE = 2 * Math.PI;
export var borderWidth = 1;
export var oneThirdWidth = WIDTH / 3;
export var twoThirdsWidth = 2 * oneThirdWidth;
export var borderWidthHalf = borderWidth / 2;
// colors
export var blackColor = '#000000';
export var lightGrayColor = '#EEEEEE';
export var healthyColor = '#a6db68';
export var sickColor = '#E53935';
export var recoveredColor = '#69a7db';
export var dangerSickColor = '#B71C1C';
export var colors = {
    border: {
        opened: lightGrayColor,
        closed: blackColor
    },
    states: (_a = {},
        _a[Health.HEALTHY] = healthyColor,
        _a[Health.SICK] = sickColor,
        _a[Health.RECOVERED] = recoveredColor,
        _a[Health.DEAD] = blackColor,
        _a),
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
export var INFECTION_RATE = 1;
export var DEATH_RATE = 0.03;
export var sicknessInterval = {
    from: 6 * fps,
    to: 8 * fps
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGFuZGVtaWMtc2ltdWxhdG9yLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE1BQU0sQ0FBQyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyw2REFBNkQ7QUFDcEYsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUM1QyxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxrQ0FBa0M7QUFDdkUsTUFBTSxDQUFDLElBQU0sWUFBWSxHQUFHLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztBQUNwRCxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQyw4QkFBOEI7QUFDdEUsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsQ0FBQztBQUV0RCxjQUFjO0FBQ2QsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN6QixNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7QUFDcEUsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNqQyxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ2hDLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxrREFBa0Q7QUFDbkYsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFFN0IsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdkMsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUM7QUFDaEQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFFL0MsU0FBUztBQUNULE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDcEMsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUN4QyxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDbkMsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUN4QyxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBRXpDLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRztJQUNwQixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsY0FBYztRQUN0QixNQUFNLEVBQUUsVUFBVTtLQUNuQjtJQUNELE1BQU07UUFDSixHQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUcsWUFBWTtRQUM5QixHQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUcsU0FBUztRQUN4QixHQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUcsY0FBYztRQUNsQyxHQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUcsVUFBVTtXQUMxQjtJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxjQUFjO1FBQ3JCLFFBQVEsRUFBRSxjQUFjO0tBQ3pCO0lBQ0QsY0FBYyxFQUFFLFVBQVU7Q0FDM0IsQ0FBQztBQUdGLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDaEMsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUUvQixNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRztJQUM5QixJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUc7SUFDYixFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUc7Q0FDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSAnLi9ib3JkZXInO1xuaW1wb3J0IHsgSGVhbHRoIH0gZnJvbSAnLi9oZWFsdGguZW51bSc7XG5cbmV4cG9ydCBjb25zdCBmcHMgPSA2MDsgLy8gTm90ZTogaWYgeW91IGNoYW5nZSB0aGlzLCB5b3UnbGwgbmVlZCB0byBhZGRhcHQgYmFsbCBzcGVlZFxuZXhwb3J0IGNvbnN0IHVwZGF0ZUludGVydmFsbE1zID0gMTAwMCAvIGZwcztcbmV4cG9ydCBjb25zdCBzaW11bGF0aW9uU2Vjb25kcyA9IDMwOyAvLyB0aGUgc2ltdWxhdGlvbiBsYXN0cyAzMCBzZWNvbmRzXG5leHBvcnQgY29uc3QgVE9UQUxfRlJBTUVTID0gZnBzICogc2ltdWxhdGlvblNlY29uZHM7XG5leHBvcnQgY29uc3Qgc2FmZUxpbWl0UGVyY2VudGFnZSA9IDAuMzsgLy8gdGhhdCdzIDMwIHBlcmNlbnRzIGNhcGFjaXR5XG5leHBvcnQgY29uc3QgY2hhcnRTYWZlTGltaXQgPSAxIC0gc2FmZUxpbWl0UGVyY2VudGFnZTtcblxuLy8gbG92YWwgdW5pdHNcbmV4cG9ydCBjb25zdCBXSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBIRUlHSFQgPSAxMDAgKiAyIC8gMzsgLy8gdGhlIGNhbnZhcyByYXRpbyBpcyBhbHdheXMgMzoyXG5leHBvcnQgY29uc3QgUEVSU09OX1JBRElVUyA9IDAuODtcbmV4cG9ydCBjb25zdCBQRVJTT05fU1BFRUQgPSAwLjI7XG5leHBvcnQgY29uc3QgUEVSU09OX0dBUCA9IDAuMDAxOyAvLyBhIHNtYWxsIHZhbHVlIHVzZWQgdG8gY3JlYXRlIGdhcHMgYmV0d2VlbiBiYWxsc1xuZXhwb3J0IGNvbnN0IEZVTExfQU5HTEUgPSAyICogTWF0aC5QSTtcbmV4cG9ydCBjb25zdCBib3JkZXJXaWR0aCA9IDE7XG5cbmV4cG9ydCBjb25zdCBvbmVUaGlyZFdpZHRoID0gV0lEVEggLyAzO1xuZXhwb3J0IGNvbnN0IHR3b1RoaXJkc1dpZHRoID0gMiAqIG9uZVRoaXJkV2lkdGg7XG5leHBvcnQgY29uc3QgYm9yZGVyV2lkdGhIYWxmID0gYm9yZGVyV2lkdGggLyAyO1xuXG4vLyBjb2xvcnNcbmV4cG9ydCBjb25zdCBibGFja0NvbG9yID0gJyMwMDAwMDAnO1xuZXhwb3J0IGNvbnN0IGxpZ2h0R3JheUNvbG9yID0gJyNFRUVFRUUnO1xuZXhwb3J0IGNvbnN0IGhlYWx0aHlDb2xvciA9ICcjYTZkYjY4JztcbmV4cG9ydCBjb25zdCBzaWNrQ29sb3IgPSAnI0U1MzkzNSc7XG5leHBvcnQgY29uc3QgcmVjb3ZlcmVkQ29sb3IgPSAnIzY5YTdkYic7XG5leHBvcnQgY29uc3QgZGFuZ2VyU2lja0NvbG9yID0gJyNCNzFDMUMnO1xuXG5leHBvcnQgY29uc3QgY29sb3JzID0ge1xuICBib3JkZXI6IHtcbiAgICBvcGVuZWQ6IGxpZ2h0R3JheUNvbG9yLFxuICAgIGNsb3NlZDogYmxhY2tDb2xvclxuICB9LFxuICBzdGF0ZXM6IHtcbiAgICBbSGVhbHRoLkhFQUxUSFldOiBoZWFsdGh5Q29sb3IsXG4gICAgW0hlYWx0aC5TSUNLXTogc2lja0NvbG9yLFxuICAgIFtIZWFsdGguUkVDT1ZFUkVEXTogcmVjb3ZlcmVkQ29sb3IsXG4gICAgW0hlYWx0aC5ERUFEXTogYmxhY2tDb2xvclxuICB9LFxuICBjaGFydDoge1xuICAgIGhlYWx0aHk6IGhlYWx0aHlDb2xvcixcbiAgICBzYWZlU2ljazogc2lja0NvbG9yLFxuICAgIGRhbmdlclNpY2s6IGRhbmdlclNpY2tDb2xvcixcbiAgICByZWNvdmVyZWQ6IHJlY292ZXJlZENvbG9yLFxuICAgIGRlYWQ6IGJsYWNrQ29sb3IsXG4gICAgZW1wdHk6IGxpZ2h0R3JheUNvbG9yLFxuICAgIHNhZmVMaW5lOiBsaWdodEdyYXlDb2xvclxuICB9LFxuICBjYW52YXNCb3VuZGFyeTogYmxhY2tDb2xvclxufTtcblxuXG5leHBvcnQgY29uc3QgSU5GRUNUSU9OX1JBVEUgPSAxO1xuZXhwb3J0IGNvbnN0IERFQVRIX1JBVEUgPSAwLjAzO1xuXG5leHBvcnQgY29uc3Qgc2lja25lc3NJbnRlcnZhbCA9IHtcbiAgZnJvbTogNiAqIGZwcyxcbiAgdG86IDggKiBmcHNcbn07XG4iXX0=