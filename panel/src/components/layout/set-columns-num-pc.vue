<template>
  <div class="set-columns__section">
    <slot></slot>
    <ul class="columns-num__area flex-start-center--area">
      <template v-for="(item, index) in columnsNumArray">
        <li
          v-if="maxValue >= item.percent && item.percent >= minValue"
          :key="item.percent"
          class="flex-center-center--area"
          :class="{ selected: columnsNum == item.percent }"
          @click="_handleChangeColumnsNum(item.percent, index)"
        >
          <span v-show="columnsNum == item.percent" class="selected-icon__area"></span>
          <i class="iconfont" :class="item.icon"></i>
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
    maxValue: {
      type: Number,
      default: 6
    },
    minValue: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      columnsNumArray: [
        { icon: 'iconicon-des-ms1', percent: 1 },
        { icon: 'iconicon-des-pc1', percent: 2 },
        { icon: 'iconicon-des-pc4', percent: 3 },
        { icon: 'iconicon-des-pc2', percent: 4 },
        { icon: 'iconicon-des-pc3', percent: 5 },
        { icon: 'iconicon-des-pc5', percent: 6 }
      ],
      curIndex: 0
    }
  },
  computed: {
    columnsNum: {
      get: function() {
        return this.model['percent']
      },
      set: function() {}
    }
  },
  methods: {
    _handleChangeColumnsNum(newVal, index) {
      const oldVal = this.model['percent']
      if (newVal !== oldVal) {
        const oldData = {}
        const data = {}
        oldData['percent'] = oldVal
        data['percent'] = newVal
        this.model['percent'] = newVal
        this.onDataChange('changeWidth', oldData, data, 'pc')
        this.oldValue = newVal
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
.set-columns__section {
  .columns-num__area {
    flex-wrap: wrap;
    margin-top: 10px;

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
        color: $--usual-font-color-sub;
        font-size: 24px;
      }
      .selected-icon {
        position: absolute;
        top: -15px;
        right: -5px;
        font-size: 18px;
        color: $-font-color-success !important;
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
      .select-icon {
        color: $-font-color-success;
      }
    }
  }
}
</style>
