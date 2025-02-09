import "./Footer.css"

export default function Footer(){
    return(
        <>
            <footer className="footer-container">
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
                        <p>
                            8 (800) 700-22-51
                            Контактный центр
                        </p>
                    </div>
                    <div  className="column">
                        <h3>
                            Обучение
                        </h3>
                        <p>
                            Полная программа с нуля до мидл
                        </p>
                        <p>
                            Джуниор Frontend-разработчик
                        </p>
                        <p>
                            Мидл Frontend-разработчик
                        </p>
                        <p>
                            Диагностика знаний
                        </p>
                        <p>
                            Бесплатные продукты
                        </p>
                        <p>
                            Все курсы
                        </p>
                    </div>
                    <div  className="column">
                        <h3>
                            Проекты
                        </h3>
                        <p>
                            Отзывы
                        </p>
                        <p>
                            Медиа
                        </p>
                        <p>
                            Roadmap
                        </p>
                        <p>
                            Предложить стажировку или вакансию <br/>
                            выпускникам
                        </p>
                    </div >
                    <div className="column">
                        <h3>
                            Компания
                        </h3>
                        <p>
                            О компании
                        </p>
                        <p>
                            Вакансии в Result
                        </p>
                        <p>
                            Контакты
                        </p>
                    </div>
                </div>
                <div className='column-row'>
                    <p className='text-row'>
                        Политика конфиденциальности
                    </p>
                    <p className='text-row'>
                        Договор-оферта
                    </p>
                    <p className='text-row'>
                        © 2025 Result University
                    </p>
                </div>
                <div className='row-text'>
                    Мы используем файлы «cookie», с целью персонализации сервисов и повышения удобства пользования веб-сайтом. «Cookie» представляют собой небольшие файлы, содержащие информацию о предыдущих посещениях веб-сайта. Если вы не хотите, чтобы ваши пользовательские данные обрабатывались, пожалуйста, ограничьте их использование в своём браузере.
                </div>
            </footer>
        </>
    )
}