import fs from 'fs';
import { google } from 'googleapis'; 
import dotenv from 'dotenv';

dotenv.config();

const SCOPE = ['https://www.googleapis.com/auth/drive'];

type FileUpload = {
    filePath: string;
    fileName: string;
    mimeType: string;
};


export const authorize = async (): Promise<any> => {
    const jwtClient = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL as string,
        undefined,
        process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
};

export const uploadFileToDrive = async (authClient: any, fileUpload: FileUpload): Promise<any> => {
    const { filePath, fileName, mimeType } = fileUpload;

    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
        name: fileName,
        parents: [process.env.DRIVE_FOLDER_ID as string],
    };

    const media = {
        body: fs.createReadStream(filePath),
        mimeType: mimeType,
    };

    return drive.files.create({
        requestBody: fileMetaData,
        media: media,
        fields: 'id',
    });
};