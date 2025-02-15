import { useEffect, useState } from "react";
import DrawerAppBar from "../components/NavigationHeader";
import Review from "../components/Review/Review";
import MyReview from "../components/MyReview/MyReview"; // Импортируем компонент для "моих" отзывов
import CircularIndeterminate from "../components/Loader.tsx"; // Импортируем индикатор загрузки
import "./Review.css";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

// Описание типов данных для отзывов
interface MediaFile {
    id: string;
    file_type: string;
    uploaded_at: string;
    storage_path: string;
    url: string;
}

interface User {
    email: string;
}

interface ReviewType {
    id: string;
    created_at: string;
    user_id: string;
    title: string;
    description: string;
    media_files: MediaFile[];
    users: User;
}

export default function Reviews() {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [filter, setFilter] = useState("all");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [, setSelectedReview] = useState<string | null>(null);

    const navigate = useNavigate();

    // Функция для получения отзывов
    const getReviews = async (url: string, withCredentials = false) => {
        setLoading(true); // Начинаем загрузку
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(withCredentials && {
                        "Authorization": `Bearer ${document.cookie.replace('refreshToken=', '')}`,
                    }),
                },
                credentials: withCredentials ? "include" : "same-origin", // Важно для отправки cookies
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка получения отзывов");
            }

            const data = await response.json();
            // Проверка на пустые данные
            if (data.data && data.data.length === 0) {
                console.log("Нет отзывов для отображения");
            }
            setReviews(data.data); // Сохраняем данные в состоянии
        } catch (err) {
            console.log(err instanceof Error ? err.message : "Ошибка загрузки отзывов");
        } finally {
            setLoading(false); // Останавливаем индикатор загрузки
        }
    };

    const handleDeleteReview = (id: string) => {
        setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
    };

    // Проверка авторизации (например, через токен в cookies)
    useEffect(() => {
        const token = document.cookie.replace('refreshToken=', ''); // Замените на проверку актуального токена
        if (token) {
            setIsAuthenticated(true); // Если токен есть, считаем пользователя авторизованным
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleSelectReview = (id: string) => {
        setSelectedReview(id);
        console.log("Выбран отзыв с id:", id);
    };


    // Обновление данных при изменении фильтра
    useEffect(() => {
        // Очищаем список отзывов перед загрузкой новых данных
        setReviews([]);

        if (filter === "all") {
            getReviews("http://localhost:3000/api/reviews");
        } else if (filter === "my" && isAuthenticated) {
            getReviews("http://localhost:3000/api/myreviews", true);
        }
    }, [filter, isAuthenticated]);

    return (
        <>
            <DrawerAppBar />
            <main className="reviews-container">
                <aside className="sidebar">
                    <nav className="menu">
                        {/* Всегда отображается кнопка "Все отзывы" */}
                        <button
                            className={`menu-item ${filter === "all" ? "active" : ""}`}
                            onClick={() => setFilter("all")}
                        >
                            Все отзывы
                        </button>

                        {/* Отображается кнопка "Мои отзывы" только если пользователь авторизован */}
                        {isAuthenticated && (
                            <button
                                className={`menu-item ${filter === "my" ? "active" : ""}`}
                                onClick={() => setFilter("my")}
                            >
                                Мои отзывы
                            </button>
                        )}
                    </nav>
                </aside>
                <section className="reviews-list">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#1a1a1a',
                                borderColor: '#1a1a1a',
                            }}
                            onClick={() => navigate('/createreview')}
                        >
                            Создать отзыв
                        </Button>
                    </div>
                    {loading ? (
                        <div className="loader-container">
                            <CircularIndeterminate /> {/* Отображаем индикатор загрузки */}
                        </div>
                    ) : reviews.length === 0 ? (
                        <p>Нет отзывов для отображения</p>
                    ) : (

                        reviews.map((review) =>
                            filter === "my" && isAuthenticated ? (
                                <MyReview
                                    key={review.id}
                                    review={review}
                                    onSelectReview={handleSelectReview}
                                    onDelete={handleDeleteReview} // Передаем функцию в MyReview
                                />
                            ) : (
                                <Review key={review.id} review={review} /> // Для всех отзывов
                            )
                        )
                    )}
                </section>
            </main>
        </>
    );
}
