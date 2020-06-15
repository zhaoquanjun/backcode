<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >导航栏</span>
      </template>
      <div>
        <div class="collapse-content-title">背景</div>
        <background :model="model.styleModel.cssvars" prefix="$l1-" />
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >吸顶设置</span>
      </template>
      <location-mode :model="model.styleModel.cssvars" prefix="$"> <span class="setting-attribute--title">开启吸顶</span></location-mode>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '3'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >栏目一</span>
      </template>
      <div class="space">
        <div class="collapse-content-title">对齐方式</div>
        <text-align-group :model="model.styleModel.cssvars" :prefix="'$l1-'" />
      </div>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          v-show="activeNames !== '4'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >栏目二</span>
      </template>
      <div class="space">
        <div class="collapse-content-title">对齐方式</div>
        <text-align-group :model="model.styleModel.cssvars" :prefix="'$l2-'" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TextAlignGroup from '@comp/contentAlign/text-align-group'
import Background from '@comp/background/background'
import LocationMode from '@/pages/navcontainerstyle1/components/location-mode'
export default {
  components: {
    TextAlignGroup,
    Background,
    LocationMode
  },
  props: {
    model: {
      type: Object
    },
    modelData: {
      type: Array
    }
  },
  data() {
    return {
      activeNames: '1'
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
    },
    columnNum: {
      get: function() {
        var num = this.model.selectedAreaId
          ? this._formatNumber(
              this.model.selectedAreaId.slice(
                this.model.selectedAreaId.length - 1
              )
            )
          : '一'
        return num
      }
    }
  },
  methods: {
    _formatNumber(i) {
      switch (i) {
        case '1':
          return '一'
          break
        case '2':
          return '二'
          break
        case '3':
          return '三'
          break
        case '4':
          return '四'
          break
        case '5':
          return '五'
          break
        case '6':
          return '六'
          break
      }
    }
  }
}
</script>
