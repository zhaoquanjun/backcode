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
  MessageBox,
  CheckboxGroup,
  Checkbox,
  Form,
  FormItem,
  Notification,
  Message,
  Loading

} from 'element-ui'
Vue.use(Option).use(Radio)
Vue.use(Select).use(Switch)
Vue.use(InputNumber)
Vue.use(ColorPicker)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Input)
Vue.use(TabPane).use(Header).use(Container).use(Aside).use(Tree).use(Main).use(Button).use(Table).use(TableColumn).use(Pagination).use(Dialog).use(Carousel).use(Footer).use(Row).use(Col).use(Upload).use(CheckboxGroup).use(Checkbox).use(Form).use(FormItem)
Vue.config.productionTip = false

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

// let utlis = {
//   onDataChange(action, oldData, data) {
//     if (window.smSite) {
//       window.smSite.onDataChange(action, oldData, data);
//     }
//   },
//   onCssChange(oldData, data) {
//     console.log(oldData, data,"utlis");
//     if (window.smSite) {
//       window.smSite.onCssChange(oldData, data);
//     }
//   },
// }
// Vue.prototype.$utlis = utlis;
new Vue({
  el: '#app',
  render: h => h(App)
})
