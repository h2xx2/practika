import React, { useState, useEffect } from 'react';

const ButtonSection: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveButton((prev) => (prev + 1) % 7); // 7 кнопок
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className='container-buttons-main'>
            <p className='paragraph-main-button'>
                Вы можете проходить программу полностью или частями
            </p>

            <div className={`buttons-container button-href ${activeButton === 0 ? 'active' : ''}`}>
                <a href='' className='button-link'>
                    <img src='src/assets/button-img/frontend-developer.webp' className='img-button' alt='Frontend' />
                    <p className='paragraph-button'>Профессия frontend-разработчик</p>
                </a>
            </div>

            <div className='buttons-container'>
                <div className={`button-href buttons-container ${activeButton === 1 ? 'active' : ''}`}>
                    <a href='' className='button-link'>
                        <img src='src/assets/button-img/junior-developer.webp' className='img-button' alt='Junior' />
                        <p className='paragraph-button'>Джуниор</p>
                    </a>
                </div>
                <div className={`button-href buttons-container ${activeButton === 2 ? 'active' : ''}`}>
                    <a href='' className='button-link'>
                        <img src='src/assets/button-img/middle-developer.webp' className='img-button' alt='Middle' />
                        <p className='paragraph-button'>Мидл</p>
                    </a>
                </div>
            </div>

            <div className='buttons-container'>
                <div className={`button-href buttons-container ${activeButton === 3 ? 'active' : ''}`}>
                    <a href='' className='button-link'>
                        <img src='src/assets/button-img/js.webp' className='img-button' alt='JS' />
                        <p className='paragraph-button'>Javascript</p>
                    </a>
                </div>
                <div className={`two-button-href buttons-container ${activeButton === 4 ? 'active' : ''}`}>
                    <a href='' className='button-link'>
                        <img src='src/assets/button-img/react.webp' className='img-button' alt='React' />
                        <p className='paragraph-button'>React-разработчик</p>
                    </a>
                </div>
                <div className={`button-href buttons-container ${activeButton === 5 ? 'active' : ''}`}>
                    <a href='' className='button-link'>
                        <img src='src/assets/button-img/diagnostic.webp' className='img-button' alt='Diagnostic' />
                        <p className='paragraph-button'>Диагностика</p>
                    </a>
                </div>
                <div className={`button-href buttons-container ${activeButton === 6 ? 'active' : ''}`}>
                    <a href='' className='button-link'>
                        <img src='src/assets/button-img/technologies.webp' className='img-button' alt='Technologies' />
                        <p className='paragraph-button'>Технологии</p>
                    </a>
                </div>
                <div className='button-p-href buttons-container'>
                    <a href='' className='button-p-link'>
                        <p className='button-paragraph-link'>Все курсы →</p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ButtonSection;