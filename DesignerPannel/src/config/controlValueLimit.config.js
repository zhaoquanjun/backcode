/**
 * @name 面板属性设置行界限值
 * @param fontRange 字体
 * @param borderRange 边框
 * @param shadowRange 阴影
 * @param marginSetting 外边�
 */

const fontRange = {
  // 透明度
  opacity: {
    minValue: 1,
    maxValue: 100
  },
  // fontsize
  textfs: {
    minValue: 12,
    maxValue: 114
  },
  // lineheight
  textlh: {
    minValue: 18,
    maxValue: 120
  },
  // letterspace
  textls: {
    minValue: 0,
    maxValue: 10
  },
  textlinerheight: {
    minValue: 1,
    maxValue: 5
  },
  doubleborderwidth: {
    minValue: 1,
    maxValue: 5
  },
  buttonfs: {
    minValue: 12,
    maxValue: 60
  },
  // borderwidth
  buttonbw: {
    minValue: 0,
    maxValue: 5
  },
  // borderradius
  buttonbr: {
    minValue: 0,
    maxValue: 20
  },
  buttonsize: {
    width: {
      minValue: 16,
      maxValue: 400
    },
    height: {
      minValue: 16,
      maxValue: 400
    }
  },
  // line borderwidth
  linebw: {
    minValue: 1,
    maxValue: 20
  },
  linepadding: {
    minValue: 0,
    maxValue: 25
  },
  // image borderwidth
  imagebw: {
    minValue: 0,
    maxValue: 5
  },
  // image borderradius
  imagebr: {
    minValue: 0,
    maxValue: 20
  },
  // image shadowwidth
  imagesw: {
    minValue: 0,
    maxValue: 50
  },
  // image shadowblur
  imagesb: {
    minValue: 0,
    maxValue: 50
  },
  imagew: {
    minValue: 10,
    maxValue: 2560
  },
  imageh: {
    minValue: 10,
    maxValue: 2560
  },
  // 不通栏容器 container borderwidth
  containerbw: {
    minValue: 0,
    maxValue: 5
  },
  // 不通栏容器 container borderradius
  containerbr: {
    minValue: 0,
    maxValue: 20
  },
  // 通栏容器 section borderwidth
  sectionbw: {
    minValue: 0,
    maxValue: 5
  },
  // 不通栏容器 section borderradius
  sectionbr: {
    minValue: 0,
    maxValue: 20
  },
  columnsmr: {
    minValue: 0,
    maxValue: 50
  },
  // 分割线宽度
  columnsDvw: {
    minValue: 1,
    maxValue: 20
  },
  // 分割线外边距（上线）
  columnsdvm: {
    minValue: 0,
    maxValue: 200
  },
  bannerh: {
    minValue: 100,
    maxValue: 800
  },
  carouselArrowFontsize: {
    minValue: 20,
    maxValue: 80
  },
  carouselPaginationSize: {
    minValue: 8,
    maxValue: 20
  },
  carouselPaginationOpacity: {
    minValue: 0,
    maxValue: 10
  },
  carouselshowDuration: {
    minValue: 300,
    maxValue: 5000
  },
  carouselshowDelay: {
    minValue: 1000,
    maxValue: 5000
  },
  carouselAutoplayDelay: {
    minValue: 1,
    maxValue: 10
  },
  // imageheight
  newslistih: {
    minValue: 120,
    maxValue: 600
  },
  // title lineheight
  newslisttitlelh: {
    minValue: 14,
    maxValue: 50
  },
  // title fontsize
  newslisttitlefs: {
    minValue: 12,
    maxValue: 24
  },
  // // productlist4 img height
  productlist4imgh: {
    minValue: 120,
    maxValue: 600
  },
  productlist7imgh: {
    minValue: 150,
    maxValue: 600
  },
  productlist8imgh: {
    minValue: 140,
    maxValue: 600
  },
  // productlist4 title lineheight
  productlist4titlelh: {
    minValue: 1,
    maxValue: 3
  },
  // productlist4 title fontsize
  productlist4titlefs: {
    minValue: 12,
    maxValue: 24
  },
  // productlist4 desc lineheight
  productlist4desclh: {
    minValue: 1,
    maxValue: 3
  },
  // productlist4 desc fontsize
  productlist4descfs: {
    minValue: 12,
    maxValue: 24
  },
  // productlist4 desc linenum
  productlist4descln: {
    minValue: 1,
    maxValue: 2
  },
  productlist8descln: {
    minValue: 1,
    maxValue: 3
  },
  // productlist9 desc linenum
  productlist9descln: {
    minValue: 1,
    maxValue: 3
  },
  // productlist4 productprice lineheight
  productlist4pricelh: {
    minValue: 1,
    maxValue: 3
  },
  // productlist4 productprice fontsize
  productlist4pricefs: {
    minValue: 12,
    maxValue: 24
  },
  // productlist4 productbuttonText fontsize
  productlist4buttontextfs: {
    minValue: 12,
    maxValue: 24
  },
  // productlist4 productbutton border radius
  productlist4buttonbr: {
    minValue: 0,
    maxValue: 20
  },
  // desc lineheight
  newslistdesclh: {
    minValue: 14,
    maxValue: 50
  },
  // desc fontsize
  newslistdescfs: {
    minValue: 12,
    maxValue: 24
  },
  // date lineheight
  newslistdatelh: {
    minValue: 14,
    maxValue: 50
  },
  // date lineWidth
  newslistdatelw: {
    minValue: 0,
    maxValue: 5
  },
  // date fontsize
  newslistdatefs: {
    minValue: 12,
    maxValue: 24
  },
  // 分页 num
  newslistpn: {
    minValue: 1,
    maxValue: 50
  },
  // list lineheight
  newslistlh: {
    minValue: 0,
    maxValue: 100
  },
  // list space
  newslistls: {
    minValue: 0,
    maxValue: 50
  },
  newslist7imgh: {
    minValue: 200,
    maxValue: 600
  },
  // listtitle lineheight
  newstitlelh: {
    minValue: 12,
    maxValue: 50
  },
  // listtitle letterspace
  newstitlels: {
    minValue: 0,
    maxValue: 10
  },
  productdetail: {
    minValue: 0,
    maxValue: 100
  },
  // product listheight 产品图片的高�
  productimgh: {
    minValue: 120,
    maxValue: 600
  },
  product4imgh: {
    minValue: 180,
    maxValue: 600
  },
  product6imgh: {
    minValue: 200,
    maxValue: 600
  },
  productlist4bw: {
    minValue: 1,
    maxValue: 5
  },
  productTitlelh: {
    minValue: 14,
    maxValue: 50
  },
  productdesclh: {
    minValue: 14,
    maxValue: 50
  },
  productfs: {
    minValue: 12,
    maxValue: 24
  },
  // 显示行数 产品简介
  productdesccol: {
    minValue: 1,
    maxValue: 3
  },
  // 显示个数 产品每行
  productrowsize: {
    minValue: 1,
    maxValue: 6
  },
  productlistbw: {
    minValue: 0,
    maxValue: 5
  },
  productlisthoverbw: {
    minValue: 0,
    maxValue: 5
  },
  // list space
  productlistls: {
    minValue: 0,
    maxValue: 50
  },
  producttitlelh: {
    minValue: 12,
    maxValue: 50
  },
  producttitlels: {
    minValue: 0,
    maxValue: 10
  },
  productsummarylh: {
    minValue: 12,
    maxValue: 50
  },
  productsummaryls: {
    minValue: 0,
    maxValue: 10
  },
  productsummaryfs: {
    minValue: 12,
    maxValue: 24
  },
  productcreatetimelh: {
    minValue: 12,
    maxValue: 50
  },
  productcreatetimels: {
    minValue: 0,
    maxValue: 10
  },
  newssummarylh: {
    minValue: 12,
    maxValue: 50
  },
  newssummaryls: {
    minValue: 0,
    maxValue: 10
  },
  newscreatetimels: {
    minValue: 0,
    maxValue: 10
  },
  newscreatetimelh: {
    minValue: 12,
    maxValue: 50
  },
  newstitlefs: {
    minValue: 12,
    maxValue: 24
  },
  newscreatetimefs: {
    minValue: 12,
    maxValue: 24
  },
  newssummaryfs: {
    minValue: 12,
    maxValue: 24
  },
  producttitlefs: {
    minValue: 12,
    maxValue: 24
  },
  producsummaryfs: {
    minValue: 12,
    maxValue: 24
  },
  productcreatetimefs: {
    minValue: 12,
    maxValue: 24
  },
  productviewcountfs: {
    minValue: 12,
    maxValue: 24
  },
  newscoverbw: {
    minValue: 0,
    maxValue: 5
  },
  newscoverbr: {
    minValue: 0,
    maxValue: 20
  },
  newscoversw: {
    minValue: 0,
    maxValue: 50
  },
  newscoversb: {
    minValue: 0,
    maxValue: 50
  },
  newscoversize: {
    width: {
      minValue: 1,
      maxValue: 2000
    },
    height: {
      minValue: 1,
      maxValue: 2000
    }
  },
  productcoverfs: {
    minValue: 12,
    maxValue: 24
  },
  // newsviewcount fontsize
  newsviewcountfs: {
    minValue: 12,
    maxValue: 24
  },
  // newsviewcount lineheight
  newsviewcountlh: {
    minValue: 12,
    maxValue: 50
  },
  // newsviewcount letterSpace
  newsviewcountls: {
    minValue: 0,
    maxValue: 10
  },
  // whitespace
  whitespace: {
    minValue: 20,
    maxValue: 500
  },
  // video
  videobw: {
    minValue: 0,
    maxValue: 5
  },
  videobr: {
    minValue: 0,
    maxValue: 20
  },
  videosw: {
    minValue: 0,
    maxValue: 50
  },
  videosb: {
    minValue: 0,
    maxValue: 50
  },
  tabw: {
    minValue: 20,
    maxValue: 300
  },
  tabh: {
    minValue: 20,
    maxValue: 100
  },
  tabbw: {
    minValue: 0,
    maxValue: 5
  },
  atlasfs: {
    minValue: 12,
    maxValue: 60
  },
  atlasrowsize: {
    minValue: 2,
    maxValue: 6
  },
  atlasimgh: {
    minValue: 120,
    maxValue: 600
  },
  atlas6imgh: {
    minValue: 200,
    maxValue: 600
  },
  atlas7imgh: {
    minValue: 300,
    maxValue: 600
  },
  atlas8imgh: {
    minValue: 400,
    maxValue: 600
  },
  atlaslistspace: {
    minValue: 0,
    maxValue: 50
  },
  atlaslist6space: {
    minValue: 0,
    maxValue: 30
  },
  atlaslist7space: {
    minValue: 0,
    maxValue: 40
  },
  atlas_4_listspace: {
    minValue: 0,
    maxValue: 20
  },
  atlas_5_listspace: {
    minValue: 0,
    maxValue: 40
  },
  // atlas lingheight // defualt 24px
  atlasTitlelh: {
    minValue: 14,
    maxValue: 50
  },
  // image shadowwidth
  qrcodesw: {
    minValue: 0,
    maxValue: 50
  },
  // qrcode shadowblur
  qrcodesb: {
    minValue: 0,
    maxValue: 50
  },
  // newsnext width
  newsnextw: {
    minValue: 16,
    maxValue: 400
  },
  // newsnext height
  newsnexth: {
    minValue: 16,
    maxValue: 400
  },
  // newsnext font size
  newsnextfs: {
    minValue: 12,
    maxValue: 60
  },
  // newsnext borderwidth
  newsnextbw: {
    minValue: 0,
    maxValue: 5
  },
  // newsnext borderradius
  newsnextbr: {
    minValue: 0,
    maxValue: 20
  },
  // newsprev width
  newsprevtw: {
    minValue: 16,
    maxValue: 400
  },
  // newsprev height
  newsprevth: {
    minValue: 16,
    maxValue: 400
  },
  // newsprev font size
  newsprevfs: {
    minValue: 12,
    maxValue: 60
  },
  // newsprev borderwidth
  newsprevbw: {
    minValue: 0,
    maxValue: 5
  },
  // newsprev borderradius
  newsprevbr: {
    minValue: 0,
    maxValue: 20
  },

  // productnext width
  productnextw: {
    minValue: 16,
    maxValue: 400
  },
  // productnext height
  productnexth: {
    minValue: 16,
    maxValue: 400
  },
  // productnext font size
  productnextfs: {
    minValue: 12,
    maxValue: 60
  },
  // productnext borderwidth
  productnextbw: {
    minValue: 0,
    maxValue: 5
  },
  // productnext borderradius
  productnextbr: {
    minValue: 0,
    maxValue: 20
  },
  // productprev width
  productprevtw: {
    minValue: 16,
    maxValue: 400
  },
  // productprev height
  productprevth: {
    minValue: 16,
    maxValue: 400
  },
  // productprev font size
  productprevfs: {
    minValue: 12,
    maxValue: 60
  },
  // productprev borderwidth
  productprevbw: {
    minValue: 0,
    maxValue: 5
  },
  // productprev borderradius
  productprevbr: {
    minValue: 0,
    maxValue: 20
  },
  // qrcode width height
  qrcodewh: {
    minValue: 30,
    maxValue: 400
  },
  // login and  register  begin
  logininputfs: {
    minValue: 12,
    maxValue: 24
  },
  // borderwidth
  logininputbw: {
    minValue: 0,
    maxValue: 5
  },
  // borderradius
  logininputbr: {
    minValue: 0,
    maxValue: 20
  },
  loginbtnfs: {
    minValue: 12,
    maxValue: 24
  },
  loginbtnbw: {
    minValue: 0,
    maxValue: 5
  },
  loginbtnbr: {
    minValue: 0,
    maxValue: 20
  },
  loginbtnhovfs: {
    minValue: 12,
    maxValue: 24
  },
  loginbtnhovbw: {
    minValue: 0,
    maxValue: 5
  },
  loginbtnhovbr: {
    minValue: 0,
    maxValue: 20
  },

  // --- msgboard  begin ---
  msgboardinputfs: {
    minValue: 12,
    maxValue: 24
  },
  // borderwidth
  msgboardinputbw: {
    minValue: 0,
    maxValue: 5
  },
  // borderradius
  msgboardinputbr: {
    minValue: 0,
    maxValue: 20
  },
  msgboardbtnfs: {
    minValue: 12,
    maxValue: 24
  },
  msgboardbtnbw: {
    minValue: 0,
    maxValue: 5
  },
  msgboardbtnbr: {
    minValue: 0,
    maxValue: 20
  },
  msgboardbtnhovfs: {
    minValue: 12,
    maxValue: 24
  },

  // --- msgboard  end ---

  registerinputfs: {
    minValue: 12,
    maxValue: 24
  },
  // borderwidth
  registerinputbw: {
    minValue: 0,
    maxValue: 5
  },
  // borderradius
  registerinputbr: {
    minValue: 0,
    maxValue: 20
  },
  registerbtnfs: {
    minValue: 12,
    maxValue: 24
  },
  registerbtnhovfs: {
    minValue: 12,
    maxValue: 24
  },
  registerbtnbw: {
    minValue: 0,
    maxValue: 5
  },
  registerbtnbr: {
    minValue: 0,
    maxValue: 20
  },
  tologinbtnfs: {
    minValue: 12,
    maxValue: 24
  },
  tologinbtnbw: {
    minValue: 0,
    maxValue: 5
  },
  tologinbtnbr: {
    minValue: 0,
    maxValue: 20
  },
  // 注册 找回密码按钮 文字
  findandforgetbtnfs: {
    minValue: 12,
    maxValue: 24
  },
  // 登录状态 begin
  loginstatusbtnfs: {
    minValue: 12,
    maxValue: 24
  },
  loginstatusbtnbw: {
    minValue: 0,
    maxValue: 5
  },
  loginstatusbtnbr: {
    minValue: 0,
    maxValue: 20
  },
  loginstatustextfs: {
    minValue: 12,
    maxValue: 24
  },
  loginstatussize: {
    width: {
      minValue: 80,
      maxValue: 400
    },
    height: {
      minValue: 20,
      maxValue: 100
    }
  },
  // 登录状态end
  productcarousel: {
    minValue: 100,
    maxValue: 800
  },
  maph: {
    minValue: 150,
    maxValue: 400
  },
  // login and  register  end

  // nav start
  navitemwidth: {
    minValue: 50,
    maxValue: 300
  },
  navslidingheight: {
    minValue: 1,
    maxValue: 8
  },
  navitemheigth: {
    minValue: 20,
    maxValue: 100
  },
  navitemchildwidth: {
    minValue: 50,
    maxValue: 300
  },
  navitemchildheigth: {
    minValue: 20,
    maxValue: 100
  },
  navitemfs: {
    minValue: 12,
    maxValue: 24
  },
  navitemchildfs: {
    minValue: 12,
    maxValue: 24
  },
  detailfs: {
    minValue: 12,
    maxValue: 28
  },
  timelinedatefs: {
    minValue: 12,
    maxValue: 60
  },
  timelinetitlefs: {
    minValue: 12,
    maxValue: 24
  },
  timelinedescfs: {
    minValue: 12,
    maxValue: 24
  },
  timelinedistance: {
    minValue: 50,
    maxValue: 300
  },
  timelinebw: {
    minValue: 0,
    maxValue: 5
  },
  // 留言板
  msgboardinputheight: {
    minValue: 70,
    maxValue: 200
  },
  msgboardbtnheight: {
    minValue: 20,
    maxValue: 100
  },

  // 步骤节点数量
  steplistnum: {
    minValue: 2,
    maxValue: 10
  },
  stepbw: {
    minValue: 0,
    maxValue: 5
  }

  // nav end
}

