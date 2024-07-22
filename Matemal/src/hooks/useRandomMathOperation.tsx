import { useState } from 'react';

const useRandomMathOperation = () => {
  const [x, setX] = useState<number>(1);
  const [y, setY] = useState<number>(1);
  const [prevTask, setPrevTask] = useState<{ x: number; y: number }>({ x: 1, y: 1 });

  const generateTask = (operator: string, finalNumber: number) => {
    const randomNumber = () => Math.floor(Math.random() * finalNumber) + 1;
  
    let newX: number;
    let newY: number;

    do {
      if (operator === '/') {
        newY = randomNumber();
        while (newY === 1) {
          newY = randomNumber();
        }
        newX = newY * randomNumber();
        while (newX === newY) {
          newY = randomNumber();
          while (newY === 1) {
            newY = randomNumber();
          }
          newX = newY * randomNumber();
        }
      } else if (operator === '-') {
        newX = randomNumber();
        newY = randomNumber();
        while (newX < newY) {
          newX = randomNumber();
          newY = randomNumber();
        }
      } else {
        newX = randomNumber();
        newY = randomNumber();
      }
    } while (newX === prevTask.x && newY === prevTask.y);

    setX(newX);
    setY(newY);
    setPrevTask({ x: newX, y: newY });
  };

  return { x, y, generateTask };
};

export default useRandomMathOperation;
