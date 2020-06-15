<template>
  <div class="trigger-section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">动效切换</p>
      <effect-switch
        :model="model.dataModel"
        :name="'effect'"
        :width-value="240"
        :action-key="'changeEffect'"
        :option-list="effectList"
        :default-select="model.dataModel.effect"
      ></effect-switch>
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">自动播放</p>
      <switch-area
        :event-name="'changeAutoplay'"
        :model-data="model.dataModel"
        :name="'autoplay'"
      >
        <span class="setting-attribute--title">自动播放</span>
      </switch-area>
    </div>
  </div>
</template>

<script>
import EffectSwitch from '@comp/form/form-select-data'
import SwitchArea from '@comp/form/form-switch-data'
export default {
  components: {
    EffectSwitch,
    SwitchArea
  },
  props: {
    model: {
      type: Object
    },
    fontRange: {
      type: Object
    },
    effectList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
