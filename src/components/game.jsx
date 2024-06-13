import React, { useState, useEffect } from 'react';
import { Shape } from 'react-konva';

const Game = () => {
  const [shapes, setShapes] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes = Array.from({ length: Math.floor(Math.random() * (15 - 5 + 1)) + 5 }, () => ({
        type: getRandomShapeType(),
        color: getRandomColor(),
        x: getRandomInteger(0, 100),
        y: getRandomInteger(0, 100),
      }));
      setShapes(newShapes);
    };
    generateShapes();
    setInterval(generateShapes, 60000); // refresh every 1 minute
  }, []);

  const getRandomShapeType = () => {
    const shapeTypes = ['square', 'circle', 'triangle'];
    return shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  };

  const getRandomColor = () => {
    const colors = ['red', 'yellow', 'blue', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleShapeClick = (shape) => {
    if (shape.color === 'blue' && shape.type === 'triangle') {
      setScore(score + 10);
      // display confetti
    } else {
      // play beep sound
    }
  };

  return (
    <div className="play-area">
      {shapes.map((shape, index) => (
        <Shape
          key={`${shape.type}-${shape.color}-${index}`}
          type={shape.type}
          color={shape.color}
          x={shape.x}
          y={shape.y}
          onClick={() => handleShapeClick(shape)}
        />
        
      ))}
      <div>GAME</div>
    </div>
  );
};

export default Game;