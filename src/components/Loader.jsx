import React, { useState, useEffect } from 'react';
import '../styles/loader.css';

const Loader = ({ onLoadingComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [isDissolving, setIsDissolving] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage(prev => {
        if (prev === 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDissolving(true);
            setTimeout(() => {
              onLoadingComplete?.();
            }, 2500); // Match this with CSS animation duration
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`loader-container ${isDissolving ? 'dissolving' : ''}`}>
      <div className="loader-content">
        <h1 className="percentage font-prosto">
          {percentage}%
        </h1>
      </div>
    </div>
  );
};

export default Loader;