import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";
export class Service {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) //  API Endpoint
      .setProject(conf.appWriteProjectId); //  project ID
    this.databases = new Databases(this.client);
  }
  async createPost({ title, content, image, status, userid, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          image,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
const service = new Service();
export default service;
