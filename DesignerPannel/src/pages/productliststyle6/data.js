const data = {
  dataModel: {
    percent: '4',
    mobildPercent: '2',
    target: '_blank',
    productDetailPageId: '1',
    total: 3,
    pageCount: 1,
    buttonName: '查看详情'
  },
  targetPropertyName: 'listData',
  isQueryable: true,
  query: {
    schemaName: 'product',
    columns: 'Id,Title,Summary,PictureUrl,Price',
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
    limit: 4,
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
      '$list-space': '10px',
      '$title-fontSize': '16',
      '$title-fontFamily': 'PingFangSC',
      '$title-fontColor': 'rgba(255, 255, 255, 1)',
      '$title-fontWeight': 'bold',
      '$title-fontStyle': 'normal',
      '$title-textDecoration': 'none',
      '$title-textAlign': 'left',
      '$title-lineHeight': '2',
      '$desc-fontSize': '14',
      '$desc-fontFamily': 'PingFangSC',
      '$desc-fontColor': '#B3B3BD',
      '$desc-fontWeight': 'bold',
      '$desc-fontStyle': 'normal',
      '$desc-textDecoration': 'none',
      '$desc-textAlign': 'left',
      '$desc-lineHeight': '2',
      '$desc-lineNum': '1',
      '$desc-descShow': 'block',
      '$price-fontSize': '20',
      '$price-fontFamily': 'PingFangSC',
      '$price-ftColor': '#E02020',
      '$price-fontWeight': 'bold',
      '$price-fontStyle': 'normal',
      '$price-textDecoration': 'none',
      '$price-textAlign': 'left',
      '$price-lineHeight': '2',
      '$button-fontSize': '14',
      '$button-fontFamily': 'PingFangSC',
      '$button-ftColor': 'rgba(11, 11, 11, 1)',
      '$button-fontWeight': 'bold',
      '$button-fontStyle': 'normal',
      '$button-textDecoration': 'none',
      '$button-textAlign': 'center',
      '$button-lineHeight': '2',
      '$button-bdRadius': '0',
      '$button-bgColor': 'transparent',
      '$button-bdColor': 'transparent',
      '$button-bdWidth': '1px',
      '$button-buttonShow': 'block',
      '$button-hov_ftColor': 'rgba(11, 11, 11, 1)',
      '$button-hov_bdColor': 'none',
      '$button-hov_bgColor': 'transparent',
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
      '$pagination-textAlign': 'center',
      $bdStyle: 'solid',
      $bdColor: 'none',
      $bgColor: 'transparent'
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
