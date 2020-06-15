import * as ajaxRequest from './ajaxRequest'
import environment from '../environment'

// 获取文章列表
export const getArticleList = options => {
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/News/GetNewsList/${options.pageIndex}/${options.pageSize}`,
    options
  )
}
/**
 * 获取文章分类
 */
export const getArticleCategory = () => {
  const language = { language: sessionStorage.getItem('language') }
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/NewsCategory/GetTree`,
    language
  )
}

export const getArticleDetailPageList = params => {
  return ajaxRequest.get(
    `${environment.pageApiUri}/api/v1/Page/getpagedetaillist?siteId=${params.siteId}&pageType=${params.pageType}`
  )
}
