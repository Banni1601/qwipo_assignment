import React, { useRef } from 'react';
import './InteractiveImage.css'



//Component for InteractiveImage
const InteractiveImage = () => {
    const imageRef = useRef(null);
    
    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        imageRef.current.style.transform = `translate(-${x / 5}%, -${y / 5}%)`;
    };

    return (
        <div
            ref={imageRef}
            className=" interactive_image overflow-hidden rounded-lg transition-transform duration-100"
            onMouseMove={handleMouseMove}
            style={{
                backgroundImage: `url(${"https://img.freepik.com/free-photo/3d-rendering-kid-playing-digital-game_23-2150898496.jpg"})`,
                backgroundSize: 'cover',
                transition: 'transform 0.1s',
            }}
        >  
        </div>
    );
};

export default InteractiveImage;
