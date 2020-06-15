<template>
  <div>
    <div class="banner-pic-mask">
      <div class="banner-pic-box">
        <header class="header">
          <p>设置图片</p>
          <i class="iconfont iconguanbi" @click="close"></i>
        </header>
        <section class="content-wrap">
          <div class="banner-left-content">
            <div class="banner-left-menu flex-between-center--area">
              <span class="tip">可以拖拽图片调整图片位置及排序</span>
              <div
                class="ym-button--primary"
                :class="[{ 'is-disabled': uploadDisabled }]"
                @click="batchAddPicture(true)"
              >
                添加图片
              </div>
            </div>
            <section v-scrollBar class="list-wrap">
              <!-- <draggable class="piture-list"> -->
              <draggable
                v-model="linkModel"
                class="piture-list"
                tag="ul"
                :options="{
                  animation: 150,
                  ghostClass: '',
                  dragClass: '111',
                  scroll: true,
                  scrollSensitivity: 200,
                  handle: '.handler-move'
                }"
                @end="_handleSortEnd"
              >
                <li
                  v-for="(item, index) in linkModel"
                  :key="index"
                  class="picture-item handler-move"
                  :class="{ active: index === active }"
                  @click="handlerClickItem(item, index)"
                >
                  <div class="img-wrap">
                    <img :src="item && item.Src" />
                  </div>
                  <div class="hander-btn">
                    <!--  @click="preview" -->
                    <div class="view" @click="preview(item, index)">
                      <i class="iconfont iconchakan"></i>
                    </div>
                    <div class="remove" @click.stop="removeItem(index)">
                      <i class="iconfont delete-icon iconshanchu"></i>
                    </div>
                  </div>
                  <span class="number">{{ index + 1 }}</span>
                </li>
              </draggable>
              <div
                v-if="linkModel.length < 1"
                class="no-content--tips__area"
                style="text-align: center; margin-top: 100px;"
              >
                <div class="carousel-empty">
                  <img width="100%" src="@static/images/link/none_tips.png" />
                </div>
                暂无图片，请先
                <p @click="batchAddPicture(true)">
                  添加图片
                </p>
              </div>
            </section>
          </div>
          <div
            v-if="linkModel.length >= 1"
            v-scrollBar
            class="banner-right-content"
          >
            <div class="slider-banner">
              <div class="swiper">
                <div
                  v-for="(item, index) in linkModel"
                  :key="index"
                  class="image-wrap"
                >
                  <img width="100%" :src="activeImgInfo && activeImgInfo.Src" />
                </div>
              </div>
              <span class="number">{{ active + 1 }}</span>
              <div class="change-pic" @click="batchAddPicture(false, active)">
                <span>更换图片</span>
              </div>
              <div class="slider-btn left-prev" @click="prev">
                <i class="iconfont iconicon-des-Arrow"></i>
              </div>
              <div class="slider-btn right-next" @click="next">
                <i class="iconfont iconicon-des-Arrow"></i>
              </div>
            </div>
            <div class="pic-info">
              <div class="item">
                <label for>图片标题</label>
                <div>
                  <el-input
                    v-if="activeImgInfo"
                    v-model="activeImgInfo.Name"
                    type="text"
                    placeholder="图片标题"
                    :maxlength="40"
                    @change="changeImgInfo"
                  ></el-input>
                </div>
              </div>
              <div class="item">
                <label for>图片描述</label>
                <div>
                  <el-input
                    v-if="activeImgInfo"
                    v-model="activeImgInfo.Alt"
                    type="text"
                    placeholder="图片描述"
                    :maxlength="100"
                    @change="changeImgInfo"
                  ></el-input>
                </div>
              </div>
              <div class="item">
                <label>图片链接</label>
                <link-area
                  ref="_linkArea"
                  :model="linkModel[active]"
                  @onChangeModelData="onChangeModelData"
                ></link-area>
              </div>
            </div>
          </div>
        </section>
        <div class="footer">
          <div
            class="ym-button--isplain"
            style="margin-right: 16px;"
            @click="close"
          >
            取消
          </div>
          <div class="ym-button--primary" @click="getBannerList">确定</div>
        </div>
      </div>
    </div>
    <div v-if="isSliderShow" class="banner-pic-mask">
      <div
        class="slider-banner banner-slider"
        style="width: 100%; height: 100%;"
      >
        <div class="swiper">
          <div
            v-for="(item, index) in linkModel"
            :key="index"
            class="image-wrap"
          >
            <img
              width="auto"
              height="auto"
              :src="activeImgInfo && activeImgInfo.Src"
            />
          </div>
        </div>
        <div class="slider-btn left-prev" @click="prev">
          <i class="iconfont iconicon-des-Arrow"></i>
        </div>
        <div class="slider-btn right-next" @click="next">
          <i class="iconfont iconicon-des-Arrow"></i>
        </div>
        <div class="dialog-close" @click="closeDialog">
          <i class="iconfont iconguanbi"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import linkArea from '@comp/link/index'
