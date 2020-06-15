const data = {
  dataModel: {
    Text: 'container'
  },
  styleModel: {
    cssvars: {
      $marginLeft: 'auto',
      $marginRight: 'auto',
      $marginTop: '0px',
      $marginBottom: '0px',
      $bgColor: 'rgba(255, 255, 255, 1)',
      $bdWidth: '0px',
      $bdStyle: 'solid',
      $bdColor: 'rgba(255, 255, 255, 1)',
      $bdRadius: '0px',
      $gradientstartcolor: 'none',
      $gradientendcolor: 'none',
      $violet: '0deg',
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
