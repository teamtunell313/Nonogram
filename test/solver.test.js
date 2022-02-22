/* eslint-disable no-debugger */
import divideOpenings from './DivideOpenings';
import LineSolver from './DivideOpenings';
import OpeningSolver from './OpeningSolver';

// data = {
//  *            dimension: length of row
//  *            guide: an array with the header hint numbers
//  *            determined: The number of cells declared by the Guide Array
//  *            determinedXs: The number of Xs in the row.
//  *            xLocations: an array of locations where Xs are
//  *            blotLocations: an array of locations where blots are
//  *            emptyLocations: an array of empty locations.
//  *        };

// RESULT:
// {data:       [{value: 0 || 1 || -1, location: index}, {}, {}, ...],
//  complete:   has this row been fully defined?
// }
const data = {
  dimension: 5,
  blotArray: [],
  guide: [5],
  determined: 5,
  determinedXs: 0,
  xLocations: [],
  blotLocations: [],
  emptyLocations: [0, 1, 2, 3, 4]
};

// turn returned data into an array
const makeArrayString = (changes) => {
  const simpleArray = new Array(data.dimension).fill(0);
  changes.data.forEach((change) => {
    simpleArray.splice(change.location, 1, change.value);
  });
  return simpleArray.join();
};

describe('virgin hints', () => {
  [
    { hint: [5], solution: [1, 1, 1, 1, 1] },
    { hint: [3, 1], solution: [1, 1, 1, -1, 1] },
    { hint: [1, 3], solution: [1, -1, 1, 1, 1] },
    { hint: [2, 2], solution: [1, 1, -1, 1, 1] },
    { hint: [1, 1, 1], solution: [1, -1, 1, -1, 1] },
    { hint: [], solution: [-1, -1, -1, -1, -1] }
  ].forEach((testSet) => {
    it(`no movement: [${testSet.hint.join()}]`, () => {
      data.guide = testSet.hint;
      const result = OpeningSolver(data);
      expect(makeArrayString(result)).toEqual(testSet.solution.join());
      expect(result.hasSpace).toEqual(false);
    });
  });

  [
    { hint: [4], solution: [0, 1, 1, 1, 0] },
    { hint: [2, 1], solution: [0, 1, 0, 0, 0] },
    { hint: [1, 2], solution: [0, 0, 0, 1, 0] }
  ].forEach((testSet) => {
    it(`1 movement: [${testSet.hint.join()}]`, () => {
      data.guide = testSet.hint;
      data.determined = 4;
      const result = OpeningSolver(data);
      expect(makeArrayString(result)).toEqual(testSet.solution.join());
      expect(result.hasSpace).toEqual(true);
    });
  });

  [
    { hint: [3], solution: [0, 0, 1, 0, 0] },
    { hint: [1, 1], solution: [0, 0, 0, 0, 0] }
  ].forEach((testSet) => {
    it(`2 movement: [${testSet.hint.join()}]`, () => {
      data.guide = testSet.hint;
      data.determined = 3;
      const result = OpeningSolver(data);
      expect(makeArrayString(result)).toEqual(testSet.solution.join());
      expect(result.hasSpace).toEqual(true);
    });
  });
});
