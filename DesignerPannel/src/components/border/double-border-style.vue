<template>
  <div class="flex-start-center--area">
    <slot class="setting-attribute--title"></slot>
    <ul class="doubleborder-list flex-start-center--area">
      <li
        v-for="(item, index) in liners"
        :key="index"
        :class="{ active: bdWidth == item.secondary }"
        @click="changeBorderStyle(item)"
      >
        <div class="innerline">
          <span></span>
        </div>
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
      type: String,
      default: '$'
    },
    prefix2: {
      type: String,
      default: '$2'
    }
  },
  data() {
    return {
      liners: [
        {
          primary: 1,
          secondary: 2
        },
        {
          primary: 1,
          secondary: 3
        },
        {
          primary: 2,
          secondary: 4
        }
      ]
    }
  },
  computed: {
    bdWidth: {
      get: function() {
        return parseInt(this.model[this.prefix2 + 'bdWidth'])
      },
      set: function() {}
    }
  },
  methods: {
    changeBorderStyle(newVal) {
      const oldValue = this.model[this.prefix + 'bdWidth']
      const oldValue2 = this.model[this.prefix2 + 'bdWidth']

      if (oldValue2 !== newVal.secondary + 'px') {
        const data = {}
        const oldData = {}
        this.model[this.prefix + 'bdWidth'] = newVal.primary + 'px'
        this.model[this.prefix2 + 'bdWidth'] = newVal.secondary + 'px'

        data[this.prefix + 'bdWidth'] = newVal.primary + 'px'
        data[this.prefix2 + 'bdWidth'] = newVal.secondary + 'px'

        oldData[this.prefix + 'bdWidth'] = oldValue
        oldData[this.prefix2 + 'bdWidth'] = oldValue2

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
.doubleborder-list {
  li {
    width: 50px;
    height: 40px;
    border: 1px solid #d7d8d9;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    li {
        width: 56px;
        height: 40px;
        border: 1px solid #D7D8D9;
        border-radius: 2px;
        display: flex;
        align-items: center;
        padding: 0 10px;

        &.active{
            border-color:rgba(255, 106, 0, 1)
        }
        .innerline {
            border-bottom: 1px solid #000;
            height: 0;
            width: 100%;
            position: relative;
            span{
                 position: absolute;
                 display: inline-block;
                 top: -1px;
                 width: 10px;
                 height: 2px;
                 background: #ff6a00;
            }
        }
    }
    .innerline {
      border-bottom: 1px solid #000;
      height: 0;
      width: 100%;
      position: relative;
      span {
        position: absolute;
        display: inline-block;
        top: -1px;
        width: 10px;
        height: 2px;
        background: #ff6b00;
      }
    }
  }
  li:nth-child(2) {
    span {
      height: 3px;
      top: -2px;
    }
  }
  li:nth-child(3) {
    .innerline {
      border-bottom-width: 2px;
    }
    span {
      height: 4px;
      top: -2px;
    }
  }
  li + li {
    margin-left: 12px;
  }
}
</style>
