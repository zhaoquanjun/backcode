const data = {
  dataModel: {
    detailAddress: '',
    addressTitle: '',
    addressDesc: '',
    zoom: 15,
    theme: 1,
    showToolBar: true,
    showMapTypes: true,
    showScrollWheel: true,
    zoomRange: {
      minValue: 3,
      maxValue: 19
    },
    positionList: [
      {
        id: 0,
        lat: 39.929588,
        lng: 116.402127,
        detailAddress: '故宫博物馆',
        title: '故宫',
        description: '',
        isCenter: true
      }
    ]
  },
  styleModel: {
    cssvars: {
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $display: 'inline-block',
      $width: 'auto',
      $height: '400px',
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
