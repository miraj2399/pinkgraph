'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function SlideShow({ images }) {
  const intervals = {
    off: null,
    '2s': 2000,
    '3s': 3000,
    '5s': 5000,
    '10s': 10000,
    '20s': 20000,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideshow, setAutoSlideshow] = useState('3s'); // Default auto slideshow interval is 3s
  const [intervalId, setIntervalId] = useState(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const startAutoSlideshow = () => {
    clearInterval(intervalId);
    if (autoSlideshow !== 'off') {
      const id = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, intervals[autoSlideshow]);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    startAutoSlideshow();
    return () => clearInterval(intervalId);
  }, [currentIndex, autoSlideshow]); // Include dependencies for useEffect

  const handleAutoSlideshowChange = (e) => {
    setAutoSlideshow(e.target.value);
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <Image src={images[currentIndex]} alt="photo" unoptimized />
      </div>
      <div className="flex justify-between items-center">
        <button onClick={handlePrev} className="bg-white/50 hover:bg-white/70 p-2 rounded-md">
          &#9664; {/* Unicode character for left arrow */}
        </button>
        <button onClick={handleNext} className="bg-white/50 hover:bg-white/70 p-2 rounded-md">
          &#9654; {/* Unicode character for right arrow */}
        </button>
        <select
          value={autoSlideshow}
          onChange={handleAutoSlideshowChange}
          className="bg-white/50 hover:bg-white/70 p-2 rounded-md"
        >
          <option value="off">Off</option>
          <option value="2s">2s</option>
          <option value="3s">3s</option>
          <option value="5s">5s</option>
          <option value="10s">10s</option>
          <option value="20s">20s</option>
        </select>
      </div>
    </div>
  );
}
