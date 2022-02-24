/** There won't be any Xs to deal with in this function!
 *
 * data = [{dimension: 5,             the size of the section
 *          guide: [1, 3],            the hints for this section
 *          determined: 4,            # of required dots and spaces to fulfill hint.
 *          blotArray: [              the dots that are completed
 *            {pos:1, length: 2},  
 *            {pos:4, length: 1}
 *          ]
 *        }]
 *
 * returns: {
 *    data: [{value: -1, location: 3}, {}, {}, ...],
 *    hasSpace: false
 * }

 * @param {object} data
 */

const OpeningSolver = ({dimension, guide, blotArray, determined}) => {
  let location = 0;
  const data = [];
  const returnData = [];

  // NO HINTS!
  if (guide.length === 0) {
    while (location < dimension) { // fill the opening with Xs.
      returnData.push({ value: -1, location });
      location += 1;
    }
    return { data: returnData, hasSpace: false };
  }
  // NO MOVEMENT!
  if (dimension - determined === 0) {
    // place dots and xs and set the row done.
    for (let hintIndex = 0; hintIndex < guide.length; hintIndex += 1) { // loop through each hint
      for (let blot = 0; blot < guide[hintIndex]; blot += 1) { // loop through each hint length
        data.push({ value: 1, location }); // place a blot
        location += 1;
      }
      if (location < dimension) {           // place an x between the first hint set and the next.
        data.push({ value: -1, location });
        location += 1;
      }
    }
    return { data, hasSpace: false };
  }

  // MOVEMENT!
  while (location < dimension) {
    for (let hintIndex = 0; hintIndex < guide.length; hintIndex += 1) { // Loop through each hint.
      // if our position has a blot, fill out the first hint followed by an X.
      const blotSequence = blotArray.filter((obj) => obj.pos === location);
      const movement = dimension - determined;
      if (blotSequence.length !== 0) { // our current location has a blot
        location += blotSequence.length;
      } else if (movement >= guide[hintIndex]) { // this hint is too small
        location += guide[hintIndex] + 1;
        debugger;
      } else { // Our position is blank.
        location += movement;
        debugger;
        for (let seqIndex = 0; seqIndex < guide[hintIndex] - movement; seqIndex += 1) {
          data.push({ value: 1, location });
          location += 1;
        }
        location += 1; // add a space between hint numbers
      }

      // If movement >= hint, move forward to the next hint
    }
    location = dimension;
  }
  debugger;
  return { data, hasSpace: true };
};
export default OpeningSolver;
