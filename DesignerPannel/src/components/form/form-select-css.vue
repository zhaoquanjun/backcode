<template>
  <div class="form-select__section">
    <slot></slot>
    <el-select
      v-model="selectValue"
      placeholder="请选择"
      :style="{width: widthValue + 'px'}"
      size="small"
    >
      <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span v-if="item.value == defaultSelect" class="select-font__icon"></span>
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
      type: String
    },
    name: {
      type: String
    },
    widthValue: {
      type: Number,
      default: () => {
        return 150
      }
    },
    optionList: {
      type: Array,
      default: () => {
        return [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' }
        ]
      }
    },
    defaultSelect: {
      type: String
    }
  },
  computed: {
    selectValue: {
      get: function() {
        return this.model[this.prefix + this.name]
      },
      set: function() {}
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
.form-select__section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
