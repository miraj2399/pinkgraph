'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const Slideshow = ({ images, width = 500, height = 500 }) => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((oldIndex) => {
            let newIndex = oldIndex + 1;
            if (newIndex === images.length) {
                newIndex = 0; // Go back to the first image
            }
            return newIndex;
        });
    };

    const prevSlide = () => {
        setIndex((oldIndex) => {
            let newIndex = oldIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1; // Go to the last image
            }
            return newIndex;
        });
    };

    return (
        <div>
            <Image
                src={images[index]}
                width={width}
                height={height}
                alt="Slideshow"
            />
            <button onClick={prevSlide}>Previous</button>
            <button onClick={nextSlide}>Next</button>
        </div>
    );
};

export default Slideshow;