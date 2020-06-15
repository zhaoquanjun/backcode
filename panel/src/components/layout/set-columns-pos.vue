<template>
  <div>
    <div class="set-pos-item first flex-start-center--area"
         :class="{ selected: currentItem == '' }"
         @click="_handleSelectParent">
      <i class="iconfont icontuodongdian handler-move"></i>
      <span></span>
      分栏容器
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
          class="set-pos-item flex-start-center--area"
          :class="{ selected: child.Id == currentItem }"
          @click="_handleSelectItem(child)">
        <i class="iconfont icontuodongdian handler-move"></i>
        <span></span>
        栏目{{ _formatNumber(child.Title.slice(child.Title.length - 1)) }}
      </li>
    </draggable>
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
    }
  },
  data () {
    return {
      originData: this.model.dataModel['childArea']
    }
  },
  computed: {
    currentItem: {
      get: function() {
        return this.model.selectedAreaId ? this.model.selectedAreaId : ''
      },
      set: function() {}
    },
    childArea: {
      get: function() {
        return this.model.dataModel.childArea
      },
      set: function() {}
    }
  },
  methods: {
    _formatNumber (i) {
      switch(i) {
        case '1':
          return '一'
          break
        case '2':
          return '二'
          break
        case '3':
          return '三'
          break
        case '4':
          return '四'
          break
        case '5':
          return '五'
          break
        case '6':
          return '六'
          break
      }
    },
    end: function(evt) {
      const oldArea = this.childArea
      const newArea = JSON.parse(JSON.stringify(this.childArea))
      const deleteItem = newArea.splice(evt.oldIndex,1)[0]
      newArea.splice(evt.newIndex,0,deleteItem)
      this.model.dataModel.childArea = newArea
      this.onDataChange('sort',{childArea: oldArea},{childArea: newArea})
    },
    _handleSelectParent () {
      this.model.selectedAreaId = ''
      document
        .getElementById('site-frame')
        .contentWindow.document.getElementById(this.model.controlId)
        .click()
    },
    _handleSelectItem (area) {
      this.model.selectedAreaId = area.Id

      if(window.smSite) {
        window.smSite.selectControlArea(this.model.controlId,area.Id)
      }
    },
    onDataChange (action,oldData,data) {
      if(window.smSite) {
        window.smSite.onDataChange(action,oldData,data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.set-pos-item {
  margin-bottom: 4px;
  padding: 0 16px;
  height: 40px;
  background: $--panel-background-block-color;
  border-radius: $--border-radius-base;
  font-size: $--font-size-normal;
  color: $--usual-font-color-main;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  i {
    font-size: 14px;
    cursor: move !important;
  }
  span {
    position: relative;
    margin: 0 16px;
    width: 14px;
    height: 14px;
    border: $--usual-border-main;
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
      background: #b9cbcf;
    }
  }
  &:hover {
    color: $--font-color-hover;
    background-color: $--list-background-hover;
    span {
      border-color: $--font-color-hover;
    }
  }
}
.first {
  i {
    visibility: hidden;
  }
}

.selected {
  color: $--font-color-selected;
  background-color: $--list-background-selected;
  .handler-move {
    color: $--color-main;
  }
  span {
    border-color: $--font-color-selected;
    &::after {
      display: block;
      background: $--background-selected;
    }
  }
}
</style>
