import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class UploadFile {
  client = new Client();
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) //  API Endpoint
          .setProject(conf.appWriteProjectId); //  project ID
          this.bucket = new Storage(this.client);     
    }
    async uploadfile(file) {
       try {
        return await this.bucket.createFile(conf.appWriteBucketId,ID.unique(),file)
       } catch (error) {
        console.log(error)
        }
        return false; 
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appWriteBucketId, fileId)
        } catch (error) {
         console.log(error)
         }
         return false; 
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);  
    }
}
const uploadFile = new UploadFile();
export default uploadFile;