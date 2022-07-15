import divideSeries from "../divideSeries";
import helper from "../helper";


test('divides series for dimension 3', async () => {
    let testData = await helper.generateTestData(3)
    // * header = { 
    // *  complete: false,
    //    determined: 9,
    //    guide: [1, 1, 1, 3],
    //    needsUpdate: true,
    //    series: [0, -1, 1, 1, 0, ...]
    //  }
    for (const solution of testData){
        let states = []
        for (const state of solution.states){
            let response = divideSeries.divideSeries({
                series: state
            })
            states.push(`${state}       ${JSON.stringify(response)}`)    
            //     solution: solution.solution,
            //     state,
            //     openings: JSON.stringify(response)
            // })
        }
        console.log({solution:solution.solution, states})
    }
})
