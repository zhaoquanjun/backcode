<template>
  <div class="flex-start-start--area setting-block__top">
    <div class="setting-attribute--title">
      <slot></slot>
    </div>
    <div class="border-style-box">
      <div
        class="style-type"
        data-style="solid"
        :class="{ active: borderStyle == 'solid' }"
        @click="_handleChangeBorderStyle($event)"
      ></div>
      <div
        class="style-type dashed"
        data-style="dashed"
        :style="{ 'margin-right': 0 }"
        :class="{ active: borderStyle == 'dashed' }"
        @click="_handleChangeBorderStyle($event)"
      ></div>
      <div
        class="style-type dotted "
        data-style="dotted"
        :class="{ active: borderStyle == 'dotted' }"
        @click="_handleChangeBorderStyle($event)"
      ></div>
      <div
        class="style-type none"
        data-style="none"
        :style="{ 'margin-right': 0 }"
        :class="{ active: borderStyle == 'none' }"
        @click="_handleChangeBorderStyle($event)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    }
  },
  data() {
    return {}
  },
  computed: {
    borderStyle: {
      get: function() {
        const style = this.model[this.prefix + 'bdStyle']
        return style
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'bdStyle']
        if (newVal && newVal !== oldValue) {
          const data = {}
          const oldData = {}
          if (this.isAll) {
            for (var i = 0; i < this.all.length; i++) {
              this.model[this.prefix + 'bd' + this.all[i] + 'Style'] = newVal
              data[this.prefix + 'bd' + this.all[i] + 'Style'] = newVal
              oldData[this.prefix + 'bd' + this.all[i] + 'Style'] = oldValue
            }
          } else {
            this.model[this.prefix + 'bdStyle'] = newVal
            data[this.prefix + 'bdStyle'] = newVal
            oldData[this.prefix + 'bdStyle'] = oldValue
          }
          this.onCssChange(oldData, data)
        }
      }
    }
  },
  methods: {
    _handleChangeBorderStyle(ev) {
      this.borderStyle = ev.target.getAttribute('data-style')
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
.border-style-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .style-type {
    position: relative;
    width: 85px;
    height: 40px;
    border-radius: 2px;
    margin-right: 10px;
    margin-bottom: 8px;
    border: 1px solid $--usual-border-color;
    cursor: pointer;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      content: '';
      width: 70px;
      height: 0;
      border-top: 2px solid #c9d9dc;
    }
    &:hover {
      border-color: $--background-hover;
    }
  }
  .dashed {
    &::after {
      border-top: 2px dashed #c9d9dc;
    }
  }
  .dotted {
    &::after {
      border-top: 2px dotted #c9d9dc;
    }
  }
  .none {
    &::after {
      content: 'x';
      font-size: 18px;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      border-top: none;
      color: #ccc;
    }
  }
  .active {
    border-color: $--background-selected;
    &::after {
      border-top-color: $--background-selected;
      color: $--font-color-selected;
    }
  }
}
</style>
