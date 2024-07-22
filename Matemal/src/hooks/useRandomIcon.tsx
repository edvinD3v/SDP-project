import { useState, useEffect } from 'react';
import icons from '../data/icons';

const useRandomIcon = (x: number, y: number) => {
  const [randomIcon, setRandomIcon] = useState(icons[0]);

  useEffect(() => {
    const getRandomIcon = () => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setRandomIcon(icons[randomIndex]);
    };

    getRandomIcon(); // Initial random image

    return () => {
      // Cleanup function (if needed)
    };
  }, [x, y]);

  return randomIcon;
};

export default useRandomIcon;