export default {
  components: {
    draggable,
    linkArea
  },
  props: {
    replaceImg: {
      type: String
    },
    imgDataList: {
      type: Array
    },
    model: {
      type: Object
    },
    atlas: {
      type: String
    },
    curActive: {
      type: Number
    }
  },
  data() {
    return {
      uploadDisabled: false,
      isSliderShow: false,
      active: 0,
      list: [],
      activeImgInfo: null,

      linkModel: []
    }
  },
  watch: {
    curActive() {
      this.active = this.curActive
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.imgDataList[this.active])
      )
    },
    replaceImg() {
      var oldValue = this.linkModel[this.active].DetailPageId
      this.$set(this.linkModel, this.active, this.replaceImg)
      this.linkModel[this.active].DetailPageId = oldValue

      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.linkModel[this.active])
      )
      // this.linkModel = JSON.parse(JSON.stringify(this.linkModel))
    },
    imgDataList() {
      this.linkModel = JSON.parse(JSON.stringify(this.imgDataList))
      if (this.atlas === 'atlas') {
        if (this.linkModel.length >= 40) {
          this.uploadDisabled = true
        } else {
          this.uploadDisabled = false
        }
      }
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.imgDataList[this.active])
      )
      // this.linkModel = JSON.parse(JSON.stringify(this.imgDataList))
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.linkModel = JSON.parse(JSON.stringify(this.imgDataList))
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.imgDataList[this.active])
      )
      this.linkModel = JSON.parse(JSON.stringify(this.imgDataList))
    })
  },
  methods: {
    onChangeModelData(data) {
      this.linkModel[this.active] = this.activeImgInfo
      this.linkModel[this.active].Id = data.Id
      this.linkModel[this.active].DetailPageId = data.DetailPageId
      this.linkModel[this.active].Type = data.Type
      this.linkModel[this.active].Ctype = data.Ctype
      this.linkModel[this.active].Href = data.Href
      this.linkModel[this.active].Target = data.Target
      this.linkModel[this.active].Title = data.Title
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    handlerClickItem(item, index) {
      this.active = index
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.linkModel[this.active])
      )
    },

    prev() {
      --this.active
      if (this.active < 0) {
        this.active = this.linkModel.length - 1
      }
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.linkModel[this.active])
      )
    },
    next() {
      ++this.active
      if (this.active >= this.linkModel.length) {
        this.active = 0
      }
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.linkModel[this.active])
      )
    },
    removeItem(index) {
      if (this.linkModel.length <= 1) {
        this.$notify({
          customClass: 'notify-error', //  notify-success ||  notify-error
          message: '至少保留一张图片',
          showClose: false,
          duration: 1500
        })
        return false
      }
      this.linkModel.splice(index, 1)
      if (index === this.active) {
        this.active = 0
      } else {
        this.active = index - 1
      }
      this.linkModel = this.linkModel
    },
    preview(item, index) {
      this.active = index
      this.activeUlr = item.url
      this.isSliderShow = true
    },
    getBannerList() {
      console.log(this.activeImgInfo, this.linkModel)
      const oldData = this.imgDataList
      const newData = this.linkModel
      this.$emit('changeImgList', this.linkModel)
      this.onDataChange(
        'changeListData',
        { imgList: oldData },
        { imgList: newData }
      )
      this.close()
    },
    batchAddPicture(flag) {
      this.$emit('batchAddPicture', flag)
    },
    changeActivePictrue() {
      this.$emit('changeActivePictrue')
    },
    changeImgInfo() {
      this.$set(this.linkModel, this.active, this.activeImgInfo)
    },
    close() {
      this.$emit('closeBannerPictureModul')
    },
    closeDialog() {
      this.isSliderShow = false
    },
    // 排序
    _handleSortEnd() {
      this.linkModel = this.linkModel
      this.activeImgInfo = JSON.parse(
        JSON.stringify(this.linkModel[this.active])
      )
    },
    // 选中
    _handleSelect() {},
    // 切换图片
    _handleChangePicture() {},
    // 编辑图片
    _handleEditPicture() {},
    // 删除图片
    _handleDeletePicture() {}
  }
}
</script>
<style lang="scss" scoped>
.pic-info /deep/ .link-section__show {
  width: 100%;
  border-color: $--popup-border-color;
  background-color: $--popup-background-main !important;

  &:hover {
    border-color: $--background-hover;
  }
}

.pic-info /deep/ .link-section__show .single-line__overflow--hide {
  color: $--popup-font-color-main;
}

