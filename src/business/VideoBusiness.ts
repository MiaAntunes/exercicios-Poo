import { Video } from "../Models/Video";
import { CreateVideoInputDto, CreateVideoOutInputDto } from "../dtos/createVideo.dto";
import { EditVideoInputDto, EditVideoOutInputDto } from "../dtos/editVideo.dto";
import { BadRequestError } from "../error/BadRequestError";
import { VideoDatabase } from "../sql/VideoDatabase";
import { TVideo, TVideoDB } from "../types";


export class VideoBusiness {
    constructor(
        private videoDatabase: VideoDatabase
    ){}
    public getVideo = async () => {

        

        const videoDB = await this.videoDatabase.findVideo()
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

        // console.log(videosVerification)

        return videosVerification
    }

    public postVideo = async (input: CreateVideoInputDto): Promise<CreateVideoOutInputDto>  => {

        const { newId, newTitle, newDurationSecond, dateUpload } = input

        // Usar a filha para podermos verificar se há existência desse id

        const videoDB = await this.videoDatabase.findVideoId(newId)


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
            await this.videoDatabase.insertVideo(newVideoDB)

        } else {
            throw new BadRequestError("Esse id já existe")
        }

        const output:CreateVideoOutInputDto = {
            message: "Upload feito com sucesso"
        }

        return output
    }

    public deleteVideo = async (input: any) => {

        const { id } = input


        // The find was made in the file VideoDataBase

        const videoDBExist = await this.videoDatabase.findVideoId(id)
        // console.log(videoDBExist)

        if (videoDBExist.length === 0) {
            throw new BadRequestError("Esse id não existe")
        }

        await this.videoDatabase.deleteVideo(id)
        // console.log(deleteVideo)

        const output = {
            message: "Video deletado com sucesso"
        }

        return output
    }

    public putVideo = async (input: EditVideoInputDto):Promise<EditVideoOutInputDto> => {

        const {id ,newId, newTitle, newDurationSecond} = input

        // The find was made in the file VideoDataBase

        const [videoDBExist] = await this.videoDatabase.findVideoId(id)


        if (!videoDBExist) {
            throw new BadRequestError("Esse id não existe")
        }


        // Criação de uma constante e a padronização para a update no banco de dados
        // Copia do banco de dados!!!!!
        const video = new Video(
            videoDBExist.id,
            videoDBExist.title,
            videoDBExist.durationSecond,
            videoDBExist.dateUpload
        )


        newId && video.setId(newId)
        newTitle && video.setTitle(newTitle)// --- Operador lógico ou Curto-circuito
        // newId? video.setId(newId) : ---> Ternário
        newDurationSecond && video.setDurationSecond(newDurationSecond)
        console.log("2", video)

        //Padronizar para o banco de dados
        const resultVideoDB: TVideoDB = {
            id: video.getId(),
            title: video.getTitle(),
            duration_second: video.getDurationSecond(),
            date_upload: video.getDateUpload()
        }

        await this.videoDatabase.updateVideo(resultVideoDB)

        const output: EditVideoOutInputDto = {
            message: "Video editado com sucesso!"
        }

        return output
    }
}