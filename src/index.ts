import express, { Request, Response } from 'express'
import cors from 'cors';
import { VideoControllers } from './controllers/VideoControllers';

//criação do servidor express 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

const videoControllers = new VideoControllers()

app.get('/videos', videoControllers.getVideo)

app.post('/videos', videoControllers.postVideo)

app.delete('/video/:id', videoControllers.deleteVideo)

app.put('/video/:id', videoControllers.putVideo)