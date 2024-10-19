import { Client, ID, Account } from "appwrite";
import conf from "../config/conf";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error); 
            return false;
        }

        return null;
    }

    async logout(){
        try {
          await this.account.deleteSessions();  
        } catch (error) {
            console.log("Authservice error ");
            throw error;
        }
    }
}
const authservice = new AuthService();
export default authservice;