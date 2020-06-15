const data = {
  dataModel: {
    Text: '按钮',
    Icon: 'icon-bi',
    Href: 'javascript:;',
    Target: '_self',
    Ctype: 'none',
    Title: '设置链接',
    Id: ''
  },
  styleModel: {
    cssvars: {
      $width: 'auto',
      $height: 'auto',
      $display: 'inline-block',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $bgColor: 'transparent',
      $hover_bgColor: 'transparent',
      $bdWidth: '1px',
      $bdStyle: 'solid',
      $bdColor: 'rgba(255, 255, 255, 1)',
      $hover_bdColor: 'rgba(255, 255, 255, 1)',
      $bdRadius: '0px',
      $fontFamily: 'PingFangSC',
      $fontSize: '14px',
      $color: 'rgba(255, 255, 255, 1)',
      $hover_color: 'rgba(255, 255, 255, 1)',
      $gradientstartcolor: 'none',
      $gradientendcolor: 'none',
      $hover_gradientstartcolor: 'none',
      $hover_gradientendcolor: 'none',
      $violet: '0deg',
      $hover_violet: '0deg',
      $bgImage: '',
      $hover_bgImage: '',
      $bgSize: 'cover',
      $hover_bgSize: 'cover',
      $bgPosition: '0 0',
      $hover_bgPosition: '0 0',
      $shadowBlur: '0px',
      $shadowSize: '0px',
      $shadowHorizontal: '0px',
      $shadowVertical: '0px',
      $shdowRadius: 0,
      $shadowBg: 'none',
      $hover_shadowBlur: '0px',
      $hover_shadowSize: '0px',
      $hover_shadowHorizontal: '0px',
      $hover_shadowVertical: '0px',
      $hover_shdowRadius: 0,
      $hover_shadowBg: 'none',
      $fontWeight: 'normal',
      $fontStyle: 'normal',
      $textDecoration: 'none',
      $hover_fontWeight: 'normal',
      $hover_fontStyle: 'normal',
      $hover_textDecoration: 'none'
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
