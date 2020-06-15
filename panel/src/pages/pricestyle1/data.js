const data = {
  dataModel: {
    Text: '现价:',
    Icon: 'icon-bi',
    Href: 'javascript:;',
    Target: '_self',
    Type: 'none',
    PageIndex: '1'
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
      $bgColor: 'rgba(255, 255, 255, 1)',
      $hov_bgColor: 'rgba(255, 255, 255, 1)',
      $bdWidth: '0px',
      $bdStyle: 'solid',
      $bdColor: 'rgba(255, 255, 255, 1)',
      $hov_bdColor: 'rgba(255, 255, 255, 1)',
      $bdRadius: '0px',
      $fontFamily: 'inherit',
      $fontSize: '12px',
      $color: 'rgba(255, 255, 255, 1)',
      $hov_color: 'rgba(255, 255, 255, 1)',
      $gradientstartcolor: 'none',
      $gradientendcolor: 'none',
      $hov_gradientstartcolor: 'none',
      $hov_gradientendcolor: 'none',
      $violet: '0deg',
      $hov_violet: '0deg',
      $bgImage: '',
      $hov_bgImage: '',
      $bgSize: 'cover',
      $hov_bgSize: 'cover',
      $bgPosition: '0 0',
      $hov_bgPosition: '0 0',
      $fontWeight: 'normal',
      $fontStyle: 'normal',
      $textDecoration: 'none',
      $hov_fontWeight: 'normal',
      $hov_fontStyle: 'normal',
      $hov_textDecoration: 'none'
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
