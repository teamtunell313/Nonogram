/* eslint-disable no-console */
/* eslint-disable max-len */
import LineSolver from '../../../src/DivideOpenings';
// const { wait, getQueriesForElement } = require("@testing-library/react");

/* eslint-disable no-undef */
Cypress.on('uncaught:exception', (err, runnable) => false);
// returning false here prevents Cypress from
// failing the test

// npm install cypress --save-dev
// npm run cypress

it('fetch nonogram top and side data into tables', () => {
  // cy.visit('https://www.puzzle-nonograms.com/');
  cy.visit('http://localhost:3000/');

  const headerData = {
    guide: [], // The numbers at the top of each column and row
    determined: [], // The number of cells declared by the Guide Array (Xs and Blots)
    determinedXs: [], // The number of Xs in the row.
    needsUpdate: [], // Boolean for flagging headers to calculate.
    complete: [] // Boolean for flagging a line complete.
  };
  let dimension = null;
  cy.get('.task-group').then(($taskGrps) => { // Get column and row header divs
    dimension = $taskGrps.length / 2;
    for (let i = 0; i < $taskGrps.length; i += 1) { // 5x5 should have i = 0 to 9
      const cellGroup = $taskGrps[i].children; // number divs inside one header
      const guideArray = [];
      let determined = 0;
      let determinedXs = 0;
      for (let j = 0; j < cellGroup.length; j += 1) { // one j for each header div
        if (cellGroup[j].innerText !== '') { // Skip blank divs
          if (guideArray.length > 0) { // we've already added a number to the guideArray
            guideArray.push(0); // add a zero between values
            determined += 1;
            determinedXs += 1;
          }
          const value = parseInt(cellGroup[j].innerText, 10);
          guideArray.push(value);
          determined += value;
        }
      }
      headerData.guide.push(guideArray);
      headerData.determined.push(determined);
      headerData.determinedXs.push(determinedXs + dimension - determined);
      headerData.needsUpdate.push(true);
      headerData.complete.push(false);
    }

    console.log(`hdrData:${headerData}`);

    // setup the solution array: 0 is blank, -1 is X, 1 is Blot.
    const solution = new Array(dimension * dimension).fill(0);

    if (headerData.complete.indexOf(false) !== -1) { // puzzle isn't solved if we have an incomplete header
      for (let col = 0; col < dimension; col += 1) { // loop through columns. col = [0, 1, 2, 3, 4]
        if (!headerData.complete[col] && headerData.needsUpdate[col]) { // Only loop through column cells if due for an update
          const lineData = {
            dimension,
            guide: headerData.guide[col],
            determined: headerData.determined[col],
            determinedXs: headerData.determinedXs[col],
            xLocations: [],
            blotLocations: [],
            emptyLocations: []
          };
          for (let cell = col; cell < dimension * dimension; cell += dimension) { // Loop through each column cell [0, 5, 10, 15, 20]
            const columnSequence = (cell - col) / 5; // 0, 1, 2, 3, 4
            switch (solution[cell]) {
              case -1:
                lineData.xLocations.push(columnSequence);
                break;
              case 1:
                lineData.blotLocations.push(columnSequence);
                break;
              default:
                lineData.emptyLocations.push(columnSequence);
            } // end switch
          } // lineData object populated.

          // send data to line solver, and save data it returns to solution array
          const newMarks = LineSolver(lineData);
          newMarks.data.forEach((value, location) => {
            if (value !== 0) {
              const cell = location * 5 + col; // calculate cell index
              const row = 5 + Math.floor(cell / 5); // calculate row index
              solution.splice(cell, 1, value); // place an X or a blot
              headerData.needsUpdate.splice(row, 1, true); // mark the row for an update
            } // no change in this location.
          }); // finished cycling through newMarks Data
          if (newMarks.complete) headerData.complete.splice(col, 1, true); // mark the column complete
        } // column didn't need update.
      } // Looped through all columns.

      // loop through the rows
      console.log('loop through rows');
      for (let row = 0; row < dimension; row += 1) { // Loop through each row [0, 1, 2, 3, 4]
        if (!headerData.complete[5 + row] && headerData.needsUpdate[5 + row]) { // Only loop through row cells if due for an update
          const lineData = {
            dimension,
            guide: headerData.guide[5 + row],
            determined: headerData.determined[5 + row],
            determinedXs: headerData.determinedXs[5 + row],
            xLocations: [],
            blotLocations: [],
            emptyLocations: []
          };
          for (let cell = row * 5; cell < row * 5 + dimension; cell += 1) { // Loop through each row cell [0, 1, 2, 3, 4]
            const rowSequence = cell % (row * 5);
            switch (solution[cell]) {
              case -1:
                lineData.xLocations.push(rowSequence);
                break;
              case 1:
                lineData.blotLocations.push(rowSequence);
                break;
              default:
                lineData.emptyLocations.push(rowSequence);
            } // end switch
          } // lineData object populated.

          // send data to line solver, and save data it returns to solution array
          const newMarks = LineSolver(lineData);
          newMarks.data.forEach((value, location) => {
            if (location !== 0) {
              const cell = location + 5 * row; // calculate cell index
              const column = location; // calculate column index
              solution.splice(cell, 1, value); // place an X or a blot
              headerData.needsUpdate.splice(column, 1, true); // mark the column for an update
            } // no change in this location.
          }); // finished cycling through newMarks Data
          if (newMarks.complete) headerData.complete.splice(row, 1, true); // mark the row complete
        } // row didn't need update.
      } // finished passing through rows
    } // pass through columns and rows again

    // capture and click grid cells
    console.log('Start Clicking in the solution');
    cy.get('[class="cell"]').then(($cellGrid) => {
      console.log(solution);
      for (let i = 0; i < solution.length; i += 1) {
        switch (solution[i]) {
          case -1:
            cy.get($cellGrid[i]).rightclick();
            break;
          case 1:
            cy.get($cellGrid[i]).click();
            break;
          default:
        }
      }
    });
  });
  // click submit
  cy.get('[id=btnReady]').click();
});
