import { PrismaClient, Reply } from "@prisma/client";
import { ReplyDTO } from "../dto/reply-dto";
import { UpdatePostDTO } from "../dto/post-dto";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class ReplyService {
  async getReplyByPost(postId: number): Promise<Reply[]> {
    return await prisma.reply.findMany({
      where: { id: postId },
      include: {
        author: {
          select: {
            fullName: true,
            userName: true,
          },
        },
      },
    });
  }
  async createReply(data: ReplyDTO, authorId: number): Promise<Reply | null> {
    if (!data.postId) {
      throw new Error("Post ID is Required to create a reply");
    }
    const newReply = await prisma.reply.create({
      data: {
        content: data.content,
        image: data.image,
        postId: data.postId,
        authorId: authorId,
      },
    });
    const repliesCount = await prisma.reply.count({
      where: {
        postId: data.postId,
      },
    });
    await prisma.post.update({
      where: {
        id: data.postId,
      },
      data: { repliesCount: repliesCount },
    });
    return newReply;
  }

  async updateReply(data: UpdatePostDTO): Promise<Reply | null> {
    const reply = await prisma.reply.findUnique({
      where: {
        id: data.id,
      },
    });
    const update: Partial<Reply> = {};

    if (reply && data.content) {
      reply.content = data.content;
    }
    if (reply && data.image) {
      reply.image = data.image;
    }
    return await prisma.reply.update({
      data: update,
      where: {id: data.id}
    })
  }

  async deleteReply(id: number): Promise<Reply | null> {
    const reply = await prisma.reply.findUnique({
      where: {id: id}
    });

    if (!reply) {
      throw new CustomError('Reply not found',404);
    }

    await prisma.reply.delete({
      where: {id: id}
    })

    const replyCount = await prisma.reply.count({
      where: { postId: reply.postId }
  });

  await prisma.post.update({
    where:{id: reply.postId},
    data:{repliesCount: replyCount},
  });

  return reply
}
}

export default new ReplyService();
