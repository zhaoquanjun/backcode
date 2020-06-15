<template>
  <div>
    <div
      class="flex-between-center--area row-top__dis"
      style="margin-top:0"
    >
      <ul class="font-style">
        <li>
          <font-weight
            :prefix="'$date-'"
            :model="model.styleModel.cssvars"
          ></font-weight>
        </li>
        <li>
          <font-italic
            :prefix="'$date-'"
            :model="model.styleModel.cssvars"
          ></font-italic>
        </li>
        <li>
          <font-underline
            :prefix="'$date-'"
            :model="model.styleModel.cssvars"
          ></font-underline>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color
        :model="model.styleModel.cssvars"
        :prefix="'$date-'"
      ></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
  </div></template>
<script>
import FontColor from '@comp/font/font-color'
import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

export default {
  name: 'Font',
  components: {
    FontColor,
    FontWeight,
    FontItalic,
    FontUnderline
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
  data() {
    return {
      dateOptionList: [
        { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
        { label: 'YY-MM-DD', value: 'YY-MM-DD' },
        { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
        { label: 'MM-DD', value: 'MM-DD' },
        { label: 'MM月-DD日', value: 'MM月-DD日' }
      ]
    }
  },
  mounted() {},
  methods: {
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
.font-style {
  width: 166px !important;
  li {
    width: 27px !important;
  }
}

.font-section {
  padding: 0 24px;
  .font-setting__area {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>
