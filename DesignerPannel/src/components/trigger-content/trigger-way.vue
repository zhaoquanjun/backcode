<template>
  <div class="trigger-way__section">
    <div class="select-way__area">
      <el-radio v-model="triggerWay" label="1">鼠标悬停</el-radio>
    </div>
    <div class="select-way__area">
      <el-radio v-model="triggerWay" label="2">鼠标点击</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      triggerWay: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.trigger-way__section {
  .select-way__area {
    margin-bottom: 16px;
  }
}
</style>