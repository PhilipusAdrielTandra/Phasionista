import React, { useState, useEffect } from 'react';

function ImageSlider() {
  const [imageUrl, setImageUrl] = useState('https://c0.wallpaperflare.com/preview/117/634/419/pheasant-royal-pheasant-syrmaticus-reevesi-bird.jpg');
  const images = ['https://i.pinimg.com/736x/e3/1c/b1/e31cb10206eb4497eda1a715cc5d4f63.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1_RO74s9hmxSQHh391A1na9Jcolx-JlbX2A&usqp=CAU', 'https://c0.wallpaperflare.com/preview/117/634/419/pheasant-royal-pheasant-syrmaticus-reevesi-bird.jpg'];

  const [opacity, setOpacity] = useState(1);
  const [currentIndex, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((currentIndex + 1) % images.length);
      setOpacity(0);
      setTimeout(() => {
        setImageUrl(images[currentIndex]);
        setOpacity(1);
      }, 700);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [images]);

  return (
    <img className="left" src={imageUrl} alt="slider image" style={{opacity: opacity, transition: 'opacity 1s ease-in-out'}} />
  );
}

export default ImageSlider;