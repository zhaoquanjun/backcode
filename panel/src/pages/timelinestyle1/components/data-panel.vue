<template>
  <div class="setting-block__section">
    <p class="setting-block--title">栏目设置</p>
    <div
      class="ym-button--primary"
      style="width: 100%;"
      :len="childArea.length"
      :class="{ disabled: childArea.length == 20 }"
      @click="_handleAddItem"
    >
      添加节点
    </div>
    <set-item
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :select-id="selectId"
      @changeSelectId="changeSelectId"
    ></set-item>
  </div>
</template>

<script>
import SetItem from './set-item'
export default {
  components: {
    SetItem
  },
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
    }
  },
  data() {
    return {
      selectId: ''
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
  methods: {
    _handleSelectItem(index) {
      if (this.childArea[index].Id === this.selectIndex) return
      if (window.smSite) {
        window.smSite.selectControlArea(
          this.model.controlId,
          this.childArea[index].Id
        )
      }
    },
    _handleAddItem() {
      if (this.childArea.length === 20) return
      const oldChildArea = JSON.parse(JSON.stringify(this.childArea))
      const newItem = {
        Id: '',
        Time: '2020-1-21',
        Title: '时间节点',
        Desc: '时间节点的描述',
        Html: ''
      }
      const newNum = this._getMaxId() + 1
      newItem.Id = 'time' + newNum
      this.childArea.push(newItem)
      this.onDataChange(
        'refreshList',
        { childArea: oldChildArea },
        { childArea: this.childArea }
      )
      this._handleSelectItem(this.childArea.length - 1)
      if (window.smSite) {
        window.smSite.message(1, '添加成功')
      }
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
    changeSelectId(index) {
      this.selectId = this.childArea[index].Id
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
</style>
