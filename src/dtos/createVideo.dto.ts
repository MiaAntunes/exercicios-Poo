import z from "zod";

export interface CreateVideoInputDto {
    newId:string,
    newTitle: string,
    newDurationSecond: number,
    dateUpload: string
}

export interface CreateVideoOutInputDto {
    message: string,
}

export const CreateVideoSchema = z.object ({
    newId: z.string().min(3),
    newTitle:z.string().min(2) ,
    newDurationSecond:z.number() ,
    dateUpload: z.string()
})

