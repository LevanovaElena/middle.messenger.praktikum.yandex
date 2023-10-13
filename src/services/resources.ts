import {responseHasError} from "../utils/api.utils.ts";
import ResourcesApi from "../api/resources.ts";


const resourcesApi = new ResourcesApi('/resources');

const uploadResource = async (file:FormData) => {
    const result = await resourcesApi.uploadResource(file) as XMLHttpRequest;
    const error=responseHasError(result);
    if (error) throw Error(error);
    if(!error)
    return JSON.parse(result.responseText);

}

export {
    uploadResource
}
