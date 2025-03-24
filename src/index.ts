
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import router from './routes/api';

const app = express();

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log("API Gateway Started at: " + PORT) );