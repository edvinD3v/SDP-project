import { useState } from 'react';

const useRandomMathOperation = () => {
  const [x, setX] = useState<number>(1);
  const [y, setY] = useState<number>(1);

  const generateTask = (operator: string) => {
    const randomNumber = () => Math.floor(Math.random() * 9) + 1;
  
    if (operator === '/') {
      const y = randomNumber();
      const x = y * randomNumber();
      setX(x);
      setY(y);
    } else if (operator === '-') {
      let x = randomNumber();
      let y = randomNumber();
      while (x < y) {
        x = randomNumber();
        y = randomNumber();
      }
      setX(x);
      setY(y);
    } else {
      setX(randomNumber());
      setY(randomNumber());
    }
  };

  return { x, y, generateTask };
};

export default useRandomMathOperation;
