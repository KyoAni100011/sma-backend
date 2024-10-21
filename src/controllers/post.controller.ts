import { Request, Response } from "express";
import prisma from "../prisma";
import { StatusCodes } from "http-status-codes";

const createPost = async (req: Request, res: Response): Promise<void> => {
  const { userId, content, imgUrl, imgName, imgPublicId, videoPublicId, videoUrl, videoName } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!existingUser) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
      return;
    }

    const newPost = await prisma.post.create({
      data: {
        content,
        imgUrl,
        imgName,
        imgPublicId,
        videoUrl,
        videoName,
        videoPublicId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(StatusCodes.CREATED).json(newPost);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Posts not found", error });
  }
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
  const postId = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: updatedData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to update post", error });
  }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    await prisma.post.delete({ where: { id: postId } });
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete post", error });
  }
};

export { createPost, getPosts, updatePost, deletePost };
