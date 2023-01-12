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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Ii9naXRodWIvd29ya3NwYWNlL3Byb2plY3RzL3BhbmRlbWljLXNpbXVsYXRvci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2QyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsNkRBQTZEO0FBQ3BGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7QUFDNUMsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDLENBQUMsa0NBQWtDO0FBQ3ZFLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLEdBQUcsaUJBQWlCLENBQUM7QUFDcEQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLENBQUMsOEJBQThCO0FBQ3RFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsbUJBQW1CLENBQUM7QUFFdEQsY0FBYztBQUNkLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDekIsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO0FBQ3BFLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDakMsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUNoQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsa0RBQWtEO0FBQ25GLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUN0QyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRS9DLFNBQVM7QUFDVCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDeEMsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUN0QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDeEMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUV6QyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUc7SUFDcEIsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFLGNBQWM7UUFDdEIsTUFBTSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxNQUFNLEVBQUU7UUFDTixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZO1FBQzlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVM7UUFDeEIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsY0FBYztRQUNsQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVO0tBQzFCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFLFlBQVk7UUFDckIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsVUFBVSxFQUFFLGVBQWU7UUFDM0IsU0FBUyxFQUFFLGNBQWM7UUFDekIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLGNBQWM7UUFDckIsUUFBUSxFQUFFLGNBQWM7S0FDekI7SUFDRCxjQUFjLEVBQUUsVUFBVTtDQUMzQixDQUFDO0FBR0YsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUNoQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBRS9CLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRztJQUNiLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRztDQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3JkZXIgfSBmcm9tICcuL2JvcmRlcic7XG5pbXBvcnQgeyBIZWFsdGggfSBmcm9tICcuL2hlYWx0aC5lbnVtJztcblxuZXhwb3J0IGNvbnN0IGZwcyA9IDYwOyAvLyBOb3RlOiBpZiB5b3UgY2hhbmdlIHRoaXMsIHlvdSdsbCBuZWVkIHRvIGFkZGFwdCBiYWxsIHNwZWVkXG5leHBvcnQgY29uc3QgdXBkYXRlSW50ZXJ2YWxsTXMgPSAxMDAwIC8gZnBzO1xuZXhwb3J0IGNvbnN0IHNpbXVsYXRpb25TZWNvbmRzID0gMzA7IC8vIHRoZSBzaW11bGF0aW9uIGxhc3RzIDMwIHNlY29uZHNcbmV4cG9ydCBjb25zdCBUT1RBTF9GUkFNRVMgPSBmcHMgKiBzaW11bGF0aW9uU2Vjb25kcztcbmV4cG9ydCBjb25zdCBzYWZlTGltaXRQZXJjZW50YWdlID0gMC4zOyAvLyB0aGF0J3MgMzAgcGVyY2VudHMgY2FwYWNpdHlcbmV4cG9ydCBjb25zdCBjaGFydFNhZmVMaW1pdCA9IDEgLSBzYWZlTGltaXRQZXJjZW50YWdlO1xuXG4vLyBsb3ZhbCB1bml0c1xuZXhwb3J0IGNvbnN0IFdJRFRIID0gMTAwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDEwMCAqIDIgLyAzOyAvLyB0aGUgY2FudmFzIHJhdGlvIGlzIGFsd2F5cyAzOjJcbmV4cG9ydCBjb25zdCBQRVJTT05fUkFESVVTID0gMC44O1xuZXhwb3J0IGNvbnN0IFBFUlNPTl9TUEVFRCA9IDAuMjtcbmV4cG9ydCBjb25zdCBQRVJTT05fR0FQID0gMC4wMDE7IC8vIGEgc21hbGwgdmFsdWUgdXNlZCB0byBjcmVhdGUgZ2FwcyBiZXR3ZWVuIGJhbGxzXG5leHBvcnQgY29uc3QgRlVMTF9BTkdMRSA9IDIgKiBNYXRoLlBJO1xuZXhwb3J0IGNvbnN0IGJvcmRlcldpZHRoID0gMTtcblxuZXhwb3J0IGNvbnN0IG9uZVRoaXJkV2lkdGggPSBXSURUSCAvIDM7XG5leHBvcnQgY29uc3QgdHdvVGhpcmRzV2lkdGggPSAyICogb25lVGhpcmRXaWR0aDtcbmV4cG9ydCBjb25zdCBib3JkZXJXaWR0aEhhbGYgPSBib3JkZXJXaWR0aCAvIDI7XG5cbi8vIGNvbG9yc1xuZXhwb3J0IGNvbnN0IGJsYWNrQ29sb3IgPSAnIzAwMDAwMCc7XG5leHBvcnQgY29uc3QgbGlnaHRHcmF5Q29sb3IgPSAnI0VFRUVFRSc7XG5leHBvcnQgY29uc3QgaGVhbHRoeUNvbG9yID0gJyNhNmRiNjgnO1xuZXhwb3J0IGNvbnN0IHNpY2tDb2xvciA9ICcjRTUzOTM1JztcbmV4cG9ydCBjb25zdCByZWNvdmVyZWRDb2xvciA9ICcjNjlhN2RiJztcbmV4cG9ydCBjb25zdCBkYW5nZXJTaWNrQ29sb3IgPSAnI0I3MUMxQyc7XG5cbmV4cG9ydCBjb25zdCBjb2xvcnMgPSB7XG4gIGJvcmRlcjoge1xuICAgIG9wZW5lZDogbGlnaHRHcmF5Q29sb3IsXG4gICAgY2xvc2VkOiBibGFja0NvbG9yXG4gIH0sXG4gIHN0YXRlczoge1xuICAgIFtIZWFsdGguSEVBTFRIWV06IGhlYWx0aHlDb2xvcixcbiAgICBbSGVhbHRoLlNJQ0tdOiBzaWNrQ29sb3IsXG4gICAgW0hlYWx0aC5SRUNPVkVSRURdOiByZWNvdmVyZWRDb2xvcixcbiAgICBbSGVhbHRoLkRFQURdOiBibGFja0NvbG9yXG4gIH0sXG4gIGNoYXJ0OiB7XG4gICAgaGVhbHRoeTogaGVhbHRoeUNvbG9yLFxuICAgIHNhZmVTaWNrOiBzaWNrQ29sb3IsXG4gICAgZGFuZ2VyU2ljazogZGFuZ2VyU2lja0NvbG9yLFxuICAgIHJlY292ZXJlZDogcmVjb3ZlcmVkQ29sb3IsXG4gICAgZGVhZDogYmxhY2tDb2xvcixcbiAgICBlbXB0eTogbGlnaHRHcmF5Q29sb3IsXG4gICAgc2FmZUxpbmU6IGxpZ2h0R3JheUNvbG9yXG4gIH0sXG4gIGNhbnZhc0JvdW5kYXJ5OiBibGFja0NvbG9yXG59O1xuXG5cbmV4cG9ydCBjb25zdCBJTkZFQ1RJT05fUkFURSA9IDE7XG5leHBvcnQgY29uc3QgREVBVEhfUkFURSA9IDAuMDM7XG5cbmV4cG9ydCBjb25zdCBzaWNrbmVzc0ludGVydmFsID0ge1xuICBmcm9tOiA2ICogZnBzLFxuICB0bzogOCAqIGZwc1xufTtcbiJdfQ==