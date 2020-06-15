<template>
  <div class="ym-define__select--section" @click="_handleClickEvent">
    <input type="text" readonly :value="label" :placeholder="placeholder">
    <div
      ref="listBox"
      v-scrollBar
      class="option-list__box"
      :style="{ height: listShow ? height : '0px' }"
    >
      <div v-if="!isTree" class="option-list__inner">
        <ul class="option-list__area">
          <li
            v-for="(item, index) in optionList"
            :key="index"
            :class="{ selected: item[attrName] === value }"
            @click="_changeSelectValue(item)"
          >
            {{ item[title] }}
          </li>
          <li></li>
        </ul>
        <div class="option-list__empty">暂无数据</div>
      </div>
      <div v-if="isTree" class="slot-list__box">
        <div class="slot-list__box--corner"></div>
        <div class="slot-list__inner">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="corner" :class="{ rotate180: listShow }"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
const el_scrollBar = el => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    // el上挂一份属性
    el._ps_ = new PerfectScrollbar(el, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}
// 接着，自定义Vue指令,指令名你自己随便编一个，我们假定它叫scrollBar
Vue.directive('scrollBar', {
  // 使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
  inserted(el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
    }
    // el上挂一份属性
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    try {
      vnode.context.$nextTick(() => {
        el_scrollBar(el)
      })
    } catch (error) {
      console.error(error)
      el_scrollBar(el)
    }
  }
})

export default {
  props: {
    optionList: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return '请选择'
      }
    },
    title: {
      type: String,
      dafeult: () => {
        return 'label'
      }
    },
    attrName: {
      type: String,
      default: () => {
        return 'value'
      }
    },
    isTree: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      listShow: false,
      arr: []
    }
  },
  computed: {
    height: {
      get: function() {
        const len = this.optionList.length
        let height = 0
        if (!this.isTree) {
          height = 34 * len + 12 + 8
        } else {
          height = this.$refs.listBox.childNodes[1].clientHeight
        }
        return height + 'px'
      }
    },
    label: {
      get: function() {
        let label = ''
        if (!this.isTree) {
          for (var i = 0; i < this.optionList.length; i++) {
            if (this.optionList[i][this.attrName] === this.value) {
              label = this.optionList[i][this.title]
            }
          }
        } else {
          label = this.value
        }
        return label
      }
    }
  },
  created() {
    this._initDocumentClickHideEvent()
  },
  methods: {
    _handleClickEvent() {
      this.listShow = !this.listShow
    },
    _changeSelectValue(val) {
      this.$emit('change', val[this.attrName])
    },
    _initDocumentClickHideEvent() {
      const _this = this
      document.addEventListener('click', function(e) {
        let flag = false
        if (_this._isParentsNodesHasDefinedClassName) {
          flag = _this._isParentsNodesHasDefinedClassName(e.target)
        }
        if (!flag) {
          _this.listShow = false
        }
      })
    },
    _isParentsNodesHasDefinedClassName(el) {
      let flag = false
      if (el.parentNode.className === 'ym-define__select--section') {
        flag = true
      }
      return flag
    },
    closeOptionsList() {
      this.listShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.ym-define__select--section {
  position: relative;
  min-width: 100px;
  height: 32px;
  text-align: left;
  padding: 0 8px;
  border: $--popup-border-main;
  border-radius: $--border-radius-base;
  z-index: 1;
  cursor: pointer;

  input {
    cursor: pointer;
  }

  .option-list__box {
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-height: 250px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    .option-list__inner {
      overflow-y: auto;
      .option-list__area {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 6px;
        width: 100%;
        max-height: 238px;
        border-radius: $--border-radius-base;
        border: $--popup-border-main;
        padding: 6px 0;
        background-color: $--popup-background-main;

        li {
          padding: 0 16px;
          width: 100%;
          height: 34px;
          line-height: 34px;
          color: $--popup-font-color-main;
          cursor: pointer;

          &:hover {
            color: $--font-color-hover;
            background-color: $--list-background-hover;
          }
        }

        li.selected {
          color: $--font-color-selected;
          background-color: $--list-background-selected;
        }

        li:last-of-type {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0;
          width: 0;
          height: 0;
          border-width: 6px;
          border-style: solid;
          border-color: transparent;
          border-top-color: $--popup-border-color;
          border-bottom-color: $--popup-border-color;
          &::after {
            position: absolute;
            top: 1px;
            left: -6px;
            display: block;
            content: ' ';
            width: 0;
            height: 0;
            border-width: 6px;
            border-top-width: 0;
            border-style: solid;
            border-color: transparent;
            border-top-color: $--popup-background-main;
            border-bottom-color: $--popup-background-main;
          }
        }
      }
    }

    .option-list__empty {
      padding: 0 16px;
      width: 100%;
      height: 34px;
      line-height: 34px;
      font-size: $--font-size-small;
      color: $--popup-font-color-main;
      text-align: center;
    }
  }

  .slot-list__box {
    position: relative;
    overflow-y: auto;

    .slot-list__inner {
      margin-top: 6px;
      padding: 8px;
      height: calc(100% - 6px);
      border: $--popup-border-main;
      background-color: $--popup-background-main;
    }

    .slot-list__box--corner {
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      padding: 0;
      width: 0;
      height: 0;
      border-width: 6px;
      border-style: solid;
      border-color: transparent;
      border-top-color: $--popup-border-color;
      border-bottom-color: $--popup-border-color;
      &::after {
        position: absolute;
        top: 1px;
        left: -6px;
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-width: 6px;
        border-top-width: 0;
        border-style: solid;
        border-color: transparent;
        border-top-color: $--popup-background-main;
        border-bottom-color: $--popup-background-main;
      }
    }
  }

  .corner {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    padding: 0;
    width: 0;
    height: 0;
    border-width: 6px;
    border-top-width: 0;
    border-style: solid;
    border-color: transparent;
    border-top-color: $--popup-border-color;
    border-bottom-color: $--popup-border-color;
    transition: transform 0.3s ease-in-out;

    &::after {
      position: absolute;
      top: 1px;
      left: -6px;
      display: block;
      content: ' ';
      width: 0;
      height: 0;
      border-width: 6px;
      border-top-width: 0;
      border-style: solid;
      border-color: transparent;
      border-top-color: $--popup-background-main;
      border-bottom-color: $--popup-background-main;
    }
  }

  .rotate180 {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
