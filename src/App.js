import React, { useState } from 'react';
import './App.css';

function App() {
  // const [seconds, setSeconds] = useState(0);
  const start = new Date();

  const clickHandler = (e) => {
    if (e.type === 'click') {
      e.target.className = 'cell blot';
    } else if (e.type === 'contextmenu') {
      e.target.className = 'cell X';
      e.target.innerText = 'X';
    }
  };
  const puzzleHeaders = [
    [4],
    [3],
    [1],
    [2],
    [3],
    [2],
    [3],
    [2, 1],
    [1, 2],
    [2]
  ];

  const dimension = puzzleHeaders.length / 2;
  const taskTop = () => {
    const topArray = puzzleHeaders.slice(0, dimension);
    return (
      <div id="taskTop">
        {topArray.map((group) => (
          <div className="task-group">
            {group.map((cell) => (
              <div className="task-cell">{cell}</div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const taskLeft = () => {
    const leftArray = puzzleHeaders.slice(dimension, puzzleHeaders.length);
    return (
      <div id="taskLeft">
        {leftArray.map((group) => (
          <div className="task-group">
            {group.map((cell) => (
              <div className="task-cell">{cell}</div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const dimensionArray = [];
  for (let i = 0; i < dimension; i += 1) {
    dimensionArray.push(i);
  }

  const resetBoard = () => {
    const allCells = document.getElementsByClassName('cell');
    for (let i = 0; i < allCells.length; i += 1) {
      allCells[i].className = 'cell';
    }
  };

  const finishTime = () => {
    const diff = new Date(new Date() - start);
    document.getElementsByTagName('h3')[0].innerText = `${diff.getUTCMinutes()}:${diff.getUTCSeconds().toString().padStart(2, '0')}:${diff.getUTCMilliseconds()}`;
  };

  return (
    <>
      <div style={{
        margin: '3em',
        padding: '3em',
        border: 'black solid 1px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
      >
        {taskTop()}
        {taskLeft()}
        <div id="grid">
          {dimensionArray.map((row) => (
            <div className="row" count={row}>
              {dimensionArray.map((cell) => (
                <button type="button" className="cell" sequence={row * 5 + cell} onClick={(e) => clickHandler(e)} onContextMenu={(e) => clickHandler(e)}>{row * 5 + cell}</button>
              ))}
            </div>
          ))}
        </div>
        <div>
          <button type="button" id="btnReady" onClick={() => finishTime()}>Done</button>
          <button type="button" id="btnReset" onClick={() => resetBoard()}>Reset</button>
          <h3>Time</h3>
        </div>
      </div>
    </>
  );
}

export default App;
