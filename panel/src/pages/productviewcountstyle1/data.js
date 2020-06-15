const data = {
  dataModel: {
    Icon: 'iconchakan',
    Desc: '浏览量:',
    Hits: 6666
  },
  styleModel: {
    cssvars: {
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
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
