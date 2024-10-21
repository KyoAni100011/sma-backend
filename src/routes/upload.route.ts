import express from "express";
import {
  uploadImage,
  uploadVideo,
  upload,
  deleteImage,
  deleteVideo,
} from "../controllers/upload.controller";

const uploadRouter = express.Router();

uploadRouter.post("/image", upload.single("images"), uploadImage);
uploadRouter.post("/video", upload.single("videos"), uploadVideo);
uploadRouter.delete("/delete/image/:public_id", deleteImage);
uploadRouter.delete("/delete/video/:public_id", deleteVideo);

export default uploadRouter;
