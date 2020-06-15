<template>
  <div class="form-select__section">
    <slot></slot>
    <el-select
      v-model="selectValue"
      placeholder="请选择"
      size="small"
    >
      <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.value }}</span>
        <span style="float: right;">{{ item.label }}</span>
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

    actionKey: {
      type: String
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
    }
  },
  computed: {
    selectValue: {
      get: function() {
        return this.model[this.name]
      },
      set: function(newVal) {
        const oldVal = this.model[this.name]
        if (newVal !== oldVal) {
          const oldData = {}
          const data = {}
          oldData[this.name] = oldVal
          data[this.name] = newVal
          this.model[this.name] = newVal
          this.onDataChange(this.actionKey, oldData, data)
        }
      }
    }
  },
  onDataChange(action, oldData, data) {
    if (window.smSite) {
      window.smSite.onDataChange(action, oldData, data)
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
.form-select__section /deep/ .el-select {
  max-width:100%;
  width: 100%;
}
</style>
