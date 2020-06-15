const data = {
  dataModel: {
    Text: 'line'
  },
  styleModel: {
    cssvars: {
      $marginTop: '0px',
      $marginRight: 'auto',
      $marginBottom: '0px',
      $marginLeft: 'auto',
      $bdColor: '#fff',
      $bdWidth: '1px'
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
