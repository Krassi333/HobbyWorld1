import { IUser } from "./user";

export interface IPost {
    likes: [string],
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    isForSale: string,
    category: string,
    ownerId: string,
   
}


