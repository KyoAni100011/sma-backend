import { Request, Response } from "express";
import prisma from "../prisma";
import { StatusCodes } from "http-status-codes";

const createPost = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;

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
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        imgName: req.body.imgName,
        videoUrl: req.body.videoUrl,
        videoName: req.body.videoName,
        userId: userId,
      },
    });

    res.status(StatusCodes.OK).json(newPost);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// const  getPosts = async (req: Request, res: Response) => {
//         try {
//             const postId = req.params.id; // Lấy ID từ tham số URL
//             const post = await readPost(postId);
//             return res.status(200).json(post); // Trả về bài viết
//         } catch (error) {
//             return res.status(404).json({ message: "Bài viết không tìm thấy", error });
//         }
//     },

// const updatePost = async (req: Request, res: Response) => {
//         try {
//             const postId = req.params.id; // Lấy ID từ tham số URL
//             const updatedData = req.body; // Nhận dữ liệu cập nhật từ body
//             const updatedPost = await updatePost(postId, updatedData);
//             return res.status(200).json(updatedPost); // Trả về bài viết đã cập nhật
//         } catch (error) {
//             return res.status(500).json({ message: "Cập nhật bài viết thất bại", error });
//         }
//     },

//  const   deletePost =  async (req: Request, res: Response) => {
//         try {
//             const postId = req.params.id; // Lấy ID từ tham số URL
//             await deletePost(postId);
//             return res.status(204).send(); // Trả về mã trạng thái 204 No Content
//         } catch (error) {
//             return res.status(500).json({ message: "Xóa bài viết thất bại", error });
//         }
//     }
// };

// export default postController;

export { createPost };
