import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../types/post";
import { Response } from "express";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class LikeController {
  async getLike(req: RequestWithUser, res: Response) {
    try {
      const postId = parseInt(req.params.postId);
      const userId = req.user.id;
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          likes: {
            where: { userId },
          },
        },
      });
      if (!post) {
        return new CustomError("Post not found", 404);
      }

      const isLiked = post.likes && post.likes.length > 0;
      const likesCount = post.likes ? post.likes.length : 0;
      res.json({ isLiked, likesCount });
    } catch (error) {
      console.error(error);
    }
  }
  async likePost(req: RequestWithUser, res: Response) {
  //   const postId = parseInt(req.params.post);
  //   const userId = req.user.id;
  //   const checkLikes = await prisma.like.findUnique({
  //     where: {
  //       userId_postId: { postId, userId },
  //     },
  //   });
  //   if (checkLikes) {
  //     await prisma.like.delete({
  //       where: { id: checkLikes.id },
  //     });
  //     await prisma.like.update({
  //       where: { id: postId },
  //       data: { likesCount: { decrement: 1 } },
  //     });
  //     return res.json({ message: "like removed successfully" });
  //   } else {
  //     await prisma.like.create({
  //       data: { userId, postId },
  //     });
  //     await prisma.like.update({
  //       where: { id: postId },
  //       data: { likesCount: { increment: 1 } },
  //     });
  //     return res.json({ message: "like added successfully" });
  //   }
  }
}

export default new LikeController();
