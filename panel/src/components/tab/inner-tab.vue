<template>
  <div class="content-tab">
    <ul>
      <li v-for="(item, index) in tabList" :key="index">
        <item />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
