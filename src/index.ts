
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

import router from './routes/api';

const app = express();

app.use(cors( {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: process.env.CORS_CREDENTIALS === 'true'
}));

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log("API Gateway Started at: " + PORT) );