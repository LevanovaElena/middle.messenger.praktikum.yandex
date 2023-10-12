import {queryStringify} from "../utils/string.utils.ts";
import {BASE_API_URL} from "../config.ts";

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type IOptionsRequest = {
    data?: object;
    method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
    timeout?: number;
    headers?: Record<string, string>;
    params?: object;
}

type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<XMLHttpRequest>



class HTTPTransport {
    private readonly baseUrl:string=''
    constructor(base_url?:string) {
        this.baseUrl=base_url||BASE_API_URL;
    }
    get: HTTPMethod = (url, options = {}):Promise<XMLHttpRequest> => {
        return this.request(this.baseUrl+url+queryStringify(options.params as NonNullable<unknown> || {}) || '', {
            ...options,
            method: METHODS.GET
        }, options.timeout)as Promise<XMLHttpRequest> ;
    };

    put: HTTPMethod = (url, options = {}) => {

        return this.request(this.baseUrl+url, {...options, method: METHODS.PUT}, options.timeout) as Promise<XMLHttpRequest>;
    };
    post: HTTPMethod = (url, options = {})=> {

        return this.request(this.baseUrl+url, {...options, method: METHODS.POST},options.timeout) as Promise<XMLHttpRequest>;
    };
    delete: HTTPMethod = (url, options = {}) => {

        return this.request(this.baseUrl+url, {...options, method: METHODS.DELETE}, options.timeout) as Promise<XMLHttpRequest>;
    };

    request = (url: string, options: IOptionsRequest = {method: METHODS.GET,}, timeout = 5000) => {
        const {method, data,headers} = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.timeout = timeout;
            //const isGet = method === METHODS.GET;
            xhr.open(method || METHODS.GET, url);


            if (headers) {
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }


            xhr.onload = function () {
                resolve(xhr);
            };

            /*        const handleError = err => {
                        reject(err);
                    };*/

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            }
            else if( data instanceof FormData){
                xhr.send(data);
            }
            else {
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send(JSON.stringify(data));
            }
        });

    };
}

export default HTTPTransport;
