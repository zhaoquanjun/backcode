import * as ajaxRequest from "./ajaxRequest";
import environment from '../environment';

export const get = () => {
    return ajaxRequest.get(`${environment.contentApiUri}/api/v1/videoCategory`);
}
export const create = entity => {
    return ajaxRequest.post(`${environment.contentApiUri}/api/v1/videoCategory`, entity);
}
export const batchRemove = idList => {
    return ajaxRequest._delete(`${environment.contentApiUri}/api/v1/videoCategory`, { data: idList });
}
export const rename = (id, newName) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/videoCategory/${id}`, JSON.stringify(newName));
}
export const modifyNode = (id, parentId, idOrderByArr) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/videoCategory/ModifyNode/${id}/${parentId}`, idOrderByArr);
}


