import React, { useRef, useState } from 'react';
import './ImageSlider.css';
import img1 from '../../imgs/img1.jpg';
import img2 from '../../imgs/img2.jpg';

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const image2Ref = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsMouseDown(true);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;

    e.preventDefault();

    const imageContainer = e.currentTarget;
    const containerRect = imageContainer.getBoundingClientRect();
    let position = (e.clientX - containerRect.left) / containerRect.width;

    if (position < 0) {
      position = 0;
    } else if (position > 1) {
      position = 1;
    }

    image2Ref.current.style.clipPath = `polygon(${position * 100}% 0, ${position * 100}% 100%, 100% 100%, 100% 0)`;
    sliderRef.current.style.left = `${position * 100}%`;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="image-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <img src={img1} alt="town" className="image image1" />
      <img src={img2} alt="mountain" className="image image2" ref={image2Ref} />
      <div className="slider" ref={sliderRef} onMouseDown={handleMouseDown}>
        <div className="slider-handle"></div>
      </div>
    </div>
  );
};

export default ImageSlider;
