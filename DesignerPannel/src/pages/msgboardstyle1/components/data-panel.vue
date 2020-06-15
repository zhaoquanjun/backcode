<template>
  <el-collapse v-model="activeNames"
               :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '1' }">输入框内容</span>
      </template>
      <!-- <el-radio-group v-model="radio" style="width:100%" @change="radioChange">
        <div style="display:flex;justify-content: space-between;">
          <el-radio :label="'email'">联系邮箱</el-radio>
          <el-radio :label="'phone'">联系电话</el-radio>
        </div>
      </el-radio-group> 
      <div class="divider"></div>-->
      <text-area :model="model.dataModel"
                 label=""
                 :name="'Content'"
                 :length-limit="30"
                 :is-show-word-limit="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '2' }">按钮内容</span>
      </template>
      <text-area :model="model.dataModel"
                 label=""
                 :name="'SubmitBtn'"
                 :length-limit="30"
                 :is-show-word-limit="false" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TextArea from '@comp/data/text'
import SwitchArea from '@comp/form/form-switch'
export default {
  components: {
    TextArea,
    SwitchArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data () {
    return {
      activeNames: '1',
      radio: 'email'
    }
  },
  watch: {
    model () {
      console.log(this.model)
      console.log(this.model.styleModel)
      console.log(this.model.styleModel.cssvars)
      console.log(
        this.model.styleModel.cssvars[this.prefix + 'input-phone_label'],
        '------'
      )
      this.radio =
        this.model.styleModel.cssvars[this.prefix + 'input-phone_label'] ===
          'block'
          ? 'phone'
          : 'email'
    }
  },
  mounted () {},
  methods: {
    radioChange (val) {
      console.log(this.model)
      const oldData = {}
      const data = {}
      if(val === 'phone') {
        const oldValue = this.model.styleModel.cssvars[
          this.prefix + 'input-phone_label'
        ]
        this.model.styleModel.cssvars[this.prefix + 'input-phone_label'] =
          'block'
        data[this.prefix + 'input-phone_label'] = 'block'
        oldData[this.prefix + 'input-phone_label'] = oldValue
        data[this.prefix + 'input-email_label'] = 'none'
        oldData[this.prefix + 'input-email_label'] = 'none'
      } else {
        const oldValue = this.model.styleModel.cssvars[
          this.prefix + 'input-email_label'
        ]
        this.model.styleModel.cssvars[this.prefix + 'input-email_label'] =
          'block'
        this.model.styleModel.cssvars[this.prefix + 'input-phone_label'] =
          'none'
        data[this.prefix + 'input-email_label'] = 'block'
        oldData[this.prefix + 'input-email_label'] = oldValue
        data[this.prefix + 'input-phone_label'] = 'none'
        oldData[this.prefix + 'input-phone_label'] = 'none'
      }
      this.onCssChange(oldData,data)
    },
    onCssChange (oldData,data) {
      if(window.smSite) {
        window.smSite.onCssChange(oldData,data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.link-setting__area {
  margin-top: 24px;
}
.input_wrap {
  // border: 1px solid #b9cbcf;
  border-bottom: none;
}
.input_wrap /deep/ .el-input__inner {
  border-radius: 0;
  border: none;
  // border-bottom: 1px solid #b9cbcf;
}
.input_wrap /deep/ .el-input__inner:hover,
.input_wrap /deep/ .el-input__inner:focus {
  border: none !important;
  // border-bottom: 1px solid #b9cbcf !important;
}
</style>
