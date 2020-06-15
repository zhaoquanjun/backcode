const data = {
  dataModel: {
    Src: '',
    Width: 'auto',
    Text: 'Image',
    Href: 'javascript:;',
    Target: '_self',
    Type: 'none',
    Title: '设置链接1',
    PageIndex: '1',
    widthChanged: false,
    heightChanged: false,
    Ratio: 0,
    IsFirst: true
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
