import "./CardAuth.css"
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../Loader.tsx";

export default function CardAuth() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();
    // Состояния для ошибок и текста кнопки
    const [error, setError] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('Войти в личный кабинет');
    const [buttonColor, setButtonColor] = useState<string>('#605FFF');
    const [buttonTextColor, setButtonTextColor] = useState<string>('#fff');
    const [isLOadding, setIsLOadding] = useState(false);

    // Обработчик нажатия на кнопку
    const handleLogin = () => {
        if (!login && !password) {
            setError('Заполните логин и пароль');
            setButtonText('Заполните логин и пароль');
            setButtonColor('#FFB2B2');
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

        setTimeout(() => {
            setButtonText('Войти в личный кабинет');
            setButtonColor('#605FFF');
            setButtonTextColor('#fff');
            setError('');
        }, 3000);
    };



    // Функция для отправки данных на сервер
    const sendDataToServer = async (login: string, password: string) => {
        setIsLOadding(true);
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', // Важная настройка!
                body: JSON.stringify({ email: login, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка авторизации");
            }

            const data = await response.json();

            // Сохраняем refreshToken в localStorage
            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }

            // Переадресация на главную страницу
            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка авторизации");
            setButtonText("Ошибка авторизации");
            setButtonColor("#FFB2B2");
            setButtonTextColor("#BF3939");
        }
        finally {
            setIsLOadding(false);
        }
    };


    return (
        <>
            <main>
                {isLOadding ? (
                    <div className="loader-container">
                        <CircularIndeterminate /> {/* Отображаем индикатор загрузки */}
                    </div>
                ) : (
                        <><h3 className='head-title'>
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
                                        onChange={handlePasswordChange}/>
                                </div>
                                <Button
                                    variant="contained"
                                    className="button-auth"
                                    sx={{fontSize: '14px', backgroundColor: buttonColor, color: buttonTextColor}}
                                    onClick={handleLogin}
                                >
                                    {buttonText}
                                </Button>
                                <div className='img-container'>
                                    <a href='http://localhost:5173/registration'>
                                        Регистрация
                                    </a>
                                </div>
                                <a/>
                                <a/>
                            </div>
                        </>
                        )
                }
            </main>

        </>
    )
}