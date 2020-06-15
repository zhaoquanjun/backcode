<template>
  <div>
    <div
      class="img-item"
      :style="{
        background:
          'url(' +
          (curItem.fullOssUrl +
            '?x-oss-process=image/resize,m_lfit,h_400,w_400') +
          ') no-repeat center',
        backgroundSize: 'cover'
      }"
      @click="handleClick"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <span class="img-wrap">
        <div :class="{ mask: isMaskShow }"></div>
      </span>
      <div class="img-handle-btn" :class="[isHandleBtnShow ? 'show' : 'hide']">
        <div class="handle-btn-box">
          <span class="img-move" @click.stop="handleMove">
            <el-tooltip
              class="item"
              effect="dark"
              content="移动"
              placement="bottom"
            >
              <i class="iconfont iconyidong"></i>
            </el-tooltip>
          </span>
          <span class="img-look" @click.stop="handleLook">
            <el-tooltip
              class="item"
              effect="dark"
              content="预览"
              placement="bottom"
            >
              <i class="iconfont iconchakan"></i>
            </el-tooltip>
          </span>
          <span class="img-delete" @click.stop="handleDelete">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <i class="iconfont iconshanchu"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div
        v-if="multiple"
        class="img-handle-btn"
        :class="[isSelected ? 'show' : 'hide']"
      >
        <span class="item-selected" style="float:right">
          <i class="iconfont iconduihao"></i>
        </span>
      </div>
      <div v-else class="img-handle-btn" :class="isSelected ? 'show' : 'hide'">
        <span class="item-selected " style="float:right">
          <i class="iconfont iconduihao"></i>
        </span>
      </div>
    </div>
    <p v-if="isRename" class="img-desc" @click="rename">{{ curItem.title }}</p>
    <el-input
      v-else
      v-model="curItem.title"
      style="padding-top:5px"
      type="text"
      size="small"
      placeholder="请输入内容"
      maxlength="30"
      show-word-limit
      @blur="rename(curItem.id, curItem.title)"
    ></el-input>
  </div>
</template>
<script>
import { trim } from '@utils/index.js'
export default {
  props: {
    curItem: {
      type: Object
    },
    isSelected: {
      type: Boolean
    },
    multiple: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      isRename: true,
      isHandleBtnShow: false,

      seletedList: []
    }
  },
  computed: {
    isMaskShow() {
      return !!(this.isHandleBtnShow || this.isSelected)
    }
  },
  watch: {
    // multiple(){
    //   this.isHandleBtnShow=  this.isSelectedShow =false;
    // }
  },
  methods: {
    handleClick() {
      this.isHandleBtnShow = false
      this.$emit('handleSelected', this.curItem)
    },
    handleMouseMove() {
      if (this.isSelected || this.isHandleBtnShow) return
      this.isHandleBtnShow = true
    },
    handleMouseLeave() {
      this.isHandleBtnShow = false
    },
    handleMove() {
      this.isHandleBtnShow = true
      this.$emit('handleMove', this.curItem)
    },
    // 查看大图
    handleLook() {
      this.isHandleBtnShow = true
      this.$emit('viewPic', this.curItem)
    },
    handleDelete() {
      this.isHandleBtnShow = true
      this.$emit('batchRemovePic', this.curItem)
    },
    // 重命名图片名称
    rename(id, newName) {
      if (id) {
        if (!trim(newName)) {
          this.$notify({
            customClass: 'notify-error',
            message: `图片名称不能为空`,
            showClose: false,
            duration: 2000
          })
          return false
        }
        this.isRename = true
        this.$emit('rename', id, newName)
      } else {
        this.isRename = false
      }
    }
  }
}
</script>
<style scoped>
.el-input /deep/ .el-input__inner {
  padding-right: 50px;
}
</style>

<style lang="scss" scoped>
.show {
  display: block;
}
.hide {
  display: none;
}
.img-item {
  display: inline-block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;
  i {
    font-size: 16px;
    color: $--font-color-selected;
  }
  .img-wrap {
    position: relative;
    display: inline-block;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    .mask {
      position: absolute;
      background: rgba(0, 0, 0, 0.75);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 1 !important;
    }
    img {
      width: 100%;
      height: 100%;
      max-height: 300px;
      max-width: 300px;
    }
  }
  .img-handle-btn {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10px;
    z-index: 1000;
    .handle-btn-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        i {
          color: $--popup-font-color-auxiliary;
          font-size: $--font-size-big;

          &:hover {
            color: $--font-color-hover;
          }
        }
      }
    }
  }
}
.img-desc {
  text-align: center;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-selected {
  margin-right: 10px;
  background-color: $--font-color-selected;
  border-radius: 50%;
  width: 27px;
  height: 27px;
  line-height: 27px;

  text-align: center;
  i.iconfont {
    color: $--usual-font-color-main;
    font-size: 16px !important;
  }
}
</style>
