<template>
  <div class="shadow-content">
    <div class="shadow-size">
      <shadow-size
        :model="model"
        :prefix="prefix"
        :value-range="valueRange[controlName + 'sw']"
        @onCssChange="onCssChange"
      />
    </div>
    <div class="shadow-blur padbot16">
      <shadow-blur
        :model="model"
        :prefix="prefix"
        :name="'shadowBlur'"
        :value-range="valueRange[controlName + 'sb']"
        @onCssChange="onCssChange"
      >
        <span class="form-title__area">模糊</span>
      </shadow-blur>
    </div>
    <div class="shadow-color">
      <shadow-radius
        :model="model"
        :prefix="prefix"
        @onCssChange="onCssChange"
      />
    </div>
  </div>
</template>

<script>
import ShadowBlur from '@comp/form/form-slider-css'
import ShadowSize from './shadow-size'
import ShadowRadius from './shadow-radius'
export default {
  components: {
    ShadowBlur,
    ShadowSize,
    ShadowRadius
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    valueRange: {
      type: Object
    },
    controlName: {
      type: String
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
