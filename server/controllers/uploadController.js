import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import { CatchAsyncError } from "../middleware/CatchAsyncError.js";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});


export const uploadSingleFile = CatchAsyncError(async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({message: "No file found!"});

        const streamUpload = (fileBuffer) => {
          return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(error)
                }
              });

            streamifier.createReadStream(fileBuffer).pipe(stream);
          });
        };

        const result = await streamUpload(req.file.buffer);

        return res.status(200).json({imageUrl: result.secure_url, message: "Uploaded success"});
    } catch (error) {
        res.status(500).json({message: "Server Error",
        error: error.message
      });
    }
});