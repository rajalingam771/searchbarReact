import React, { useEffect, useState, useRef } from 'react';

const TRAFFIC_LIGHT_STATES = [
  { color: 'green', duration: 1200 }, // 2 minutes
  { color: 'red', duration: 3000 },    // 30 seconds
  { color: 'yellow', duration: 1000 }  // 10 seconds
];

const TrafficLight = () => {
  const [currentColor, setCurrentColor] = useState('green');
  const intervalRef = useRef(null);
  const manualTrigger = useRef(false);

  const getNextColor = (color) => {
    const index = TRAFFIC_LIGHT_STATES.findIndex(state => state.color === color);
    return TRAFFIC_LIGHT_STATES[(index + 1) % TRAFFIC_LIGHT_STATES.length];
  };

  const changeLight = () => {
    const nextState = getNextColor(currentColor);
    setCurrentColor(nextState.color);
  };

  const startCycle = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    const { duration } = TRAFFIC_LIGHT_STATES.find(state => state.color === currentColor);

    intervalRef.current = setTimeout(() => {
      if (!manualTrigger.current) {
        changeLight();
      }
    }, duration);
  };

  useEffect(() => {
    startCycle();
    return () => clearTimeout(intervalRef.current);
  }, [currentColor]);

  const handleClick = () => {
    manualTrigger.current = true;
    changeLight();
    setTimeout(() => {
      manualTrigger.current = false;
    }, 100); // resume automatic transition after manual change
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Traffic Light</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100px', margin: 'auto' }}>
        {['red', 'yellow', 'green'].map((color) => (
          <div
            key={color}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: currentColor === color ? color : '#ccc',
              margin: '10px auto'
            }}
          ></div>
        ))}
      </div>
      <button onClick={handleClick} style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}>Change Light</button>
    </div>
  );
};

export default TrafficLight;

