<template>
  <div class="align-section">
    <div
      class="align-icon__left"
      :class="{ activeIcon: align == 'flex-end' }"
      @click="_handleSetTextAlign"
    >
      <span></span>
      <span v-show="align == 'flex-end'" class="selected-icon__area"></span>
    </div>
    <p :class="{ active: align == 'flex-end' }" :data-align="align">居下</p>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {},
    curtomName: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    align: {
      get: function() {
        return this.model[this.prefix + this.curtomName]
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetTextAlign() {
      const oldVal = this.model[this.prefix + this.curtomName]
      if (oldVal !== 'flex-end') {
        const data = {}
        const oldData = {}
        this.model[this.prefix + this.curtomName] = 'flex-end'
        data[this.prefix + this.curtomName] = this.align
        oldData[this.prefix + this.curtomName] = oldVal
        this.$emit('onCssChange', oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.align-section {
  .align-icon__left {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: $--panel-background-color;
    border-radius: 4px;
    cursor: pointer;
    span {
      display: block;
    }
    span:first-of-type {
      width: 20px;
      height: 16px;
      background: url('~@static/images/contentAlign/vertical_bottom.png')
        no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .activeIcon {
    background: $--background-selected;
    span:first-of-type {
      background: url('~@static/images/contentAlign/vertical_bottom_active.png')
        no-repeat center center;
      background-size: 100% 100%;
    }
  }
  p {
    padding-top: 8px;
    font-size: $--font-size-small;
    line-height: 18px;
    text-align: center;
    color: $--popup-font-color-sub;
  }
  .active {
    color: $--font-color-selected;
  }
}
</style>
