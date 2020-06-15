<template>
  <div class="font-section">
    <font-style4
      :model="model"
      :prefix="prefix"
      :font-range="fontRange"
    ></font-style4>
    <div class="divider"></div>
    <div class="setting-block--subtitle row-top__dis">背景</div>
    <background :model="model" :prefix="prefix" />
  </div>
</template>
<script>
import Background from '@comp/background/background'
import FontStyle4 from '@comp/font/font-group/font-style4'
export default {
  name: 'Font',
  components: {
    Background,
    FontStyle4
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object
    }
  },

  provide: {
    isNavgation: true
  },
  data() {
    return {
      activeName: '1'
    }
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-section {
  .font-setting__area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
  }
  .row-pad__top {
    margin-top: 16px;
  }
  .font-style {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #b9cbcf;
    border-radius: 4px;
    background: #fff;
    li {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 4px;
      &::after {
        position: absolute;
        display: block;
        content: '';
        width: 1px;
        height: 14px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #eee;
      }
    }
  }
  .divider {
    margin-top: 16px;
    height: 1px;
    width: 100%;
    border-top: 1px dashed #c9d9dc;
  }
}
.componet-title {
  padding: 0px 24px;
}
</style>
