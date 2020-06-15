<template>
  <div class="set-columns__section">
    <ul class="columns-num__area flex-start-center--area">
      <li
        v-for="(item, index) in columnsNumArray"
        :key="index"
        class="flex-center-center--area"
        :class="{ selected: _judgeTheSame() == index }"
        @click="_handleChangeColumnsNum(item.percents, index)"
      >
        <span v-show="_judgeTheSame() == index" class="selected-icon__area"></span>
        <i class="iconfont" :class="item.icon"></i>
      </li>
      <li v-show="_judgeTheSame() == -1" :class="{ selected: _judgeTheSame() == -1 }">
        <span></span>
        <i v-show="_judgeTheSame() == -1" class="iconfont selected-icon iconxingzhuangjiehe"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      columnsNumArray: [
        { icon: 'iconicon-test', percents: [6, 6] },
        { icon: 'iconicon-test1', percents: [4, 4, 4] },
        { icon: 'iconicon-test2', percents: [3, 3, 3, 3] },
        { icon: 'icon-', percents: [4, 8] },
        { icon: 'icon-1', percents: [8, 4] },
        { icon: 'iconicon-test3', percents: [3, 6, 3] },
        { icon: 'iconicon-test4', percents: [2, 3, 5, 2] },
        { icon: 'iconicon-test5', percents: [2, 2, 2, 4, 2] },
        { icon: 'iconicon-test6', percents: [2, 2, 2, 2, 2, 2] }
      ],
      curIndex: 0
    }
  },
  computed: {
    columnsArea: {
      get: function() {
        return this.model['childArea']
      },
      set: function() {}
    }
  },
  methods: {
    _handleChangeColumnsNum(percents, index) {
      const oldChild = this.model['childArea']
      const oldLength = oldChild.length
      const newLength = percents.length
      const newChild = []
      let action = null
      for (var i = 0; i < percents.length; i++) {
        const o = {
          Id: 'area' + (i + 1),
          Title: 'area' + (i + 1),
          Percent: percents[i],
          Columns: percents.length,
          Html: '',
          MobilePercent: 1
        }
        newChild.push(o)
      }
      if (newLength === oldLength) action = 'changeAreaWidth'
      if (newLength > oldLength) action = 'add'
      if (newLength < oldLength) {
        action = 'removeEmpty'
        const removeChildNodes = this.model['childArea'].slice(
          newLength,
          oldLength
        )
        for (let k = 0; k < removeChildNodes.length; k++) {
          var childNodes = document
            .getElementById('site-frame')
            .contentWindow.document.getElementById(
              removeChildNodes[k].Id + '_' + this.id
            ).childNodes
          if (childNodes.length > 0) {
            for (var m in childNodes) {
              if (childNodes[m] !== 'text') {
                action = 'remove'
                break
              }
            }
          }
        }
        if (window.smSite) {
          window.smSite.selectControlArea(
            this.id,
            this.model['childArea'][newLength - 1].Id
          )
        }
      }
      if (oldChild.join('') !== percents.join('')) {
        this.curIndex = index
        const oldData = {}
        const data = {}
        this.model['childArea'] = newChild
        oldData['childArea'] = oldChild
        data['childArea'] = newChild
        this.onDataChange(action, oldData, data)
      }
    },
    _judgeTheSame() {
      let index = -1
      const arr = []
      for (var k = 0; k < this.columnsArea.length; k++) {
        arr.push(this.columnsArea[k].Percent)
      }
      const selectPercentStr = arr.join(',')
      for (var i = 0; i < this.columnsNumArray.length; i++) {
        var defaultPercentStr = this.columnsNumArray[i].percents.join(',')
        if (defaultPercentStr === selectPercentStr) {
          index = i
        }
      }
      return index
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
.set-columns__section {
  .columns-num__area {
    flex-wrap: wrap;
    li {
      position: relative;
      margin-right: 8px;
      font-size: 22px;
      width: 40px;
      height: 40px;
      text-align: center;
      margin-bottom: 12px;
      background: $--panel-background-color;
      border-radius: $--border-radius-base;
      cursor: pointer;
      i {
        font-size: $--font-size-large !important;
        color: $--usual-font-color-sub;
      }
      .selected-icon {
        position: absolute;
        top: -15px;
        right: -5px;
        font-size: 18px;
        color: $-font-color-success !important;
      }
    }
    li:last-of-type {
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 22px;
        height: 19px;
        background: url("~@static/images/columns_empty_select.png") no-repeat
          center center;
        background-size: 100% 100%;
      }
    }
    li:nth-child(5),
    li:nth-child(10) {
      margin-right: 0;
    }
    .selected {
      background: $--background-selected;
      i {
        color: $--usual-font-color-main;
      }
      .selected-icon {
        color: $-font-color-success;
      }
    }
  }
}
</style>
