const data = {
  dataModel: {
    'Thumb-nailPicUrlList': ['']
  },
  styleModel: {
    cssvars: {
      '$pc-width': 'auto',
      '$pc-height': '493px',
      '$mb-height': '200px',
      '$pc-marginTop': '0px',
      '$pc-marginRight': '0px',
      '$pc-marginBottom': '0px',
      '$pc-marginLeft': '0px',
      '$mb-marginTop': '0px',
      '$mb-marginRight': '0px',
      '$mb-marginBottom': '0px',
      '$mb-marginLeft': '0px',
      $bulletColor: 'rgba(255, 255, 255, 1)',
      $bulletActiveColor: 'rgba(7,102,227,1)',
      $arrowShow: 'block',
      $indicator: 1
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
