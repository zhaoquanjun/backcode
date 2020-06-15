<template>
  <div
    class="font-family flex-between-center--area"
    :style="{ width: width + 'px' }"
  >
    <slot></slot>
    <el-select
      v-model="fontFamily"
      popper-class="m-dataselect"
      placeholder="请选择"
      class="m-textinput"
      style="width:100%; max-width: 100%"
      size="small"
    >
      <el-option
        v-for="item in family"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span v-if="item.value == themeFont" class="select-font__icon"></span>
      </el-option>
    </el-select>
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
    width: {
      type: Number,
      default: () => {
        return 150
      }
    }
  },
  data() {
    return {
      family: [
        {
          value: 'Tahoma',
          label: 'Tahoma'
        },
        {
          value: '宋体',
          label: '宋体'
        },
        {
          value: '细黑',
          label: '细黑'
        },
        {
          value: 'Microsoft YaHei',
          label: '微软雅黑'
        },
        {
          value: '楷体',
          label: '楷体'
        },
        {
          value: 'Arial',
          label: 'Arial'
        },
        {
          value: 'PingFang SC',
          label: '苹方'
        }
      ],
      themeFont: 'Arial'
    }
  },
  computed: {
    fontFamily: {
      get: function() {
        return this.model[this.prefix + 'fontFamily']
      },

      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'fontFamily']
        if (oldValue !== newVal) {
          this.model[this.prefix + 'fontFamily'] = newVal
          const data = {}
          const oldData = {}
          data[this.prefix + 'fontFamily'] = newVal
          oldData[this.prefix + 'fontFamily'] = oldValue
          this.onCssChange(oldData, data)
        }
      }
    }
  },
  mounted() {
    if (window.smSite) {
      this.themeFont = window.smSite.setPanelThemeFont()
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
.select-font__icon {
  float: right;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  background: url('~@static/images/theme_font.png') no-repeat center center;
  background-size: 100% 100%;
}
</style>
