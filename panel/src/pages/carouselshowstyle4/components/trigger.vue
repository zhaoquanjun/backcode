<template>
  <div class="trigger__section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title" style="padding-bottom: 24px;">切换动画</p>
      <selected-trigger-way :model="model" :name="'animate'" :action-key="'changeAnimate'" :option-list="options" @onDataChange="onDataChange">
        <span class="setting-attribute--title">切换动画</span>
      </selected-trigger-way>
    </div>
  </div>
</template>
<script>
import SelectedTriggerWay from '@comp/form/form-select-data'
export default {
  components: {
    SelectedTriggerWay
  },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      options: [
        { label: '淡化', value: 'fade' },
        { label: '向左滑动', value: 'slide' },
        { label: '剪辑效果', value: 'clip' }
      ]
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
