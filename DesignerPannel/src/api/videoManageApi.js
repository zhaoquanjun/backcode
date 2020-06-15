import * as ajaxRequest from "./ajaxRequest";
import environment from '../environment';

// case
//GET   ajaxRequest.get(`url`,params);
//POST  ajaxRequest.post(`url`,params);
//PUT  ajaxRequest.put(`url`,params);
//DELETE  ajaxRequest._delete(`url`,params);

/**
 * 获取列表
 * @param {*} option 
 */
export const getList = options => {
  return ajaxRequest.get(`${environment.contentApiUri}/api/v1/Video/GetList`, options);
}
export const batchRemove = (isDelete, idList) => {
  return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Video/ChangeDeleteStatus/${isDelete}`, idList);
}

export const changeCategory = (categoryId, idList) => {
  return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Video/ChangeCategory/${categoryId}`, idList);
}

export const rename = (id, newName) => {
  return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Video/${id}`, JSON.stringify(newName));
}
// 获取阿里云视频列表
export const getListOfAli = options => {
  return ajaxRequest.get(`${environment.contentApiUri}/api/v1/Video/GetListOfAli`, options);
}
// 删除阿里云视频
export const deleteVideo = idList => {
  return ajaxRequest._delete(`${environment.contentApiUri}/api/v1/Video/DeleteVideo`, { data: idList });
}
// 获取阿里云视频播放地址
export const getVideoPlayUrl = id => {
  return ajaxRequest.get(`${environment.contentApiUri}/api/v1/Video/GetVideoPlayUrl`, { videoId: id });
}
// 获取当前app的aksk
export const getAksk = () => {
  return ajaxRequest.get(`${environment.dashboardApi}/api/v1/AkSk/get`);
}
///api/Download/{type}/{appId}/{id}
