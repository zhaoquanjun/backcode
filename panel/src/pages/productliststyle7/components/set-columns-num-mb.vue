<template>
  <div class="set-columns__section">
    <slot></slot>
    <ul class="columns-num__area flex-start-center--area">
      <template v-for="(item, index) in columnsNumArray">
        <li v-if="
            maxCount >= item.mobilePercent && item.mobilePercent >= minCount
          "
            :key="item.mobilePercent"
            class="flex-center-center--area"
            :class="{ selected: columnsNum == item.mobilePercent }"
            @click="_handleChangeColumnsNum(item.mobilePercent, index)">
          <span v-show="columnsNum == item.mobilePercent"
                class="selected-icon__area"></span>
          <i class="iconfont"
             :class="item.icon"></i>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    maxCount: {
      type: Number,
      default: 2
    },
    minCount: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      columnsNumArray: [
        {icon: 'iconicon-des-pc1',mobilePercent: 2}
      ],
      curIndex: 0
    }
  },
  computed: {
    columnsNum: {
      get: function() {
        return this.model['mobilePercent']
      },
      set: function() {}
    }
  },
  methods: {
    _handleChangeColumnsNum (newVal,index) {
      const oldVal = this.model['mobilePercent']
      if(newVal !== oldVal) {
        const oldData = {}
        const data = {}
        oldData['mobilePercent'] = oldVal
        data['mobilePercent'] = newVal
        this.model['mobilePercent'] = newVal
        this.onDataChange('changeMobileWidth',oldData,data)
        this.oldValue = newVal
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
.set-columns__section {
  .columns-num__area {
    flex-wrap: wrap;
    margin-top: 10px;

    li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
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
        color: $--usual-font-color-sub;
        font-size: 24px;
      }
      .selected-icon {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 18px;
        color: $-font-color-success;
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
    }
  }
}
</style>
