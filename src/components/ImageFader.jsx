import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const ImageFader = ({ images, width, height, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images, interval]);

  return (
    <Box
      width={width}
      height={height}
      overflow="hidden"
      position="relative"
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 1s',
          }}
        />
      ))}
    </Box>
  );
};

export default ImageFader;
