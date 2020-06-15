<template>
  <div class="trigger__section">
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
      <p class="setting-block--title">播放设置</p>
      <switch-area
        :model="model.dataModel"
        :event-name="'changeAutoplay'"
        :model-data="model.dataModel"
        :name="'autoplay'"
      >
        <span class="setting-attribute--title">自动播放</span>
      </switch-area>
      <play-slide
        :model="model.dataModel"
        class="row-top__dis"
        :event-name="'onDataChange'"
        :model-data="model.dataModel"
        :name="'duration'"
        :action-key="'changeDuration'"
        :value-range="fontRange.carouselshowDuration"
      >
        <span class="setting-attribute--title">播放速度</span>
      </play-slide>
      <play-slide
        v-show="model.dataModel.autoplay"
        :model="model.dataModel"
        class="row-top__dis"
        :event-name="'onDataChange'"
        :model-data="model.dataModel"
        :name="'delay'"
        :action-key="'changeDelay'"
        :value-range="fontRange.carouselshowDuration"
      >
        <span class="setting-attribute--title">播放间隔</span>
      </play-slide>
    </div>
  </div>
</template>
<script>
import EffectSwitch from '@comp/form/form-select-data'
import SwitchArea from '@comp/form/form-switch-data'
import PlaySlide from '@comp/form/form-slider-data'
export default {
  components: {
    EffectSwitch,
    SwitchArea,
    PlaySlide
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
