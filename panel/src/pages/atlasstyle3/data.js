const data = {
  dataModel: {
    imgList: [
      {
        Uid: 0,
        Name: '',
        Alt: '',
        Src: '',
        Href: 'javascript:;',
        Target: '_self',
        Type: 'none',
        Title: '设置链接1'
      }
    ],
    percent: '4',
    Href: 'javascript:;',
    Target: '_self',
    Type: 'none',
    Title: '设置链接1',
    PageIndex: '1'
  },
  styleModel: {
    cssvars: {
      $pcwidth: 'auto',
      $pcheight: '493px',
      $mbheight: '200px',
      $mbmarginTop: '0px',
      $mbmarginRight: '0px',
      $mbmarginBottom: '0px',
      $mbmarginLeft: '0px',
      $bulletColor: 'rgba(255, 255, 255, 1)',
      $bulletActiveColor: 'rgba(7,102,227,1)',
      $arrowShow: 'block',
      $indicator: 1,
      $imgHeight: '340px',
      '$list-space': '20px',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      '$title-fontSize': '20',
      '$title-fontFamily': 'PingFangSC',
      '$title-ftColor': 'rgba(255, 255, 255, 1)',
      '$title-fontWeight': 'bold',
      '$title-fontStyle': 'normal',
      '$title-textDecoration': 'none',
      '$title-textAlign': 'left',
      '$title-lineHeight': '2'
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
