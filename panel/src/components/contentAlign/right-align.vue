<template>
  <div class="align-section">
    <div
      class="align-icon__right"
      :class="{ activeIcon: align == 'right' }"
      @click="_handleSetTextAlign"
    >
      <span></span>
      <span v-show="align == 'right'" class="selected-icon__area"></span>
    </div>
    <p :class="{ active: align == 'right' }" :data-align="align">居右</p>
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
  computed: {
    align: {
      get: function() {
        return this.model[this.prefix + 'textAlign']
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetTextAlign() {
      const oldVal = this.model[this.prefix + 'textAlign']
      if (oldVal !== 'right') {
        const data = {}
        const oldData = {}
        this.model[this.prefix + 'textAlign'] = 'right'
        data[this.prefix + 'textAlign'] = this.align
        oldData[this.prefix + 'textAlign'] = oldVal
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
.align-section {
  .align-icon__right {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: $--panel-background-color;
    border-radius: $--border-radius-base;
    cursor: pointer;
    span {
      display: block;
    }
    span:first-of-type {
      width: 20px;
      height: 16px;
      background: url('~@static/images/contentAlign/content_right.png')
        no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .activeIcon {
    background: $--background-selected;
    span:first-of-type {
      background: url('~@static/images/contentAlign/content_right_active.png')
        no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .active {
    color: $--font-color-selected;
  }
  p {
    padding-top: 8px;
    font-size: $--font-size-small;
    line-height: 18px;
    text-align: center;
    color: $--usual-font-color-sub;
  }
}
</style>
