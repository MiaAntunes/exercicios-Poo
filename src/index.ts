import express, { Request, Response } from 'express'
import cors from 'cors';
import { VideoControllers } from './controllers/VideoControllers';
import { videoRouter } from './router/VideoRouter';

//criação do servidor express 👇🏽
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.use("/videos", videoRouter)
