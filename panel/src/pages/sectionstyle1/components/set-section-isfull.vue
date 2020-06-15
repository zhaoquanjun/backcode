<template>
  <div class="set-section__area--isfull flex-start-center--area">
    <ul>
      <li
        class="block flex-center-center--area"
        :class="{ active: width === 100 }"
        @click="_handleSetSectionFull"
      >
        <span class="full-block"></span>
      </li>
      <li class="text" :class="{ active: width === 100 }">通栏</li>
    </ul>
    <ul>
      <li
        class="block flex-center-center--area"
        :class="{ active: width === 1160 }"
        @click="_handleSetSectionNotFull"
      >
        <span class="prev-line"></span>
        <span class="notfull-block"></span>
        <span class="next-line"></span>
      </li>
      <li class="text" :class="{ active: width === 1160 }">非通栏</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    modelData: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  computed: {
    width: {
      get: function() {
        return parseInt(this.model[this.prefix + 'width'])
      },
      set: function() {}
    }
  },
  created() {
    if (window.smSite) {
      const _this = this
      window.smSite.setSectionFull = function() {
        _this._handleSetSectionFull()
      }
      window.smSite.setSectionNotFull = function() {
        _this._handleSetSectionNotFull()
      }
    }
  },
  methods: {
    _handleSetSectionFull() {
      if (parseInt(this.model[this.prefix + 'width']) === 100) {
        return false
      }
      const oldData = {}
      const data = {}
      oldData[this.prefix + 'width'] = '1160px'
      data[this.prefix + 'width'] = '100%'
      this.model[this.prefix + 'width'] = '100%'
      this.onCssChange(oldData, data)
      this.onDataChange('changeSectionToFull', { isFullFill: false }, { isFullFill: true })
    },
    _handleSetSectionNotFull() {
      if (parseInt(this.model[this.prefix + 'width']) === 1160) {
        return false
      }
      const oldData = {}
      const data = {}
      oldData[this.prefix + 'width'] = '100%'
      data[this.prefix + 'width'] = '1160px'
      this.model[this.prefix + 'width'] = '1160px'
      this.onCssChange(oldData, data)
      this.onDataChange('changeSectionToNotFull', { isFullFill: true }, { isFullFill: false })
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
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
.set-section__area--isfull {
  ul {
    li {
      cursor: pointer;
      .full-block {
        width: 58px;
        height: 20px;
        border: 2px solid $--usual-border-color;
      }
      .notfull-block {
        width: 40px;
        height: 20px;
        border: 2px solid $--usual-border-color;
      }
      .prev-line {
        width: 1px;
        height: 60px;
        border-left: 1px dashed $--usual-border-color;
      }
      .next-line {
        width: 0;
        height: 60px;
        border-right: 1px dashed $--usual-border-color;
      }
    }
    li.text {
      margin-top: 8px;
      height: 17px;
      line-height: 17px;
      text-align: center;
      color: $--usual-font-color-sub;
    }
    li.block {
      width: 60px;
      height: 60px;
      background: $--panel-background-color;
    }
    .block.active {
      background: $--color-main;
      .full-block,
      .notfull-block {
        border-color: $--usual-background-auxiliary;
      }
      .prev-line {
        background: $--usual-background-auxiliary;
      }
      .next-line {
        background: $--usual-background-auxiliary;
      }
    }
    .text.active {
      color: $--font-color-selected;
    }
  }
  ul:last-of-type {
    margin-left: 26px;
  }
}
</style>
