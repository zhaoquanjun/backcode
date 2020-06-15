import * as ajaxRequest from "./ajaxRequest";
import environment from '../environment';

export const createFileWithoutUpload = (data) => {
    return ajaxRequest.post(`${environment.contentApiUri}/api/v1/ChunkUpload/CreateFileWithoutUpload`, (data));
}