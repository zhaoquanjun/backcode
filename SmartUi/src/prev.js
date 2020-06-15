import { changeEnv } from './env/index'
changeEnv('preview')

import template from './templateengine/index'
import Button from './button/button'
import Images from './image/image'
import Text from './text/text'
import Section from './section/section'
import Columns from './columns/columns'
import Container from './container/container'

import Pagination from './pagination/pagination'
import Navigation from './navigation/navigation'
import NavContainer from './navcontainer/navcontainer'
import Tab from './tab/tab'
import Video from './video/video'
import FileDownload from './filedownload/filedownload'
import NewsCover from './newscover/newscover'
import ProductCarousel from './productcarousel/productcarousel'
import ProductCover from './productcover/productcover'
import ProductDetail from './productdetail/productdetail'
import ProductViewCount from './productviewcount/productviewcount'
import NewsDetail from './newsdetail/newsdetail'
import NewsViewCount from './newsviewcount/newsviewcount'

import NewsTitle from './newstitle/newstitle'
import NewsSummary from './newssummary/newssummary'
import NewsCreateTime from './newscreatetime/newscreatetime'
import ProductTitle from './producttitle/producttitle'
import ProductSummary from './productsummary/productsummary'
import ProductCreateTime from './productcreatetime/productcreatetime'
import Line from './line/line'
import QRCode from './qrcode/qrcode'
import Code from './code/code'
import NewsNext from './newsnext/newsnext'
import Login from './login/login'
import Register from './register/register'
import ForgetPwd from './forgetpwd/forgetpwd'
import BaiDuMap from './map/map'
import LoginStatus from './loginstatus/loginstatus'
import Price from './price/price'
import TimeLine from './timeLine/timeline'
import MsgBoard from './msgboard/msgboard'
import Step from './step/step'
import {
  AtlasStyle1,
  AtlasStyle2,
  AtlasStyle3,
  AtlasStyle4,
  AtlasStyle5,
  AtlasStyle6,
  AtlasStyle7,
  AtlasStyle8
} from './atlas/index'

import { CarouselStyle1, CarouselStyle2, CarouselStyle3, CarouselStyle4 } from './carousel/index'

import { CarouselshowStyle1 } from './carouselshow/index'

import {
  NewsListStyle1,
  NewsListStyle2,
  NewsListStyle3,
  NewsListStyle4,
  NewsListStyle5,
  NewsListStyle6,
  NewsListStyle7
} from './newslist/index'
import {
  ProductListStyle1,
  ProductListStyle2,
  ProductListStyle3,
  ProductListStyle4,
  ProductListStyle5,
  ProductListStyle6,
  ProductListStyle7
} from './productlist/index'

import { renderControl, refreshControl, createControl } from './render'

export {
  AtlasStyle1,
  AtlasStyle2,
  AtlasStyle3,
  AtlasStyle4,
  AtlasStyle5,
  AtlasStyle6,
  AtlasStyle7,
  AtlasStyle8,
  CarouselStyle1,
  CarouselStyle2,
  CarouselStyle3,
  CarouselStyle4,
  CarouselshowStyle1,
  NewsListStyle1,
  NewsListStyle2,
  NewsListStyle3,
  NewsListStyle4,
  NewsListStyle5,
  NewsListStyle6,
  NewsListStyle7,
  ProductListStyle1,
  ProductListStyle2,
  ProductListStyle3,
  ProductListStyle4,
  ProductListStyle5,
  ProductListStyle6,
  ProductListStyle7,
  template,
  Button,
  Images,
  Text,
  Section,
  Columns,
  Container,
  Pagination,
  renderControl,
  refreshControl,
  createControl,
  Navigation,
  NavContainer,
  Tab,
  Video,
  NewsTitle,
  NewsSummary,
  NewsCreateTime,
  ProductTitle,
  ProductSummary,
  ProductCreateTime,
  Line,
  ProductViewCount,
  NewsCover,
  ProductCarousel,
  ProductCover,
  ProductDetail,
  NewsDetail,
  NewsViewCount,
  NewsNext,
  QRCode,
  Code,
  Login,
  Register,
  ForgetPwd,
  BaiDuMap,
  LoginStatus,
  Price,
  FileDownload,
  TimeLine,
  MsgBoard,
  Step
}
