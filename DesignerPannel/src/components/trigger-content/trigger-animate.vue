<template>
  <div class="trigger-animate__section">
    <div class="trigger-animate_select--area">
      <el-select v-model="way" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <div>
      <div class="trigger-animate_select--area section-margin__top">
        <span class="trigger-title">切换间隔</span>
        <el-slider class="trigger-slider" v-model="distance" :show-tooltip="false" size="small" />
        <el-input-number
          class="trigger-number"
          controls-position="right"
          v-model="distance"
          size="small"
        ></el-input-number>
      </div>
      <div class="trigger-animate_select--area section-margin__top">
        <span class="trigger-title">切换速度</span>
        <el-slider class="trigger-slider" v-model="speed" :show-tooltip="false" size="small" />
        <el-input-number
          class="trigger-number"
          controls-position="right"
          v-model="speed"
          size="small"
        ></el-input-number>
      </div>
    </div>
    <div class="trigger-animate_select--area section-margin__top">
      <span class="trigger-title">切换速度</span>
      <el-slider class="trigger-slider" v-model="speed" :show-tooltip="false" size="small" />
      <el-input-number
        class="trigger-number"
        controls-position="right"
        v-model="speed"
        size="small"
      ></el-input-number>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: ["2", "3", "4"],
      way: "2",
      distance: 3,
      speed: 5
    };
  }
};
</script>
<style lang="scss" scoped>
.trigger-animate__section {
  .trigger-animate_select--area /deep/ .el-select {
    width: 100%;
    max-width: 100%;
  }
  .trigger-animate_select--area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .trigger-title {
      display: inline-block;
      min-width: 60px;
      padding-right: 12px;
      font-size: 14px;
    }
    .trigger-slider {
      width: 100px;
    }
    .trigger-number {
      width: 48px;
    }
  }
  .trigger-animate_select--area /deep/ .el-input-number--small {
    &:hover {
      .el-input-number__decrease,
      .el-input-number__increase {
        display: block;
      }
    }
  }
  .section-margin__top {
    margin-top: 24px;
  }
}
</style>