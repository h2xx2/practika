import { useState, useEffect } from 'react';

const ImageSlider = () => {
    const images = [
        "src/assets/img-slider/technologiesBigImg.webp",
        "src/assets/img-slider/reactBigImg.webp",
        "src/assets/img-slider/middleBigImg.webp",
        "src/assets/img-slider/juniorBigImg.webp",
        "src/assets/img-slider/jsBigImg.webp",
        "src/assets/img-slider/frontendBigImg.webp",
        "src/assets/img-slider/diagnosticBigImg.webp",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, [images.length]);

    return (
        <div className='container'>
            <img src={images[currentIndex]} alt="Dynamic Image" style={{
                width: '100%',
                height: 'auto',
            }} />
        </div>
    );
};

export default ImageSlider;