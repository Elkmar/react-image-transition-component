import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ImageSlider.css';
import img1 from '../../imgs/img1.jpg';
import img2 from '../../imgs/img2.jpg';

const ImageSlider = () => {
    const sliderRef = useRef(null);
    const image2Ref = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleDown = (e) => {
        e.preventDefault();
        setIsMouseDown(true);
        handleMove(e); // Ajout de cette ligne
    };

    const handleMove = useCallback(
        (e) => {
            if (!isMouseDown && e.type !== 'mousedown' && e.type !== 'touchstart') return;

            e.preventDefault();

            const imageContainer = sliderRef.current.parentElement;
            const containerRect = imageContainer.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            let position = (clientX - containerRect.left) / containerRect.width;

            const maxPosition = 1 - sliderRef.current.offsetWidth / containerRect.width;

            if (position < 0) {
                position = 0;
            } else if (position > maxPosition) {
                position = maxPosition;
            }

            image2Ref.current.style.clipPath = `polygon(${position * 100}% 0, ${position * 100}% 100%, 100% 100%, 100% 0)`;
            sliderRef.current.style.left = `${position * 100}%`;
        },
    [isMouseDown]
    );

    const handleUp = () => {
        setIsMouseDown(false);
    };

    useEffect(() => {
        if (isMouseDown) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchend', handleUp);
        } else {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isMouseDown, handleMove]);

    return (
        <div className="image-container" onMouseDown={handleDown} onTouchStart={handleDown}>
            <img src={img1} alt="town" className="image image1" />
            <img src={img2} alt="mountain" className="image image2" ref={image2Ref} />
            <div className="slider" ref={sliderRef}></div>
        </div>
    );
};

export default ImageSlider;
