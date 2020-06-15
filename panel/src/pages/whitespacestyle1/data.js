const data = {
  dataModel: {},
  styleModel: {
    cssvars: {
      $width: 'auto',
      $height: '50px'
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
