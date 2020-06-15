import * as ajaxRequest from './ajaxRequest'
import environment from '../environment'

// case
//GET   ajaxRequest.get(`url`,params);
//POST  ajaxRequest.post(`url`,params);
//PUT  ajaxRequest.put(`url`,params);
//DELETE  ajaxRequest._delete(`url`,params);

/**
 * 跳转链接接口
 * @param {*} option
 */
export const getPagesList = options => {
  return ajaxRequest.get(
    `${environment.pageApiUri}/api/v1/Page/GetContentPageList`,
    options
  )
}

export const getArticleList = options => {
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/News/GetNewsList/${options.pageIndex}/${options.pageSize}`,
    options
  )
}

export const getArticleCategory = () => {
  const language = { language: sessionStorage.getItem('language') }
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/NewsCategory/GetTree`,
    language
  )
}

export const getProductList = options => {
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/product/GetList`,
    options
  )
}

export const getProductCategory = () => {
  const language = { language: sessionStorage.getItem('language') }
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/ProductCategory`,
    language
  )
}

export const getFileCategory = () => {
  return ajaxRequest.get(`${environment.contentApiUri}/api/v1/FileCategory`)
}

export const getFileList = options => {
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/file/GetList`,
    options
  )
}

export const getPageDetail = options => {
  return ajaxRequest.get(
    `${environment.pageApiUri}/api/v1/Page/GetPageList`,
    options
  )
}
