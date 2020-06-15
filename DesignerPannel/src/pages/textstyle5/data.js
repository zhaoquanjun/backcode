const data = {
  dataModel: {},
  styleModel: {
    cssvars: {
      $fontFamily: 'PingFang SC',
      $fontSize: '14px',
      $fontColor: 'rgba(38, 38, 38, 1)',
      '$liner-height': '1px',
      '$liner-bgColor': ' rgba(235, 236, 237, 1)',
      $lineHeight: '18px',
      $letterSpace: '0px',
      $textAlign: 'left',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $display: 'block'
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
