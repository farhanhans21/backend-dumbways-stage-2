import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FollowService{

  async updateFollow(currentUserID: number, targetUserID: number){
    const follow = await prisma.follow.findFirst({
      where: {
        followerId: currentUserID,
        followingId: targetUserID,
      },
    });

    if (follow) {
      await prisma.follow.delete({
        where: { id: follow.id },
      })
      return {isFollowing: false}
    }
    else{
      await prisma.follow.create({
        data: {
          followerId: currentUserID,
          followingId: targetUserID,
          isFollowing:true
        }
      })
      return {isFollowing: true}
    }
  }
  async getFollowStatus(currrentUserID: number, targetUserID: number){
    const follow = await prisma.follow.findFirst({
      where: {
          followerId: currrentUserID,
          followingId: targetUserID,
      }
  });
  return { isFollowing: follow ? true : false };
  }
}

export default new FollowService();