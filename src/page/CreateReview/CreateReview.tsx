import { useState } from "react";
import { Button, TextField, Box, Typography, Stack, Snackbar } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/Loader.tsx"; // Иконка для загрузки фото

export default function CreateReview() {
    const [title, setTitle] = useState(""); // Состояние для заголовка
    const [description, setDescription] = useState(""); // Состояние для описания
    const [images, setImages] = useState<File[]>([]); // Состояние для изображений
    const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для управления отображением Snackbar
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Максимальное количество изображений
    const MAX_IMAGES = 5;

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

    // Функция для удаления изображения
    const handleImageRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Отправка данных
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы
        setLoading(true); // Начинаем загрузку

        const url = "http://localhost:3000/api/reviews";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${document.cookie.replace('refreshToken=', '')}`,
                },
                body: JSON.stringify({ title, description, images }),
                credentials: "same-origin", // Или "include", если требуется отправить cookies
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при создание отзыва");
            }

            navigate("/review"); // Например, на страницу успеха
        } catch (err) {
            console.log(err instanceof Error ? err.message : "Ошибка при создание отзыва");
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
                        Создание отзыва
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            {/* Заголовок */}
                            <TextField
                                label="Заголовок отзыва"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />

                            {/* Описание */}
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

                            {/* Загрузка изображений */}
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

                                {/* Отображение выбранных изображений */}
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

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    padding: "12px",
                                    backgroundColor: "#1a1a1a",
                                    "&:hover": { backgroundColor: "#424242" },
                                    borderRadius: "0.5rem"
                                }}
                            >
                                Отправить отзыв
                            </Button>
                        </Stack>
                    </form>

                    {/* Snackbar для уведомления о превышении лимита изображений */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        message="Максимальное количество изображений — 5!"
                    />
                </Box>
            )}
        </>
    );
}
