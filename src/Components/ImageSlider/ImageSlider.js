import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ beforeImage, afterImage }) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [position, setPosition] = useState(50);
    const imageContainerRef = useRef(null);
    const sliderRef = useRef(null);

    const handleMove = useCallback(
        (clientX) => {
            if (imageContainerRef.current) {
                const { left, width } = imageContainerRef.current.getBoundingClientRect();
                let newPosition = ((clientX - left) / width) * 100;
                newPosition = Math.max(0, Math.min(100, newPosition));
                setPosition(newPosition);
            }
        },
        []
    );

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseMove = useCallback(
        (e) => {
            if (isMouseDown) {
                handleMove(e.clientX);
            }
        },
        [isMouseDown, handleMove]
    );

    const onTouchStart = () => setIsMouseDown(true);
    const onTouchEnd = () => setIsMouseDown(false);
    
    const onTouchMove = useCallback(
        (e) => {
            if (isMouseDown) {
                handleMove(e.touches[0].clientX);
            }
        },
        [isMouseDown, handleMove]
    );

    const onKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            setPosition((prev) => Math.max(0, prev - 5));
        } else if (e.key === 'ArrowRight') {
            setPosition((prev) => Math.min(100, prev + 5));
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    }, [onMouseMove, onTouchMove]);

    return (
        <div
            className="image-container"
            ref={imageContainerRef}
            style={{ '--slider-position': `${position}%` }}
            role="slider"
            aria-valuenow={position}
            aria-valuemin="0"
            aria-valuemax="100"
            tabIndex="0"
            onKeyDown={onKeyDown}
            aria-label="Image Comparison Slider"
        >
            <img src={beforeImage} alt="Before" className="image image-before" />
            <img src={afterImage} alt="After" className="image image-after" />
            <div className="slider" ref={sliderRef} onMouseDown={onMouseDown} onTouchStart={onTouchStart}></div>
        </div>
    );
};

export default ImageSlider;
