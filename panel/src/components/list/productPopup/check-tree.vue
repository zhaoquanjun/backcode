<template>
  <el-tree
    ref="tree"
    class="aside-tree"
    style="padding-left: 0; padding-top: 0;"
    :data="treeResult"
    show-checkbox
    :default-expand-all="true"
    node-key="id"
    highlight-current
    :default-checked-keys="defaultCheckedKeys"
    @check="check"
  ></el-tree>
</template>
<script>
export default {
  props: ['treeResult', 'defaultCheckedKeys'],
  methods: {
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    check(node, key) {
      this.$emit('selectedCategory', key.checkedKeys)
    }
  }
}
</script>
