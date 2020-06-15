<template>
  <div class="no-content__area">
    <span>暂无内容</span>
  </div>
</template>

<style lang="scss" scoped>
.no-content__area {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    color: $--popup-font-color-sub;
  }
}
</style>
