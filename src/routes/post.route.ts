import { Router } from "express";
import { createPost } from "../controllers/post.controller";

const postRouter : Router = Router()

postRouter.post("/create", createPost)


export default postRouter;