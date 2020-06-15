/**
 * ----------------------------------------
 * SmartUi(v0.1):render.js 页面呈现管理
 * ----------------------------------------
 */

import Block from '../block/block'
import Button from '../button/button'
import Code from '../code/code'
import Columns from '../columns/columns'
import Container from '../container/container'
import ForgetPwd from '../forgetpwd/forgetpwd'
import Image from '../image/image'
import Line from '../line/line'
import Login from '../login/login'
import LoginStatus from '../loginstatus/loginstatus'
import BaiDuMap from '../map/map'
import NavContainer from '../navcontainer/navcontainer'
import Navigation from '../navigation/navigation'
import NewsCover from '../newscover/newscover'
import NewsCreateTime from '../newscreatetime/newscreatetime'
import NewsDetail from '../newsdetail/newsdetail'

import NewsNext from '../newsnext/newsnext'
import NewsPrev from '../newsprev/newsprev'
import NewsSummary from '../newssummary/newssummary'
import NewsTitle from '../newstitle/newstitle'
import NewsViewCount from '../newsviewcount/newsviewcount'
import OriginPrice from '../originalprice/originalprice'
import Price from '../price/price'
import ProductCarousel from '../productcarousel/productcarousel'
import ProductCover from '../productcover/productcover'
import ProductCreateTime from '../productcreatetime/productcreatetime'
import ProductDetail from '../productdetail/productdetail'
import ProductNext from '../productnext/productnext'
import ProductPrev from '../productprev/productprev'
import ProductSpecification from '../productspecification/productspecification'
import ProductSummary from '../productsummary/productsummary'
import ProductTitle from '../producttitle/producttitle'
import ProductViewCount from '../productviewcount/productviewcount'
import QRCode from '../qrcode/qrcode'
import Register from '../register/register'
import Section from '../section/section'
import Tab from '../tab/tab'
import Text from '../text/text'
import Video from '../video/video'
import WhiteSpace from '../whitespace/whitespace'
import TimeLine from '../timeline/timeline'
import { cloneObj } from '../util'

import { AtlasComponents } from '../atlas/index'
import { NewsListComponents } from '../newslist/index'
import { ProductListComponents } from '../productlist/index'
import { CarouselComponents } from '../carousel/index'
import { CarouselshowComponents } from '../carouselshow/index'

const renderFns = {}
const refreshFns = {}
const createFns = {}

AtlasComponents.forEach((component, index) => {
  index = index + 1

  renderFns['atlas_style' + index] = function (data, callback) {
    const atlas = new component(data.controlId, data.styleName)
    return atlas.renderControl(data.dataModel, callback)
  }
  refreshFns['atlas_style' + index] = function (data, callback) {
    const atlas = new component(data.controlId, data.styleName)
    return atlas.refreshControl(data, callback)
  }
  createFns['atlas_style' + index] = function (data) {
    const atlas = new component(data.controlId, data.styleName)
    return atlas
  }
})
CarouselComponents.forEach((component, index) => {
  index = index + 1

  renderFns['carousel_style' + index] = function (data, callback) {
    const carousel = new component(data.controlId, data.styleName)
    return carousel.renderControl(data.dataModel, callback)
  }
  refreshFns['carousel_style' + index] = function (data, callback) {
    const carousel = new component(data.controlId, data.styleName)
    return carousel.refreshControl(data, callback)
  }
  createFns['carousel_style' + index] = function (data) {
    const carousel = new component(data.controlId, data.styleName)
    return carousel
  }
})
NewsListComponents.forEach((component, index) => {
  index = index + 1
  renderFns['newslist_style' + index] = function (data, callback) {
    const newslist = new component(data.controlId, data.styleName)
    return newslist.renderControl(data.dataModel, callback)
  }
  createFns['newslist_style' + index] = function (data) {
    const newslist = new component(
      data.controlId,
      data.styleName,
      data.dataModel.dateStyle
    )
    return newslist
  }
})
ProductListComponents.forEach((component, index) => {
  index = index + 1
  renderFns['productlist_style' + index] = function (data, callback) {
    const productlist = new component(data.controlId, data.styleName)
    return productlist.renderControl(data.dataModel, callback)
  }
  createFns['productlist_style' + index] = function (data) {
    const productlist = new component(data.controlId, data.styleName)
    return productlist
  }
})

renderFns['block'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const block = new Block(copyData.controlId, copyData.styleName)
  return block.renderControl(copyData.dataModel, callback)
}
refreshFns['block'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const block = new Block(copyData.controlId, copyData.styleName)
  return block.refreshControl(copyData.dataModel, callback)
}

renderFns['button'] = function (data, callback) {
  const button = new Button(data.controlId, data.styleName)
  return button.renderControl(data.dataModel, callback)
}

CarouselshowComponents.forEach((component, index) => {
  index = index + 1

  renderFns['carouselshow_style' + index] = function (data, callback) {
    const carousel = new component(data.controlId, data.styleName)
    return carousel.renderControl(data.dataModel, callback)
  }
  refreshFns['carouselshow_style' + index] = function (data, callback) {
    const carousel = new component(data.controlId, data.styleName)
    return carousel.refreshControl(data, callback)
  }
  createFns['carouselshow_style' + index] = function (data) {
    const carousel = new component(data.controlId, data.styleName)
    return carousel
  }
})

