import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@static/styles/elementui-reset/index.scss'
import '@static/styles/base/common.scss'
import '@static/font/iconfont.css'
import {
  Switch,
  Input,
  Radio,
  Select,
  Option,
  Slider,
  InputNumber,
  ColorPicker,
  Form,
  FormItem,
  Collapse,
  CollapseItem,
  Tabs,
  Tooltip,
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
  Footer,
  Row,
  Col,
  Upload,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'

Vue.use(Switch)
  .use(Input)
  .use(Radio)
  .use(Select)
  .use(Option)
  .use(Slider)
  .use(InputNumber)
  .use(ColorPicker)
  .use(Form)
  .use(FormItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tabs)
  .use(Tooltip)
  .use(TabPane)
  .use(Header)
  .use(Container)
  .use(Aside)
  .use(Tree)
  .use(Main)
  .use(Button)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Dialog)
  .use(Footer)
  .use(Row)
  .use(Col)
  .use(Upload)
Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service

new Vue({
  render: (h) => h(App)
}).$mount('#app')
