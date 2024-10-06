import { Response } from "express";
import { RequestWithUser } from "../types/post";
import { searchService } from "../services/searchService";

export const searchControlller = async (req: RequestWithUser, res: Response)=>{
  try {
    const {query} = req.query;
    const userId = req.user?.id;
    const user = await searchService(query as string, userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    
  }
}
