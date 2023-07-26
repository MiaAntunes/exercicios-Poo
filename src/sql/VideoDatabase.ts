import { TVideo, TVideoDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

// Irá ser uma classe filha tento como herança a BaseDatabase
export class VideoDatabase extends BaseDatabase {
    public async findVideo (titleSearch?:string): Promise<TVideo[]> {
        
        let results: TVideo[] = []

        if(titleSearch){
            results = await BaseDatabase.connection('video').where("title", "LIKE", `%${titleSearch}%`)
        }else{
            results = await BaseDatabase.connection('video')
            .select(
                "id ",
                "title",
                "duration_second AS durationSecond",
                "date_upload AS dateUpload"
            )
        }
        return results
    }

    public async findVideoId(id: string): Promise<TVideo[]> {

        let results: TVideo[] = []

        results = await BaseDatabase.connection('video').where({id})
        // console.log(results)

        return results
    }

    public async insertVideo(newVideoDB: TVideoDB): Promise<void>{
        
        await BaseDatabase.connection('video').insert(newVideoDB)

    }

    public async deleteVideo(id:string):Promise<void>{
        
        await BaseDatabase.connection('video')
        .where({id})
        .delete(id)
    }

    public async updateVideo(resultVideoDB:TVideoDB):Promise<void>{
        await BaseDatabase.connection('video')
        .update(resultVideoDB)
        .where({id: resultVideoDB.id}) 
    }
}