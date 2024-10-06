import { PrismaClient, Users } from "@prisma/client";

import { createUserDTO, updateUserDTO } from "../dto/user-dto";
import { CustomError } from "../middlewares/errorHandler";
const prisma = new PrismaClient();

class UserService {
  async getAllUsers(userId: number): Promise<(Omit<Users, "password"> & { _count: { followers: number; following: number } })[] | null> {
    const users = await prisma.users.findMany({
      where: {
        id: { not: userId }
      },
      select: {
        id: true,
        userName: true,
        fullName: true,
        bio: true,
        email: true,
        _count: {
          select: {
            followers: true,
            following: true,
          }
        },
        role: true,
        created_at: true,
        updated_at: true,
      }
    });
    return users;
  }
  
  async getUser(userId: number): Promise< Omit<Users, "password"> & {_count: { followers: number; following: number }}| null> {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        userName: true,
        fullName: true,
        bio: true,
        email: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
    return user;
  }

  async getUserById(id: number): Promise<Omit<Users, "password"> & { _count: { followers: number; following: number }} | null > {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        userName: true,
        fullName: true,
        bio: true,
        email: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
    return user;
  }
  async updateUser(id: number, data: updateUserDTO): Promise <{user: Pick<Users, "fullName"|"userName"|"bio"|"id">}> {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      
    })
    if (!user) {
      throw new CustomError("User not found",404)
    }

    const updateUser = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        fullName: data.fullName || user.fullName,
        userName: data.userName || user.userName,
        bio: data.bio || user.bio
      },
      select: {
        fullName: true,
        userName: true,
        bio: true,
        id: true,
      },
    })
    return {
      user: updateUser
    }
  }
  
}

export default new UserService();
