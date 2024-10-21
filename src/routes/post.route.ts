import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller";

const postRouter: Router = Router();

postRouter.post("/create", createPost);
postRouter.get("/", getPosts);
postRouter.delete("/delete/:id", deletePost);
postRouter.put("/update", updatePost);

export default postRouter;
