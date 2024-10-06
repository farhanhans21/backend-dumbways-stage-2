import { createUserDTO } from "./user-dto";

export type CreatePostDTO = {
  authorId: number;
  content?: string;
  image?: string;
  
}

export type PostResponseDTO  = {
  id:number;
  content : string;
  image?: string;
  authorId:number;
  createdAt: Date;
  updateAt:Date;
}

export type UpdatePostDTO = createUserDTO & PostResponseDTO & {id: number, userName?: string;
  fullName?: string;
  bio?: string;}