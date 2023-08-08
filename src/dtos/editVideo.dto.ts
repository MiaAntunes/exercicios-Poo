import z from "zod"


export interface EditVideoInputDto {
    id: string,
    newId?: string,
    newTitle?: string,
    newDurationSecond?: number
} 

export interface EditVideoOutInputDto {
    message: string,
}

export const EditVideoShema = z.object({
    id: z.string(),
    newId: z.string().optional() ,
    newTitle: z.string().optional() ,
    newDurationSecond: z.number().optional()
})