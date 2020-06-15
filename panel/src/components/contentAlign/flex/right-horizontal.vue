<template>
  <div class="align-section">
    <div
      class="align-icon__right"
      :class="{activeIcon: align == 'flex-end'}"
      @click="_handleSetTextAlign"
    >
      <span></span>
      <span v-show="align == 'flex-end'" class="selected-icon__area"></span>
    </div>
    <p :class="{active: align == 'flex-end'}" :data-align="align">居右</p>
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
    },
    curtomName: {
      type: String
    }
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
  .align-icon__right {
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
      background: url("~@static/images/contentAlign/content_right.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
  .activeIcon {
    background: $--background-selected;

    span:first-of-type {
      width: 20px;
      height: 16px;
      background: url("~@static/images/contentAlign/content_right_active.png") no-repeat center
        center;
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
    color: $--color-main;
  }
}
</style>
