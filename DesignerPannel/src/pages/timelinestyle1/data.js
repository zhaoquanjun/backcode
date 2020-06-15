const data = {
  dataModel: {
    childArea: [
      {
        Id: 'time1',
        Time: '2020-1-21',
        Title: '第一个时间段',
        Desc: '第一个时间段的描述',
        Html: ''
      }
    ],
    leftPercent: '3',
    rightPercent: '9',
    icon: 'iconziyuan',
    selectedAreaId: 'time1'
  },
  styleModel: {
    cssvars: {
      '$time-fontFamily': 'PingFang SC',
      '$time-fontSize': '21px',
      '$time-fontWeight': 'bold',
      '$time-fontStyle': 'italic',
      '$time-ftColor': 'rgba(38, 38, 38, 1)',
      '$time-show': 'block',
      '$title-fontFamily': 'PingFang SC',
      '$title-fontSize': '18px',
      '$title-fontWeight': 'bold',
      '$title-fontStyle': 'normal',
      '$title-ftColor': 'rgba(38, 38, 38, 1)',
      '$title-lineHeight': '2',
      '$desc-fontFamily': 'PingFang SC',
      '$desc-fontSize': '12px',
      '$desc-fontWeight': 'normal',
      '$desc-fontStyle': 'normal',
      '$desc-ftColor': 'rgba(159, 159, 159, 1)',
      '$desc-lineHeight': '2',
      '$desc-textAlign': 'left',
      '$desc-show': 'block',
      '$node-ftColor': 'rgba(255, 107, 0, 1)',
      '$node-number': '3',
      '$node-distance': '100px',
      '$line-bdColor': 'rgba(235, 236, 237, 1)',
      '$line-bdStyle': 'solid',
      '$line-bdWidth': '2px'
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
