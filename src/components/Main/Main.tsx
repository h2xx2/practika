import Button from "@mui/material/Button";
import FeedbackCells from "../feedbackcells/FeedbackCells.tsx";
import './Main.css'
import Typography from "@mui/material/Typography";


export default  function Main(){
    return(
        <>

            <main>
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
                            <img src='src/assets/home-hero.svg' alt='' className='img-section' />
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
                    <div>
                        <img src='src/' alt='' className='img-section' />
                    </div>
                </section>



            </main>
        </>
    )
}