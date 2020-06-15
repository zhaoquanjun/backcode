<template>
  <div class="trigger__section">
    <div class="setting-block__section" style="padding-top: 32px;">
      <switch-area :name="'descShow'" :model="model" :prefix="prefix">
        <span>是否自动轮播</span>
      </switch-area>
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title" style="padding-bottom: 24px;">操作切换方式</p>
      <trigger-way></trigger-way>
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title" style="padding-bottom: 24px;">切换动画</p>
      <trigger-animate></trigger-animate>
    </div>
  </div>
</template>
<script>
import SwitchArea from '@comp/form/form-switch';
import TriggerWay from '@comp/trigger-content/trigger-way';
import TriggerAnimate from '@comp/trigger-content/trigger-animate';
export default {
  components: {
    SwitchArea,
    TriggerWay,
    TriggerAnimate
  }
}
</script>
<style lang="scss" scoped>
.trigger__section {

}
</style>