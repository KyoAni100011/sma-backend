import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import { authorize, uploadFileToDrive } from '../services/image.service'

export const upload = multer({ dest: 'uploads/' });

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const { path: filePath, originalname: fileName, mimetype: mimeType } = req.file;

    try {
        const authClient = await authorize();
        const file = await uploadFileToDrive(authClient, { filePath, fileName, mimeType });

        fs.unlinkSync(filePath); 

        res.status(200).json({ file: file, message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file to Drive:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
};

export const uploadVideo = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const { path: filePath, originalname: fileName, mimetype: mimeType } = req.file;

    try {
        const authClient = await authorize();
        const file = await uploadFileToDrive(authClient, { filePath, fileName, mimeType });

        fs.unlinkSync(filePath);

        res.status(200).json({ id: file.data.id, message: 'Video uploaded successfully' });
    } catch (error) {
        console.error('Error uploading video to Drive:', error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
};

