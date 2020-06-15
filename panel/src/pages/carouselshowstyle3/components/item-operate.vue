<template>
  <div class="operate-items__section" :style="{ top: top + 'px' }">
    <div class="operate-header__area">{{ title }}</div>
    <div class="operate-content__area">
      <p class="title">栏目背景</p>
      <div class="bg-setting__area">
        <background :model="curDataModel" :prefix="prefix" :flag="flag" />
      </div>
      <div class="operate-btn__area flex-end-center--area">
        <div class="ym-button--isplain" style="margin-right: 16px;" @click="_handleCancleClick">取消</div>
        <div class="ym-button--primary" @click="_handleConfirmClick">确定</div>
      </div>
    </div>

    <div class="corner"></div>
  </div>
</template>

<script>
import background from './background/background'
export default {
  components: {
    background
  },
  props: {
    model: {
      type: Object
    },
    title: {
      type: String,
      default: () => {
        return '新增栏目'
      }
    },
    top: {
      type: Number,
      default: () => {
        return 0
      }
    },
    flag: {
      type: Boolean
    },
    selectedId: {
      type: String
    }
  },
  data() {
    return {
      curDataModel: {},
      curCssModel: {},
      prefix: '',
      curIndex: 1,
      status: 'add'
    }
  },
  computed: {
    childArea: {
      get: function() {
        return this.model['childArea']
      }
    }
  },
  methods: {
    handleEditItem(i) {
      this.curDataModel = {}
      if (typeof i === 'number') {
        // 编辑
        this.status = 'edit'
        this.curIndex = i
        this.curDataModel = this.childArea[i]
      } else {
        // 新增
        const max = this.getMaxId() + 1
        this.status = 'add'
        this.curIndex = max - 1
        this._setNewDataAttribute(this.curDataModel, null, 'area' + max)
      }
    },
    _setNewDataAttribute(t, o, id) {
      const attrList = [
        'Src',
        'Id',
        'BgColor',
        'Gradientstartcolor',
        'Gradientendcolor',
        'Violet',
        'BgSize',
        'BgRepeat',
        'BgPosition',
        'Html'
      ]
      const attrData = [
        '',
        id || '',
        'transparent',
        'none',
        'none',
        '0deg',
        'cover',
        'no-repeat',
        '50% 50%',
        ''
      ]
      for (let i = 0; i < attrList.length; i++) {
        if (o) {
          this.$set(t, attrList[i], o[attrList[i]])
        } else {
          this.$set(t, attrList[i], attrData[i])
        }
      }
    },
    handleCopyItem(i) {
      const max = this.getMaxId() + 1
      this.curDataModel = {}
      this._setNewDataAttribute(this.curDataModel, this.model.childArea[i])
      this.curDataModel.Id = 'area' + max
      const newData = JSON.parse(JSON.stringify(this.model.childArea))
      newData.push(this.curDataModel)
      this.onDataChange(
        'copyDataItem',
        { childArea: this.model.childArea },
        { childArea: newData }
      )
      this.model.childArea = newData
      this._setNewDataAttribute(
        this.model.childArea[this.model.childArea.length - 1],
        newData[this.model.childArea.length - 1]
      )
      if (this.model.childArea.length === 10) this.$emit('disabledAddOperate')
      // window.smSite.message(1, '复制成功');
    },
    handleDeleteItem(i) {
      const oldData = JSON.parse(JSON.stringify(this.model.childArea))
      this.model.childArea.splice(i, 1)
      if (oldData[i].Id === this.selectedId) {
        this.$emit('changeSelectedId', this.model.childArea[0].Id)
      }

      this.onDataChange(
        'deleteDataItem',
        { childArea: oldData },
        { childArea: this.model.childArea }
      )
      // window.smSite.message(1, '删除成功');
    },
    getMaxId() {
      var max = 0
      for (var i = 0; i < this.childArea.length; i++) {
        if (Number(this.childArea[i].Id.slice(4)) > max) {
          max = Number(this.childArea[i].Id.slice(4))
        }
      }
      return max
    },
    _handleCancleClick() {
      this.$emit('closeOperatePopup')
    },
    _handleConfirmClick() {
      const data = JSON.parse(JSON.stringify(this.model.childArea))
      if (this.status === 'add') {
        data.push(this.curDataModel)
        window.smSite.message(1, '添加成功')
      }
      if (this.status === 'edit') {
        data[this.curIndex] = this.curDataModel
        window.smSite.message(1, '编辑成功')
      }
      this.onDataChange(
        'changeDataList',
        { childArea: this.childArea },
        { childArea: data }
      )
      // 同步 model - data 与现在操作项的值
      this.model.childArea = data
      this._setNewDataAttribute(
        this.model.childArea[this.model.childArea.length - 1],
        data[this.model.childArea.length - 1]
      )

      this.model.childArea.length === 10 && this.$emit('disabledAddOperate')
      this.$emit('closeOperatePopup')
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
.operate-items__section {
  position: fixed;
  right: 290px;
  top: 100px;
  width: 270px;
  height: 525px;
  background: $--popup-background-main;
  box-shadow: $--area-shadow-base;

  .operate-header__area {
    padding: 12px 16px;
    color: $--popup-font-color-main;
    font-size: $--font-size-normal;
    font-weight: 500;
    border-bottom: 1px solid $--popup-border-color;
  }

  .bg-setting__area {
    padding: 8px 16px;
    background-color: #f8fafc;
  }

  .operate-content__area {
    p.title {
      padding: 12px 16px;
      font-size: $--font-size-normal;
      color: $--popup-font-color-main;
    }
  }

  .operate-btn__area {
    position: absolute;
    bottom: 16px;
    right: 24px;
  }

  .corner {
    position: absolute;
    top: 70px;
    right: -6px;
    border-width: 6px 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent transparent $--popup-background-main; /*透明 透明 透明 黄*/
  }
}
</style>
