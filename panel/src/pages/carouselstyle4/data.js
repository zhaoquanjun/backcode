const data = {
  dataModel: {
    imgList: [
      {
        Uid: 1,
        Name: '测试1',
        Alt: 'ads',
        Src:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568193032082&di=301e49ab8a54a3bcf959edb952fcf866&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F150929%2F3-150929160354.jpg',
        Href: 'javascript:;',
        Target: '_self',
        Type: 'none',
        Title: '设置链接1'
      },
      {
        Uid: 2,
        Name: '测试2',
        Alt: 'ads',
        Src:
          'http://img.andni.cn/Picture/823EB3BD-93F4-4655-B833-D604A6EF2032/7c938484fb854ba8913128131e0ab743.jpg',
        Href: 'javascript:;',
        Target: '_self',
        Type: 'none',
        Title: '设置链接1'
      },
      {
        Uid: 3,
        Name: '测试3',
        Alt: 'ads',
        Src:
          'http://img.andni.cn/Picture/823EB3BD-93F4-4655-B833-D604A6EF2032/c9feddb73d4c40f589f2f2c7d56004a3.jpeg',
        Href: 'javascript:;',
        Target: '_self',
        Type: 'none',
        Title: '设置链接1'
      }
    ],
    effect: 'slide'
  },
  styleModel: {
    cssvars: {
      $height: '630px'
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
