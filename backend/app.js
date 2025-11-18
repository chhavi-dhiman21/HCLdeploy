import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/database.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();

connectDatabase(); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', userRoutes); 

app.get('/', (req, res) => {
    res.send('API is running.');
});

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
});