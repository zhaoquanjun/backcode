<template>
  <div class="font-align__group">
    <el-tooltip class="item" effect="dark" content="对齐方式" placement="top">
      <i
        class="iconfont iconicon-des-jz centerAlign centerSelected"
        @click="_handleSelectCenter"
      ></i>
    </el-tooltip>
    <ul class="align__area">
      <li
        :class="{ selected: textAlign == 'center' }"
        @click="_handleSelectCenter"
      >
        <i class="iconfont iconicon-des-jz fonticon font-icon__size"></i>居中对齐
      </li>
      <li
        :class="{ selected: textAlign == 'left' }"
        @click="_handleSetTextAlign(0)"
      >
        <i class="iconfont iconicon-des-left fonticon font-icon__size"></i>左对齐
      </li>
      <li
        :class="{ selected: textAlign == 'right' }"
        @click="_handleSetTextAlign(1)"
      >
        <i class="iconfont iconicon-des-right fonticon font-icon__size"></i>右对齐
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  inject: {
    isNavgation: {
      default: false
    }
  },

  computed: {
    textAlign: {
      get: function() {
        return this.model[this.prefix + 'textAlign']
      },
      set: function() {}
    }
  },
  methods: {
    _handleSelectCenter() {
      const oldVal = this.model[this.prefix + 'textAlign']
      const newVal = 'center'

      if (oldVal !== newVal) {
        const oldData = {}

        const data = {}
        oldData[this.prefix + 'textAlign'] = oldVal
        data[this.prefix + 'textAlign'] = newVal
        this.model[this.prefix + 'textAlign'] = newVal
        this.onCssChange(oldData, data)
      }
    },
    _handleSetTextAlign(val) {
      const oldVal = this.model[this.prefix + 'textAlign']
      let newVal = val === 0 ? 'left' : 'right'
      if (this.isNavgation && val === 1) {
        newVal = 'flex-end'
      }
      if (oldVal !== newVal) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'textAlign'] = oldVal
        data[this.prefix + 'textAlign'] = newVal
        this.model[this.prefix + 'textAlign'] = newVal
        this.onCssChange(oldData, data)
      }
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-align__group {
  position: relative;
  flex: none;
  i {
    padding: 8px;
    vertical-align: middle;
  }
  .align__area {
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 26px;
    width: 96px;
    padding: 4px 0;
    background: $--panel-background-color;
    box-shadow: $--area-shadow-base;
    border: 1px solid $--usual-border-color;
    z-index: 1002;
    li {
      justify-content: flex-start !important;
      width: calc(100% - 16px) !important;
      height: 32px !important;
      padding: 0 8px !important;
      text-align: center;
      color: $--usual-font-color-main;
      cursor: pointer;
      font-size: $--font-size-small !important;
      &:hover {
        color: $--font-color-hover;
      }
    }
    li.selected {
      color: $--font-color-selected;
      i {
        color: $--font-color-selected !important;
      }
    }
    &::after {
      display: block;
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -4px;
      width: 0;
      height: 0;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      border-bottom: 4px solid $--usual-border-color;
    }
  }
  .centerSelected {
    color: $--font-color-selected !important;
  }
  i {
    font-size: $--font-size-small;
  }
  &:hover {
    .align__area {
      display: block;
    }
  }
}
</style>
