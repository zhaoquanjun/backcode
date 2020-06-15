<template>
  <div class="pagitation-section">
    <is-pagitation-show
      :name="'isShow'"
      :prefix="'$pagination-'"
      :model="model"
    >
      <span class="setting-block--subtitle">显示分页</span>
    </is-pagitation-show>
    <template v-if="model.styleModel.cssvars['$pagination-isShow'] == 'block'">
      <div class="divider"></div>
      <page-number
        class="row-top__dis"
        :model="model.query"
        :name="'limit'"
        :event-name="'onQueryDataChange'"
        :action-key="
          model.query.filters[0]['value'].length <= 0
            ? 'changePageNumberLimit'
            : 'changeListData'
        "
        :value-range="fontRange.newslistpn"
        @onQueryDataChange="onQueryDataChange"
      >
        <span
          class="setting-attribute--title"
          style="min-width: 70px;"
        >每页显示</span>
      </page-number>
      <default-bg
        v-show="type === 'pc'"
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$pagination-'"
        :name="'bgColor'"
      >
        <span
          class="setting-attribute--title"
          style="min-width: 70px;"
        >默认背景</span>
      </default-bg>
      <default-ft
        v-show="type === 'pc'"
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$pagination-'"
        :name="'ftColor'"
      >
        <span
          class="setting-attribute--title"
          style="min-width: 70px;"
        >默认文字</span>
      </default-ft>
      <select-bg
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$pagination-'"
        :name="'active_bgColor'"
      >
        <span
          class="setting-attribute--title"
          style="min-width: 70px;"
        >选中背景</span>
      </select-bg>
      <select-ft
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$pagination-'"
        :name="'active_ftColor'"
      >
        <span
          class="setting-attribute--title"
          style="min-width: 70px;"
        >选中文字</span>
      </select-ft>
      <div class="divider"></div>

      <text-align-group
        v-show="type === 'pc'"
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$pagination-'"
      ></text-align-group>

      <div v-show="type !== 'pc'">
        <div
          class="flex-start-center--area setting-block--subtitle row-top__dis"
        >
          <span style="margin-right: 8px;">分页名称</span>
          <el-tooltip
            class="item"
            effect="dark"
            content="设置移动端分页名称"
            placement="top"
          >
            <i class="iconfont iconicon-exclamationmark"></i>
          </el-tooltip>
        </div>
        <mobile-pagination-name
          class="form-row-top"
          :model="model.dataModel"
          :name="'paginationName'"
          :length-limit="20"
        ></mobile-pagination-name>
      </div>
    </template>
  </div>
</template>
<script>
import PageNumber from '@comp/form/form-slider-data'
import IsPagitationShow from '@comp/form/form-switch'
import TextAlignGroup from '@comp/contentAlign/text-align-group'
import DefaultBg from '@comp/commonColor/color'
import SelectBg from '@comp/commonColor/color'
import DefaultFt from '@comp/commonColor/color'
import selectFt from '@comp/commonColor/color'
import MobilePaginationName from '@comp/data/text'
export default {
  components: {
    PageNumber,
    IsPagitationShow,
    TextAlignGroup,
    DefaultBg,
    SelectBg,
    DefaultFt,
    selectFt,
    MobilePaginationName
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: 'pc'
    }
  },
  created() {
    if (window.smSite) {
      this.type = window.smSite.getCurrentEquipmentType()
    }
    this._getCurrentEquipmentType()
  },
  methods: {
    onQueryDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onQueryDataChange(action, oldData, data)
      }
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    _getCurrentEquipmentType() {
      const _this = this
      if (window.smSite) {
        window.smSite.setEquipmentType = function(c) {
          _this.type = c && c
        }
      }
    }
  }
}
</script>
