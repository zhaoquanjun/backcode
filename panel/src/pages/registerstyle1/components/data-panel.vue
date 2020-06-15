<template>
  <div class="data-section">
    <div class="setting-block__section">
      <div class="setting-area__title setting-block--title">文字设置</div>
      <div class="input_wrap">
        <text-area
          :model="model"
          :name="'AccountText'"
          :label="''"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          :model="model"
          :name="'SmsCodeText'"
          :label="''"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          :model="model"
          :name="'SendSmsText'"
          :label="''"
          :length-limit="5"
          :is-show-word-limit="true"
        />
        <text-area
          :model="model"
          :name="'PwdText'"
          :label="''"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          :model="model"
          :name="'ConfirmPwdText'"
          :label="''"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          :model="model"
          :name="'RegisterText'"
          :label="''"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          :model="model"
          :name="'SigninText'"
          :label="''"
          :length-limit="10"
          :is-show-word-limit="true"
        />
      </div>
    </div>
    <div class="setting-block__top setting-block__section">
      <div class="setting-area__title setting-block--title">默认区号</div>
      <form-select
        :model="model"
        :option-list="model.countryCode"
        name="SelectValue"
        :action-key="'changeCode'"
      />
    </div>
  </div>
</template>

<script>
import TextArea from '@comp/data/text'
import FormSelect from '@comp/form/form-select-defined'
export default {
  components: {
    TextArea,
    FormSelect
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.text-setting__section {
  padding-bottom: 8px;
}

.input_wrap {
  border-bottom: none;
}
.input_wrap /deep/ .el-input__inner {
  border-radius: 0;
  border: 1px solid $--usual-border-color;
}

.input_wrap /deep/ .el-input .el-input__suffix {
  .el-input__suffix-inner {
    .el-input__count {
      .el-input__count-inner {
        background-color: $--panel-background-color;
      }
    }
  }
}

.input_wrap /deep/ .el-input__inner:hover {
  border: 1px solid $--font-color-hover;
}

.input_wrap /deep/ .el-input__inner:focus {
  border: 1px solid $--font-color-selected;
}

.input_wrap /deep/ .setting-block--subtitle {
  padding-bottom: 0 !important;
}
</style>
