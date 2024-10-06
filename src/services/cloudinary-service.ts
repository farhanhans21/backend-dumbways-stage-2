import {v2 as clodinary} from"cloudinary"

class CloudinaryService {
  constructor(){
    clodinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async upload(file: Express.Multer.File){
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data" + file.mimetype + ";base64," + b64;
    return await clodinary.uploader.upload(dataURI,{
      folder: process.env.CLOUDINARY_FOLDER
    })
  }
}
export default new CloudinaryService();