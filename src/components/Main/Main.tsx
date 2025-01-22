import Button from "@mui/material/Button";
import FeedbackCells from "../FeedbackCells.tsx";
import './Main.css'


export default  function Main(){
    return(
        <>
            <main>
                <section className='background-section'>
                <h1>Получите профессию frontend-разработчика и постройте карьеру в IT</h1>
                <h2>Устроитесь на работу или вернем
                деньги, после прохождения полной программы.</h2>
                <Button variant='contained' sx={{
                    borderRadius: '8px',
                    justifyContent: 'center',
                    backgroundColor: '#1a1a1a',
                    lineHeight: '20px',
                    padding: '15px 45px',
                    color: '#fff' // Добавьте цвет текста, если нужно
                }}>Выбрать обучение</Button>
                    <div className='horizontal'>
                        <FeedbackCells img = 'src/assets/people.svg' feedbackComment = 'Сопровождение от наставников уровня middle+'></FeedbackCells>
                        <FeedbackCells img = 'src/assets/rocket.svg' feedbackComment = 'Пользователи оценивают программы обучение на 9,6'></FeedbackCells>
                        <FeedbackCells img = 'src/assets/stars.svg' feedbackComment = '5 лет занимается обучением фронтед-разработке'></FeedbackCells>
                    </div>
                </section>

            </main>
        </>
    )
}