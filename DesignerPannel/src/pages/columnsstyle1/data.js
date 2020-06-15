const data = {
  dataModel: {
    Text: 'container',
    childArea: [
      {
        Id: 'area1',
        Title: 'area1',
        Percent: 2,
        MobilePercent: '1',
        Html: ''
      },
      {
        Id: 'area2',
        Title: 'area2',
        Percent: 2,
        MobilePercent: '1',
        Html: ''
      },
      {
        Id: 'area2',
        Title: 'area2',
        Percent: 2,
        MobilePercent: '1',
        Html: ''
      },
      {
        Id: 'area2',
        Title: 'area2',
        Percent: 2,
        MobilePercent: '1',
        Html: ''
      },
      {
        Id: 'area2',
        Title: 'area2',
        Percent: 2,
        MobilePercent: '1',
        Html: ''
      },
      {
        Id: 'area2',
        Title: 'area2',
        Percent: 2,
        MobilePercent: '1',
        Html: ''
      }
    ]
  },
  styleModel: {
    cssvars: {
      $marginLeft: 'auto',
      $marginRight: 'auto',
      $marginTop: '0px',
      $marginBottom: '0px',
      $paddingHorizontal: '2%',
      $innerMargin: '0',
      $lineDisplay: 'block',
      $lineWidth: '1px',
      $lineheight: '100%',
      $lineBackground: 'rgba(235, 236, 237, 1)',
      '$l1-bgColor': 'rgba(255, 255, 255, 1)',
      '$l1-bdWidth': '0px',
      '$l1-bdStyle': 'solid',
      '$l1-bdColor': 'rgba(255, 255, 255, 1)',
      '$l1-bdRadius': '0px',
      '$l1-hov_bgcolor': 'rgba(255, 255, 255, 1)',
      '$l1-gradientstartcolor': 'none',
      '$l1-gradientendcolor': 'none',
      '$l1-violet': '0deg',
      '$l1-bgImage': '',
      '$l1-bgSize': 'cover',
      '$l1-bgPosition': '0 0',
      '$l1-textAlign': 'left',
      '$l2-bgColor': 'rgba(255, 255, 255, 1)',
      '$l2-bdWidth': '0px',
      '$l2-bdStyle': 'solid',
      '$l2-bdColor': 'rgba(255, 255, 255, 1)',
      '$l2-bdRadius': '0px',
      '$l2-hov_bgcolor': 'rgba(255, 255, 255, 1)',
      '$l2-gradientstartcolor': 'none',
      '$l2-gradientendcolor': 'none',
      '$l2-violet': '0deg',
      '$l2-bgImage': '',
      '$l2-bgSize': 'cover',
      '$l2-bgPosition': '0 0',
      '$l2-textAlign': 'left'
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
