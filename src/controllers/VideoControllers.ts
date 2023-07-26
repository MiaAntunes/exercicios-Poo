// Polimorfismo
import { Request, Response } from "express"
import { VideoDatabase } from "../sql/VideoDatabase"
import { Video } from "../Models/Video"
import { TVideoDB } from "../types"

// Validar/tratar os dados
export class VideoControllers {

    public getVideo = async (req: Request, res: Response) => {
        try {

            const titleSearch = req.params.id as string

            const videoDatabase = new VideoDatabase()

            const videoDB = await videoDatabase.findVideo(titleSearch)
            // Fazer uma padronização

            // Padronização dos nomes da classes que foi feta para o video
            const videosVerification: Video[] = videoDB.map((video) => {
                return new Video(
                    video.id,
                    video.title,
                    video.durationSecond,
                    video.dateUpload
                )
            })


            res.status(200).send(videosVerification)
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }

    public postVideo = async (req: Request, res: Response) => {
        try {
            const newId = req.body.id as string
            const newTitle = req.body.title as string
            const newDurationSecond = req.body.durate_second as number
            const dateUpload = new Date().toISOString()


            // Usar a filha para podermos verificar se há existência desse id
            const instânciaVideo = new VideoDatabase()
            const videoDB = await instânciaVideo.findVideoId(newId)


            if (videoDB.length === 0) {
                // Criação de uma constante e a padronização para a inserção no banco de dados
                const result = new Video(
                    newId,
                    newTitle,
                    newDurationSecond,
                    dateUpload
                )
                const newVideoDB: TVideoDB = {
                    id: result.getId(),
                    title: result.getTitle(),
                    duration_second: result.getDurationSecond(),
                    date_upload: result.getDateUpload()
                }


                //O uso da classe filha para padronizar a inserção dela no banco de dados
                await instânciaVideo.insertVideo(newVideoDB)

                res.status(200).send("Upload feito")
            } else {
                res.status(400)
                throw new Error("Esse id já existe")
            }
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }

    public deleteVideo = async (req: Request, res: Response) => {
        try {

            const id = req.params.id as string

            // The find was made in the file VideoDataBase
            const instânciaVideo = new VideoDatabase()
            const videoDBExist = await instânciaVideo.findVideoId(id)
            // console.log(videoDBExist)

            if (videoDBExist.length === 0) {
                res.status(400)
                throw new Error("Esse id não existe")
            }

            await instânciaVideo.deleteVideo(id)
            // console.log(deleteVideo)

            res.status(200).send("ok")

        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }

    public putVideo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string

            //Edições
            // ! Dúvidas de quando ser undefined pois ele não receber
            const newId = req.body.id as string
            const newTitle = req.body.title as string
            const newDurationSecond = req.body.durate_second as number

            // The find was made in the file VideoDataBase
            const instânciaVideo = new VideoDatabase()
            const [videoDBExist] = await instânciaVideo.findVideoId(id)


            if (!videoDBExist) {
                res.status(400)
                throw new Error("Esse id não existe")
            }


            // Criação de uma constante e a padronização para a update no banco de dados
            // Copia do banco de dados!!!!!
            const video = new Video(
                videoDBExist.id,
                videoDBExist.title ,
                videoDBExist.durationSecond,
                videoDBExist.dateUpload
            )

            if(newId && newId !== videoDBExist.id){
                return video.setId(newId) 
            }

            newTitle && video.setTitle(newTitle)// --- Operador lógico ou Curto-circuito
            // newId? video.setId(newId) : ---> Ternário
            newDurationSecond && video.setDurationSecond(newDurationSecond)
            console.log("2",video)

            //Padronizar para o banco de dados
            const resultVideoDB: TVideoDB = {
                id: video.getId(),
                title: video.getTitle(),
                duration_second: video.getDurationSecond(),
                date_upload: video.getDateUpload()
            }

            await instânciaVideo.updateVideo(resultVideoDB)

            res.status(200).send("ok")

        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }

    }
}

