<template>
  <div class="data-section">
    <div class="setting-block__section">
      <div class="setting-area__title setting-block--title">文字设置</div>
      <div class="input_wrap">
        <text-area
          :model="model"
          :name="'AccountText'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          class="row-top__dis"
          :model="model"
          :name="'PwdText'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          class="row-top__dis"
          :model="model"
          :name="'SigninText'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          class="row-top__dis"
          :model="model"
          :name="'RegisterText'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <text-area
          class="row-top__dis"
          :model="model"
          :name="'ForgetPwdText'"
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
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.link-setting__area {
  margin-top: 24px;
}
.input_wrap {
  border-bottom: none;
}
.input_wrap /deep/ .el-input__inner {
  border-radius: 0;
  border: 1px solid transparent;
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
</style>
