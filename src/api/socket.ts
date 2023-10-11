//'wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>'
class SocketIO {
    private socket: WebSocket | null = null;

    constructor(url: string,user_id?:string,chat_id?:string,token?:string) {
        let _url=url;
        if(user_id)_url=_url+'/'+user_id;
        if(chat_id)_url=_url+'/'+chat_id;
        if(token)_url=_url+'/'+token;
        this.socket = this.init(_url)
    }

    private init=(url: string)=> {
        return new WebSocket(url);
    }

    public open=(callBack: () => void) =>{
        this.socket?.addEventListener('open', callBack);
    }

    public close=(callBack: (event: CloseEvent) => void)=> {
        const funk = (event: CloseEvent) => {
            callBack(event);
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        }
        this.socket?.addEventListener('close', funk);
    }

    public message=(callBack: (event: MessageEvent) => void)=> {
        const funk = (event: MessageEvent) => {
            callBack(event);
            console.log('Получены данные', event.data);
        }
        this.socket?.addEventListener('message', funk);
    }

    public error(callBack: (event: Event) => void) {
        this.socket?.addEventListener('error', callBack);
    }

    public send=(message: string)=> {
        const _message = JSON.stringify(
            {
                content: message,
                type: "message"
            })
        this.socket?.send(_message);
    }

    public ping=()=> {
        this.socket?.send(JSON.stringify({
            type: "ping"
        }));
    }


}

export default SocketIO;
