import { Response } from "express";
import replyService from "../services/replyService";
import { RequestWithUser } from "../types/post";
import { replySchema } from "../utils/schema/schemaReply";


class ReplyController {
  async getReplyByPost(req: RequestWithUser, res: Response){
    try {
      const postId = Number(req.params.postId);
      const replies = await replyService.getReplyByPost(postId);
      res.json(replies);
    } catch (error) {
      console.error(error);
      
    }
  }
  async createReply(req: RequestWithUser, res: Response){
    try {
      
    const value = await replySchema.validateAsync(req.body);
    const createReply = await replyService.createReply(value,req.user.id);
    res.json(createReply);
    } catch (error) {
      console.error(error);
      
    }

  }
  async deleteReply(req: RequestWithUser, res: Response){
    try {
      const id = Number(req.params.id);
      const deleteReply = await replyService.deleteReply(id);
      res.json(deleteReply);
    } catch (error) {
      console.error(error);
      
    }
  }
}
export default new ReplyController();