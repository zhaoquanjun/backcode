<template>
  <draggable
    v-model="model.dataModel.childArea"
    class="data-list__area"
    tag="ul"
    :options="{
      animation: 150,
      ghostClass: '',
      dragClass: 'dragging-dom',
      scroll: true,
      scrollSensitivity: 200,
      handle: '.handler-move'
    }"
    @end="_handleSortEnd"
  >
    <li
      v-for="(item, index) in childArea"
      :key="index"
      :selected-id="selectId"
      :item-id="item.Id"
      :class="{ selected: item.Id === selectId }"
      @click.stop="_handleSelectItem(index)"
    >
      <span class="left-part flex-start-center--area">
        <i class="iconfont icontuodongdian handler-move"></i>
        <span class="select-icon__area"></span>
        <p class="desc">节点{{ index + 1 }}</p>
      </span>
      <span class="right-part">
        <el-tooltip class="item" effect="dark" content="克隆" placement="top">
          <i
            class="iconfont iconicon-des-copy"
            :class="{ disabled: childArea.length == 20 }"
            @click.stop="_handleCopyItem(index)"
          ></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <i
            class="iconfont iconshanchu"
            :class="{ disabled: childArea.length == 3 }"
            @click.stop="_handleDeleteItem(index)"
          ></i>
        </el-tooltip>
      </span>
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  props: {
    model: {
      type: Object,
      default: () => {
        return null
      }
    },
    prefix: {
      type: String,
      default: () => {
        return '$'
      }
    },
    selectId: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  computed: {
    childArea: {
      get: function() {
        return this.model.dataModel['childArea']
      },
      set: function() {}
    }
  },
  created() {
    if (window.smSite) {
      const _this = this
      window.smSite.setControlSelectedItem = function(index) {
        _this.$emit('changeSelectId', index)
      }
    }
  },
  methods: {
    _handleSelectItem(index) {
      if (this.selectId === this.childArea[index].Id) return
      if (window.smSite) {
        window.smSite.selectControlArea(
          this.model.controlId,
          this.childArea[index].Id
        )
      }
    },
    _handleCopyItem(index) {
      if (this.childArea.length === 20) return
      const oldChildArea = JSON.parse(JSON.stringify(this.childArea))
      const item = JSON.parse(JSON.stringify(this.childArea[index]))
      const newNum = this._getMaxId() + 1
      item.Id = 'time' + newNum
      this.childArea.push(item)
      this.onDataChange(
        'refreshList',
        { childArea: oldChildArea },
        { childArea: this.childArea }
      )
      this._handleSelectItem(this.childArea.length - 1)
      if (window.smSite) {
        window.smSite.message(1, '复制成功')
      }
    },
    _handleDeleteItem(index) {
      if (this.childArea.length === 3) return
      const newChildArea = JSON.parse(JSON.stringify(this.childArea))
      newChildArea.splice(index, 1)

      this.onDataChange(
        'refreshList',
        { childArea: this.newChildArea },
        { childArea: newChildArea }
      )

      if (this.childArea[index].Id === this.selectId) {
        this.model.dataModel.childArea = newChildArea
        this.$emit('changeSelectId', 0)
      } else {
        this.model.dataModel.childArea = newChildArea
      }

      if (window.smSite) {
        window.smSite.message(1, '删除成功')
      }
    },
    // 排序
    _handleSortEnd(evt) {
      const oldArea = this.model.dataModel.childArea
      const newArea = JSON.parse(JSON.stringify(this.model.dataModel.childArea))
      this.onDataChange(
        'sortList',
        { childArea: oldArea },
        { childArea: newArea }
      )
    },
    // 获取最大id
    _getMaxId() {
      var max = 0
      for (var i = 0; i < this.childArea.length; i++) {
        if (Number(this.childArea[i].Id.slice(4)) > max) {
          max = Number(this.childArea[i].Id.slice(4))
        }
      }
      return max
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@static/styles/components/data-operate-list.scss';
</style>
