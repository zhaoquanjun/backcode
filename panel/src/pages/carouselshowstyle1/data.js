const data = {
  dataModel: {
    childArea: [
      {
        Id: 'area1',
        Src:
          'https://nwzimg.clouddream.net/newwezhan/base/control/designerImg/commonImg/img1.png',
        BgColor: 'transparent',
        Gradientstartcolor: 'none',
        Gradientendcolor: 'none',
        Violet: '0deg',
        BgSize: 'cover',
        BgRepeat: 'no-repeat',
        BgPosition: '50% 50%'
      },
      {
        Id: 'area2',
        Src:
          'https://nwzimg.clouddream.net/newwezhan/base/control/designerImg/commonImg/img2.png',
        BgColor: 'transparent',
        Gradientstartcolor: 'none',
        Gradientendcolor: 'none',
        Violet: '0deg',
        BgSize: 'cover',
        BgRepeat: 'no-repeat',
        BgPosition: '50% 50%'
      },
      {
        Id: 'area3',
        Src:
          'https://nwzimg.clouddream.net/newwezhan/base/control/designerImg/commonImg/img3.png',
        BgColor: 'transparent',
        Gradientstartcolor: 'none',
        Gradientendcolor: 'none',
        Violet: '0deg',
        BgSize: 'cover',
        BgRepeat: 'no-repeat',
        BgPosition: '50% 50%'
      },
      {
        Id: 'area4',
        Src:
          'https://nwzimg.clouddream.net/newwezhan/base/control/designerImg/commonImg/img3.png',
        BgColor: 'transparent',
        Gradientstartcolor: 'none',
        Gradientendcolor: 'none',
        Violet: '0deg',
        BgSize: 'cover',
        BgRepeat: 'no-repeat',
        BgPosition: '50% 50%'
      }
    ],
    effect: 'slide',
    duration: 300,
    delay: 300,
    autoplay: true
  },
  styleModel: {
    cssvars: {
      $width: 'auto',
      $height: '493px',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
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
