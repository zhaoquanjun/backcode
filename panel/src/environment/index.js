/**
 *系统配置管理
 *
 */
const baseServerUrl = window.location.hostname.indexOf('clouddream.net') == -1 ? 'console.wezhan.cn' : 'clouddream.net';
const httpSchema = 'https://';

let contentApiUri = `${httpSchema}api.content.${baseServerUrl}`;
let dashboardApi = `${httpSchema}api.dashboard.${baseServerUrl}`;
let pageApiUri = `${httpSchema}api.designer.${baseServerUrl}`;
let uploadPicUrl = `${httpSchema}api.content.${baseServerUrl}/api/v1/picture`;
let redirectUrl = {
  createArticle: `${httpSchema}content.${baseServerUrl}/content/createarticle`,
  createProduct: `${httpSchema}content.${baseServerUrl}/content/createProduct`,
  uploadFile: `${httpSchema}content.${baseServerUrl}/content/file`
};

if (process.env.NODE_ENV === 'development') {
  `${httpSchema}api.content.${baseServerUrl}`;
  pageApiUri = `${httpSchema}api.designer.${baseServerUrl}`;
  uploadPicUrl = `${httpSchema}api.content.${baseServerUrl}/api/v1/picture`;
  redirectUrl['createArticle'] = `${httpSchema}content.${baseServerUrl}/content/createarticle`;
  redirectUrl['createProduct'] = `${httpSchema}content.${baseServerUrl}/content/createProduct`;
  redirectUrl['uploadFile'] = `${httpSchema}content.${baseServerUrl}/content/file`;
}
const environment = {
  contentApiUri,
  dashboardApi,
  pageApiUri,
  redirectUrl,
  uploadPicUrl
}
export default environment
