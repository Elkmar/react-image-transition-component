import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ImageSlider.css';
import img1 from '../../imgs/img1.png';
import img2 from '../../imgs/img2.png';

const ImageSlider = () => {
    const sliderRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleDown = (e) => {
        e.preventDefault();
        setIsMouseDown(true);
        handleMove(e); 
    };

    const handleMove = useCallback(
        (e) => {
            if (!isMouseDown && e.type !== 'mousedown' && e.type !== 'touchstart') return;

            e.preventDefault();

            const imageContainer = sliderRef.current.parentElement;
            const containerRect = imageContainer.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            let position = (clientX - containerRect.left) / containerRect.width;

            if (position < 0) {
                position = 0;
            } else if (position > 1) {
                position = 1;
            }

            sliderRef.current.style.left = `${position * 100}%`;
            document.documentElement.style.setProperty('--slider-position', `${position * 100}%`);
        },
        [isMouseDown]
    );

    const handleUp = useCallback(() => {
        setIsMouseDown(false);
    }, []);

    useEffect(() => {
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchend', handleUp);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, [handleUp]);

    useEffect(() => {
        if (isMouseDown) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('touchmove', handleMove);
        } else {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, [isMouseDown, handleMove]);

    return (
        <div className="image-container" onMouseDown={handleDown} onTouchStart={handleDown}>
            <img src={img1} alt="image1" className="image image1" />
            <img src={img2} alt="image2" className="image image2" />
            <div className="slider" ref={sliderRef}></div>
        </div>
    );
};

export default ImageSlider;
