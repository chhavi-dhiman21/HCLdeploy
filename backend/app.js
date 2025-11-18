import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/database.js';
import userRoutes from './routes/userRoutes.js'; 
import cors from 'cors';
import { getRandomTip } from './controllers/getRandomTip.js';

dotenv.config();

connectDatabase(); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', userRoutes); 
app.use('/tip', getRandomTip);

app.get('/', (req, res) => {
    res.send('API is running.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});