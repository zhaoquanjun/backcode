const data = {
  dataModel: {
    listData: [
      {
        Id: '0',
        PictureUrl: '',
        Title: '123',
        Summary: '123',
        Date: '2019-7-11'
      }
    ],
    leftPercent: 2,
    rightPercent: 10,
    dateStyle: 'YYYY-MM-DD',
    target: '_blank',
    newsDetailPageId: '',
    total: 3,
    pageCount: 1,
    allCategoryId: []
  },
  targetPropertyName: 'listData',
  isQueryable: true,
  query: {
    schemaName: 'news',
    columns: 'Id,Title,Summary,PictureUrl,CreateTime',
    filters: [
      {
        columnName: 'ProductCategoryId',
        operation: 'In',
        value: '0',
        valType: 'Int'
      }
    ],
    orderBy: [
      {
        columnName: 'CreateTime',
        orderBy: 'Desc'
      }
    ],
    paggingEnable: true,
    limit: 4,
    skip: 0
  },
  styleModel: {
    cssvars: {
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $imgHeight: 'auto',
      '$list-hov_scaleRatio': '1.2',
      '$list-lineHeight': '10px',
      '$child-padding': '24px',
      '$title-fontSize': '20',
      '$title-fontFamily': 'PingFangSC',
      '$title-fontWeight': 'bold',
      '$title-fontStyle': 'normal',
      '$title-textDecoration': 'none',
      '$title-textAlign': 'left',
      '$title-lineHeight': '1.2',
      '$title-ftColor': 'rgba(38, 38, 38, 1)',
      '$title-hov_fontWeight': 'normal',
      '$title-hov_fontStyle': 'normal',
      '$title-hov_textDecoration': 'none',
      '$title-hov_ftColor': 'rgba(38, 38, 38, 1)',
      '$desc-fontSize': '20',
      '$desc-fontFamily': 'PingFangSC',
      '$desc-fontWeight': 'normal',
      '$desc-fontStyle': 'normal',
      '$desc-textDecoration': 'none',
      '$desc-textAlign': 'left',
      '$desc-lineHeight': '1.2',
      '$desc-ftColor': 'rgba(38, 38, 38, 1)',
      '$desc-descShow': 'block',
      '$date-fontSize': '20',
      '$date-fontFamily': 'PingFangSC',
      '$date-fontWeight': 'bold',
      '$date-fontStyle': 'normal',
      '$date-textDecoration': 'none',
      '$date-textAlign': 'left',
      '$date-lineHeight': '1.2',
      '$date-ftColor': 'rgba(38, 38, 38, 1)',
      '$date-dateShow': 'block',
      '$pagitation-isShow': 'block',
      '$pagitation-textAlign': 'right',
      $bdStyle: 'solid',
      $bdColor: 'rgba(229,229,229, 1)',
      '$img-show': 'block'
    }
  }
}
const dataWrapper = {
  data: data
}
import formatData from '@utils/formatData'
if (window.smSite) {
  formatData(dataWrapper)
}

export default dataWrapper
