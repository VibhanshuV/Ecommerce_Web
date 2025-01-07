import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(PORT, () => {    
    console.log('Server is running on port', PORT);
    connectMongoDB();
    }
);