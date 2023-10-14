import express from 'express';
import userRouter from './routers/userRouter';
import churchRouter from './routers/churchRouter';
import cors from 'cors';

const BASE_ORIGIN = process.env.ORIGIN;

const app = express();

app.use(express.json(), cors({
  origin: BASE_ORIGIN,
  credentials: true
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/churches', churchRouter);

export default app; 