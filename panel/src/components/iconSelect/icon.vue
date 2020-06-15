<template>
  <div
    v-show="iconPopupFlag"
    id="modal"
    class="icon-select__container"
    @click="_handleCloseIconPopup($event)"
  >
    <div class="mask"></div>
    <div class="icon-select__area clear">
      <div class="area-left__slider">
        <div class="block" @click="_handleSelectArea(0)">
          <div
            class="nav-flag"
            :style="{ visibility: activeIndex == 0 ? 'visible' : 'hidden' }"
          ></div>
          <div>
            <div class="nav-icon block-icon"></div>
            <p :class="{ active: activeIndex == 0 }">块状</p>
          </div>
        </div>
        <div class="line" @click="_handleSelectArea(1)">
          <div
            class="nav-flag"
            :style="{ visibility: activeIndex == 1 ? 'visible' : 'hidden' }"
          ></div>
          <div>
            <div class="nav-icon line-icon"></div>
            <p :class="{ active: activeIndex == 1 }">线性</p>
          </div>
        </div>
        <!-- <div class="colorful" @click="_handleSelectArea(2)">
          <div
            class="nav-flag"
            :style="{ visibility: activeIndex == 2 ? 'visible' : 'hidden' }"
          ></div>
          <div>
            <div class="nav-icon colorful-icon"></div>
            <p :class="{ active: activeIndex == 2 }">多色</p>
          </div>
        </div> -->
      </div>
      <div class="area-right__content">
        <div class="right-header__area flex-between-center--area">
          <span>选择图标</span>
          <i class="iconfont iconguanbi" @click="_handleClosePopup"></i>
        </div>
        <ul
          v-show="activeIndex == 0"
          class="right-content__area flex-start-start--area"
        >
          <li
            v-for="(it, i) in blockList"
            :key="i"
            :class="{ active: it.icon == icon }"
            @click="_handleSelectIcon(it)"
          >
            <i class="iconfont" :class="it.icon"></i>
            <span v-show="it.icon == icon" class="mask"></span>
            <i v-show="it.icon == icon" class="iconfont iconxingzhuangjiehe select-icon"></i>
          </li>
        </ul>
        <ul
          v-show="activeIndex == 1"
          class="right-content__area flex-start-start--area"
        >
          <li
            v-for="(it, i) in lineList"
            :key="i"
            :class="{ active: it.icon == icon }"
            @click="_handleSelectIcon(it)"
          >
            <i class="iconfont" :class="it.icon"></i>
            <span v-show="it.icon == icon" class="mask"></span>
            <i v-show="it.icon == icon" class="iconfont iconxingzhuangjiehe select-icon"></i>
          </li>
        </ul>
        <!-- <ul
          v-show="activeIndex == 2"
          class="right-content__area flex-start-start--area"
        >
          <li
            v-for="(it, i) in colorList"
            :key="i"
            :class="{ active: it.icon == icon }"
            @click="_handleSelectIcon(it)"
          >
            <i class="iconfont" :class="it.icon"></i>
            <span v-show="it.icon == icon" class="mask"></span>
            <i v-show="it.icon == icon" class="iconfont iconxingzhuangjiehe select-icon"></i>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    },
    iconPopupFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      lineList: [
        { icon: 'iconicon-xianxing2' },
        { icon: 'iconicon-xianxing3' },
        { icon: 'iconicon-xianxing4' },
        { icon: 'iconicon-xianxing3' },
        { icon: 'iconicon-xianxing5' },
        { icon: 'iconicon-xianxing6' },
        { icon: 'iconicon-xianxing7' },
        { icon: 'iconicon-xianxing8' },
        { icon: 'iconicon-xianxing9' },
        { icon: 'iconicon-xianxing10' },
        { icon: 'iconicon-xianxing11' },
        { icon: 'iconicon-xianxing12' },
        { icon: 'iconicon-xianxing13' },
        { icon: 'iconicon-xianxing14' },
        { icon: 'iconicon-xianxing15' },
        { icon: 'iconicon-xianxing16' },
        { icon: 'iconicon-xianxing17' },
        { icon: 'iconicon-xianxing18' },
        { icon: 'iconicon-xianxing19' },
        { icon: 'iconicon-xianxing20' }
      ],
      blockList: [
        { icon: 'iconicon-des-19' },
        { icon: 'iconicon-des-18' },
        { icon: 'iconicon-des-17' },
        { icon: 'iconicon-des-16' },
        { icon: 'iconicon-des-15' },
        { icon: 'iconicon-des-14' },
        { icon: 'iconicon-des-13' },
        { icon: 'iconicon-des-12' },
        { icon: 'iconicon-des-11' },
        { icon: 'iconicon-des-10' },
        { icon: 'iconicon-des-9' },
        { icon: 'iconicon-des-8' },
        { icon: 'iconicon-des-7' },
        { icon: 'iconicon-des-6' },
        { icon: 'iconicon-des-5' },
        { icon: 'iconicon-des-4' },
        { icon: 'iconicon-des-3' },
        { icon: 'iconicon-des-2' },
        { icon: 'iconicon-des-1' },
        { icon: 'iconicon-des-' }
      ],
      colorList: [],
      activeIndex: 0
    }
  },
  methods: {
    _handleSelectArea(i) {
      this.activeIndex = i
    },
    _handleClosePopup() {
      this.$emit('handleClosePopup')
    },
    _handleSelectIcon(it) {
      this.$emit('handleChooseIcon', it.icon)
    },
    _handleCloseIconPopup(e) {
      if (e.target.id === 'modal') {
        this._handleClosePopup()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-select__container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1019;

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $--popup-background-mask;
  }
  .icon-select__area {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 554px;
    height: 300px;
    background: $--popup-background-main;
    border-radius: $--border-radius-base;
    overflow: hidden;
    animation: ym_keyframe__model ease 0.3s;
    .area-left__slider {
      padding-top: 36px;
      width: 67px;
      height: 299px;
      background: $--list-background-hover;
      border-radius: $--border-radius-base 0px 0px $--border-radius-base;
      div {
        width: 48px;
        height: 33%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .nav-flag {
          width: 3px;
          height: 16px;
          background: $--background-selected;
        }

        div {
          display: block;
          width: 36px;
          height: auto;
          .nav-icon {
            margin-left: 6px;
            width: 22px;
            height: 18px;
          }

          .line-icon {
            background: url('~@static/images/iconSelect/line_nav_icon.png')
              no-repeat center center;
            background-size: 100% 100%;
          }

          .block-icon {
            background: url('~@static/images/iconSelect/block_nav_icon.png')
              no-repeat center center;
            background-size: 100% 100%;
          }

          .colorful-icon {
            background: url('~@static/images/iconSelect/colorful_nav_icon.png')
              no-repeat center center;
            background-size: 100% 100%;
          }

          p {
            font-size: $--font-size-small;
            line-height: 17px;
            padding-top: 8px;
            text-align: center;
            color: $--popup-font-color-main;
          }

          .active {
            color: $--font-color-selected;
          }
        }
      }

      .colorful {
        border-bottom-left-radius: $--border-radius-base;
      }
    }

    .area-right__content {
      width: 486px;
      height: 299px;
      .right-header__area {
        height: 39px;
        border-bottom: 1px solid $--popup-border-color;
        padding: 0 16px;
        color: $--popup-font-color-main;
        i {
          font-size: 14px;
          line-height: 20px;
        }
      }

      .right-content__area {
        flex-wrap: wrap;
        padding: 12px 16px;
        height: 260px;
        overflow-y: auto;
        li {
          position: relative;
          margin: 3.3px;
          width: 50px;
          height: 50px;
          cursor: pointer;
          background: $--popup-background-main;
          box-shadow: $--area-shadow-base;
          border-radius: $--border-radius-base;
          span {
            display: block;
          }

          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: $--font-size-big;
            color: $--popup-font-color-main;
          }

          i.select-icon {
            position: absolute;
            top: auto;
            left: auto;
            transform: translate(0, 0);
            right: 2px;
            bottom: -3px;
            font-size: 14px;
            z-index: 111;
            color: $--font-color-selected;
          }

          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: $--popup-background-mask;
          }
        }

        .active {
          display: block;
        }
      }
    }
  }
}

@keyframes ym_keyframe__model {
  0% {
    height: 0;
  }
  100% {
    height: 300px;
  }
}
</style>
