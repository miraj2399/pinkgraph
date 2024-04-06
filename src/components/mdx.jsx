'use client'
import dynamic from 'next/dynamic';

// Other imports...
import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'

import { Feedback } from '@/components/Feedback'
import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'
import React, { useState, useEffect } from 'react';

export function Slideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideshow, setAutoSlideshow] = useState('3s'); // Default auto slideshow interval is 3s
  const intervals = {
    off: null,
    '2s': 2000,
    '3s': 3000,
    '5s': 5000,
    '10s': 10000,
    '20s': 20000,
  };
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
  }, [currentIndex, autoSlideshow]);

  const handleAutoSlideshowChange = (e) => {
    setAutoSlideshow(e.target.value);
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <ImageWrapper image={images[currentIndex]} />
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





export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'

export function ImageWrapper({image}) {
  return (
    
            <Image
              src={image}
              alt="photo"
              unoptimized
            />
  )
}



export function wrapper({ children }) {
  return (
    <article className="flex h-full flex-col pb-10 pt-16">
      <Prose className="flex-auto">{children}</Prose>
      <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
        <Feedback />
      </footer>
    </article>
  )
}



export const h2 = function H2(props) {
  return <Heading level={2} {...props} />
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({ name, children, type }) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {type}
            </dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}
