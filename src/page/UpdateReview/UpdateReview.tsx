import { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Stack, Snackbar } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import CircularIndeterminate from "../../components/Loader.tsx"; // Иконка для загрузки фото

interface MediaFile {
    id: string;
    file_type: string;
    uploaded_at: string;
    storage_path: string;
    url: string;
}

export default function UpdateReview() {
    const [title, setTitle] = useState(""); // Состояние для заголовка
    const [description, setDescription] = useState(""); // Состояние для описания
    const [images, setImages] = useState<File[]>([]); // Состояние для новых изображений
    const [existingImages, setExistingImages] = useState<MediaFile[]>([]); // Состояние для существующих изображений
    const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для уведомления
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams(); // Получаем ID отзыва из URL

    // Максимальное количество изображений
    const MAX_IMAGES = 5;

    // Загружаем данные отзыва при монтировании компонента
    useEffect(() => {
        const fetchReview = async () => {
            if (!id) return; // Если ID не найден, ничего не делаем

            setLoading(true);
            console.log(id);
            try {
                const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке данных отзыва");
                }
                const reviewData = await response.json();
                console.log(reviewData); // Обратите внимание на вывод данных в консоль

                // Получаем первый объект из массива
                const review = reviewData[0]; // Теперь review это объект, а не массив

                if (review) {
                    setTitle(review.title || "");  // Убедитесь, что данные существуют
                    setDescription(review.description || ""); // Если данные пустые, установите значения по умолчанию
                    setExistingImages(review.media_files || []);
                }
            } catch (error) {
                console.error(error);
                alert("Ошибка при загрузке данных отзыва");
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id]);



    // Функция для обработки изменения поля title
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // Функция для обработки изменения поля description
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    // Функция для обработки загрузки изображений
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newImages = Array.from(event.target.files);

            if (images.length + newImages.length > MAX_IMAGES) {
                setOpenSnackbar(true); // Показать уведомление о превышении лимита
                return;
            }

            setImages([...images, ...newImages]);
        }
    };

    // Функция для удаления нового изображения
    const handleImageRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Функция для удаления существующего изображения
    const handleExistingImageRemove = (index: number) => {
        const imageToDelete = existingImages[index];
        // Отправляем запрос на удаление изображения
        deleteImageFromStorage(imageToDelete.url);
        // Убираем изображение из состояния
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    // Функция для удаления изображения из Supabase Storage
    const deleteImageFromStorage = async (url: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete-image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${document.cookie.replace('refreshToken=', '')}`
                },
                body: JSON.stringify({ url }),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении изображения");
            }

            console.log("Изображение успешно удалено из хранилища");
        } catch (error) {
            console.error(error);
            alert("Ошибка при удалении изображения");
        }
    };

    // Отправка данных
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы
        setLoading(true); // Начинаем загрузку

        const url = `http://localhost:3000/api/reviews/${id}`;

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);

            // Добавляем новые изображения в formData
            images.forEach((image) => {
                formData.append("files", image);
            });

            // Формируем список новых медиафайлов
            existingImages.forEach((image) => formData.append("existing_files", image.url));

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${document.cookie.replace('refreshToken=', '')}`,
                },
                body: formData, // Передаем FormData в body
                credentials: "same-origin", // Или "include", если требуется отправить cookies
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при редактировании отзыва");
            }

            navigate("/review"); // Перенаправление на страницу после успешного обновления
        } catch (err) {
            console.log(err instanceof Error ? err.message : "Ошибка при редактировании отзыва");
        } finally {
            setLoading(false); // Останавливаем индикатор загрузки
        }
    };

    // Закрытие уведомления Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <CircularIndeterminate />
                </div>
            ) : (
                <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
                        Редактирование отзыва
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                label="Заголовок отзыва"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />

                            <TextField
                                label="Описание"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />

                            <Box>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CameraAlt />}
                                    fullWidth
                                    sx={{
                                        background: '#1a1a1a',
                                        "&:hover": { backgroundColor: "#424242" },
                                        borderRadius: '0.5rem'
                                    }}
                                >
                                    Загрузить фотографии
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                                    {images.map((image, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "relative",
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                display: "flex",
                                            }}
                                        >
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="preview"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                            <Button
                                                onClick={() => handleImageRemove(index)}
                                                sx={{
                                                    position: "absolute",
                                                    top: "-5px",
                                                    right: "-5px",
                                                    width: "15px", // Устанавливаем фиксированную ширину кнопки
                                                    height: "15px", // Устанавливаем фиксированную высоту кнопки
                                                    padding: '0px', // Убираем отступы вокруг кнопки
                                                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный фон
                                                    borderRadius: "50%", // Круглая форма
                                                    display: "flex", // Flexbox для центрирования
                                                    justifyContent: "center", // Центрируем крестик по горизонтали
                                                    alignItems: "center", // Центрируем крестик по вертикали
                                                    color: "white", // Цвет крестика
                                                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                                                }}
                                            >
                                                <span style={{ fontSize: "11px", margin: 0 }}>X</span>
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                                {existingImages.map((image, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            position: "relative",
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                            display: "flex",
                                        }}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`existing-${index}`}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Button
                                            onClick={() => handleExistingImageRemove(index)}
                                            sx={{
                                                position: "absolute",
                                                top: "-5px",
                                                right: "-5px",
                                                width: "15px", // Устанавливаем фиксированную ширину кнопки
                                                height: "15px", // Устанавливаем фиксированную высоту кнопки
                                                padding: '0px', // Убираем отступы вокруг кнопки
                                                backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный фон
                                                borderRadius: "50%", // Круглая форма
                                                display: "flex", // Flexbox для центрирования
                                                justifyContent: "center", // Центрируем крестик по горизонтали
                                                alignItems: "center", // Центрируем крестик по вертикали
                                                color: "white", // Цвет крестика
                                                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                                            }}
                                        >
                                            <span style={{ fontSize: "11px", margin: 0 }}>X</span>
                                        </Button>
                                    </Box>
                                ))}
                            </Box>

                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Обновить отзыв
                            </Button>
                        </Stack>
                    </form>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        message="Максимум 5 изображений"
                    />
                </Box>
            )}
        </>
    );
}
