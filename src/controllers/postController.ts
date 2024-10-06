import { PrismaClient } from "@prisma/client";
import { formatTimeAgo } from "../middlewares/timeCalculate";
import { RequestWithUser } from "../types/post";
import { Request,Response } from "express";
import postService from "../services/postService";
import {CustomError} from "../middlewares/errorHandler"
import { postSchema } from "../utils/schema/schemaPost";
import cloudinaryService from "../services/cloudinary-service";

const prisma = new PrismaClient

class PostController {
  async getAllPost(req:Request, res: Response) { 
    try {
      const saves = await prisma.post.findMany({
        include:{
            author: {
              select:{
                fullName:true,
                userName:true
              }
            },
          },
          orderBy: {createdAt: 'desc'}
        }
      )
      const postWithTime =  saves.map((post)=>({
        ...post,
        time: formatTimeAgo(new Date(post.createdAt))
      }))
      res.json(postWithTime)
      
    } catch (error) {
      console.error(error);
    }  

}

async getPostbyAuthor(req: RequestWithUser, res: Response){
  try {
    const authorId = Number(req.params.authorId);
    const post =  await postService.getAllPost(authorId);
    const postWithTime = post.map((post) =>({
      ...post,
      time: formatTimeAgo(new Date(post.createdAt))
    }));
    res.json(postWithTime)
  } catch (error) {
    console.error(error);
    
  }
}

async getPostByUserId(req: RequestWithUser, res: Response){
  try {
    const userId = Number(req.params.userId);
  const post = await postService.getAllPostByUser(userId);
  const postWithTime = post.map((post) =>({
    ...post,
    time: formatTimeAgo(new Date(post.createdAt))
  }))
  res.json(postWithTime);
  } catch (error) {
    console.error(error);
    
  }

}

async getPostByIdPost(req: RequestWithUser, res: Response){
  const {postId} = req.params;
  const post = await postService.getPostById(parseInt(postId));
  if (!post) {
    return new CustomError ("Post not found",404);
  }
  const postWithTime = {
    ...post,
    time: formatTimeAgo(new Date(post.createdAt))
  }
  res.json( {data:postWithTime});
}
async createPost(req: RequestWithUser, res: Response){
  try {
    let imageSecure: string | undefined 
    if (req.file) {
      const image = await cloudinaryService.upload(req.file);
      imageSecure = image.secure_url
    }
    const body =  {...req.body, ...(imageSecure &&{image:imageSecure})};
    const value = await postSchema.validateAsync(body)
    const createPost =  await postService.createPost(value,req.user.id)
    res.json(createPost)
  } catch (error) {
    console.error(error);
    
  }
}
async deletePost(req: RequestWithUser, res: Response){
  try {
    const id = Number(req.params.id);
        const deletePost = await postService.deletePost(id);
        res.json(deletePost);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    
  }
}
// async updatePost(req: RequestWithUser, res: Response){
//  try {
//   const id = Number(req.params.id);
//   const value = await postSchema.validateAsync(req.body);
//   const updatePost = await postService.updatePost({...value, id});
//   res.json(updatePost);
//  } catch (error) {
  
//  }
// }


}

export default new PostController()