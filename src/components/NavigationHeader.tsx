import * as React from 'react';
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
const navItems = ['Главная', 'Обучение', 'Диагностика'];

export default function DrawerAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
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
                    >
                    </IconButton>
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
                    <Button variant="contained" color="primary" sx={{borderRadius: '8px',
                        justifyContent: 'center',
                        backgroundColor: '#1a1a1a',
                        margin: '0px 0px 0px 3%',
                        padding: '5px 20px',
                        fontSize: '14px'}}>
                        Войти
                    </Button>
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
