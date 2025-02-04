import "./CardAuth.css"
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useState} from "react";

export default function CardAuth() {
    // Состояния для полей ввода
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    // Обработчик для изменения значения login
    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    // Обработчик для изменения значения password
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    // Состояния для ошибок и текста кнопки
    const [error, setError] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('Войти в личный кабинет');
    const [buttonColor, setButtonColor] = useState<string>('#605FFF');
    const [buttonTextColor, setButtonTextColor] = useState<string>('#fff');

    // Обработчик нажатия на кнопку
    const handleLogin = () => {
        if (!login && !password) {
            setError('Заполните логин и пароль');
            setButtonText('Заполните логин и пароль');
            setButtonColor('#FFB2B2'); // Красный цвет
            setButtonTextColor('#BF3939');
        } else if (!login) {
            setError('Заполните логин');
            setButtonText('Заполните логин');
            setButtonColor('#FFB2B2');
            setButtonTextColor('#BF3939');
        } else if (!password) {
            setError('Заполните пароль');
            setButtonText('Заполните пароль');
            setButtonColor('#FFB2B2');
            setButtonTextColor('#BF3939');
        }
        else {
            sendDataToServer(login, password);
        }

        // Возвращаем кнопку в исходное состояние через 3 секунды
        setTimeout(() => {
            setButtonText('Войти в личный кабинет');
            setButtonColor('#605FFF');
            setButtonTextColor('#fff');
            setError('');
        }, 3000);
    };



    // Функция для отправки данных на сервер
    const sendDataToServer = async (login: string, password: string) => {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST', // Используем метод POST для отправки данных
            headers: {
                'Content-Type': 'application/json', // Указываем, что отправляем данные в формате JSON
            },
            body: JSON.stringify({ login, password }) // Отправляем login и password в теле запроса
        });

        if (!response.ok) {
            // Если сервер возвращает ошибку
            const error = await response.json();
            console.error('Error:', error);
        } else {
            const data = await response.json();
            console.log('Response from server:', data);
        }
    };


    return (
        <>
            <main>
                <h3 className='head-title'>
                    Вход
                </h3>
                <div className='start-container'>
                    <div className='login-container'>
                        <TextField id="outlined-basic"
                                   label="Логин"
                                   variant="outlined"
                                   className="login-input"
                                   onChange={handleLoginChange}/>

                    </div>
                    <div className='password-container'>
                        <TextField
                            id="outlined-password-input"
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            className="password-input"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <Button
                        variant="contained"
                        className="button-auth"
                        sx={{ fontSize: '14px', backgroundColor: buttonColor, color: buttonTextColor }}
                        onClick={handleLogin}
                    >
                        {buttonText}
                    </Button>
                    <div className='img-container'>

                    </div>
                    <a/>
                    <a/>
                </div>
            </main>

        </>
    )
}