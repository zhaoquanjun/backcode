import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

import '@static/styles/elementui-reset/index.scss';
import '@static/styles/base/common.scss'
import '@static/font/iconfont.css'
import {
  Select,
  Option,
  Radio,
  Switch,
  InputNumber,
  ColorPicker,
  Collapse,
  CollapseItem,
  Tabs,
  Tooltip,
  Slider,
  Input,
  TabPane,
  Header,
  Container,
  Aside,
  Tree,
  Main,
  Button,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Carousel,
  Footer,
  Row,
  Col,
  Upload,
  Loading,
  MessageBox
} from 'element-ui'
Vue.use(Option).use(Switch)
Vue.use(Select).use(Radio)
Vue.use(InputNumber)
Vue.use(ColorPicker)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Input).use(Loading)
Vue.use(TabPane).use(Header).use(Container).use(Aside).use(Tree).use(Main).use(Button).use(Table).use(TableColumn).use(Pagination).use(Dialog).use(Carousel).use(Footer).use(Row).use(Col).use(Upload)
Vue.config.productionTip = false

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service
new Vue({
  render: h => h(App)
}).$mount('#app')
