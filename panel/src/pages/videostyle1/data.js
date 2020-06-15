const data = {
  dataModel: {
    UploadSrc: '',
    OutsideSrc: '',
    Cover: '',
    Autoplay: true,
    Source: 1,
    Title: '默认视频',
    Id: ''
  },
  styleModel: {
    cssvars: {
      $display: 'block',
      $width: 'auto',
      $height: 'auto',
      $marginTop: 0,
      $marginBottom: 0,
      $marginLeft: 0,
      $marginRight: 0,
      $bdWidth: 0,
      $bdRadius: 0,
      $bdColor: 'none',
      $shadowHorizontal: '0px',
      $shadowVertical: '0px',
      $shadowSize: '0px',
      $shdowRadius: 0,
      $shadowBlur: '0px',
      $shadowBg: 'none'
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
