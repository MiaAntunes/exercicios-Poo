// Polimorfismo
import { Request, Response } from "express"
import { VideoDatabase } from "../sql/VideoDatabase"
import { Video } from "../Models/Video"
import { TVideoDB } from "../types"
import { VideoBusiness } from "../business/VideoBusiness"
import { BaseError } from "../error/BaseError"
import { CreateVideoSchema } from "../dtos/createVideo.dto"
import { EditVideoShema } from "../dtos/editVideo.dto"

// Validar/tratar os dados
export class VideoControllers {
    constructor(
        private videoBusiness:VideoBusiness
    ){

    }

    public getVideo = async (req: Request, res: Response) => {
        try {

            
            const response = await this.videoBusiness.getVideo()


            res.status(200).send(response)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public postVideo = async (req: Request, res: Response) => {
        try {
            const input = CreateVideoSchema.parse ({
                newId: req.body.id as string,
                newTitle: req.body.title as string,
                newDurationSecond: req.body.durate_second as number,
                dateUpload: new Date().toISOString()
            })

            
            const response = await this.videoBusiness.postVideo(input)

            res.status(200).send(response.message)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteVideo = async (req: Request, res: Response) => {
        try {

            const input = {
                id: req.params.id as string
            }

            
            const response = await this.videoBusiness.deleteVideo(input)

            res.status(200).send(response.message)

        }
        catch (error: any) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public putVideo = async (req: Request, res: Response) => {
        try {

            //Edições
            const input = EditVideoShema.parse({
                id: req.params.id,
                newId: req.body.id,
                newTitle: req.body.title,
                newDurationSecond: req.body.durate_second
            })

            
            const response = await this.videoBusiness.putVideo(input)

            res.status(200).send(response)

        }
        catch (error: any) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }

    }
}

