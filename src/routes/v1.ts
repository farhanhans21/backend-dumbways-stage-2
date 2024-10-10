import express, { Request, Response } from "express";
import authController from "../controllers/authController";
import { authentication } from "../middlewares/authenticationMiddleware";
import { catchAsync } from "../utils/catch-async";
import postController from "../controllers/postController";
import userController from "../controllers/userController";
import upload from "../middlewares/uploadImage";
import followController from "../controllers/followController";
import replyController from "../controllers/replyController";
import { searchControlller } from "../controllers/searchController";
import likeController from "../controllers/likeController";
export const v1 = express.Router();

v1.post("/logout",(req: Request, res: Response) => {
  res.clearCookie('token');
  return res.status(200).json({message: "Logout Seccess"});
})
///auth
v1.post("/auth/register", authController.register);
v1.post("/auth/login", authController.login);
v1.get("/auth/check",authentication,authController.checkLogin);
///post
v1.get("/get-all-post", postController.getAllPost);
v1.post(
  "/create-post",
  authentication,
  upload.single("image"),
  postController.createPost
);
v1.get("/get-post-by-authorId/:authorId", postController.getPostbyAuthor);
v1.get("/get-post-by-userId/:userId", postController.getPostByUserId);
v1.get("/get-post-by-postId/:postId", postController.getPostByIdPost);
v1.delete("/delete-post/:postId", postController.deletePost);
//user
v1.put("/user",authentication,userController.update)
v1.get("/get-all-user",authentication, userController.getAllUsers);
v1.get("/get-userid/:userId",authentication, userController.getUser);
v1.get("/post/:post-id/reply",authentication, postController.getReplyByPost)
//replies
v1.post(
  "/post/:postId/reply",
  catchAsync(authentication),
  upload.single("image"),
  replyController.createReply
);
// v1.get("/post/status/:postId",postController.getPostByIdPost)
//follow
v1.get("/follow/:userId",authentication, followController.checkFollowStatus);
v1.post("/follow/:userId",authentication, followController.toggleFollow);
v1.get("/search-users",authentication,searchControlller)

v1.post("/post/:postId/like", authentication, likeController.likePost);
v1.get("/search-users",authentication,likeController.getLike);