renderFns['code'] = function (data, callback) {
  const codeControl = new Code(data.controlId, data.styleName)
  return codeControl.renderControl(data.dataModel, callback)
}

renderFns['columns'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const columns = new Columns(copyData.controlId, copyData.styleName)
  return columns.renderControl(copyData.dataModel, callback)
}
refreshFns['columns'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const columns = new Columns(copyData.controlId, copyData.styleName)
  return columns.refreshControl(copyData.dataModel, callback)
}

renderFns['container'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const container = new Container(copyData.controlId, copyData.styleName)
  return container.renderControl(copyData.dataModel, callback)
}
refreshFns['container'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const container = new Container(copyData.controlId, copyData.styleName)
  return container.refreshControl(copyData.dataModel, callback)
}

renderFns['forgetpwd'] = function (data, callback) {
  const forgetpwd = new ForgetPwd(data.controlId, data.styleName)
  return forgetpwd.renderControl(data.dataModel, callback)
}

renderFns['image'] = function (data, callback) {
  const img = new Image(data.controlId, data.styleName)
  return img.renderControl(data.dataModel, callback)
}

renderFns['line'] = function (data, callback) {
  const line = new Line(data.controlId, data.styleName)
  return line.renderControl(data.dataModel, callback)
}

renderFns['login'] = function (data, callback) {
  const login = new Login(data.controlId, data.styleName)
  return login.renderControl(data.dataModel, callback)
}

renderFns['loginstatus'] = function (data, callback) {
  const loginstatus = new LoginStatus(data.controlId, data.styleName)
  return loginstatus.renderControl(data.dataModel, callback)
}

renderFns['baidumap'] = function (data, callback) {
  const map = new BaiDuMap(data.controlId, data.styleName)
  return map.renderControl(data.dataModel, callback)
}

renderFns['navcontainer'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const navcontainer = new NavContainer(copyData.controlId, copyData.styleName)
  return navcontainer.renderControl(copyData.dataModel, callback)
}
refreshFns['navcontainer'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const navcontainer = new NavContainer(copyData.controlId, copyData.styleName)
  return navcontainer.refreshControl(copyData.dataModel, callback)
}

renderFns['navigation'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const navcontainer = new Navigation(copyData.controlId, copyData.styleName)
  return navcontainer.renderControl(copyData.dataModel, callback)
}
refreshFns['navigation'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const navigation = new Navigation(copyData.controlId, copyData.styleName)
  return navigation.refreshControl(copyData.dataModel, callback)
}

renderFns['newscover'] = function (data, callback) {
  const newscover = new NewsCover(data.controlId, data.styleName)
  return newscover.renderControl(data.dataModel, callback)
}

renderFns['newscreatetime'] = function (data, callback) {
  const newscreatetime = new NewsCreateTime(data.controlId, data.styleName)
  return newscreatetime.renderControl(data.dataModel, callback)
}

renderFns['newsdetail'] = function (data, callback) {
  const newsdetail = new NewsDetail(data.controlId, data.styleName)
  return newsdetail.renderControl(data.dataModel, callback)
}

renderFns['newsnext'] = function (data, callback) {
  const newsnext = new NewsNext(data.controlId, data.styleName)
  return newsnext.renderControl(data.dataModel, callback)
}

renderFns['newsprev'] = function (data, callback) {
  const newsprev = new NewsPrev(data.controlId, data.styleName)
  return newsprev.renderControl(data.dataModel, callback)
}

renderFns['newssummary'] = function (data, callback) {
  const newssummary = new NewsSummary(data.controlId, data.styleName)
  return newssummary.renderControl(data.dataModel, callback)
}

renderFns['newstitle'] = function (data, callback) {
  const newstitle = new NewsTitle(data.controlId, data.styleName)
  return newstitle.renderControl(data.dataModel, callback)
}

renderFns['newsviewcount'] = function (data, callback) {
  const newsviewcount = new NewsViewCount(data.controlId, data.styleName)
  return newsviewcount.renderControl(data.dataModel, callback)
}

renderFns['originprice'] = function (data, callback) {
  const originprice = new OriginPrice(data.controlId, data.styleName)
  return originprice.renderControl(data.dataModel, callback)
}

renderFns['price'] = function (data, callback) {
  const price = new Price(data.controlId, data.styleName)
  return price.renderControl(data.dataModel, callback)
}

renderFns['productcarousel'] = function (data, callback) {
  const productcarousel = new ProductCarousel(data.controlId, data.styleName)
  return productcarousel.renderControl(data.dataModel, callback)
}

renderFns['productcover'] = function (data, callback) {
  const productcover = new ProductCover(data.controlId, data.styleName)
  return productcover.renderControl(data.dataModel, callback)
}