.number {
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: $--font-size-small;
  color: $--popup-font-color-main;
  background: $--popup-background-main;
  border-radius: $--border-radius-base;
  z-index: 1;
  position: absolute;
  left: 8px;
  top: 8px;
}
.swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .image-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.slider-btn {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: $--popup-background-mask;
  border-radius: $--border-radius-base;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  cursor: pointer;
  opacity: 0.8;
  color: $--popup-font-color-auxiliary;
  .iconfont {
    color: $--popup-font-color-auxiliary;
  }
}
.left-prev {
  left: 10px;
  transform: rotate(180deg);
}
.right-next {
  right: 10px;
}
.banner-slider {
  .swiper .image-wrap img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
  }
}
.banner-pic-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
.content-wrap {
  height: calc(100% - 130px);
  display: flex;
  border-bottom: $--popup-border-main;
}
.banner-pic-box {
  min-width: 1035px;
  min-height: 600px;
  max-width: 1205px;
  max-height: 796px;
  background: $--usual-font-color-main;
  box-shadow: 0px 2px 32px 4px rgba(0, 0, 0, 0.13);
  border-radius: 3px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    line-height: 22px;
    color: $--popup-font-color-main;
    font-size: $--font-size-normal;
    border-bottom: $--popup-border-main;
  }
  .banner-left-content {
    width: 100%;
    height: 100%;
    display: inline-block;
    box-sizing: border-box;
  }

  .banner-left-menu {
    padding: 16px 32px;
    border-bottom: $--popup-border-main;

    .tip {
      font-size: $--font-size-normal;
      color: $--popup-font-color-sub;
    }
  }
  .list-wrap {
    height: calc(100% - 100px);
    overflow-y: auto;
    position: relative;

    .piture-list {
      padding: 16px;
      box-sizing: border-box;
      .picture-item {
        cursor: pointer;
        display: inline-block;
        width: 140px;
        height: 140px;
        border: 3px solid transparent;
        box-sizing: border-box;
        position: relative;
        margin: 16px;
        overflow: hidden;
        .img-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        &:hover .hander-btn {
          opacity: 1;
        }
        .hander-btn {
          opacity: 0;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          background-color: $--popup-background-mask;

          div {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid $--popup-border-color;
            margin-bottom: 10px;
            .iconfont {
              color: $--usual-font-color-main;
              font-size: 12px;
            }
            &:hover {
              border-color: $--font-color-hover;
              i {
                color: $--font-color-hover;
              }
            }
          }
        }
      }
      .active {
        border: 2px solid $--background-selected;
        .number {
          background: $--background-selected;
          color: $--popup-font-color-auxiliary;
        }
      }
    }

    .no-content--tips__area {
      color: $--popup-font-color-main;
      .carousel-empty {
        width: 140px;
        text-align: center;
        margin: 0 auto;
        padding-bottom: 20px;
      }
      p {
        display: inline-block;
        color: $--font-color-selected;
        cursor: pointer;
      }
    }
  }
}

// 右侧样式
.banner-right-content {
  flex: 0 0 300px;
  height: 100%;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  overflow: hidden;
  box-sizing: border-box;
  border-left: $--popup-border-main;
  .slider-banner {
    position: relative;
    margin: 16px 16px 0;
    width: 268px;
    height: 268px;

    .change-pic {
      position: absolute;
      width: 90%;
      text-align: center;
      padding: 12px 0;
      margin-left: 5%;
      background: $--popup-background-mask;
      border-radius: $--border-radius-base;
      bottom: 16px;
      box-sizing: border-box;
      opacity: 0.8;
      cursor: pointer;
      span {
        font-size: $--font-size-small;
        color: $--usual-font-color-main;
      }
    }
  }
  .pic-info {
    padding: 16px 16px 12px;
    width: 100%;
    height: calc(100% - 289px);
    box-sizing: border-box;
    .item {
      padding: 16px 0;
      label {
        display: inline-block;
        padding-bottom: 16px;
        font-size: $--font-size-small;
        font-weight: 400;
        color: $--usual-font-color-auxiliary;
      }
    }
    .item /deep/ .el-input__inner {
      color: $--popup-font-color-main;
      border-color: $--popup-border-color;
      background-color: $--popup-background-main;
    }
    .link {
      padding-top: 8px;
      span {
        display: block;
        overflow: hidden;
        color: #8c8c8c;
        word-wrap: break-word;
        word-break: normal;
        padding: 5px 0;
      }
    }
  }
}

.footer {
  text-align: right;
  padding: 20px 24px;
  box-sizing: border-box;
}
.banner-slider {
  .left-prev {
    left: 21%;
  }
  .right-next {
    right: 21%;
  }
  .dialog-close {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 36px;
    right: 36px;
    z-index: 200;
    i {
      font-size: 30px !important;
      color: $--usual-font-color-main;
    }
  }
}
</style>
