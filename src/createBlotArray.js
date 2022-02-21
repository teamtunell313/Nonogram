/**
 * an array of openings, each with the position and length of blot sequences.
 * eg [{length: 5,
 *      blotArray: [
 *        {pos:1, length: 2},
 *        {pos:4, length: 1}
 *      ]
 *    }]
 * @param {object} data
 */
const createBlotArray = (startIndex, endIndex, xLocations) => {
  const blotArray = [];
  const filteredLocations = xLocations
    .filter((location) => location >= startIndex && location <= endIndex);

  if (filteredLocations.length > 0) {
    let loopIndex = 0;
    while (loopIndex < filteredLocations.length) {
      const blotSequence = {};
      blotSequence.pos = loopIndex;
      let length = 1;
      while (filteredLocations[loopIndex] + length === filteredLocations[loopIndex + length]) {
        // the next position is the same as the next array position's value
        length += 1;
      }
      blotSequence.length = length;
      loopIndex += length;
      blotArray.push(blotSequence);
    }
  }
};
export default createBlotArray;
