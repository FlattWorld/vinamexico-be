import express from 'express';
import userRouter from './routers/userRouter';
import churchRouter from './routers/churchRouter';
import cors from 'cors';

const app = express();

app.use(express.json(), cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/churches', churchRouter);

export default app; 