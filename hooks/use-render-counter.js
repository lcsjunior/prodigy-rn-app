import { useRef } from 'react';

const useRenderCounter = (label) => {
  const counter = useRef(0);
  counter.current++;
  if (__DEV__) {
    console.log(`${label} rendered ${counter.current} times`);
  }
};

export { useRenderCounter };
