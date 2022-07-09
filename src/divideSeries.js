/* eslint-disable max-len */
/* eslint-disable no-console */
import OpeningSolver from './OpeningSolver';
import createBlotArray from './createBlotArray';
/**
 * given data = {
 *            dimension: length of row
 *            guide: an array with the header hint numbers
 *            determined: The number of cells declared by the Guide Array
 *            determinedXs: The number of Xs in the row.
 *            xLocations: [x locations]
 *            blotLocations: [blot locations]
 *            emptyLocations: [empty locations]
 *        };
 *
 * The rationale here is to split the line into openings that need to be filled.
 * This is groups of cells between Xs with at least one blank cell. Then we send
 * these openings off to get solved individually if possible. The job of this
 * function is to match up hints with openings.
 *
 *    returns
 *    {
 *      data:[{value: 0 || 1 || -1, location: index}, {}, {}, ...],
 *      complete: has this row been fully defined?
 *    }
 * @param {object} data
 * @returns {object}
 */
const divideSeries = (header) => {
  header.complete = true
  header.series = [0,0,1,0,0,1,0,0,1,-1]
  return header
  // let position = 0;
  // const returnData = []; // [{value: 1, location: 3}, {}, {}]
  // const openings = []; // an array of openings, each with the position and length of blot sequences.
  // // eg [{dimension: 5,
  // //      guide: [1, 2],
  // //      determined: 4,
  // //      blotArray: [
  // //        {pos:1, length: 2},
  // //        {pos:4, length: 1}
  // //      ]
  // //    }]

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
