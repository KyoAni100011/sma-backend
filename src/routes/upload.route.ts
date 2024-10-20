import express from 'express';
import { uploadImage, uploadVideo, upload } from '../controllers/upload.controller';

const uploadRouter = express.Router();


uploadRouter.post('/image', upload.single('images'), uploadImage);
uploadRouter.post('/video', upload.single('videos'), uploadVideo);

export default uploadRouter;
