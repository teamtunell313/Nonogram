const parseHeaders = (headers) => {
    let headersData = []
    for (const header of headers) { // each header has multiple divs with hints or blanks
        let headerData = {guide: [], determined: 0, needsUpdate: true, complete: false}
        for (const div of header.children) {
            if (div.innerText !== '') { // div has a number, skip blank divs
                if (headerData.guide.length > 0) headerData.determined++; // must be 1 blank between numbers
                const value = parseInt(div.innerText, 10);
                headerData.guide.push(value);
                headerData.determined += value;
            }
        }
        headersData.push(headerData)
    }
    return {
        dimension: headers.length / 2, 
        headers: headersData
    }
}

/**
 * given a dimension length, generates a complete set of possible series solutions, and all possible
 * states of solution for each
 * @param {integer} dimension 
 * @returns 
 */
const generateTestData = (dimension) => {
    // generate actuals
    let maxPattern = Math.pow(2, dimension)
    let headers = []
    let pattern = new Array(dimension).fill('0')
    for(let i = 0; i < maxPattern; i++) {
        let n = i.toString(2);
        let solution = pattern.join('').substring(n.length) + n

        // generate hints
        let sequenceLength = 0
        let hints = []
        for (const digit of solution) {
            if (digit === '0' && sequenceLength > 0) {
                hints.push(sequenceLength)
                sequenceLength = 0
            } 
            if (digit === '1') sequenceLength++
        }
        if (sequenceLength > 0) hints.push(sequenceLength)
        
        // generate states
        let states = []
        for(let j = 0; j < maxPattern; j++) {
            let m = j.toString(2)
            let mask = pattern.join('').substring(m.length) + m
            let state = []
            for (let maskIndex = 0; maskIndex < mask.length; maskIndex++){
                if (mask[maskIndex] === '1') {
                    if(solution[maskIndex] === '1') {
                        state.push(1)
                    } else {
                        state.push(-1)
                    }
                } else {
                    state.push(0)
                }
            }
            states.push(state)
        }
        // console.log({i, solution, hints, states})
        headers.push({i, solution, hints, states})
    }
    return headers
}

export default {parseHeaders, generateTestData};