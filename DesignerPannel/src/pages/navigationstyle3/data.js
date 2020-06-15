const data = {
  dataModel: {
    Swich: true,
    MoreText: '更多',
    listDate: [
      {
        id: 11,
        parentId: 1,
        title: '产品简介',
        url: '/1',
        childs: [
          {
            id: 11,
            parentId: 1,
            title: '产品简介1',
            MenuUrl: '/1'
          },
          {
            id: 11,
            parentId: 1,
            Icon: '',
            title: '产品简介2',
            MenuUrl: '/1'
          }
        ]
      },
      {
        id: 2,
        parentId: 0,
        title: '关于我们',
        MenuUrl: '/1',
        Children: [
          {
            id: 11,
            parentId: 1,
            title: '公司介绍',
            MenuUrl: '/1'
          }
        ]
      }
    ]
  },
  targetPropertyName: 'listData',
  isQueryable: true,
  query: {
    schemaName: 'pageinfo',
    columns: '*',
    filters: [
      {
        columnName: '',
        operation: 'In',
        value: '',
        valType: 'String'
      }
    ],
    paggingEnable: false
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
      '$title-lineHeight': '24px',
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
      '$desc-lineHeight': '24px',
      '$desc-ftColor': 'rgba(38, 38, 38, 1)',
      '$desc-descShow': 'block',
      '$date-fontSize': '20',
      '$date-fontFamily': 'PingFangSC',
      '$date-fontWeight': 'bold',
      '$date-fontStyle': 'normal',
      '$date-textDecoration': 'none',
      '$date-textAlign': 'left',
      '$date-lineHeight': '24px',
      '$date-ftColor': 'rgba(38, 38, 38, 1)',
      '$date-descShow': 'block',
      '$pagitation-isShow': 'block',
      '$pagitation-textAlign': 'right',
      $bdStyle: 'solid',
      $bdColor: 'rgba(229,229,229, 1)'
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
