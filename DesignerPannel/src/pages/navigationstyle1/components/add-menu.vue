<template>
  <div class="add-menu">
    <div class="add-menu-title">
      <span>添加导航</span>
      <span @click="handlerCancel">
        <i class="iconfont iconguanbi"></i>
      </span>
    </div>
    <div class="menu-item">
      <div class="item-title">导航名称</div>
      <el-input
        v-model="ruleForm.name"
        show-word-limit
        :maxlength="20"
      ></el-input>
    </div>
    <div class="menu-item">
      <div class="item-title">上级导航</div>
      <el-select
        v-model="ruleForm.parentId"
        placeholder="请选择"
        :clearable="true"
        @change="change"
        @clear="handlerSelected"
      >
        <el-option
          v-for="item in list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="menu-item">
      <div class="item-title">导航链接</div>
      <link-area ref="_linkArea" :model="linkAreaConfig"></link-area>
    </div>
    <!-- <div class="menu-item icon-set">
            <span>图标设置</span>
            <i class="iconfont iconicon-add"></i>
        </div>-->
    <div class="menu-item icon-set">
      <div>图标设置</div>
      <div class="icon-container">
        <div v-show="icon" class="icon-show" @click="_handleAddButtonIcon">
          <i class="iconfont" :class="icon" :style="{ color: color }"></i>
        </div>
        <div
          v-show="!icon"
          class="iconfont iconicon-add"
          @click="_handleAddButtonIcon"
        ></div>
        <div v-show="icon" class="minus-icon" @click="_handleMinusButtonIcon">
          -
        </div>
      </div>
    </div>
    <icon
      :icon="icon"
      :icon-popup-flag="iconPopupFlag"
      @_handleClosePopup="_handleClosePopup"
      @_handleChooseIcon="_handleChooseIcon"
    />
    <footer class="menu-footer">
      <button class="cancel" @click="handlerCancel">取消</button>
      <button class="confirm" @click="handlerConfirm">确定</button>
    </footer>
  </div>
</template>
<script>
import linkArea from '@comp/link/index'
import Icon from '@comp/iconSelect/icon'
export default {
  components: {
    linkArea,
    Icon
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    model: {
      type: Object
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      linkAreaConfig: {
        Href: 'javascript:;',
        Target: '_self',
        Type: 'none',
        Title: '设置链接1',
        PageIndex: '1'
      },
      ruleForm: {
        name: '',
        parentId: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }
        ]
      },
      color: '#000',
      iconPopupFlag: false
    }
  },
  computed: {
    icon: {
      get: function() {
        return this.value['Icon']
      },
      set: function() {}
    }
  },
  methods: {
    _handleAddButtonIcon() {
      this.iconPopupFlag = true
    },
    _handleMinusButtonIcon() {
      const oldVal = this.value['Icon']
      this.value['Icon'] = ''
      const oldData = {}
      const data = {}
      oldData['Icon'] = oldVal
      data['Icon'] = ''
      this.onDataChange(null, oldData, data)
    },
    _handleClosePopup() {
      this.iconPopupFlag = false
    },
    handlerSelected() {
      this.parentId = 0
    },
    _handleChooseIcon(val) {
      const oldVal = this.value['Icon']
      if (val !== oldVal) {
        this.value['Icon'] = val
        const oldData = {}
        const data = {}
        oldData['Icon'] = oldVal
        data['Icon'] = val
        // this.onDataChange(null, oldData, data);
        this.iconPopupFlag = false
      }
    },
    handlerConfirm() {
      const newMenuItem = {
        Id: parseInt(this.ruleForm.parentId) + 1,
        ParentId: this.ruleForm.parentId,
        Icon: '',
        Name: this.ruleForm.name,
        MenuUrl: this.linkAreaConfig.Href
      }
      this.model.navList.push(newMenuItem)
    },
    handlerCancel() {},
    change() {}
  }
}
</script>
<style scoped>
.menu-item /deep/ .el-select,
.menu-item /deep/ .link-section__show {
  max-width: 100%;
  width: 100%;
}

</style>
<style lang="scss" scoped>
.add-menu {
  display: none;
  position: fixed;
  width: 287px;
  left: 333px;
  top: 100px;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
  font-size: 14px;
  .add-menu-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
  }
  .menu-item {
    padding-top: 16px;
    .item-title {
      padding: 8px 0;
    }
  }
  .icon-set {
    display: flex;
    justify-content: space-between;
    padding: 24px 0;
    .iconicon-add {
      background: rgba(9, 213, 245, 0.3);
      font-size: 12px;
      padding: 5px;
      color: rgba(9, 213, 245, 1);
    }
  }
}
.menu-footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding-top: 16px;
  text-align: right;
  button {
    width: 70px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(9, 204, 235, 1);
    margin: 0 5px;
    color: rgba(9, 204, 235, 1);
  }
  .confirm {
    background: rgba(9, 204, 235, 1);
    color: #fff;
  }
}
</style>
