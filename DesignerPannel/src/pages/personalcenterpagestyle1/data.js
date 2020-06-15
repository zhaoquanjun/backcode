const data = {
  dataModel: {},
  styleModel: {
    cssvars: {
      $bgColor: 'rgba(7,102,227,1)',
      $ftColor: 'rgba(38,38,38,1)'
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
