import express from 'express';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import churchRouter from './routers/churchRouter';
import postRouter from './routers/postRouter';
import eventRouter from './routers/eventRouter';
import cors from 'cors';

const BASE_ORIGIN = process.env.ORIGIN;

const app = express();

app.use(
  express.json(),
  cors({
    origin: BASE_ORIGIN,
    credentials: true,
  }),
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/churches', churchRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventRouter);

export default app;
