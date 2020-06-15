<template>
  <div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">比例设置</p>
      <customize
        :customize="model.data.dataModel.childArea"
        @onDataChange="onDataChange"
      />
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">栏目设置</p>
      <set-columns-pos
        :model="model.data"
        @onDataChange="onDataChange"
      ></set-columns-pos>
    </div>
  </div>
</template>

<script>
import Customize from '@comp/layout/customize'
import SetColumnsPos from '@comp/layout/set-columns-pos'
export default {
  components: {
    Customize,
    SetColumnsPos
  },
  props: {
    model: {
      type: Object
    },
    customize: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: ['1', '2']
    }
  },
  computed: {
    prefix: {
      get: function() {
        var fix = this.model.selectedAreaId
          ? '$l' +
            this.model.selectedAreaId.slice(
              this.model.selectedAreaId.length - 1
            ) +
            '-'
          : '$l1-'
        return fix
      },
      set: function() {}
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite.onDataChange) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
