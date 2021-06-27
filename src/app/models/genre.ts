import { Film } from "./film";

export interface Genre{

    id?: number;
    name: string;
    image_url?:string;
    created_at?: Date;
    created_by: number;
    selected?:boolean;
    films?: Film[];

}