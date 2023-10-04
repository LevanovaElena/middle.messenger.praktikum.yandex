import {queryStringify} from "./string.utils.ts";
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

type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<unknown>



class HTTPTransport {
    private readonly baseUrl:string=''
    constructor(base_url?:string) {
        this.baseUrl=base_url||BASE_API_URL;
    }
    get: HTTPMethod = (url, options = {}) => {
        return this.request(this.baseUrl+url+queryStringify(options.params || {}) || '', {
            ...options,
            method: METHODS.GET
        }, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {

        return this.request(this.baseUrl+url, {...options, method: METHODS.PUT,headers:{'Content-Type': 'application/json'}}, options.timeout);
    };
    post: HTTPMethod = (url, options = {}) => {

        return this.request(this.baseUrl+url, {...options, method: METHODS.POST,headers:{'Content-Type': 'application/json'}}, options.timeout);
    };
    delete: HTTPMethod = (url, options = {}) => {

        return this.request(this.baseUrl+url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: IOptionsRequest = {method: METHODS.GET}, timeout = 5000) => {
        const {method, headers, data} = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
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
            } else {
                xhr.send(JSON.stringify(data));
            }
        });

    };
}

export default HTTPTransport;
