const data = {
  dataModel: {
    Text: 'contentPage'
  },
  styleModel: {
    cssvars: {
      '$header-bgColor': 'rgba(255, 255, 255, 1)',
      '$header-gradientstartcolor': 'none',
      '$header-gradientendcolor': 'none',
      '$header-violet': '0deg',
      '$header-bgImage': '',
      '$header-bgSize': 'cover',
      '$header-bgRepeat': 'no-repeat',
      '$header-bgPosition': '0 0',
      '$footer-bgColor': 'rgba(255, 255, 255, 1)',
      '$footer-gradientstartcolor': 'none',
      '$footer-gradientendcolor': 'none',
      '$footer-violet': '0deg',
      '$footer-bgImage': '',
      '$footer-bgSize': 'cover',
      '$footer-bgRepeat': 'no-repeat',
      '$footer-bgPosition': '0 0'
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
