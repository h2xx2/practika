import "./Footer.css"

export default function Footer(){
    return(
        <>
            <footer className="footer-container">
                <div className="footer-main-container">
                    <div className="columns">
                        <div className="column">
                            <h3>
                                Result Univercsty
                            </h3>
                            <p>
                                Делаем жизнь людей лучше, при помощи обучения веб-<br/>
                                разработке, и трансформируем систему образования для<br/>
                                создания востребованных IT-специалистов.
                            </p>
                            <p>
                                г. Санкт-Петербург / All World<br/>
                                10:00–20:00 MSK • GMT +3<br/>
                                hello@result.school
                            </p>
                            <p className='number-container'>
                                <strong className='number'>8 (800) 700-22-51</strong><br/>
                                Контактный центр
                            </p>
                        </div>
                        <div  className="column">
                            <h3>
                                Обучение
                            </h3>
                            <p className='color-text'>
                                Полная программа с нуля до мидл
                            </p>
                            <p className='color-text'>
                                Джуниор Frontend-разработчик
                            </p>
                            <p className='color-text'>
                                Мидл Frontend-разработчик
                            </p>
                            <p className='color-text'>
                                Диагностика знаний
                            </p>
                            <p className='color-text'>
                                Бесплатные продукты
                            </p>
                            <p className='color-text'>
                                Все курсы
                            </p>
                        </div>
                        <div  className="column">
                            <h3>
                                Проекты
                            </h3>
                            <p className='color-text'>
                                Отзывы
                            </p>
                            <p className='color-text'>
                                Медиа
                            </p>
                            <p className='color-text'>
                                Roadmap
                            </p>
                            <p className='color-text'>
                                Предложить стажировку или вакансию <br/>
                                выпускникам
                            </p>
                        </div >
                        <div className="column">
                            <h3>
                                Компания
                            </h3>
                            <p className='color-text'>
                                О компании
                            </p>
                            <p className='color-text'>
                                Вакансии в Result
                            </p>
                            <p className='color-text'>
                                Контакты
                            </p>
                        </div>
                    </div>
                    <div className='column-row'>
                        <p className='text-row color-text'>
                            Политика конфиденциальности
                        </p>
                        <p className='text-row color-text'>
                            Договор-оферта
                        </p>
                        <p className='text-row color'>
                            © 2025 Result University
                        </p>
                    </div>
                    <div className='row-text color'>
                        <p>
                            Мы используем файлы «cookie», с целью персонализации сервисов и повышения удобства пользования веб-сайтом. «Cookie» представляют собой небольшие файлы, содержащие информацию о предыдущих посещениях веб-сайта. Если вы не хотите, чтобы ваши пользовательские данные обрабатывались, пожалуйста, ограничьте их использование в своём браузере.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}