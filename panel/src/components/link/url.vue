<template>
  <div class="popup-content__area">
    <p class="popup-content__title">请填写链接地址</p>
    <el-input
      v-model="url"
      type="url"
      size="small"
      placeholder="如：www.clouddream.net"
      @blur="_handleInputBlur"
    ></el-input>
    <p
      class="error-tips"
      :style="{ visibility: !isLinkUrl ? 'visible' : 'hidden' }"
    >
      <span></span>请输入正确的链接地址
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
      url: '',
      isLinkUrl: true
    }
  },
  computed: {
    selectedUrl: {
      get: function() {
        let url = ''
        if (this.curType === 'link') {
          const reg = /\/\//
          url = reg.test(this.model['Href'])
            ? this.model['Href'].slice(2)
            : this.model['Href']
        }
        return url
      },
      set: function() {}
    }
  },
  mounted() {
    this.url = this.selectedUrl
  },
  methods: {
    _handleInputBlur() {
      const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
      const httpReg = /^http:\/\//
      const httpsReg = /^https:\/\//
      const homeReg = /\//
      if (reg.test(this.url) || homeReg.test(this.url)) {
        this.isLinkUrl = true
        let lastUrl = ''
        if (httpReg.test(this.url) || httpsReg.test(this.url)) {
          lastUrl = this.url
        } else if (this.url !== '/') {
          lastUrl = '//' + this.url
        }
        if (this.url === '/') {
          lastUrl = this.url
        }
        this.$emit('handleChangeUrl', {
          url: lastUrl,
          title: this.url,
          cType: 'link',
          categoryId: null,
          id: ''
        })
      } else {
        this.isLinkUrl = false
      }
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
  border-left: $--popup-border-main;
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
  width: 470px;
  height: 32px;
  line-height: 40px;
  padding-left: 16px;
  border-radius: 2px;
  text-align: left;
  color: $--popup-font-color-main;
  background: $--usual-font-color-main;
  border: $--popup-border-main;
}
</style>
