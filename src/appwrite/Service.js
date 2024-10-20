import { Client, ID, Account, Databases, Storage } from "appwrite";
import conf from "../config/conf";

export  class Service{
 client=new Client();
 database;
 bucket;
 constructor(){
    this.client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(conf.appwriteProjectId);
    this.database=new Databases(this.client);
    this.bucket=new Storage(this.client);
 }
async createPost({title,slug,content,featuredImage,status,userId}){
    try {
        return await this.database.createDocument(conf.appwriteDbId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status,userId});
    } catch (error) {
        console.log("Services : Eror ::CreatePost : error",error);
    }
}
async updatePost(slug,{title,content,featuredImage,status,userId}){
    try {
        return await this.database.updateDocument(conf.appwriteDbId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status})
    } catch (error) {
        console.log("Services : Eror ::updatePost : error",error);
    }
}

async deletePost(slug) {
    try {
        const post = await this.getPost(slug);  // Ensure post exists
        if (!post) {
            console.warn("Post not found, cannot delete.");
            return false;  // Avoid unnecessary deletion attempt
        }

        await this.database.deleteDocument(conf.appwriteDbId, conf.appwriteCollectionId, slug);
        console.log("Post deleted successfully");
        return true;
    } catch (error) {
        console.error("Services : Error ::deletePost : error", error);
        return false;
    }
}


async getPost(slug) {
    try {
        const post = await this.database.getDocument(
            conf.appwriteDbId,
            conf.appwriteCollectionId,
            slug
        );
        return post;
    } catch (error) {
        if (error.code === 404) {
            console.warn(`No post found with slug: ${slug}`);
        } else {
            console.error("Services : Error ::getPost :", error);
        }
        return false;
    }
}


async getPosts(queries=[Query.equal("status", ["active"])]){
try {
    return await this.database.listDocuments(conf.appwriteDbId,conf.appwriteCollectionId,queries);
} catch (error) {
    console.log("Services : Eror ::getPosts : error",error);
    return false;
}
}
//File Services

async uploadfile(file) {
    if (!file) {
        console.error("No file provided");
        return false;
    }

    try {
        // Ensure the file is valid
        if (!(file instanceof File)) {
            console.error("Provided argument is not a valid File object");
            return false;
        }

        const fileId = ID.unique(); // Generate a unique ID for the file
        // Ensure the bucket ID is valid
        

        const response = await this.bucket.createFile(conf.appwriteBucketId, fileId, file);
        return response; // Return the response (e.g., file data)
    } catch (error) {
        console.error("Services : Error :: UploadFiles : error", error.message || error);
        return false; // Return false on error
    }
}


async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
        return true;
    } catch (error) {
        console.log("Services : Eror ::DeleteFiles : error",error);

        return false;
    }
}

 previewFile(fileId) {
    if (!fileId) {
        console.error("Invalid fileId provided for preview.");
        return false;
    }

    try {
        const resp = this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        
        if (resp && resp.href) {
            return resp.href;
        } else {
            console.error("Error: Unable to generate preview for file.");
            return false;
        }
    } catch (error) {
        console.log("Services : Error ::PreviewFile : error", error.message);
        return false;
    }
}


}

const service=new Service();

export default service