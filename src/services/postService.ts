import { PrismaClient, Post } from "@prisma/client";
import { CreatePostDTO,UpdatePostDTO } from "../dto/post-dto";

const prisma = new PrismaClient();
class PostService {
  async getAllPost(authorId: number): Promise<Post[]> {
    const post = await prisma.post.findMany({
      where: { id: authorId },
      include: {
        replies: true,
        author: {
          select: {
            id: true,
            userName: true,
            fullName: true,
            email: true,
            bio: true,
            created_at: true,
            updated_at: true,
            followers: true,
            following: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const ReplyCount = post.map((post) => {
      return {
        ...post,
        repliesCount: post.replies.length,
      };
    });
    return ReplyCount;
  }

  async getPostById(id: number): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        replies: true,
        author: {
          select: {
            userName: true,
            fullName: true,
          },
        },
      },
    });
  }

  async getAllPostByUser(id: number): Promise<Post[]> {
    const post = await prisma.post.findMany({
      where: {
        id: id,
      },
      include: {
        replies: true,
        author: {
          select: {
            id: true,
            fullName: true,
            userName: true,
            email: true,
            bio: true,
            created_at: true,
            updated_at: true,
            followers: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const postWithReplies = post.map((post) => {
      return {
        ...post,
        repliesCount: post.replies.length,
      };
    });
    return postWithReplies;
  }

  async createPost(data: CreatePostDTO, authorId: number): Promise<Post | null>{
    return await prisma.post.create({
      data:{
        ...data,
        authorId: authorId, 
      }
    });
  };

  async updatePost(data: UpdatePostDTO): Promise<Post | null>{
    const post = await prisma.post.findUnique({
      where:{
        id: data.id,
      }
    });

    const update: Partial<Post> = {};
    if (post && data.content) {
      post.content = data.content;
    }

    if (post && data.image) {
      post.image = data.image;
    }

    return await prisma.post.update({
      where: {
        id: data.id,
      },
      data: update,
    });
  }

  async deletePost(id: number): Promise<Post | null> {
    return await prisma.post.delete({
      where: {id: id}
    });
  }
}

export default new PostService();