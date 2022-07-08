export function parseHeaders(headers) {
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