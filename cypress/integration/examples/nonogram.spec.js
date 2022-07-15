/* eslint-disable no-console */
/* eslint-disable max-len */
import {divideSeries} from '../../../src/divideSeries';
import {parseHeaders} from '../../../src/helper'
// const { wait, getQueriesForElement } = require("@testing-library/react");

/* eslint-disable no-undef */
Cypress.on('uncaught:exception', (err, runnable) => false);

it('fetch nonogram top and side data into tables', () => {
  cy.visit('https://www.puzzle-nonograms.com/?size=1');
  // cy.visit('http://localhost:3000/');

  cy.get('.task-group').then(($taskGrps) => { // Get column and row header divs
    const puzzle = parseHeaders($taskGrps)
    // console.log({puzzle});
    /* puzzle: {
      dimension: 5,
      headers: [
        { complete: false,
          determined: 9,
          guide: [1, 1, 1, 3],
          needsUpdate: true
        }, ...
      ]
    }
    */

    // create the solution array: 0 is blank, -1 is X, 1 is Blot.
    const solution = Array.from(Array(puzzle.dimension), () => new Array(puzzle.dimension).fill(0))
    do { // at least one header isn't complete
      for (let i = 0; i < puzzle.dimension*2; i++) { // loop through headers
        if(!puzzle.headers[i].complete){ // skip complete headers
          if(i < puzzle.dimension) { // header is a column
            let series = solution.map(row => row[i])
            let header = {...puzzle.headers[i], series}
            // console.log(`column ${i} w/ hint ${puzzle.headers[i].guide} & series ${series}`);
            header = divideSeries(header)
            puzzle.headers[i] = header
            solution.map((row, index) => row[i] = header.series[index])
          } else { // header is a row
            let series = solution[i-puzzle.dimension]
            let header = {...puzzle.headers[i], series}
            // console.log(`row ${i-puzzle.dimension} w/ hint ${header.guide} & series ${series}`)
            header = divideSeries(header)
            puzzle.headers[i] = header
            solution[i-puzzle.dimension] = header.series
          }
        }
      }
    } while ((puzzle.headers.filter(header => header.complete == false).length > 0));

    console.log(`Solution: ${JSON.stringify(solution)}`)

    // console.log('Start Clicking in the solution');
    // cy.get('.cell').as('cells')
    // for (let row = 0; row < puzzle.dimension; row++) {
    //   for (let column = 0; column < puzzle.dimension; column++){
    //     console.log({row, column, value:solution[row][column], cellNum: row*puzzle.dimension + column})
    //     if(solution[row][column] === 1) cy.get('@cells').eq(row*puzzle.dimension + column).click()

    //   }
    // }
  });
  // // click submit
  // cy.get('[id=btnReady]').click();
});
