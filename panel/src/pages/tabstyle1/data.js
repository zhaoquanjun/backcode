const data = {
  dataModel: {
    childArea: [
      {
        Id: 'content1',
        Title: '标签一'
      }
    ],
    selectedAreaId: 'content1'
  },
  styleModel: {
    cssvars: {
      $height: '44px',
      $width: '100px',
      '$outer-width': '300px',
      $display: 'block',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      '$title-textAlign': 'center',
      '$hea-textAlign': 'center',
      $fontFamily: 'PingFangSC',
      $fontSize: '14px',
      $fontWeight: 'normal',
      $fontStyle: 'normal',
      $textDecoration: 'none',
      $ftColor: 'rgba(38, 38, 38, 1)',
      $bgColor: 'rgba(235, 236, 237, 1)',
      $gradientstartcolor: 'none',
      $gradientendcolor: 'none',
      $violet: '0deg',
      $bgImage: '',
      $bgSize: 'cover',
      $bgRepeat: 'no-repeat',
      $bgPosition: '0 0',
      '$con-bgColor': 'rgba(235, 236, 237, 1)',
      '$con-gradientstartcolor': 'none',
      '$con-gradientendcolor': 'none',
      '$con-violet': '0deg',
      '$con-bgImage': '',
      '$con-bgSize': 'cover',
      '$con-bgRepeat': 'no-repeat',
      '$con-bgPosition': '0 0',
      '$con-textAlign': 'center',
      $bdWidth: '0px',
      $bdColor: 'rgba(235, 236, 237, 1)',
      $hov_fontWeight: 'normal',
      $hov_fontStyle: 'normal',
      $hov_textDecoration: 'normal',
      $hov_ftColor: 'rgba(7, 102, 227, 1)',
      $hov_bgColor: 'rgba(235, 236, 237, 1)',
      $hov_gradientstartcolor: 'none',
      $hov_gradientendcolor: 'none',
      $hov_violet: '0deg',
      $hov_bgImage: '',
      $hov_bgSize: 'cover',
      $hov_bgRepeat: 'no-repeat',
      '$sel-fontWeight': 'normal',
      '$sel-fontStyle': 'normal',
      '$sel-textDecoration': 'normal',
      '$sel-ftColor': 'rgba(255, 255, 255, 1)',
      '$sel-bgColor': 'rgba(7, 102, 227, 1)',
      '$sel-gradientstartcolor': 'none',
      '$sel-gradientendcolor': 'none',
      '$sel-violet': '0deg',
      '$sel-bgImage': '',
      '$sel-bgSize': 'cover',
      '$sel-bgRepeat': 'no-repeat'
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