const sizeSetting = {
  atlas: {
    widthDisabled: true,
    heightDisabled: false
  },
  button: {
    widthDisabled: false,
    heightDisabled: false
  },
  image: {
    widthDisabled: false,
    heightDisabled: false
  },
  productcover: {
    widthDisabled: false,
    heightDisabled: false
  },
  carousel: {
    widthDisabled: true,
    heightDisabled: false
  },
  productcarousel: {
    widthDisabled: true,
    heightDisabled: false
  },
  whitespace: {
    widthDisabled: true,
    heightDisabled: false
  },
  video: {
    widthDisabled: false,
    heightDisabled: false
  },
  newsnext: {
    widthDisabled: false,
    heightDisabled: false
  },
  newsprev: {
    widthDisabled: false,
    heightDisabled: false
  },
  productnext: {
    widthDisabled: false,
    heightDisabled: false
  },
  productprev: {
    widthDisabled: false,
    heightDisabled: false
  },
  qrcode: {
    widthDisabled: false,
    heightDisabled: false
  },
  login: {
    widthDisabled: true,
    heightDisabled: false
  },
  loginstatus: {
    widthDisabled: false,
    heightDisabled: false
  },
  register: {
    widthDisabled: true,
    heightDisabled: false
  },
  map: {
    widthDisabled: true,
    heightDisabled: false
  }
}

const animateRange = {
  delay: {
    minValue: 0,
    maxValue: 9
  },
  duration: {
    minValue: 0.8,
    maxValue: 9
  }
}

const effectList = [
  { label: '滑动', value: 'slide' },
  { label: '渐隐渐显', value: 'fade' },
  { label: '立方运动', value: 'cube' },
  { label: '封面流', value: 'coverflow' },
  { label: '翻转', value: 'flip' }
]
const carouselPaginationTypeList = [
  { label: '圆点', value: 'bullets' },
  { label: '分式', value: 'fraction' },
  { label: '进度条', value: 'progressbar' }
]

export default {
  fontRange,
  sizeSetting,
  animateRange,
  effectList,
  carouselPaginationTypeList
}
