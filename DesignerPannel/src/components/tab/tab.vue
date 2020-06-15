<template>
  <div>
    <header-area :control-name="controlName"></header-area>
    <div class="panel-tab">
      <ul :class="{ 'around': tabList.length < 4, 'between': tabList.length >= 4 }">
        <li
          v-for="(item, index) in tabList"
          :key="index"
          :style="{width: tabList.length > 4 ? '40px' : '60px'}"
          :class="{active: index == curIndex}"
          @click="_handleChangeTab(index)"
        >
          <span class="icon-container">
            <span
              class="tab-icon"
              :style="{ backgroundImage: `url(${index == curIndex ? item.activeIcon : item.icon})`, width: item.style.width, height: item.style.height }"
            ></span>
          </span>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderArea from './header'
export default {
  components: {
    HeaderArea
  },
  props: ['tabList', 'controlName', 'curIndex'],
  data() {
    return {}
  },
  methods: {
    _handleChangeTab(i) {
      this.$emit('changeTab', i)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-tab ul {
  position: relative;
  display: flex;
  padding: 20px 12px 0;
  margin-bottom: 24px;
  li {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    max-width: 60px;
    min-width: 40px;
    height: 64px;
    cursor: pointer;
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 60px;
      min-width: 40px;
      height: 36px;
      border-radius: $--border-radius-base;
      background-color: $--panel-background-content-color;
      .tab-icon {
        display: block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
      }
    }
    p {
      padding-top: 12px;
      font-size: $--font-size-small;
      color: $--popup-font-color-sub;
      text-align: center;
      font-weight: 400;
    }
  }
  li.active {
    span {
      border-color: $--color-main;
      background: $--color-main;
    }
    p {
      color: $--font-color-selected;
    }
  }
}
.around {
  justify-content: space-around;
}
.between {
  justify-content: space-between;
}
</style>
