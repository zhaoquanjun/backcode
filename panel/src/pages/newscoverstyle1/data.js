const data = {
  dataModel: {
    Model: 'square',
    CoverUrl: '',
    Href: 'javascript:;',
    Target: '_self',
    Type: 'page',
    widthChanged: false,
    heightChanged: false,
    Ratio: 0
  },
  styleModel: {
    cssvars: {
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $display: 'inline-block',
      $width: 'auto',
      $height: 'auto',
      $imgWidth: 'auto',
      $bdWidth: '0px',
      $bdRadius: '0px',
      $bdColor: 'none',
      $shadowBlur: '0px',
      $shadowSize: '0px',
      $shadowHorizontal: '0px',
      $shadowVertical: '0px',
      $shdowRadius: '0px',
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
