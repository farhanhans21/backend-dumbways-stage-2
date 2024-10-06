import express, {Request, Response} from 'express';
import authController from '../controllers/authController';
import { authentication } from '../middlewares/authenticationMiddleware';
import { catchAsync } from '../utils/catch-async';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import upload from '../middlewares/uploadImage';
import followController from '../controllers/followController';
export const v1 = express.Router();
///auth
v1.post("/auth/register",authController.register)
v1.post("/auth/login",authController.login)
///post
v1.get("/getAllPost",postController.getAllPost)
v1.post("/createPost",authentication,upload.single("image"),postController.createPost)
v1.get("/getPostbyAuthorId/:authorId",postController.getPostbyAuthor)
v1.get("/getPostbyUserId/:userId",postController.getPostByUserId)
v1.get("/getPostbyPostId/:postId",postController.getPostByIdPost)
v1.delete("/deletePost/:postId",postController.deletePost)
//user
v1.get("/getAlluser",userController.getAllUsers)
v1.get("/getUser/:userId",userController.getUser)

//follow
v1.get("/getFollowing",followController.checkFollowStatus);
v1.post("/toggleFollow",followController.toggleFollow);