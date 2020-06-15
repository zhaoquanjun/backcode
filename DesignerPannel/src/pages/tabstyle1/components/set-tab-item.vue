<template>
  <div class="add-area__container">
    <div class="ym-button--column"
         style="margin-bottom: 16px;"
         :class="{ disabled: childArea.length == 10 }"
         @click="_handleAddNewItem">
      添加标签
    </div>
    <draggable v-model="childArea"
               tag="ul"
               :options="{
        animation: 150,
        ghostClass: '',
        dragClass: '111',
        scroll: true,
        scrollSensitivity: 200,
        handle: '.handler-move'
      }"
               @end="end">
      <li v-for="(child, index) in childArea"
          :key="index"
          class="set-pos-item"
          :class="{ selected: child.Id == currentItem }"
          @click="_handleSelectItem(child)">
        <i class="iconfont icontuodongdian handler-move"></i>
        <span class="select-icon"></span>
        <span class="item-name">{{ child.Title }}</span>
        <div class="operate-icon__container">
          <div class="operate-icon"
               @click.stop="_handleEditItem(index)">
            <i class="iconfont iconicon-dash-edit"></i>
          </div>
          <div class="operate-icon"
               @click.stop="_handleCopyItem(child, index)">
            <i class="iconfont iconicon-des-copy1"
               :class="{ disabled: childArea.length == 10 }"></i>
          </div>
          <div class="operate-icon"
               @click.stop="_handleDeleteItem(child, index)">
            <i class="iconfont iconicon-des-delete"></i>
          </div>
        </div>
      </li>
    </draggable>
    <div v-show="operateShow"
         class="add-item__section">
      <p class="add-area__header--title">{{ operateTitle }}</p>
      <div class="add-area__content">
        <p class="add-area__content--tips">标签名称</p>
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 :rules="rules">
          <el-form-item label
                        prop="title">
            <el-input v-model="ruleForm.title"
                      placeholder="请输入内容"
                      maxlength="20"
                      minlength="1"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-area__btn--group">
        <div class="ym-button--isplain"
             style="margin-right: 16px;"
             @click="_handleCancle('ruleForm')">
          取消
        </div>
        <div class="ym-button--primary"
             @click="_handleConfirm('ruleForm')">
          确定
        </div>
      </div>
      <div class="add-area__corner"></div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: {
    model: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      isFull: false,
      isAdd: false,
      prefix: '$',
      operateShow: false,
      ruleForm: {
        title: ''
      },
      operateTitle: '新增标签',
      curIndex: -1,
      rules: {
        title: [
          {required: true,message: '标签名称不能为空',trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    currentItem: {
      get: function() {
        return this.model.dataModel.selectedAreaId
          ? this.model.dataModel.selectedAreaId
          : 'content1'
      },
      set: function() {}
    },
    childArea: {
      get: function() {
        return this.model.dataModel.childArea
      },
      set: function() {}
    },
    outerWidth: {
      get: function() {
        return parseInt(this.model.styleModel.cssvars['$cwidth'])
      },
      set: function() {}
    },
    innerWidth: {
      get: function() {
        return parseInt(this.model.styleModel.cssvars['$width'])
      },
      set: function() {}
    }
  },
  watch: {
    childArea () {
      if(this.childArea.length === 10) {
        this.isFull = true
      } else {
        this.isFull = false
      }
    }
  },
  created () {
    if(window.smSite) {
      const _this = this
      window.smSite.setControlCurrentSelectedItem = function(id) {
        _this._handleSelectItem({Id: id})
      }
    }
  },
  methods: {
    onCssChange (oldData,data) {
      if(window.smSite) {
        window.smSite.onCssChange(oldData,data)
      }
    },
    onDataChange (action,oldData,data) {
      if(window.smSite.onDataChange) {
        window.smSite.onDataChange(action,oldData,data)
      }
    },
    end: function(evt) {
      const oldArea = JSON.parse(JSON.stringify(this.childArea))
      const newArea = JSON.parse(JSON.stringify(this.childArea))
      const deleteItem = newArea.splice(evt.oldIndex,1)[0]
      newArea.splice(evt.newIndex,0,deleteItem)
      this.model.dataModel.childArea = newArea
      this.onDataChange('sort',{childArea: oldArea},{childArea: newArea})
    },
    _handleSelectItem (area) {
      const oldValue = this.model.dataModel.selectedAreaId
      const oldData = {}
      const data = {}
      oldData['selectedAreaId'] = oldValue
      data['selectedAreaId'] = area.Id
      this.model.dataModel.selectedAreaId = area.Id
      if(window.smSite) {
        this.onDataChange(null,oldData,data)
        window.smSite.selectControlArea(this.model.controlId,area.Id)
      }
    },
    _handleAddNewItem () {
      if(this.isFull) return
      this.operateShow = true
      this.isAdd = true
      this.ruleForm.title = ''
      this.operateTitle = '新增标签'
    },
    _handleConfirm (formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          if(this.isAdd) {
            const len = this.childArea.length
            const oldValue = JSON.parse(JSON.stringify(this.childArea))
            const oldOuterWidthValue = this.model.styleModel.cssvars['$cwidth']
            const newItem = {
              Id: 'content' + (len + 1),
              Title: this.ruleForm.title,
              Area: 'content' + (len + 1)
            }
            const newValue = JSON.parse(JSON.stringify(this.childArea))
            newValue.push(newItem)
            const newOuterWidthValue =
              this.innerWidth * parseInt(newValue.length) +
              parseInt(newValue.length - 1) +
              'px'
            const oldData = {}
            const data = {}
            const oldCssData = {}
            const cssData = {}
            oldCssData['$cwidth'] = oldOuterWidthValue
            cssData['$cwidth'] = newOuterWidthValue
            oldData['childArea'] = oldValue
            data['childArea'] = newValue
            this.model.dataModel.childArea = newValue
            this.onCssChange(oldCssData,cssData)
            this.onDataChange('addEmptyTabItem',oldData,data)
            this._handleSelectItem(newItem)
            if(window.smSite) {
              window.smSite.message(1,'添加成功')
            }
          } else {
            const oldValue = JSON.parse(JSON.stringify(this.childArea))
            const newValue = JSON.parse(JSON.stringify(this.childArea))
            newValue[this.curIndex].Title = this.ruleForm.title
            const oldData = {}
            const data = {}
            oldData['childArea'] = oldValue
            data['childArea'] = newValue
            this.model.dataModel.childArea = newValue
            this.onDataChange('editTabItem',oldData,data)
            if(window.smSite) {
              window.smSite.message(1,'编辑成功')
            }
          }
          this.operateShow = false
        }
      })
    },
    _handleCancle (formName) {
      this.operateShow = false
      this.$refs[formName].resetFields()
    },
    _handleEditItem (index) {
      this.isAdd = false
      this.operateShow = true
      this.curIndex = index
      this.operateTitle = '编辑标签'
      this.ruleForm.title = this.childArea[this.curIndex].Title
    },
    _handleCopyItem (item,index) {
      if(this.childArea.length === 10) return
      this.curIndex = index
      const ele = document
        .getElementById('site-frame')
        .contentWindow.document.getElementById(item.Id + '_' + this.id)
      const action =
        ele.className.indexOf('sm-empty') > -1
          ? 'addEmptyTabItem'
          : 'copyTabItem'
      const oldValue = JSON.parse(JSON.stringify(this.childArea))
      const newValue = JSON.parse(JSON.stringify(this.childArea))
      const newItem = JSON.parse(JSON.stringify(this.childArea[this.curIndex]))
      const oldOuterWidthValue = this.model.styleModel.cssvars['$cwidth']
      let max = 0
      for(var i = 0; i < this.childArea.length; i++) {
        if(this.childArea[i].Title.indexOf('_') > -1) {
          var last = this.childArea[i].Title.split('_')[1]
          if(parseInt(last.slice(last.length - 1)) > max) {
            max = parseInt(last.slice(last.length - 1))
          }
          if(parseInt(last.slice(last.length - 1)) == max) {
            max = parseInt(last.slice(last.length - 1)) + 1
          }
        }
      }
      if(newItem.Title.indexOf('_') > -1) {
        newItem.Title = newItem.Title.slice(0,newItem.Title.length - 1) + max
      } else {
        newItem.Title = newItem.Title + '_copy' + max
      }
      if(newItem.Id.indexOf('_') > -1) {
        newItem.Id =
          newItem.Id.slice(0,newItem.Id.length - 1) +
          (oldValue.length + 1) +
          '_' +
          this.id
      } else {
        newItem.Id =
          newItem.Id.slice(0,newItem.Id.length - 1) + (oldValue.length + 1)
      }
      newValue.push(newItem)
      const newOuterWidthValue =
        this.innerWidth * parseInt(newValue.length) +
        parseInt(newValue.length - 1) +
        'px'
      const oldData = {}
      const data = {}
      const oldCssData = {}
      const cssData = {}
      oldCssData['$cwidth'] = oldOuterWidthValue
      cssData['$cwidth'] = newOuterWidthValue
      oldData['childArea'] = oldValue
      oldData['clickArea'] = null
      data['clickArea'] = item.Id
      data['childArea'] = newValue
      this.model.dataModel.childArea = newValue
      this.onCssChange(oldCssData,cssData)
      this.onDataChange(action,oldData,data)
      if(window.smSite) {
        window.smSite.message(1,'复制成功')
      }
    },
    _handleDeleteItem (item,index) {
      const ele = document
        .getElementById('site-frame')
        .contentWindow.document.getElementById(item.Id + '_' + this.id)
      const action =
        ele.className.indexOf('sm-empty') > -1
          ? 'removeEmptyTabItem'
          : 'removeTabItem'
      this.curIndex = index
      const oldValue = JSON.parse(JSON.stringify(this.childArea))
      const newValue = JSON.parse(JSON.stringify(this.childArea))
      const oldOuterWidthValue = this.model.styleModel.cssvars['$cwidth']
      newValue.splice(this.curIndex,1)
      const newOuterWidthValue =
        this.innerWidth * parseInt(newValue.length) +
        parseInt(newValue.length - 1) +
        'px'
      this._handleSelectItem(newValue[newValue.length - 1])
      const oldData = {}
      const data = {}
      const oldCssData = {}
      const cssData = {}
      oldCssData['$cwidth'] = oldOuterWidthValue
      cssData['$cwidth'] = newOuterWidthValue
      oldData['childArea'] = oldValue
      data['childArea'] = newValue
      this.model.dataModel.childArea = newValue
      this.onCssChange(oldCssData,cssData)
      this.onDataChange(action,oldData,data)
      if(window.smSite) {
        window.smSite.message(1,'删除成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-area__container {
  position: relative;
}
.add-tab__btn {
  margin-bottom: 12px;
  font-size: $--font-size-normal;
  width: 235px;
}
.disabled {
  cursor: not-allowed;
}
.set-pos-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;
  padding: 0 0 0 16px;
  height: 40px;
  background: $--panel-background-block-color;
  border-radius: $--border-radius-base;
  font-size: $--font-size-normal;
  font-weight: 400;
  line-height: 20px;
  color: $--usual-font-color-sub;
  cursor: pointer;
  &:hover {
    .handler-move {
      cursor: move;
    }
    .handler-move,
    .item-name {
      color: $--font-color-hover;
    }
    color: $--usual-font-color-main;
    background: $--list-background-hover;
    .operate-icon__container .operate-icon {
      display: block;
      i {
        color: $--font-color-hover;
      }

      i.disabled {
        color: rgba(255, 255, 255, 0.5) !important;
      }
    }
    .select-icon {
      border-color: $--font-color-hover;
      &::after {
        background-color: $--font-color-hover;
      }
    }
  }
  i {
    font-size: $--font-size-normal;
  }
  .select-icon {
    position: relative;
    margin: 0 16px;
    width: 14px;
    height: 14px;
    border: 1px solid $--usual-border-color;
    border-radius: 50%;
    cursor: pointer;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $--panel-background-block-color;
    }
  }
  .item-name {
    display: inline-block;
    font-size: 14px;
    max-width: 60px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .operate-icon__container {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    .operate-icon {
      display: none;
      float: right;
      padding: 3px 6px;
      border-radius: 50%;
      i {
        color: #fff;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .disabled {
        color: rgba(255, 255, 255, 0.5) !important;
      }
    }
  }
}
li.selected {
  background: $--list-background-selected;
  color: $--font-color-selected;
  i {
    color: $--font-color-selected;
  }
  .operate-icon__container .operate-icon {
    display: block;
    i {
      color: $--font-color-hover;
    }
  }
  span {
    border-color: $--font-color-selected !important;
    &::after {
      display: block;
      background: $--font-color-selected;
    }
  }
  span.select-icon::after {
    display: block;
    background-color: $--font-color-selected;
  }
  span.item-name {
    color: $--font-color-selected;
  }
}
.add-item__section {
  position: fixed;
  right: 290px;
  top: 263px;
  width: 288px;
  background: $--popup-background-main;
  box-shadow: $--area-shadow-base;
  .add-area__header--title {
    margin: 0 16px;
    padding: 12px 0;
    font-size: $--font-size-normal;
    color: $--popup-font-color-main;
    line-height: 20px;
    border-bottom: 1px solid $--popup-border-color;
  }
  .add-area__content {
    margin: 16px 16px 0;
    padding: 0 0 27px;
    border-bottom: 1px solid $--popup-border-color;
    .add-area__content--tips {
      font-size: $--font-size-normal;
      color: $--popup-font-color-main;
      line-height: 20px;
      padding-bottom: 8px;
    }
  }
  .add-area__btn--group {
    margin: 16px 16px 24px;
    text-align: right;
  }
  .add-area__corner {
    position: absolute;
    right: -8px;
    top: 16px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid #fff;
  }
}

.add-item__section /deep/ .el-input__inner {
  background-color: $--popup-background-main;
  border-color: $--popup-border-color;
  color: $--popup-font-color-main;
}
</style>
