import Button from "@mui/material/Button";
import FeedbackCells from "../feedbackcells/FeedbackCells.tsx";
import './Main.css'
import Typography from "@mui/material/Typography";
import LogoList from "../imgCompany/imgCompany.tsx"
import { logos }  from "../../Data/dataImgComapnyPath.ts"
import InteractiveChart from "../interacrriveGraphics/interactiveGraphics.tsx"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react"

export default  function Main(){
    return(
        <>

            <main className='main'>
                <section>
                    <section className='background-section'>
                        <div className='Main-text'>
                            <h1>Получите профессию frontend-разработчика и постройте карьеру в IT</h1>
                            <div>
                                <h2 className='h2-main-header'>
                                    Устроитесь на работу или вернем деньги, после прохождения полной программы.
                                </h2>
                            </div>
                        </div>
                        <Button
                            variant='contained'
                            sx={{
                                borderRadius: '8px',
                                marginBottom: '10%',
                                justifyContent: 'center',
                                backgroundColor: '#1a1a1a',
                                lineHeight: '20px',
                                padding: '15px 45px',
                                color: '#fff', // Добавьте цвет текста, если нужно
                            }}
                        >
                            Выбрать обучение
                        </Button>
                        <div>
                            <img src='src/assets/peoples.webp' alt='' className='img-section' />
                        </div>
                        <div className='horizontal'>
                            <FeedbackCells
                                img='src/assets/people.svg'
                                feedbackComment='Сопровождение от наставников уровня middle+'
                            ></FeedbackCells>
                            <FeedbackCells
                                img='src/assets/rocket.svg'
                                feedbackComment='Пользователи оценивают программы обучение на 9,6'
                            ></FeedbackCells>
                            <FeedbackCells
                                img='src/assets/stars.svg'
                                feedbackComment='5 лет занимается обучением фронтед-разработке'
                            ></FeedbackCells>
                        </div>
                    </section>
                    <div>
                        <video
                            className='Video-Cource'
                            src = 'src/video/cource.mp4'
                            controls
                            loop
                            muted
                        >
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </div>
                </section>
                <section>
                    <div className='text-for-brend'>
                        <Typography sx={{fontSize: '38px', fontWeight: '800'}}>
                            Специализируемся исключительно на frontend-разработке
                        </Typography>
                        <div className='smalltext-for-brend'>
                            <Typography sx={{fontSize: '16px'}}>
                                Следим за тенденциями рынка и обновляем программу с ведущими разработчиками из топовых IT-компаний.
                            </Typography>
                        </div>
                    </div>
                    <div className='image-container-comapany'>
                        <LogoList logos={logos}></LogoList>
                    </div>
                    <div className='container-graphics'>
                        <InteractiveChart></InteractiveChart>
                    </div>
                </section>
                <section className='section-guarantee'>
                    <div className= 'section-guarantee-left'>
                        <div>
                            <p className='font-text'>
                                <strong className='font-strong-text'>Гарантируем трудоустройство — вернём деньги без скрытых условий</strong><br/>
                                Чтобы устроиться в IT и получить все прелести этой работы, недостаточно выучиться до уровня джуна. Надо трудоустраиваться при первой возможности и сразу целиться в мидл.
                            </p>
                        </div>
                        <div className='div-img-shield'>
                            <img src='/src/assets/message/shield.webp' className='img-shield-logo'/>
                        </div>
                    </div>
                    <div className='section-guarantee-right'>
                       <img src='src/assets/message/garanty.webp' className='img-garanty-logo' />
                    </div>

                </section>
                <section>
                    <p className='paragraph-button'>
                        Вы можете проходить программу полностью или частями
                    </p>
                    <div className='buttons-container button-href'>
                        <a href='' className='button-link'>
                            <img src='src/assets/button-img/frontend-developer.webp' className='img-button'/>
                            <p className='paragraph-button'>
                                Профессия frontend-разработчик
                            </p>
                        </a>
                    </div >
                    <div className='buttons-container'>
                        <div className='button-href'>
                            <a href='' className='button-link'>
                                <img src='src/assets/button-img/junior-developer.webp' className='img-button'/>
                                <p className='paragraph-button'>
                                    Джуниор
                                </p>
                            </a>
                        </div>
                        <div className='button-href'>
                            <a href='' className='button-link'>
                                <img src='src/assets/button-img/middle-developer.webp' className='img-button'/>
                                <p className='paragraph-button'>
                                    Мидл
                                </p>
                            </a>
                        </div>
                    </div>
                    <div className='buttons-container'>
                        <div className='button-href'>
                            <a href='' className='button-link'>
                                <img src='src/assets/button-img/js.webp' className='img-button'/>
                                <p className='paragraph-button'>
                                    Javascript
                                </p>
                            </a>
                        </div>
                        <div className='two-button-href'>
                            <a href='' className='button-link'>
                                <img src='src/assets/button-img/react.webp' className='img-button'/>
                                <p className='paragraph-button'>
                                    React-разработчик
                                </p>
                            </a>
                        </div>
                        <div className='button-href'>
                            <a href='' className='button-link'>
                                <img src='src/assets/button-img/diagnostic.webp' className='img-button'/>
                                <p className='paragraph-button'>
                                    Диагностика
                                </p>
                            </a>
                        </div>
                        <div className='button-href'>
                            <a href='' className='button-link'>
                                <img src='src/assets/button-img/technologies.webp' className='img-button'/>
                                <p className='paragraph-button'>
                                    Технологии
                                </p>
                            </a>
                        </div>
                        <div className='button-href'>
                            <a href='' className='button-link'>
                                <p className='button-paragraph-link'>
                                    Все курсы
                                </p>
                            </a>
                        </div>
                    </div>
                </section>


            </main>
        </>
    )
}