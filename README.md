Nonogram puzzle solver
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Web Solver - `npm run cypress`

## Local Puzzle Front End - `npm start`

## Start code tester - `npm test`

## Local Solver w/ Debug - `npm test:debug`

## Test Generator - `npm generate`

It specifies the number of cells
in a row to generate, and generates a json file with the following form:
```json
{ 
    "3_1":[
        {"actual": 253,
        "puzzles":[],
        "solutions":[]
        },
        {"actual":"254",
        "puzzles":[],
        "solutions":[]
        }
    ],
    "4":[
        {"actual":"255",
        "puzzles":[],
        "solutions":[]
        }
    ]
}
```

