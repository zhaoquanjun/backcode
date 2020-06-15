<template>
  <div class="popup-content__area">
    <p class="popup-content__title">请填写邮件地址</p>
    <el-input
      v-model="email"
      type="email"
      size="small"
      placeholder="如：xxx@clouddream.net"
      @input="_handleInputChange"
      @blur="_handleInputBlur"
    ></el-input>
    <p
      class="error-tips"
      :style="{ visibility: !isLinkEmail ? 'visible' : 'hidden' }"
    >
      <span></span>请输入正确的邮箱地址
    </p>
    <target
      style="padding-left: 0;"
      :target="target"
      @handleChangeLinkTarget="handleChangeLinkTarget"
    ></target>
  </div>
</template>

<script>
import Target from './target'
export default {
  components: {
    Target
  },
  props: {
    model: {
      type: Object
    },
    way: {
      type: String
    },
    curType: {
      type: String
    }
  },
  data() {
    return {
      email: '',
      isLinkEmail: true
    }
  },
  compted: {
    selectedUrl: {
      get: function() {
        return this.curType === 'email' ? this.model['Href'].slice(7) : ''
      },
      set: function() {}
    }
  },
  mounted() {
    this.email = this.curType === 'email' ? this.model['Href'].slice(7) : ''
  },
  methods: {
    _handleInputChange(val) {
      this.email = val
      this.$emit('handleChangeUrl', {
        url: 'mailto:' + this.email,
        title: this.email,
        cType: 'email',
        id: '',
        categoryId: null
      })
    },
    _handleInputBlur() {
      const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
      if (reg.test(this.email)) {
        this.isLinkEmail = true
      } else {
        this.isLinkEmail = false
      }
      this.$emit('handleChangeUrl', {
        url: 'mailto:' + this.email,
        title: this.email,
        cType: 'email',
        categoryId: null,
        id: ''
      })
    },
    handleChangeLinkTarget(val) {
      this.$emit('handleChangeTarget', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-content__area {
  min-height: 320px;
  border-left: 1px solid $--popup-border-color;
  .popup-content__title {
    font-size: $--font-size-normal;
    color: $--popup-font-color-main;
    line-height: 17px;
    padding: 20px 24px 16px;
    cursor: auto;
  }
  .error-tips {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 24px;
    padding-top: 8px;
    padding-bottom: 140px;
    font-size: 12px;
    line-height: 17px;
    visibility: hidden;
    color: $--usual-font-color-auxiliary;
    span {
      margin-right: 8px;
      display: block;
      width: 12px;
      height: 12px;
      background: url('~@static/images/link/error_tips.png') no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
}
.popup-content__area /deep/ .el-input__inner {
  margin-left: 24px;
  margin-right: 24px;
  width: 522px;
  height: 32px;
  line-height: 32px;
  padding-left: 16px;
  border-radius: 0;
  text-align: left;
  color: $--popup-font-color-main;
  background: $--usual-font-color-main;
  border: $--popup-border-main;
}
</style>
