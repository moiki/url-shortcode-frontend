import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import NativoLogo from "../../assets/img/_nativo.png"
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Nativo Testing
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function MainLayout({children}) {
    const hist = useNavigate()
    const logout = () => {
        localStorage.clear();
        hist("/login")
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <div><img src={NativoLogo} width={200}/></div>
                        </IconButton>
                        <Typography variant="h6" style={{fontWeight:400}} component="div" sx={{ flexGrow: 1 }}>
                            Url ShortCode +
                        </Typography>
                        <Button color="inherit" startIcon={<LogoutIcon/>} onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <main>
                {children}
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Thank You!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}