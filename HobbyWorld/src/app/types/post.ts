import { IUser } from "./user";

export interface IPost {
    likes: number,
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    isForSale: string,
    category: string,
    owner: IUser,
   
}


