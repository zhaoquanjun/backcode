<template>
  <div class="select-tree--area">
    <ym-select-box
      ref="elSelect"
      v-model="valueTitle"
      :is-tree="true"
    >
      <el-tree
        id="tree-option"
        ref="selectTree"
        :check-strictly="true"
        :default-expand-all="true"
        :expand-on-click-node="false"
        :accordion="accordion"
        :data="treeResult"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :show-checkbox="isSHowCheckBox"
        @node-click="handleNodeClick"
        @check="check"
      ></el-tree>
    </ym-select-box>
  </div>
</template>

<script>
import YmSelectBox from '@comp/ymDefined/select'
export default {
  name: 'ElTreeSelect',
  components: {
    YmSelectBox
  },
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    treeResult: {
      type: Array,
      default: () => {
        return []
      }
    },
    /** 分类名称 */
    categoryName: {
      type: [String, Array]
    },

    /** 分类ID */
    categoryId: {
      type: Number,
      default: 0
    },
    /* 初始值 */
    value: {
      type: Number,
      default: () => {
        return null
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isexpand: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isSHowCheckBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueId: null, // 初始值
      valueTitle: '',
      defaultExpandedKey: []
    }
  },
  watch: {
    categoryName() {
      this.valueTitle = this.categoryName
    },
    categoryId() {
      this.$nextTick(() => {
        this.initHandle()
        this.$refs.selectTree.setCurrentKey(this.categoryId) // 设置默认选中
      })
    }
  },
  mounted() {
    this.initHandle()
    this.valueTitle = this.categoryName
    this.setCheckedKeys()
  },
  methods: {
    setCheckedKeys() {
      this.valueTitle = this.categoryName
      this.$nextTick(() => {
        this.$refs.selectTree.setCurrentKey(this.categoryId) // 设置默认选中
        //   this.$refs.tree.setCheckedKeys(ids);
      })
    },
    remove(cur) {
      this.valueTitle = this.valueTitle.filter(item => {
        return item !== cur
      })
      this.$emit('removeSeletedCategory', cur)
    },
    // 初始化值
    initHandle() {
      this.$refs.selectTree.setCurrentKey(this.categoryId) // 设置默认选中

      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll(
          '.el-scrollbar .el-select-dropdown__wrap'
        )[0]
        const scrollBar = document.querySelectorAll(
          '.el-scrollbar .el-scrollbar__bar'
        )
        scrollWrap.style.cssText =
          'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => (ele.style.width = 0))
        scrollBar[0].style.display = 'none'
      })
    },
    // 切换选项
    handleNodeClick(node) {
      this.$refs.elSelect.closeOptionsList()
      if (this.multiple) {
        if (this.valueTitle.indexOf(node[this.props.label]) > -1) {
          return
        }
        this.valueTitle.push(node[this.props.label])
        this.$emit('chooseNode', node)
        return
      } else {
        this.valueTitle = node[this.props.label]
        this.$emit('chooseNode', node)
      }
      // this.valueId = node[this.props.value];
      // this.defaultExpandedKey = [];
      this.clearSelected()
    },
    check(node) {
      if (this.multiple) {
        if (this.valueTitle.indexOf(node[this.props.label]) > -1) {
          return
        }
        this.valueTitle.push(node[this.props.label])
        this.$emit('chooseNode', node)
        return
      } else {
        this.valueTitle = node[this.props.label]
        this.$emit('chooseNode', node)
      }
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('chooseNode', null)
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach(element => element.classList.remove('is-current'))
    }
  }
}
</script>

<style scoped lang="scss">
.select-tree--area {
  display: inline-block;
  .el-select {
    width: 80%;
    max-width: 100%;
  }
}

.select-tree--area /deep/ .el-input__inner {
  color: $--popup-font-color-main;
  border-color: $--popup-border-color;
  background-color: $--popup-background-main;
}

.el-popper {
  border-color: $--popup-border-color !important;
}

.el-select-dropdown__list {
  background-color: $--popup-background-main !important;
}

.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
  display: block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-tree-node__label {
  font-weight: normal;
}

.el-select-dropdown {
  .popper__arrow {
    &::after {
      border-top-color: $--popup-background-main !important;
      border-bottom-color: $--popup-background-main !important;
    }
  }
}
</style>
