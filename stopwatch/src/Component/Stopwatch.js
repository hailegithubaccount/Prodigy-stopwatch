import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const padTime = (unit) => String(unit).padStart(2, '0');
  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]); // Store history of times
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setHistory((prevHistory) => [...prevHistory, time]); // Save current time to history
    }
  };

  const resetTimer = () => {
    setTime(0); // Reset the time
  };

  const clearHistory = () => {
    setHistory([]); // Clear the history
  };

  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>
      <button id="clear-history" onClick={clearHistory}>
        Clear History
      </button>

      <div className="history">
        <h3>History</h3>
        {history.length === 0 ? (
          <p>No records yet</p>
        ) : (
          <ul>
            {history.map((record, index) => (
              <li key={index}>{formatTime(record)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
