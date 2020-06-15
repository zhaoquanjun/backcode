import * as ajaxRequest from "./ajaxRequest";
import environment from '../environment';

/**
 * 获取图片列表
 * @param {*} option 
 */
export const getPicList = options => {
    return ajaxRequest.get(`${environment.contentApiUri}/api/v1/Picture/GetList`, options);
}
export const batchRemove = (isDelete, idList) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Picture/ChangeDeleteStatus/${isDelete}`, idList);
}

export const changeCategory = (categoryId, idList) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Picture/ChangeCategory/${categoryId}`, idList);
}

export const rename = (id, newName) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Picture/${id}`, JSON.stringify(newName));
}

/**
 * 上传base64图片到oss，并返回图片url
 * @param {any} imgData
 * @param {any} fileName
 * @param {any} categoryId
 */
export const uploadPictureBase64 = (imgData, fileName, categoryId) => {
    let uploadData = {
        Base64DataStr: imgData,
        FileName: fileName,
        CategoryId: categoryId
    };
    return ajaxRequest.post(`${environment.contentApiUri}/api/v1/Picture/UploadPictureBase64`, uploadData);
}