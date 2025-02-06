import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 180;
const navItems = ['Главная', 'Обучение', 'Отзывы'];

export default function DrawerAppBar() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Проверка refreshToken в localStorage при загрузке страницы
    useEffect(() => {
        const token = localStorage.getItem("refreshToken");
        setIsAuthenticated(!!token); // Если токен есть, авторизован
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // const sendDataToServer = async () => {
    //     try {
    //         const token = localStorage.getItem("refreshToken");
    //         const response = await fetch("http://localhost:3000/api/logout", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ token }),
    //         });
    //
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || "Ошибка выхода из аккаунта");
    //         }
    //     } catch (error) {
    //         console.error("Ошибка выхода из аккаунта:", error);
    //     }
    // };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка выхода из аккаунта");
            }

            // Удаляем токен из localStorage
            localStorage.removeItem("refreshToken");

            // Перенаправляем пользователя
            window.location.href = "/";
        } catch (error) {
            console.error("Ошибка выхода из аккаунта:", error);
        }
    };



    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Result University
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={item} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                component="nav"
                sx={{
                    backgroundColor: '#fafafa',
                    borderBottom: '1px solid #000',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    ></IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            textAlign: 'left',
                            marginLeft: '1rem',
                            color: '#1a1a1a'
                        }}
                    >
                        Result University
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#000' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>

                    {isAuthenticated ? (
                        // Если пользователь авторизован, показываем кнопку "Выйти"
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: '#fff', // Фон кнопки
                                border: '1px solid black', // Чёрная граница
                                color: '#1a1a1a', // Цвет текста
                                marginLeft: '3%',
                                padding: '5px 20px',
                                fontSize: '14px'
                            }}
                            onClick={handleLogout}
                        >
                            Выйти
                        </Button>
                    ) : (
                        // Если пользователь не авторизован, показываем кнопку "Войти"
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: '#1a1a1a',
                                marginLeft: '3%',
                                padding: '5px 20px',
                                fontSize: '14px',
                            }}
                            onClick={() => navigate('/auth')}
                        >
                            Войти
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar />
        </Box>
    );
}
