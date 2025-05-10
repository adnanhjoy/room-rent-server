/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handelUpload = async (
  fileBuffer: Buffer,
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'users' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as { url: string; public_id: string });
      },
    );

    const readable = new Readable();
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (public_id: string): Promise<any> => {
  return cloudinary.uploader.destroy(public_id);
};
