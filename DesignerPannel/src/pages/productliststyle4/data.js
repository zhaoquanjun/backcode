const data = {
  dataModel: {
    percent: '4',
    mobildPercent: '2',
    target: '_blank',
    productDetailPageId: '1',
    total: 3,
    pageCount: 1
  },
  targetPropertyName: 'listData',
  isQueryable: true,
  query: {
    schemaName: 'product',
    columns: 'Id,Title,Summary,PictureUrl',
    filters: [
      {
        columnName: 'CategoryId',
        operation: 'In',
        value: '1,2,3',
        valType: 'Int'
      }
    ],
    orderBy: [
      {
        columnName: 'CreateTime',
        orderBy: '1'
      }
    ],
    paggingEnable: true,
    limit: 8,
    skip: 0
  },
  styleModel: {
    cssvars: {
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      '$list-hov_scaleRatio': '1.2',
      $imgHeight: '340px',
      '$list-width': '25%',
      '$list-space': '5px',
      '$title-fontSize': '20',
      '$title-fontFamily': 'PingFangSC',
      '$title-fontColor': 'rgba(255, 255, 255, 1)',
      '$title-fontWeight': 'bold',
      '$title-fontStyle': 'normal',
      '$title-textDecoration': 'none',
      '$title-textAlign': 'left',
      '$title-lineHeight': '24px',
      '$desc-fontSize': '14',
      '$desc-fontFamily': 'PingFangSC',
      '$desc-fontColor': 'rgba(255, 255, 255, 1)',
      '$desc-fontWeight': 'bold',
      '$desc-fontStyle': 'normal',
      '$desc-textDecoration': 'none',
      '$desc-textAlign': 'left',
      '$desc-lineHeight': '24px',
      '$desc-descShow': 'block',
      '$date-fontSize': '20',
      '$date-fontFamily': 'PingFangSC',
      '$date-fontColor': 'rgba(255, 255, 255, 1)',
      '$date-fontWeight': 'bold',
      '$date-fontStyle': 'normal',
      '$date-textDecoration': 'none',
      '$date-textAlign': 'left',
      '$date-lineHeight': '24px',
      '$date-dateShow': 'block',
      '$pagination-isShow': 'none',
      '$pagination-textAlign': 'right',
      $bdStyle: 'solid',
      $bdColor: 'rgba(47, 39, 39, 1)'
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
