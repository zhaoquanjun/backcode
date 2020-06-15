const data = {
  dataModel: {
    DefaultImage: '',
    QRType: 1,
    Text: '',
    Link: '',
    Tel: '',
    DarkColor: '#000000',
    LightColor: '#ffffff',
    Ratio: 1
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
      $ctrlheight: 'auto',
      $ctrlwidth: 'auto',
      $bdWidth: '0px',
      $bdRadius: '0px',
      $bdColor: 'none',
      $shadowBlur: '0px',
      $shadowSize: '0px',
      $shadowHorizontal: '0px',
      $shadowVertical: '0px',
      $shdowRadius: '0px',
      $shadowBg: 'none',
      $ColorDark: '#000000',
      $ColorLight: '#ffffff'
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
