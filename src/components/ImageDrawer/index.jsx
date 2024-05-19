import React, { useEffect, useRef, useState } from 'react';
import './ImageDrawer.css';

const ImageDrawer = ({ 
  duration = { borderPencil: 6, pencilShades: 4, colorShades: 5, fullColors: 5 }, 
  callback = null, 
  pencil = null, 
  background = null 
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const pencilRef = useRef(null);
  const [currPhase, setCurrPhase] = useState(0);

  useEffect(() => {
    const image = imageRef.current;
    let pencilAnimationID = null;

    const timing = {
      borderPencil: `${duration.borderPencil}s`,
      pencilShades: `${duration.pencilShades}s`,
      colorShades: `${duration.colorShades}s`,
      fullColors: `${duration.fullColors}s`
    };

    const setPencilAnimation = (pencil, opt) => {
      let x = opt.pos.fromBottom ? opt.width : opt.pos.marginLeft;
      let y = opt.pos.fromBottom ? opt.height : opt.pos.marginTop;
      let Y = opt.pos.invertAxis ? 5.925925 : 177.77777;
      let X = opt.pos.invertAxis ? 100 : 10;
      let xStep = opt.width / X;
      let yStep = opt.height / Y;
      let xNextStep = x + xStep;
      let yNextStep = y + yStep;
      let X_init = x;
      let Y_init = y;

      if (opt.pos.fromBottom) {
        X_init = opt.pos.marginLeft;
        Y_init = opt.pos.marginTop;
        xStep = -xStep;
        yStep = -yStep;
      }

      const pencilAnim = () => {
        pencil.style.transform = `translate3d(${x}px, ${y}px, 0px)`;

        if (xNextStep >= opt.width || xNextStep <= X_init) xStep = -xStep;
        x += xStep;
        xNextStep = x + xStep;

        if (yNextStep >= opt.height || yNextStep < Y_init) yStep = -yStep;
        y += yStep;
        yNextStep = y + yStep;

        pencilAnimationID = requestAnimationFrame(pencilAnim);
      };

      pencilAnimationID = requestAnimationFrame(pencilAnim);
    };

    if (pencil && typeof pencil === 'object') {
      const pencilElement = document.createElement('img');
      pencilElement.src = pencil.src;
      pencilElement.style.position = 'absolute';
      pencilElement.style.width = typeof pencil.width === 'number' ? `${pencil.width}px` : pencil.width;
      pencilElement.style.height = typeof pencil.height === 'number' ? `${pencil.height}px` : pencil.height;
      pencilElement.style.zIndex = 1500;

      pencilRef.current = pencilElement;
      containerRef.current.prepend(pencilElement);

      setPencilAnimation(pencilElement, {
        height: image.height + pencil.marginTop,
        width: image.width + pencil.marginLeft,
        pos: pencil
      });
    }

    if (background) {
      const backgroundElement = document.createElement('div');
      backgroundElement.className = 'imgBackground';
      backgroundElement.style.backgroundColor = background;
      backgroundElement.style.animationDuration = timing.borderPencil;
      backgroundElement.style.width = `${containerRef.current.offsetWidth}px`;
      backgroundElement.style.height = `${containerRef.current.offsetHeight}px`;

      containerRef.current.prepend(backgroundElement);
    }

    image.classList.add('visibleImage', 'borderPencil');
    image.style.animationDuration = timing.borderPencil;

    const handleAnimationEnd = () => {
      switch (currPhase) {
        case 0:
          image.classList.remove('borderPencil');
          image.classList.add('pencilShades');
          image.style.animationDuration = timing.pencilShades;
          setCurrPhase(1);
          break;
        case 1:
          image.classList.remove('pencilShades');
          image.classList.add('colorShades');
          image.style.animationDuration = timing.colorShades;
          setCurrPhase(2);
          break;
        case 2:
          image.classList.remove('colorShades');
          image.classList.add('fullColors');
          image.style.animationDuration = timing.fullColors;
          setCurrPhase(3);
          break;
        case 3:
          image.style.filter = 'brightness(1.05) saturate(1.05)';
          image.classList.remove('fullColors', 'visibleImage');

          if (pencilAnimationID !== null) {
            cancelAnimationFrame(pencilAnimationID);

            if (pencil.disappear) {
              pencilRef.current.classList.add('pencil');
              pencilRef.current.style.animationDuration = `${pencil.disappear}s`;
              setTimeout(() => {
                pencilRef.current.remove();
                if (callback) callback();
              }, pencil.disappear * 1000);
            } else {
              pencilRef.current.remove();
              if (callback) callback();
            }
          } else if (callback) {
            callback();
          }
          break;
        default:
          break;
      }
    };

    image.addEventListener('animationend', handleAnimationEnd);

    return () => {
      image.removeEventListener('animationend', handleAnimationEnd);
      if (pencilAnimationID !== null) cancelAnimationFrame(pencilAnimationID);
    };
  }, [currPhase, duration, callback, pencil, background]);

  return (
    <div ref={containerRef}>
      <img ref={imageRef} src="./path/to/image/image.jpg" alt="To be drawn" />
    </div>
  );
};

export default ImageDrawer;
