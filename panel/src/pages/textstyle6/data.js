const data = {
  dataModel: {},
  styleModel: {
    cssvars: {
      $fontFamily: 'PingFangSC',
      $fontSize: '14px',
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
