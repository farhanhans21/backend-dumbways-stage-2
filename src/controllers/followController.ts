import { RequestWithUser } from "../types/post";
import FollowService from "../services/followService";
import { Response } from "express";
class FollowController {
  async toggleFollow(req: RequestWithUser, res: Response) {
    try {
      const currentUserID = req.user.id;
      const targetUserID = parseInt(req.params.userId);
      const followStatus = await FollowService.updateFollow(
        currentUserID,
        targetUserID
      );
      res.json(followStatus);
    } catch (error) {
      console.error(error);
    }
  }
  async checkFollowStatus(req: RequestWithUser, res: Response) {
    try {
      const currentUserID = req.user.id;
      const targetUserID = parseInt(req.params.userId);
      const followStatus = await FollowService.getFollowStatus(
        currentUserID,
        targetUserID
      );

      return res.json(followStatus);
    } catch (error) {
      console.error(error);
    }
  }
}
export default new FollowController();
