import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "../services/upload.service";
import fs from "fs";

export const upload = multer({ dest: "uploads/" });

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const { path: filePath, originalname: fileName } = req.file;

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id: fileName.split(".")[0],
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);
    res
      .status(200)
      .json({
        url: uploadResult.secure_url,
        name: fileName,
        public_id: uploadResult.public_id,
        message: "File uploaded successfully",
      });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

export const uploadVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const { path: filePath, originalname: fileName } = req.file;

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      public_id: fileName.split(".")[0],
    });

    fs.unlinkSync(filePath);
    res
      .status(200)
      .json({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        message: "Video uploaded successfully",
      });
  } catch (error) {
    console.error("Error uploading video to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
};

export const deleteImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.public_id, {
      resource_type: "image",
    });

    if (result.result === "ok") {
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete image" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const result = await cloudinary.uploader.destroy(req.params.public_id, {
      resource_type: "video",
    });

    if (result.result === "ok") {
      res.status(200).json({ message: "Video deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete video" });
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Failed to delete video" });
  }
};
