import express, { Request, Response } from "express";
import authController from "../controllers/authController";
import { authentication } from "../middlewares/authenticationMiddleware";
import { catchAsync } from "../utils/catch-async";
import postController from "../controllers/postController";
import userController from "../controllers/userController";
import upload from "../middlewares/uploadImage";
import followController from "../controllers/followController";
import replyController from "../controllers/replyController";
export const v1 = express.Router();
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
v1.get("/get-all-user", userController.getAllUsers);
v1.get("/get-user/:userId", userController.getUser);
//replies
v1.post(
  "/post/:postId/reply",
  catchAsync(authentication),
  upload.single("image"),
  replyController.createReply
);

//follow
v1.get("/get-following", followController.checkFollowStatus);
v1.post("/toggle-follow", followController.toggleFollow);
