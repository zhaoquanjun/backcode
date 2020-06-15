<template>
  <div class="list-item__operate--area">
    <div class="add-data__area">
      <div
        class="ym-button--column"
        :class="{ disabled: disabled }"
        @click="_handleAddItem"
      >
        添加栏目
      </div>
    </div>
    <ul class="data-list__area setting-block__section">
      <li
        v-for="(item, index) in childArea"
        :key="index"
        :class="{ selected: selectedId == item.Id }"
        @click.stop="_handleSelectItem(index)"
      >
        <span class="left-part flex-start-center--area">
          <i class="iconfont icontuodongdian handler-sort"></i>
          <span class="select-icon__area"></span>
          <span
            class="switch-pricture__area"
            @click.stop="_handleEditItem($event, index)"
          >
            <span
              class="bgColor-space__area"
              :style="{
                backgroundColor: item.BgColor,
                backgroundImage: `url(${item.Src})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundSize: 'cover',
                background: `linear-gradient(${item.Violet}, ${item.Gradientstartcolor}, ${item.Gradientendcolor}`
              }"
            ></span>
            <b>
              <i class="iconfont iconqiehuanxingshiyi switch-icon"></i>
            </b>
          </span>
        </span>
        <span class="right-part">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i
              class="iconfont iconicon-des-bianji"
              @click.stop="_handleEditItem($event, index)"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="克隆" placement="top">
            <i
              class="iconfont iconicon-des-copy"
              :class="{ disabled: disabled }"
              @click.stop="_handleCopyItem(index)"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i
              class="iconfont iconshanchu"
              @click.stop="_handleDeleteItem(index)"
            ></i>
          </el-tooltip>
        </span>
      </li>
    </ul>
    <item-setting
      v-show="settingFlag"
      ref="itemSetting"
      :flag="settingFlag"
      :top="175"
      :model="model.dataModel"
      :title="title"
      :selected-id="selectedId"
      @closeOperatePopup="closeOperatePopup"
    ></item-setting>
  </div>
</template>

<script>
import ItemSetting from './item-operate'
export default {
  components: {
    ItemSetting
  },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      disabled: false,
      settingFlag: false,
      top: 0,
      title: '新增栏目'
    }
  },
  computed: {
    childArea: {
      get: function() {
        return this.model.dataModel['childArea']
      },
      set: function() {}
    },
    selectedId: {
      get: function() {
        return this.model.dataModel.selectAreaId
      },
      set: function() {}
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    _handleAddItem(e) {
      if (this.model.dataModel.childArea.length === 10) return
      this.title = '新增栏目'
      this.settingFlag = true
      this.$refs.itemSetting.handleEditItem(null)
    },
    _handleEditItem(e, i) {
      this.title = '编辑栏目'
      this.settingFlag = true
      this.$refs.itemSetting.handleEditItem(i)
    },
    _handleCopyItem(i) {
      if (this.model.dataModel.childArea.length === 10) return
      this.settingFlag = false
      this.$refs.itemSetting.handleCopyItem(i)
      if (this.model.dataModel.childArea.length === 10) {
        this.disabledAddOperate()
      }
    },
    _handleDeleteItem(i) {
      this.settingFlag = false
      this.$refs.itemSetting.handleDeleteItem(i)
      if (this.childArea.length < 10) this.enableAddOperate()
    },
    _handleSelectItem(i) {
      this.settingFlag = false
      if (this.selectedId === this.childArea[i].Id) return
      const oldData = {}
      const data = {}
      oldData['selectAreaId'] = this.model.dataModel.selectAreaId
      data['selectAreaId'] = this.childArea[i].Id
      this.model.dataModel['selectAreaId'] = this.childArea[i].Id
      this.onDataChange(null, oldData, data)
      if (window.smSite) {
        window.smSite.selectControlArea(
          this.model.controlId,
          this.model.dataModel.childArea[i].Id
        )
      }
      console.log(this.selectedId)
    },
    changeSelectedId(id) {
      this.selectedId = id
    },
    disabledAddOperate() {
      this.disabled = true
    },
    enableAddOperate() {
      this.disabled = false
    },
    closeOperatePopup() {
      this.settingFlag = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@static/styles/components/data-operate-list.scss';

.list-item__operate--area {
  .add-data__area {
    margin: 24px 24px;

    .disabled {
      color: $--usual-font-color-main;
      cursor: not-allowed;
      background: $--usual-background-disabled;
      border: none;

      &:hover {
        color: $--usual-font-color-main;
        cursor: not-allowed;
        background: $--usual-background-disabled;
        border: none;
      }
    }
  }
}
</style>
