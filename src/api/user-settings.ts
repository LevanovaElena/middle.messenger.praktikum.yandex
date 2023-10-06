import HTTPTransport from "../utils/Http.ts";
import {IPasswords, IUser} from "../models/IUser.ts";

export class UserSettingsApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string | null = null;

    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    public changeUserProfile(userData: IUser) {
        return this.httpTransport.put(this.baseUrl + '/profile', {data: userData});
    }

    public changeUserAvatar(file: FormData) {
        return this.httpTransport.put(this.baseUrl + '/profile/avatar', {data: file});
    }

    public changeUserPassword(data: IPasswords) {
        return this.httpTransport.put(this.baseUrl + '/password', {data: data});
    }

}

export default UserSettingsApi
