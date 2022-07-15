/* eslint-disable max-len */
/* eslint-disable no-console */
import OpeningSolver from './OpeningSolver';
import createBlotArray from './createBlotArray';
/**
 * header = { 
 *  complete: false,
    determined: 9,
    guide: [1, 1, 1, 3],
    needsUpdate: true,
    series: [0, -1, 1, 1, 0, ...]
  }
 */
const debug = false

const divideSeries = (header) => {
  // header.complete = true
  // header.series = [0,0,1,0,0,1,0,0,1,-1]
  // make an array of openings
  const openings = []
  let openingIndex = ''
  let currentXrun = 0
  let xRuns = []
  debug && console.log({state: header.series})
  for (let i = 0; i < header.series.length; i++){
    switch(header.series[i]){
      case -1: 
        debug && console.log('X', {openingIndex, currentXrun})
        if(openingIndex !== '') {
          currentXrun > 0 && xRuns.push(currentXrun)
          currentXrun = 0
          let opening = {
            opening: header.series.slice(openingIndex, i),
            xSeries: xRuns
          }
          debug && console.log({opening})
          openings.push(opening)
          openingIndex = ''
        }
        break;
      case 0:
        debug && console.log('_', {openingIndex, currentXrun})
        if(openingIndex === '') openingIndex = i
        if(currentXrun > 0) {
          xRuns.push(currentXrun)
          currentXrun = 0
        }
        break;
      case 1:
        debug && console.log('1', {openingIndex, currentXrun})
        if(openingIndex === '') openingIndex = i
        currentXrun++
    }
  }
  if (openingIndex !== ''){
    currentXrun > 0 && xRuns.push(currentXrun)
    let opening = {
      opening: header.series.slice(openingIndex, header.series.length),
      xSeries: xRuns
    }
    debug && console.log({opening})
    openings.push(opening)
  }
  currentXrun = 0

  return openings
  
  // let position = 0;
  // const returnData = []; // [{value: 1, location: 3}, {}, {}]

  // // NO Xs!
  // if (data.xLocations.length === 0) {
  //   // send the whole row as an opening
  //   openings.push({
  //     dimension: data.dimension,
  //     guide: data.guide,
  //     blotArray: createBlotArray(0, data.dimension, data.blotLocations),
  //     determined: data.determined
  //   });

  // // Xs! Create an array of openings
  // } else {
  //   let hintIndex = 0;
  //   for (let xIndex = data.xLocations[0]; xIndex < data.xLocations.length; xIndex += 1) {
  //     if (xIndex === position) {
  //       // the current position is an x. Move forward.
  //       position += 1;
  //     } else {
  //       // there are cells before the current x position. Add to Openings if there are spaces.
  //       const spaceFilter = data.emptyLocations.filter((index) => index > position && index < xIndex);
  //       if (spaceFilter.length > 0) {
  //         // spaces found.
  //         if (data.guide[hintIndex] > dimension) {
  //           // if the current hint won't fit, fill opening with x's and update position.
  //           for (let spaceIndex = position; spaceIndex < xIndex; spaceIndex += 1) {
  //             returnData.push({ value: -1, location: spaceIndex });
  //           }
  //           position = xIndex + 1;
  //         } else {
  //           // the current hint (and maybe more will fit). save the Opening.
  //           const dimension = xIndex - position;
  //           // create an array of possible fitting hints.
  //           const loopHintIndex = hintIndex;
  //           let hintSize = data.guide[hintIndex];
  //           const spaceGuide = [];
  //           while (hintSize <= dimension) {
  //             spaceGuide.push(data.guide[loopHintIndex]);
  //             hintSize += 1 + data.guide[hintIndex + 1];
  //           }
  //           // add the opening
  //           openings.push({
  //             dimension: data.dimension,
  //             movement: data.dimension - data.determined,
  //             guide: data.guide,
  //             blotLocations: data.blotLocations,
  //             emptyLocations: data.emptyLocations
  //           });
  //         }
  //       } else {
  //         // this space was filled with blots. skip the hint and bring position up
  //         data.guide.splice(); // remove and return first hint item
  //         position = xIndex + 1;
  //         hintIndex += 1;
  //       }
  //     }
  //   }

  //   // FIGURE OUT WHICH HINTS GO TO WHICH OPENINGS
  //   const guideIndex = 0;
  //   const movement = data.dimension - data.determined;
  //   while (position < data.dimension) {
  //     if (data.xLocations.indexOf(position) !== -1) {
  //       // position has an x. move forward, decrease movement.
  //       position += 1;
  //     } else if (data.blotLocations.indexOf(position) !== -1) {
  //       // position has a blot. fill in the rest of the hint.
  //     } else {
  //       // position has a blank. Look ahead by current hint number.
  //       const currentHint = data.guide[guideIndex];
  //       const movement = data.dimension - data.determined;
  //       for (let i = position; i < position + currentHint; i += 1) {
  //         if (movement < currentHint) {

  //         }
  //       }
  //     }
  //   }
  //   return { data: [1, 1, 1, 1, 1], complete: true };
  // }

  // // collect up responses for each opening and return the results
  // let complete = true;
  // openings.forEach((opening) => {
  //   const response = OpeningSolver(opening);
  //   returnData.concat(response.data);
  //   if (response.hasSpace) complete = false;
  // });
  // return { data: returnData, complete };
};

export default {divideSeries};