renderFns['productcreatetime'] = function (data, callback) {
  const productcreatetime = new ProductCreateTime(
    data.controlId,
    data.styleName
  )
  return productcreatetime.renderControl(data.dataModel, callback)
}

renderFns['productdetail'] = function (data, callback) {
  const ctrl = new ProductDetail(data.controlId, data.styleName)
  return ctrl.renderControl(data.dataModel, callback)
}

renderFns['productnext'] = function (data, callback) {
  const productNext = new ProductNext(data.controlId, data.styleName)
  return productNext.renderControl(data.dataModel, callback)
}

renderFns['productPrev'] = function (data, callback) {
  const productPrev = new ProductPrev(data.controlId, data.styleName)
  return productPrev.refreshControl(data.dataModel, callback)
}

renderFns['productspecification'] = function (data, callback) {
  const productspecification = new ProductSpecification(
    data.controlId,
    data.styleName
  )
  return productspecification.renderControl(data.dataModel, callback)
}

renderFns['productsummary'] = function (data, callback) {
  const productsummary = new ProductSummary(data.controlId, data.styleName)
  return productsummary.renderControl(data.dataModel, callback)
}

renderFns['producttitle'] = function (data, callback) {
  const producttitle = new ProductTitle(data.controlId, data.styleName)
  return producttitle.renderControl(data.dataModel, callback)
}

renderFns['productviewcount'] = function (data, callback) {
  const productviewcount = new ProductViewCount(data.controlId, data.styleName)
  return productviewcount.renderControl(data.dataModel, callback)
}

renderFns['qrcode'] = function (data, callback) {
  const qrcode = new QRCode(data.controlId, data.styleName)
  return qrcode.renderControl(data.dataModel, callback)
}

renderFns['register'] = function (data, callback) {
  const register = new Register(data.controlId, data.styleName)
  return register.renderControl(data.dataModel, callback)
}

renderFns['section'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const section = new Section(copyData.controlId, copyData.styleName)
  return section.renderControl(copyData.dataModel, callback)
}

refreshFns['section'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const columns = new Section(copyData.controlId, copyData.styleName)
  return columns.refreshControl(copyData.dataModel, callback)
}

renderFns['tab'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const tab = new Tab(copyData.controlId, copyData.styleName)
  return tab.renderControl(copyData.dataModel, callback)
}
refreshFns['tab'] = function (data, selectedId, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const tab = new Tab(copyData.controlId, copyData.styleName)
  return tab.refreshControl(copyData.dataModel, selectedId, callback)
}

renderFns['text'] = function (data) {
  const text = new Text(data.controlId, data.styleName)
  return text.renderControl(data.dataModel)
}

renderFns['video'] = function (data) {
  const video = new Video(data.controlId, data.styleName)
  return video.renderControl(data.dataModel)
}

renderFns['whitespace'] = function (data) {
  const whitespace = new WhiteSpace(data.controlId, data.styleName)
  return whitespace.renderControl(data.dataModel)
}

renderFns['timeline'] = function (data) {
  const timeline = new TimeLine(data.controlId, data.styleName)
  return timeline.renderControl(data.dataModel)
}

refreshFns['timeline'] = function (data, callback) {
  let copyData = cloneObj(data)
  copyData = prepareContanierData(copyData)
  const timeline = new TimeLine(copyData.controlId, copyData.styleName)
  return timeline.refreshControl(copyData.dataModel, callback)
}

function prepareContanierData(data) {
  let childLen = data.children.length
  if (childLen > 0) {
    let childDataArray = []
    for (let i = 0; i < childLen; i++) {
      const controlData = getControlDataById(data.children[i])
      if (controlData) {
        childDataArray.push(controlData)
      }
    }
    childDataArray.sort(compareControlData)
    let areas = data.dataModel.childArea
    const areaLen = areas.length
    for (let i = 0; i < areaLen; i++) {
      let areaItem = areas[i]
      areaItem.Html = ''
      let areaChildrens = childDataArray.filter(
        (k) => k.parentAreaId == areaItem.Id
      )
      const filterLen = areaChildrens.length
      for (let k = 0; k < filterLen; k++) {
        const control = areaChildrens[k]
        areaItem.Html += renderFns[control.controlName](control)
      }
    }
  }
  return data
}

function getControlDataById(id) {
  if (window.smDesigner) {
    return window.smDesigner.getControlDataById(id)
  }
  return null
}

function compareControlData(a, b) {
  let res = 0
  if (a.order > b.order) {
    res = 1
  } else if (b.order > a.order) {
    res = -1
  }
  return res
}

function renderControl(data) {
  if (!data) {
    return ''
  }
  var fn = renderFns[data.controlName]
  if (!fn) {
    throw new Error('can not find provider for ' + data.controlName)
  }
  return fn(data)
}
function createControl(data) {
  var fn = createFns[data.controlName + '_' + data.styleName]
  if (fn) {
    return fn(data)
  }
  return null
}

function refreshControl(data, callback) {
  if (data) {
    var fn = refreshFns[data.controlName]
    if (fn) {
      fn(data, callback)
    }
  }
}
export { renderControl, refreshControl, createControl }
