// ImageSlider.tsx
import React, { useState } from 'react';
import styles from '@/styles/ImageSlider.module.css';

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/svgFrame/zigzag_fine.svg',
    '/svgFrame/zigzag_simple.svg',
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.slider}>
      <button className={`${styles.button} ${styles.prev}`} onClick={prevImage}>Prev</button>
      <div className={styles.imagesContainer} style={{ transform: `translateX(-${Number(currentIndex * 100)}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} className={styles.image} />
        ))}
      </div>
      <button className={`${styles.button} ${styles.next}`} onClick={nextImage}>Next</button>
    </div>
  );
};

export default ImageSlider;

