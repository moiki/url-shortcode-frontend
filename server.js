const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const noCache = require('nocache');
const featurePolicy = require('feature-policy');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(
    featurePolicy({
        features: {
            fullscreen: ["'self'"],
            camera: ["'self'"],
            payment: ["'self'"],
            microphone: ["'self'"],
        },
    })
);

app.use(noCache());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
http.createServer(app).listen(port, () => {
    console.log(`Running frontend from express in http://localhost:${port}...`)
});