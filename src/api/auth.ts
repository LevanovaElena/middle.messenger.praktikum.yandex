import HTTPTransport from "../utils/Http.ts";
import {IAuthData, IUser} from "../models/IUser.ts";

export class AuthApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string | null = null;

    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    public async signUp(userData: IUser) {
        const result = await this.httpTransport.post(this.baseUrl + '/signup', {data: userData});
        console.log(result);
    }

    public async signIn(userData: IAuthData) {
        const result = await this.httpTransport.post(this.baseUrl + '/signin', {data: userData});
        console.log(result);
    }
    public async getAuthUser() {
        const result = await this.httpTransport.get(this.baseUrl + '/user');
        console.log(result);
    }
    public async logOut() {
        const result = await this.httpTransport.post(this.baseUrl + '/logout');
        console.log(result);
    }
}

export default AuthApi
