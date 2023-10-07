import HTTPTransport from "../utils/Http.ts";

export class ChatApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string = '/chats';

    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    public getChats() {
        return  this.httpTransport.get(this.baseUrl);
    }

    public createChat(title:string) {
        return  this.httpTransport.post(this.baseUrl,{data:{title: title}});
    }
  /*  public signUp(userData: IUser) {
      return this.httpTransport.post(this.baseUrl + '/signup', {data: userData});
    }

    public  signIn(userData: IAuthData) {
        return  this.httpTransport.post(this.baseUrl + '/signin', {data: userData});
    }

    public logOut() {
        return  this.httpTransport.post(this.baseUrl + '/logout');
    }*/
}

export default ChatApi
