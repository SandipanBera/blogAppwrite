import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) //  API Endpoint
      .setProject(conf.appWriteProjectId); //  project ID
    this.account = new Account(this.client);
  }
   handleError(error) {
    console.log(error);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name      
      );
      if (userAccount) {
       return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      this.handleError(error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      this.handleError(error)
 
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}
const authService = new AuthService();

export default authService;
