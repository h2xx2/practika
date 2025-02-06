import "./CardRegistration.css"
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CardRegistration() {
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

    const navigate = useNavigate();
    // Состояния для ошибок и текста кнопки
    const [error, setError] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('Зарегистрироваться');
    const [buttonColor, setButtonColor] = useState<string>('#605FFF');
    const [buttonTextColor, setButtonTextColor] = useState<string>('#fff');

    // Обработчик нажатия на кнопку
    const handleLogin = () => {
        if (!login && !password) {
            setError('Заполните email и фаимлию и имя');
            setButtonText('Заполните email и фаимлию и имя');
            setButtonColor('#FFB2B2'); // Красный цвет
            setButtonTextColor('#BF3939');
        } else if (!login) {
            setError('Заполните email');
            setButtonText('Заполните email');
            setButtonColor('#FFB2B2');
            setButtonTextColor('#BF3939');
        } else if (!password) {
            setError('Заполните фамилию и имя');
            setButtonText('Заполните фамилию и имя');
            setButtonColor('#FFB2B2');
            setButtonTextColor('#BF3939');
        }
        else {
            sendDataToServer(login, password);
        }

        // Возвращаем кнопку в исходное состояние через 3 секунды
        setTimeout(() => {
            setButtonText('Зарегистрироваться');
            setButtonColor('#605FFF');
            setButtonTextColor('#fff');
            setError('');
        }, 3000);
    };

    // Функция для отправки данных на сервер
    const sendDataToServer = async (login: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3000/api/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: login, password }),

            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка регистрации");
            }

            const data = await response.json();

            // Сохраняем refreshToken в localStorage
            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }

            // Переадресация на главную страницу
            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка регистрации");
            setButtonText("Ошибка регистрации");
            setButtonColor("#FFB2B2");
            setButtonTextColor("#BF3939");
        }
    };

    return (
        <>
            <main>
                <h3 className='head-title'>
                    Регистрация
                </h3>
                <div className='start-container'>
                    <div className='login-container'>
                        <TextField id="outlined-basic"
                                   label="Email"
                                   variant="outlined"
                                   className="login-input"
                                   onChange={handleLoginChange}/>

                    </div>
                    <div className='password-container'>
                        <TextField
                            id="outlined-password-input"
                            label="Имя и фамилия"
                            variant="outlined"
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