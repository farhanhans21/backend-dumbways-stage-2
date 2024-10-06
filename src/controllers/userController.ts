import { Request, Response } from "express";
import UserServis from "../services/userServis";
import { updateUserDTO } from "../dto/user-dto";
import { RequestWithUser } from "../types/post";
import { updateUserSchema } from "../utils/schema/schemaUser";

class userController {
  async getAllUsers (req: RequestWithUser, res:Response){
    try {
      const userId = req.user?.id;
      const users = await UserServis.getAllUsers(userId);
      res.json(users);
    } catch (error) {
      console.error(error);
    }
  }
  async getUser(req: RequestWithUser, res: Response) {
    try {
      const id = req.user.id;
      const user = await UserServis.getUser(id);
      const following = user?._count.followers;
      const follower = user?._count.following;
      res.json({
        ...user,
        following,
        follower
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getUserById(req: RequestWithUser, res: Response) {
    try {
      const {userId} = req.params
      const user = await UserServis.getUserById(parseInt(userId))
      const following = user?._count.followers;
      const follower = user?._count.following;
      res.json({
        ...user,
        following,
        follower
      });
    } catch (error) {
      console.error(error);
    }
  }

  async update(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.id 
      const values = await updateUserSchema.validateAsync(req.body)
      const user = await UserServis.updateUser(userId, values);
      res.json(user);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new userController();
