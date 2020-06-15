<template>
  <div class="columns-mobile__setting--pos">
    <div class="set-columns__1 set-columns__area" :class="{selected: selectedColumnsSetting == 1}" @click="_handleSetMobileOneColumn">
      <div class="columns-1"></div>
    </div>
    <div v-show="showTwoSameColumns" class="set-columns__2 set-columns__area" :class="{selected: selectedColumnsSetting == 2 && showTwoSameColumns}" @click="_handleSetMobileTwoColumns">
      <div class="columns-2"></div>
      <div class="columns-2"></div>
    </div>
    <div v-show="showTwoDifColumns" class="set-columns__2--dif set-columns__area" :class="{selected: selectedColumnsSetting == 2 && showTwoDifColumns}" @click="_handleSetMobileTwoColumns">
      <div class="columns-2"></div>
      <div class="columns-2"></div>
    </div>
    <div v-show="showThreeSameColumns" class="set-columns__3 set-columns__area" :class="{selected: selectedColumnsSetting == 3 && showThreeSameColumns}" @click="_handleSetMobileThereeColumns">
      <div class="columns-3"></div>
      <div class="columns-3"></div>
      <div class="columns-3"></div>
    </div>
    <div v-show="showThreeDifColumns" class="set-columns__3--dif set-columns__area" :class="{selected: selectedColumnsSetting == 3 && showThreeDifColumns}" @click="_handleSetMobileThereeColumns">
      <div class="columns-3"></div>
      <div class="columns-3"></div>
      <div class="columns-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    }
  },
  computed: {
    childArea: {
      get: function() {
        return this.model['childArea']
      },
      set: function() {}
    },
    showTwoDifColumns: {
      get: function() {
        let flag = false
        const lenArr = [2, 3, 4, 5, 6]
        if (lenArr.indexOf(this.childArea.length) > -1) {
          flag = this.childArea.some(it => {
            return it.Percent !== this.childArea[0].Percent
          })
        }
        return flag
      },
      set: function() {}
    },
    showTwoSameColumns: {
      get: function() {
        let flag = false
        const lenArr = [2, 3, 4, 5, 6]
        if (lenArr.indexOf(this.childArea.length) > -1) {
          flag = this.childArea.every(it => {
            return it.Percent === this.childArea[0].Percent
          })
        }
        return flag
      },
      set: function() {}
    },
    showThreeDifColumns: {
      get: function() {
        let flag = false
        const lenArr = [3, 5, 6]
        if (lenArr.indexOf(this.childArea.length) > -1) {
          flag = this.childArea.some(it => {
            return it.Percent != this.childArea[0].Percent
          })
        }
        return flag
      },
      set: function() {}
    },
    showThreeSameColumns: {
      get: function() {
        let flag = false
        const lenArr = [3, 5, 6]
        if (lenArr.indexOf(this.childArea.length) > -1) {
          flag = this.childArea.every(it => {
            return it.Percent === this.childArea[0].Percent
          })
        }
        return flag
      },
      set: function() {}
    },
    selectedColumnsSetting: {
      get: function() {
        return this.model.childArea[0].MobilePercent
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetMobileOneColumn() {
      const oldData = {}
      const data = {}
      if (this.selectedColumnsSetting === 1) return
      oldData['childArea'] = this.model.childArea
      data['childArea'] = JSON.parse(JSON.stringify(this.model.childArea))
      this._resetMobileColumns(data.childArea, 1)
      this.onDataChange('changeMobileColumns', oldData, data)
    },
    _handleSetMobileTwoColumns() {
      const oldData = {}
      const data = {}
      if (this.selectedColumnsSetting === 2) return
      oldData['childArea'] = this.model.childArea
      data['childArea'] = JSON.parse(JSON.stringify(this.model.childArea))
      this._resetMobileColumns(data.childArea, 2)
      this.onDataChange('changeMobileColumns', oldData, data)
    },
    _handleSetMobileThereeColumns() {
      const oldData = {}
      const data = {}
      if (this.selectedColumnsSetting === 3) return
      oldData['childArea'] = this.model.childArea
      data['childArea'] = JSON.parse(JSON.stringify(this.model.childArea))
      this._resetMobileColumns(data.childArea, 3)
      this.onDataChange('changeMobileColumns', oldData, data)
    },
    _resetMobileColumns(data, percent) {
      for (var i = 0; i < data.length; i++) {
        data[i].MobilePercent = percent
        this.model['childArea'][i].MobilePercent = percent
      }
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
.columns-mobile__setting--pos {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .set-columns__area {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    margin-right: 10px;
    padding: 0 9px;
    width: 70px;
    height: 56px;
    cursor: pointer;
    background: #e9f0f4;

    &:last-of-type {
      margin-right: 0;
    }
    .columns-1 {
      width: 50px;
      height: 30px;
      background: $--color-main;
    }

    .columns-2 {
      width: 23px;
      height: 30px;
      background: $--color-main;
    }

    .columns-3 {
      width: 15px;
      height: 30px;
      background: $--color-main;
    }
  }
  .set-columns__1 {
    justify-content: center;
  }

  .set-columns__2--dif {
    .columns-2 {
      width: 18px;
    }
    .columns-2:first-of-type {
      width: 30px;
    }
  }

  .set-columns__3--dif {
    .columns-3 {
      width: 10px;
    }
    .columns-3:last-of-type {
      width: 28px;
    }
  }

  .set-columns__area.selected {
    background: #ccc;
  }
}
</style>
