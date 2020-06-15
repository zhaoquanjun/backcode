<template>
  <div class="setting-block__section">
    <!-- <h3 class="data-title">模式设置</h3>
        <ul class="mode">
            <li
                class="setting-item__area"
                :class="{'setting-item_selected':index==active}"
                v-for="(item, index) in mode"
                :key="index"
                @click="_handleSelect(item,index)"
            >
                <span class="select-area"></span>
                <p>{{item.name}}</p>
            </li>
        </ul> -->
    <p class="setting-block--title">
      导航管理
      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content">当前导航栏目读取页面标题信息</div>
        <i class="iconfont iconicon-exclamationmark"></i>
      </el-tooltip>
    </p>
    <div class="ym-button--column" @click.stop="addNavRouter">
      <i class="iconfont iconicon-add"></i> 添加页面
    </div>
    <ul class="menu-list row-top__dis">
      <li v-for="(item, index) in listDate" :key="index" class="list-item">
        <div class="item-wrap">
          <span class="name ellipsis">{{ item.title }}</span>
          <div class="icon-wrap">
            <el-tooltip
              class
              effect="dark"
              :content="isCurNavItemShow(item.id) ? '显示菜单' : '隐藏菜单'"
              placement="top-start"
            >
              <i
                class="iconfont iconicon-des-guanbiyanjing"
                :class="[{ active: isCurNavItemShow(item.id) }]"
                @click.stop="handlerNavItem(item)"
              ></i>
            </el-tooltip>
            <!-- <el-tooltip
              class
              effect="dark"
              content="编辑页面标题"
              placement="top-start"
            >
              <i class="iconfont iconicon-des-bianji"></i>
            </el-tooltip> -->
          </div>
          <i
            v-if="isCurNavItemShow(item.id)"
            class="flot-right iconfont iconicon-des-guanbiyanjing active"
          ></i>
        </div>
        <ul v-if="item.childs && item.childs.length > 0" class="sub-menu-list">
          <li
            v-for="(child, index) in item.childs"
            :key="index"
            class="list-item"
          >
            <div class="item-wrap">
              <span class="name ellipsis">{{ child.title }}</span>
              <div class="icon-wrap">
                <el-tooltip
                  :open-delay="500"
                  effect="dark"
                  :content="
                    isCurNavItemShow(child.id) ? '显示菜单' : '隐藏菜单'
                  "
                  placement="top-start"
                >
                  <i
                    class="iconfont iconicon-des-guanbiyanjing"
                    :class="[{ active: isCurNavItemShow(child.id) }]"
                    @click.stop="handlerChildNavItem(child)"
                  ></i>
                </el-tooltip>
                <!-- <el-tooltip
                  :open-delay="500"
                  effect="dark"
                  content="编辑页面标题"
                  placement="top-start"
                >
                  <i class="iconfont iconicon-des-bianji"></i>
                </el-tooltip> -->
              </div>
              <i
                v-if="isCurNavItemShow(child.id)"
                class="flot-right iconfont iconicon-des-guanbiyanjing active"
              ></i>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <p class="setting-block--title row-top__dis">
      更多导航栏
      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content">
          当导航栏宽度不足时, 部分住导
          <br />航会折叠到更多导航栏内
        </div>
        <i class="iconfont iconicon-exclamationmark"></i>
      </el-tooltip>
    </p>
    <text-area
      :model="model.dataModel"
      :name="'MoreText'"
      :length-limit="10"
      :is-show-word-limit="false"
    />
  </div>
