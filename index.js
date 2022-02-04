const settings = require("./settings");

const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(morgan('dev'));

const PORT = settings.PORT;
const HOST = settings.HOST;
const API_SERVICE_URL = settings.API_SERVICE_URL;


// Info GET endpoint
app.get('/test', (req, res, next) => {
    res.send({"Message":'This is a proxy service for Distro API.'});
 });


 // Authorization Control
 app.use('/distro', (req, res, next) => {
    
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
 });

 app.use('/login', (req, res, next) => {
        next();
 });


 // Proxy endpoints
 app.use('/distro', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/distro`]: '',
    },
 }));

 app.use('/login', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/login`]: '',
    },
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });