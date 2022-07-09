## Nonogram Puzzle Solver ##

Inspired by nonogram puzzles found at https://www.puzzle-nonograms.com/

## Getting Started ##

1. Install packages with `npm i`
2. Install cypress with `npm install cypress --save-dev`
3. Start the local nonogram puzzle with `npm start`
3. Open another bash window and start cypress with `npm run cypress`
4. Select the <strong>nonogram.spec.js</strong> test. The code is located at "./cypress/integration/examples/nonogram.spec.js"

<hr>

## Architecture ##
**cypress/integration/examples/nonogram.spec.js**: reads puzzle from webpage, makes series from columns and rows, updates puzzle solution, and clicks it in.

**src/divideSeries.js**: given a "header" object with a solution series, creates a set of "openings" and matches them to hint numbers. Calls OpeningSolver to fill out each matched opening.

**src/OpeningSolver.js**: matches the hints to the sets of empty cells

**src/createBlotArray.js**: given one set of empty cells and hints, fills in Blots and Xs.

<hr>

## Testing ##
**App.js**: renders a nonogram puzzle locally.

**solver.test.js**: a jest test program

**test/generateTestData.py**: creates every possible line configuration and line solution states for testing our solution logic.