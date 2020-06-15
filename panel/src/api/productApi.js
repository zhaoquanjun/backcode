import * as ajaxRequest from './ajaxRequest'
import environment from '../environment'

export const getProductList = options => {
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/product/GetList`,
    options
  )
}

export const getProductTree = () => {
  const language = { language: sessionStorage.getItem('language') }
  return ajaxRequest.get(
    `${environment.contentApiUri}/api/v1/ProductCategory`,
    language
  )
}
