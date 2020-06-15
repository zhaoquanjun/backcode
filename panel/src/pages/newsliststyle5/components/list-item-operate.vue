<template>
  <div>
    <draggable v-model="listData"
               tag="ul"
               :options="{
        animation: 150,
        ghostClass: '',
        dragClass: '111',
        scroll: true,
        scrollSensitivity: 200,
        handle: '.handler-move'
      }"
               @end="_handleSortEnd">
      <li v-for="(item, index) in listData"
          :key="index"
          class="setting-item__area"
          :class="{ 'setting-item_selected': index == active }">
        <i class="iconfont icontuodongdian handler-move"></i>
        <p>{{ item.Title }}</p>
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {getNewsList} from '@/api/newslistApi.js'
export default {
  components: {
    draggable
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    atlas: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      active: 0,
      listData: null
    }
  },
  computed: {
    controlId: {
      get: function() {
        return this.model.controlId
      },
      set: function() {}
    },
    query: {
      get () {
        return this.model.query
      },
      set: function(val) {}
    }
  },
  watch: {
    'model.query': {
      handler (newValue,oldValue) {
        const newVal = newValue && newValue.filters[0].value
        const oldVal = oldValue && oldValue.filters[0].value
        if(
          this.query.filters &&
          this.query.filters[0].value.length >= 1 &&
          newVal === oldVal
        ) {
          this._getNewsList()
        } else {
          this.listData = this.model.dataModel.listData
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {},
  methods: {
    async _getNewsList () {
      const queryDate = this.model.query
      const data = await getNewsList(queryDate)
      this.listData = data.data.data
    },
    // 排序
    _handleSortEnd (evt) {
      const oldArea = this.listData
      const newArea = JSON.parse(JSON.stringify(this.listData))
      this.onDataChange(
        'changeSortListData',
        {listData: oldArea},
        {listData: newArea}
      )
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
@import "@static/styles/components/select-picture-popup.scss";
ul {
  background-color: $--panel-background-content-color;
  li.setting-item__area {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 16px;
    height: 44px;
    background: $--panel-background-block-color;
    border-radius: $--border-radius-base;
    font-size: $--font-size-normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 3px;
    cursor: pointer;

    i {
      color: $--usual-font-color-sub;
      font-size: $--font-size-large;
    }

    span.select-area {
      position: relative;
      margin-left: 8px;
      width: 14px;
      height: 14px;
      border: 1px solid $--usual-font-color-sub;
      border-radius: 50%;
      cursor: pointer;
      flex: none;

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
        background: $--panel-background-color;
      }
    }
    span.picture-area {
      position: relative;
      margin: 0 8px;
      width: 36px;
      height: 26px;
      border-radius: $--border-radius-base;
      overflow: hidden;
      img {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        z-index: 0;
      }
      b {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        border-radius: $--border-radius-base;
        background: rgba(38, 38, 38, 0.56);
        cursor: pointer;
        z-index: 1;
        i.switch-picture__icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $--usual-font-color-main;
        }
      }
      &:hover {
        b {
          display: block;
        }
      }
    }
    p {
      padding: 14px 10px;
      font-size: $--font-size-normal;
      font-weight: 400;
      line-height: 16px;
      max-width: 190px;
      color: $--usual-font-color-main;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .edit-icon,
    .delete-icon {
      color: $--color-main;
      &:hover {
        color: $--font-color-hover;
      }
    }
    .edit-icon {
      margin-left: 10px;
    }
    .icon-wrap {
      display: none;
      background: transparent;
      position: absolute;
      right: 10px;
      padding: 0 10px;
    }
    &:hover {
      background-color: $--list-background-hover;
      .icon-wrap {
        display: block;
      }
      p {
        max-width: 190px;
        color: $--font-color-hover;
      }
      .handler-move {
        color: $--font-color-hover;
        cursor: move;
      }
      .select-area {
        border-color: $--font-color-hover;
        &::after {
          background-color: $--font-color-hover;
        }
      }
    }
  }
  li.setting-item_selected {
    background-color: $--list-background-selected;
    box-shadow: $--area-shadow-base;
    .handler-move {
      color: $--font-color-selected;
    }
    span.select-area {
      border-color: $--font-color-selected;
      &::after {
        display: block;
        background: $--font-color-selected;
      }
    }
    p {
      color: $--font-color-selected;
    }
  }
}
</style>
