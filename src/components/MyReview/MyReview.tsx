// Обновляем интерфейс ReviewProps
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

// src/types/reviewTypes.ts

export interface MediaFile {
    id: string;
    file_type: string;
    uploaded_at: string;
    storage_path: string;
    url: string;
}

export interface User {
    email: string;
}

export interface ReviewType {
    id: string;
    created_at: string;
    user_id: string;
    title: string;
    description: string;
    media_files: MediaFile[];
    users: User;
}


interface ReviewProps {
    review: ReviewType;
    onSelectReview: (id: string) => void;
    onDelete: (id: string) => void; // Добавляем проп onDelete
}

export default function MyReview({ review, onSelectReview, onDelete }: ReviewProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    // Функция для удаления отзыва
    const handleDelete = async (id: string) => {
        if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
            setIsDeleting(true);
            try {
                const response = await fetch(`http://localhost:3000/api/reviews/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${document.cookie.replace('refreshToken=', '')}`
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Ошибка удаления отзыва");
                }

                // Уведомляем родительский компонент о том, что отзыв удален
                onDelete(id); // Теперь ошибка не возникнет
                alert("Отзыв успешно удален!");
            } catch (err) {
                console.log(err instanceof Error ? err.message : "Ошибка удаления отзыва");
                alert("Ошибка удаления отзыва!");
            } finally {
                setIsDeleting(false);
            }
        }
    };
    const handleEdit = () => {
        navigate(`/updatereview/${review.id}`); // Переходим на страницу редактирования с id в URL
    };

    return (
        <div className="review-container">
            <div className='user-info-container'>
                <div className='user-info'>
                    <p>{review.users.email}</p>
                </div>
                <div className='date-info'>
                    <p>{new Date(review.created_at).toLocaleString()}</p>
                </div>
            </div>
            <p className='title'>{review.title}</p>
            <p className='description'>{review.description}</p>
            <div className="media-gallery">
                {review.media_files.map((file: MediaFile) => (
                    <img
                        key={file.id}
                        src={file.url}
                        alt={file.file_type}
                        className="media-image"
                        onClick={() => onSelectReview(review.id)}
                    />
                ))}
            </div>
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
                className="buttons"
                sx={{ borderRadius: '0.5rem' }}
            >
                <Button
                    onClick={() => handleDelete(review.id)}
                    sx={{ background: '#1a1a1a', borderRadius: '0.5rem' }}
                    disabled={isDeleting} // Блокируем кнопку при удалении
                >
                    {isDeleting ? "Удаление..." : "Удалить"}
                </Button>
                <Button
                    onClick={handleEdit}
                    sx={{ background: '#1a1a1a', borderRadius: '0.5rem' }}
                >
                    Изменить
                </Button>
            </ButtonGroup>
        </div>
    );
}
