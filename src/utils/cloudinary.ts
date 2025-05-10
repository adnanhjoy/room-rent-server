import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const handelUpload = async (file: string) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: 'image',
        folder: 'users',
    });
    return { url: res.secure_url, public_id: res.public_id };
};

export const deleteFromCloudinary = async (public_id: string) => {
    return cloudinary.uploader.destroy(public_id);
};