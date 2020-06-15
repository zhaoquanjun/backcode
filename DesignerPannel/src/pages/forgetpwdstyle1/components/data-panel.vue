<template>
  <div class="data-section">
    <div class="setting-block__section">
      <div class="setting-block--title">页面标题</div>
      <text-area
        class="row-top__dis"
        :model="model"
        :name="'PageTitleText'"
        :length-limit="10"
        :is-show-word-limit="true"
      />
      <div class="setting-block--subtitle row-top__dis">找回密码步骤</div>
      <ul class="content-tab">
        <li
          v-for="(it, index) in styleTabList"
          :key="index"
          class="tab-item"
          :class="{ active: curStyleIndex == index }"
          @click="_handleChangeStyleTab(index)"
        >
          {{ it }}
        </li>
      </ul>
      <div v-show="curStyleIndex === 0">
        <div class="setting-area__title setting-block--title">标题</div>
        <text-area
          :model="model"
          :name="'TitleText1'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <div class="divider"></div>
        <div class="setting-area__title setting-block--title">提示</div>
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
            :name="'SmsCodeText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
          <text-area
            class="row-top__dis"
            :model="model"
            :name="'SendSmsText'"
            :length-limit="5"
            :is-show-word-limit="true"
          />
          <text-area
            class="row-top__dis"
            :model="model"
            :name="'NextStepText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
          <text-area
            class="row-top__dis"
            :model="model"
            :name="'BackLoginText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
        </div>
      </div>
      <div v-show="curStyleIndex === 1">
        <div class="setting-area__title setting-block--title">标题</div>
        <text-area
          :model="model"
          :name="'TitleText2'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <div class="divider"></div>
        <div class="setting-area__title setting-block--title">提示</div>
        <div class="input_wrap">
          <text-area
            :model="model"
            :name="'TitleText2'"
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
            :name="'ConfirmPwdText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
          <text-area
            class="row-top__dis"
            :model="model"
            :name="'ResetPwdText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
        </div>
      </div>
      <div v-show="curStyleIndex === 2">
        <div class="setting-area__title setting-block--title">标题</div>
        <text-area
          :model="model"
          :name="'TitleText3'"
          :length-limit="10"
          :is-show-word-limit="true"
        />
        <div class="divider"></div>
        <div class="setting-area__title setting-block--title">提示</div>
        <div class="input_wrap">
          <text-area
            :model="model"
            :name="'ResetSuccessText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
          <text-area
            class="row-top__dis"
            :model="model"
            :name="'LoginNowText'"
            :length-limit="10"
            :is-show-word-limit="true"
          />
        </div>
      </div>
      <div class="divider"></div>
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
    return {
      styleTabList: ['第1步', '第2步', '第3步']
    }
  },
  computed: {
    curStyleIndex() {
      return this.model['Step']
    }
  },
  methods: {
    _handleChangeStyleTab(i) {
      const oldData = {}
      const data = {}
      oldData['Step'] = this.model['Step']
      this.model['Step'] = i
      data['Step'] = i
      this.onDataChange('changeStep', oldData, data)
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
.link-setting__area {
  margin-top: 24px;
}
.input_wrap {
  border-bottom: none;
}

.data-section /deep/ .el-input .el-input__suffix {
  .el-input__suffix-inner {
    .el-input__count {
      .el-input__count-inner {
        background-color: $--panel-background-color;
      }
    }
  }
}

.input_wrap /deep/ .el-input__inner {
  border-radius: 0;
  border: 1px solid transparent;
}

.input_wrap /deep/ .el-input__inner:hover {
  border: 1px solid $--font-color-hover;
}

.input_wrap /deep/ .el-input__inner:focus {
  border: 1px solid $--font-color-selected;
}

.data-section /deep/ .content-tab {
  padding: 0 !important;
  border-right: none;
  padding-bottom: 0 !important;
  margin-bottom: 24px;
}
.data-section .divider {
  margin: 16px 0;
}
</style>
