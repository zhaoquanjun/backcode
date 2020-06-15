<template>
  <div class="setting-block__section">
    <p class="setting-block--title">文字内容</p>
    <div class="link-select__area">
      <el-input v-model="datePrefix" maxlength="30">
      </el-input>
    </div>
    <p class="setting-block--title row-top__dis">时间格式</p>
    <div class="link-select__area">
      <el-select v-model="dateStyle" placeholder="请选择" style="width: 100%;">
        <el-option
          v-for="item in dateSelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: '1',
      dateSelectList: [
        { value: 'MM-DD', label: 'MM-DD' },
        { value: 'MM月DD日', label: 'MM月DD日' },
        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        { value: 'YYYY年MM月DD日', label: 'YYYY年MM月DD日' },
        { value: 'MM-DD hh:mm', label: 'MM-DD hh:mm' },
        { value: 'MM月DD日 hh:mm', label: 'MM月DD日 hh:mm' },
        { value: 'YYYY-MM-dd hh:mm', label: 'YYYY-MM-dd hh:mm' },
        { value: 'YYYY年MM月DD日 hh:mm', label: 'YYYY年MM月DD日 hh:mm' }
      ],
      timer: null
    }
  },
  computed: {
    dateStyle: {
      get: function() {
        return this.model['dateStyle']
      },
      set: function(val) {
        const oldVal = this.model['dateStyle']
        this.model['dateStyle'] = val
        if (val != oldVal) {
          const oldData = {}; const data = {}
          oldData['dateStyle'] = this.model['dateStyle']
          data['dateStyle'] = val
          this.onDataChange('changeDateStyle', oldData, data)
        }
      }
    },
    datePrefix: {
      get: function() {
        return this.model['datePrefix']
      }, set: function(val) {
        const oldVal = this.model['datePrefix']
        this.model['datePrefix'] = val
        if (val != oldVal) {
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            const oldData = {}; const data = {}
            oldData['datePrefix'] = this.model['datePrefix']
            data['datePrefix'] = val
            this.onDataChange('changeDatePrefix', oldData, data)
          }, 500)
        }
      }
    }
  },

  methods: {

    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    changePrefix(val) {

    }
  }
}
</script>

<style lang="scss" scoped>
.text-font__area {
  padding: 16px 0 24px;
  margin-bottom: 16px;
  p {
    font-size: 14px;
    padding: 0 24px 24px;
  }
}

    .news-detail-link {
        margin-top: 16px;
        padding: 16px 24px 24px;
        h3

    {
        font-weight: 400;
        padding-bottom: 16px;
        font-size: 14px;
        line-height: 20px;
        padding-top: 16px;
    }

    .link-select__area /deep/ .el-input--mini .el-input__inner {
        font-size: 14px;
    }

    .divider {
        margin-top: 16px;
        border-top: 1px dotted #C9D9DC;
    }

    .page-open__way {
        padding-top: 16px;
        p

    {
        font-size: 14px;
        line-height: 17px;
    }

    .way-choose__area {
        padding-top: 16px;
    }

        .way-choose__area /deep/ .el-radio {
            width: 100%;
            padding-bottom: 10px;
        }

        .way-choose__area /deep/ .el-radio__label {
            font-size: 14px;
        }

    }
    }

    .news-detail-link /deep/ .el-select--mini {
        width: 100%;
        max-width: 100%;
    }
</style>
