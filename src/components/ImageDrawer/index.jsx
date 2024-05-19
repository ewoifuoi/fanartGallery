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
      borderPencil: '0.2s',
      pencilShades: '1s',
      colorShades: '0.4s',
      fullColors: '0.4s'
    };

    
      

    const drawImage = () => {
      image.src = imageUrl;
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
  }, []);

  return (
    <div className='p-2 border border-3 d-flex justify-content-center rounded' style={{width:'900px',height:'auto'}}>
      <div style={{backgroundColor:'black'}}>
        <img style={{width:'900px'}} ref={imageRef} src="" />
        <div ref={imgBackgroundRef} className="imgBackground"></div>
      </div>
    </div>
    
  );
};

export default ImageDrawer;
