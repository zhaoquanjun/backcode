<template>
  <div class="panel">
    <slot name="tab"></slot>
    <div v-scrollBar class="panel-content" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
const el_scrollBar = (el) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    // el上挂一份属性
    el._ps_ = new PerfectScrollbar(el, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20

    })
  }
}
// 接着，自定义Vue指令,指令名你自己随便编一个，我们假定它叫scrollBar
Vue.directive('scrollBar', {
  // 使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
  inserted(el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
    }
    // el上挂一份属性
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    try {
      vnode.context.$nextTick(
        () => {
          el_scrollBar(el)
        }
      )
    } catch (error) {
      console.error(error)
      el_scrollBar(el)
    }
  }
})
export default {
  props: {
    top: {
      type: Number,
      default: () => {
        return 150
      }
    }
  }
}
</script>
