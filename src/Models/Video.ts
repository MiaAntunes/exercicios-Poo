export class Video {
    constructor(
        // O constructor é a base para verificarmos nossas criações de conteúdo no endpoint
        private id: string,
        private title: string,
        private durationSecond: number,
        private dateUpload:string
    ) { }

    // O public já é o que podemos mexer, porém com referência a base do construtor!!
    public getId = (): string => {
        return this.id
    }


    public setId = (newId: string) => {
        this.id = newId
    }

    //Title
    public getTitle = (): string => {
        return this.title
    }

    public setTitle = (newTitle: string): void => {
        this.title = newTitle
    }

    //DurationSecond
    public getDurationSecond = (): number => {
        return this.durationSecond
    }

    public setDurationSecond = (newDurationSecond: number): void => {
        this.durationSecond = newDurationSecond
    }

    //DateUpload
    public getDateUpload = (): string => {
        return this.dateUpload
    }

    public setDateUpload = (newDateUpload: string): void => {
        this.dateUpload = newDateUpload
    }
}