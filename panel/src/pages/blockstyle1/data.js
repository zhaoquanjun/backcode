const data = {
  dataModel: {
    Text: 'container'
  },
  styleModel: {
    cssvars: {
      $marginLeft: '0px',
      $marginRight: '0px',
      $marginTop: '0px',
      $marginBottom: '0px',
      $bgColor: 'rgba(255, 255 ,255, 1)',
      $bdWidth: '0px',
      $bdStyle: 'solid',
      $bdColor: 'rgba(255, 255, 255, 1)',
      $bdRadius: '0px',
      $hov_bgcolor: 'rgba(237, 230, 230, 1)',
      $gradientstartcolor: 'none',
      $gradientendcolor: 'none',
      $bgImage: '',
      $bgSize: 'cover',
      $bgPosition: '0 0',
      $textAlign: 'left'
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
