<template>
  <div class="detail-select__area flex-start-center--area">
    <span class="title">选择详情页</span>
    <ym-select-box
      v-model="detailPageId"
      :placeholder="'请选择详情页'"
      :title="'title'"
      :attr-name="'id'"
      :option-list="detailList"
      style="width: 160px"
      @change="handleChangeDetailPageId"
    ></ym-select-box>
  </div>
</template>

<script>
import YmSelectBox from '@comp/ymDefined/select'
import * as linkApi from '@api/linkApi'
export default {
  components: {
    YmSelectBox
  },
  props: {
    model: {
      type: Object
    },
    pageType: {
      type: String
    },
    pageSize: {
      type: Number
    },
    pageIndex: {
      type: Number
    }
  },
  data() {
    return {
      detailList: []
    }
  },
  computed: {
    detailPageId: {
      get: function() {
        return this.model['DetailPageId']
      },
      set: function() {}
    }
  },
  methods: {
    getPageDetailData() {
      this._getDetailPageList()
    },
    async _getDetailPageList() {
      const siteId = this.getUrlParam('siteId')
      const options = {
        siteId: siteId,
        IsDescending: true,
        OrderColumns: 'createtime',
        pageType: this.pageType,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        title: ''
      }
      const { data } = await linkApi.getPageDetail(options)
      this.detailList = data.list
    },
    handleChangeDetailPageId(newVal) {
      this.model['DetailPageId'] = newVal
      this.$emit('selectDetailPage', newVal)
    },
    getUrlParam(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg) // search,查询？后面的参数，并匹配正则
      if (r != null) {
        return unescape(r[2])
      } else {
        return null
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-select__area {
  padding: 0 24px 24px;
  .title {
    font-size: $--font-size-small;
    color: $--popup-font-color-main;
  }
  span {
    margin-right: 16px;
    display: inline-block;
    min-width: 100px;
    text-align: right;
    font-size: $--font-size-normal;
    line-height: 20px;
  }
}
.detail-select__area /deep/ .el-input__inner {
  height: 32px !important;
  color: $--popup-font-color-main;
  background-color: $--popup-background-main;
  border-color: $--popup-border-color !important;
}
</style>
