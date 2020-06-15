import * as ajaxRequest from "./ajaxRequest";
import environment from '../environment';

export const getStorageUsage = uploadFileType => {
    return ajaxRequest.get(`${environment.contentApiUri}/api/v1/ChunkUpload/GetStorageUsage/${uploadFileType}`);
}

export const getCurrentUsageTraffic = uploadFileType => {
    return ajaxRequest.get(`${environment.contentApiUri}/api/v1/ChunkUpload/GetCurrentUsageTraffic/${uploadFileType}`);
}
export const adminDownload = (type, id) => {
    return ajaxRequest.put(`${environment.contentApiUri}/api/v1/Download/AdminDownload/${type}/${id}`);
}