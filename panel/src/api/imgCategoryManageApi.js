import * as ajaxRequest from "./ajaxRequest";
import environment from '../environment';

export const get = () => {
    return ajaxRequest.get(`${environment.contentApiUri}/api/v1/PictureCategory`);
}
export const create = entity => {
    return ajaxRequest.post(`${environment.contentApiUri}/api/v1/PictureCategory`, entity);
}
export const batchRemove = idList => {
    return ajaxRequest._delete(`${environment.contentApiUri}/api/v1/PictureCategory`, { data: idList });
}
export const rename = (id, newName) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/PictureCategory/${id}`, JSON.stringify(newName));
}
export const modifyNode = (id, parentId, idOrderByArr) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/PictureCategory/ModifyNode/${id}/${parentId}`, idOrderByArr);
}


