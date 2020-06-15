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
      <template v-show="model.dataModel.autoplay !== false">
        <change-interval
          class="row-top__dis"
          :model="model.dataModel"
          :name="'autoplayDelay'"
          :value-range="fontRange.carouselAutoplayDelay"
          :event-name="'onDataChange'"
          :action-key="'changeAutoplayDelay'"
        >
          <span class="setting-attribute--title" style="min-width: 70px;">切换间隔</span
          >
        </change-interval>
      </template>
    </div>
  </div>
</template>

<script>
import EffectSwitch from '@comp/form/form-select-data'
import SwitchArea from '@comp/form/form-switch-data'
import changeInterval from '@comp/form/form-slider-data'
export default {
  components: {
    EffectSwitch,
    SwitchArea,
    changeInterval
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
