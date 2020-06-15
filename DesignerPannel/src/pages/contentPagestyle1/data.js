const data = {
  dataModel: { Text: 'contentPage' },
  styleModel: {
    cssvars: {
      '$content-bgColor': 'rgba(255, 255, 255, 1)',
      '$content-gradientstartcolor': 'none',
      '$content-gradientendcolor': 'none',
      '$content-violet': '0deg',
      '$content-bgImage': '',
      '$content-bgSize': 'cover',
      '$content-bgPosition': '50% 50%'
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