</template>
<script>
// import AddMenu from './add-menu'
import TextArea from '@comp/data/text'
import { getNavigationList } from '@/api/navigationApi.js'
export default {
  components: {
    // AddMenu,
    TextArea
  },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      listDate: [],
      mode: [
        {
          id: 1,
          name: '收起模式'
        },
        {
          id: 2,
          name: '展开模式'
        }
      ],
      active: 0
    }
  },
  computed: {
    filtersValue: {
      get: function() {
        this.model.query.appId = null
        this.model.query.orderBy = []
        const oldData = {
          value: JSON.parse(JSON.stringify(this.model.query))
        }
        const data = {
          value: JSON.parse(JSON.stringify(this.model.query))
        }
        this.onQueryDataChange('changeValueId', oldData, data)
        return this.model.query.filters[0].value
      },
      set: function() {}
    },
    query: {
      get() {
        return this.model.query
      },
      set: function(val) {}
    }
  },
  mounted() {
    window.getNavList = this._getNavigationList
    this._getNavigationList()
  },
  methods: {
    async _getNavigationList() {
      const queryDate = this.query
      const data = await getNavigationList(queryDate)
      this.listDate = data.data.data
    },
    isCurNavItemShow(id) {
      return this.filtersValue.split(',').includes(id)
    },
    // 选中
    _handleSelect(item, index) {
      this.active = index
      const oldData = {
        isShow: 'hide'
      }
      const data = {}
      data.isShow = index === 1 ? 'show' : 'hide'
      this.onDataChange('changeMenu', oldData, data)
    },
    handlerNavItem(item) {
      if (this.isCurNavItemShow(item.id)) {
        this.show(item)
        return
      } else {
        this.hide(item)
      }
    },

    show(item) {
      let valueAry = this.model.query.filters[0].value.split(',')
      valueAry = valueAry.filter(cur => cur != item.id)
      this.model.query.filters[0].value = valueAry.toString()
      const oldData = {
        current: 0
      }
      const data = {
        current: item.id
      }
      this.onDataChange('changeItemShow', oldData, data)
    },
    hide(item) {
      const valueIds = this.model.query.filters[0].value
      const valueAry = valueIds.split(',')
      const isLast = this.checkNavListCount(valueAry)
      if (!isLast) return false
      if (valueAry.includes(item.id)) return
      let newId = ''
      newId = item.id
      if (item.childs && item.childs.length >= 1) {
        item.childs.forEach(item => {
          newId = newId + ',' + item.id
        })
      }

      this.model.query.filters[0].value = valueIds
        ? valueIds + ',' + newId
        : newId

      const oldData = { current: 0 }
      const data = { current: item.id }
      this.onDataChange('changeItemHide', oldData, data)
    },
    handlerChildNavItem(item) {
      if (this.isCurNavItemShow(item.id)) {
        this.showChild(item)
        return
      } else {
        this.hideChild(item)
      }
    },
    hideChild(item) {
      let valueIds = this.model.query.filters[0].value
      let newId = ''
      newId = item.id
      const oldData = { current: 0 }
      const data = { current: item.id }
      if (valueIds) {
        valueIds = valueIds + ',' + item.id
      } else {
        valueIds = item.id
      }
      this.model.query.filters[0].value = valueIds
        ? valueIds + ',' + newId
        : newId

      this.onDataChange('changeItemHide', oldData, data)
    },
    showChild(item) {
      let valueAry = this.model.query.filters[0].value.split(',')
      valueAry = valueAry.filter(cur => cur !== item.id)
      this.model.query.filters[0].value = valueAry.toString()
      const oldData = {
        current: 0
      }
      const data = {
        current: item.id
      }
      this.onDataChange('changeItemShow', oldData, data)
    },
    checkNavListCount(valueAry) {
      const parentIds = this.listDate.map(item => item.id)

      let count = 0
      parentIds.forEach(item => {
        if (!valueAry.includes(item)) {
          ++count
        }
      })
      if (count === 1) {
        this.$notify({
          customClass: 'notify-error', //  notify-success ||  notify-error
          message: '至少保留一项导航',
          showClose: false,
          duration: 1500
        })
        return false
      }
      return true
    },
    addNavRouter() {
      if (window.smSite) {
        window.pageManage.handlerPageManage()
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    onQueryDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onQueryDataChange(action, oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .menuWrap {
//   background: #f8fafc;
//   padding: 24px;
// }
// .data-title {
//   background: #f8fafc;
//   padding: 13px 0 20px 0;
//   font-size: 14px;
// }
.menu-list {
  .list-item {
    cursor: pointer;
    line-height: 40px;
    margin-bottom: 3px;
    .item-wrap {
      position: relative;
      background: $--panel-background-block-color;
      padding: 0 16px;

      .name {
        vertical-align: top;
        width: 50%;
        font-size: $--font-size-small;
        color: $--usual-font-color-main;
      }
    }
  }
  .icon-wrap {
    display: inline-block;
    float: right;
    opacity: 0;
    position: absolute;
    right: 10px;
    .iconfont {
      display: inline-block;
      padding: 0 5px;
      cursor: pointer;
    }
  }
  .sub-menu-list {
    padding-left: 46px;

    .list-item {
      margin: 0;
      position: relative;
      &::before {
        content: '';
        width: 26px;
        height: 1px;
        background: $--usual-border-color;
        display: inline-block;
        left: -26px;
        position: absolute;
        top: 50%;
        margin-top: -1px;
      }
      &::after {
        content: '';
        width: 1px;
        height: 100%;
        background: $--usual-border-color;
        display: inline-block;
        position: absolute;
        left: -26px;
        top: 0;
      }
      &:last-child {
        &::after {
          height: 50%;
        }
      }
      .item-wrap {
        border-top: 3px solid $--panel-background-content-color;
      }
    }
  }
  .item-wrap:hover {
    color: $--font-color-hover;
    background-color: $--list-background-hover;
    .name {
      color: $--font-color-hover;
    }
    .icon-wrap {
      top: 50%;
      transform: translateY(-50%);
      line-height: 27px;
      border-radius: 3px;
      opacity: 1;
      color: $--font-color-hover;
      box-sizing: border-box;
    }
    i {
      color: $--font-color-hover;
    }
  }
}
.active {
  // background: $--list-background-selected !important;
  // color: $--font-color-selected !important;
  .item-wrap {
    background: $--list-background-selected !important;
    color: $--font-color-selected !important;
    .name {
      color: $--font-color-selected !important;
    }
    .icon-wrap {
      opacity: 1;
      i {
        color: $--font-color-selected !important;
      }
    }
  }
}
.flot-right {
  float: right;
}
.ellipsis {
  display: inline-block;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
}
</style>
<style lang="scss" scoped>
ul {
  background-color: $--panel-background-content-color;
  // padding: 15px;
  .nav-manage {
    margin-bottom: 18px;
    i {
      font-size: 14px;
      color: $--usual-font-color-main;
      margin-right: 8px;
    }
  }
  li.setting-item__area {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 44px;
    background: $--usual-font-color-main;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    // border-top: 1px solid rgba(255, 107, 0, 0.5);
    margin-bottom: 3px;
    cursor: pointer;

    i {
      color: rgba(215, 216, 217, 1);
      font-size: 18px;
    }

    span.select-area {
      position: relative;
      margin-left: 8px;
      width: 14px;
      height: 14px;
      border: $--usual-border-main;
      border-radius: 50%;
      cursor: pointer;
      flex: none;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #b9cbcf;
      }
    }
    p {
      padding: 14px 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      max-width: 190px;
      color: $--popup-font-color-sub;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 10px;
    }
  }
  li.setting-item_selected {
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.14);
    .handler-move {
      color: $--color-main;
    }
    span.select-area {
      border-color: $--color-main;
      &::after {
        display: block;
        background: $--color-main;
      }
    }
  }
}
</style>
