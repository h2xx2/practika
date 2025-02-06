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
import BlockAdventage from "../BlockAdventage/BlockAdventage.tsx";
import ButtonSection from "../../ex.tsx";

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
                    <ButtonSection></ButtonSection>

                <section>
                    <div className='head-start'>
                        <div className='head-title'>
                            <p className='table-of-content'>
                                Не знаете с чего начать? <br/>
                                Выберите, что вам подходит
                            </p>
                        </div>
                        <div className='head-img'>
                            <img src='src/assets/start-section/head-img.webp' className='head-start-img'/>
                        </div>
                    </div>

                    <div className='start-container-block'>
                        <div className='start-container-left'>
                            <img src='src/assets/start-section/htmlcssicon.webp' className='small-img-start'/>
                            <p className='text-start-container'>
                            <strong className='big-text'>HTML CSS</strong><br/>
                            Если вы еще не писали код, но хотите<br/>
                            попробовать. Разработаете свой<br/>
                            первый сайт за 2 недели (в вузе это<br/>
                            изучают полгода).
                            <a className='html-css-link'>
                                <p>
                                    Пройти бесплатно→
                                </p>
                            </a>
                        </p>
                        </div>
                        <div className='start-container-right'>
                            <img src='src/assets/start-section/diagnostic.webp' className='start-img'/>
                        </div>
                    </div>
                    <div className='start-container-block'>
                        <div className='start-container-left'>
                        <img src='src/assets/start-section/diagnosticIcon.webp' className='small-img-start'/>
                        <p className='text-start-container'>
                            <strong className='big-text'>Диагностика</strong><br/>
                            Если вы уже умеете писать код. За 90<br/>
                            минут выявим ваши слабые и сильные<br/> стороны
                            и подскажем, в каком<br/>
                            направлении двигаться.
                            <a className='diagnostic-link'>
                                <p>
                                    Подробнее→
                                </p>
                            </a>
                        </p>
                        </div>
                        <div className='start-container-right'>
                            <img src='src/assets/start-section/diagnostic.webp' className='start-img'/>
                        </div>
                    </div>
                </section>
                <section>
                    <p>
                        76% наших выпускников устраиваются на работу в первые 3 месяца
                    </p>
                    <p>
                        Остальные студенты устраиваются в течение 6 месяцев после выпуска на этапе «Джуниор», а на «Мидле» — во время обучения.
                    </p>
                    <p>
                        Смотреть истории наших учеников→
                    </p>
                    <div className='img-div'>
                        <img src='src/assets/confirmition/peoples-1.webp' className='img-people'/>
                        <img src='src/assets/confirmition/peoples-2.webp' className='img-people'/>
                    </div>
                    <div>
                        <div className='block-adventage'>
                            <BlockAdventage textNumber='9.6' text='Средняя оценка обучения'/>
                            <BlockAdventage textNumber='2000+' text='Студентов получили диплом'/>
                            <BlockAdventage textNumber='140T' text='Средняя зарплата выпускника'/>
                        </div>
                        <div className='job-block'>
                            <div className='main-css-style job-block-left'>
                                <h3 className='h3-job-title'>
                                    Яндекс, Роснефть, Мегафон
                                </h3>
                                <p>
                                    И еще более 20 крупных отечественных и<br/>
                                    зарубежных компаний наняли наших выпускников на<br/>
                                    позиции junior и middle-разработчиков.
                                </p>
                                <img src='src/assets/confirmition/companies.webp' className='img-job'/>
                            </div>
                            <div className='main-css-style job-block-right'>
                                <h3 className='h3-job-title'>
                                    Студенты работают по всему миру
                                </h3>
                                <p>
                                    Знания, полученные в Result, ценят не только на<br/>
                                    российском рынке. Наши ученики работают и<br/>
                                    заграницей, например, Павел Волков из Таллина.
                                </p>
                                <a>
                                    Читать историю Павла→
                                </a>
                                <img src='src/assets/confirmition/hello-result.webp' className='img-job img-job-right'/>
                            </div>
                        </div>
                        <div>
                            <div>

                            </div>
                            <div>
                                <div>

                                </div>
                                <div>

                                </div>
                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}