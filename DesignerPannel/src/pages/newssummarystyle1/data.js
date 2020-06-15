const data = {
  dataModel: {},
  styleModel: {
    cssvars: {
      $fontFamily: 'Microsoft YaHei',
      $fontSize: '14px',
      $lineHeight: '14px',
      $letterSpace: '0px',
      $textAlign: 'left',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $display: 'block',
      $fontWeight: 'normal',
      $fontStyle: 'normal',
      $textDecoration: 'none',
      $ftColor: '#262626FF'
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
