import React, { useEffect, useRef } from 'react';
import './ImageDrawer.css';

const ImageDrawer = ({ imageUrl }) => {
  const imageRef = useRef(null);
  
  const imgBackgroundRef = useRef(null);
  
  useEffect(() => {
    if (!imageUrl) return;

    const image = imageRef.current;
    
    const imgBackground = imgBackgroundRef.current;

    let currPhase = 0;
    

    const timing = {
      borderPencil: '0.4s',
      pencilShades: '0.8s',
      colorShades: '0.8s',
      fullColors: '0.4s'
    };

    
      

    const drawImage = () => {
      image.classList.add('borderPencil');

      const onAnimationEnd = () => {
        const phases = ['borderPencil', 'pencilShades', 'colorShades', 'fullColors'];

        currPhase++;

        if (currPhase >= phases.length) {
          image.classList.remove('fullColors', 'visibleImage');
          return;
        }

        image.classList.remove(phases[currPhase - 1]);
        image.classList.add(phases[currPhase]);
        image.style.animationDuration = timing[phases[currPhase]];
      };

      image.addEventListener('animationend', onAnimationEnd);
    };

    drawImage();

    return () => {
      
    };
  }, [imageUrl]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img style={{width:'600px'}} ref={imageRef} src={imageUrl} alt="Drawing Image" />
      <div ref={imgBackgroundRef} className="imgBackground"></div>
    </div>
  );
};

export default ImageDrawer;
