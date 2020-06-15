<template>
  <text-align-group :model="model" :prefix="prefix" />
</template>
<script>
import TextAlignGroup from '@comp/contentAlign/text-align-group'

export default {
  name: 'TextAlign',
  components: {
    TextAlignGroup
  },
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
    return {
      activeName: '1'
    }
  }
}
</script>
<style lang="scss" scoped>
.stpanel-parcel {
  padding: 16px 25px 0;
  .align {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-input__inner {
    min-width: 40px;
  }
}
</style>

