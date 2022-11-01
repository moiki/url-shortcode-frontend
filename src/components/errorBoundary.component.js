import React, { Component } from 'react';
import { Typography, Button } from '@mui/material';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: '', stack: '' };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    takeMetoHome = () => {
        if (this.props.hist) {
            this.props.hist.push('/admin');
            window.location.reload();
        }
    };

    reloadPage = () => {
        window.location.reload();
    };

    logErrorToMyService = info => {
        // console.log(info);
    };

    componentDidCatch(error, info) {
        // Display fallback UI

        this.setState({
            hasError: true,
            message: error ? error.message : 'Unespected error.',
        });

        console.log('Internal Error:', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Ups!
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            The site is temporary crashed...
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Go to home</Button>
                        </Stack>
                    </Container>
                </Box>
            );
        }
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
