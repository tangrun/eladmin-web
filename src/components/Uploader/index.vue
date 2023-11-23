<template>
  <el-upload :value="value" v-bind="$attrs" :on-change="resetBindData" :on-remove="resetBindData" v-on="$listeners">
    <template v-for="(slot, name) in $slots" :slot="name">
      <slot :name="name" />
    </template>
  </el-upload>
</template>
<script>
// el-upload 并没有双向绑定 所以通过 on-change on-remove监听变化
export default {
  name: 'Uploader',
  props: {
    value: Array,
    raws: Array// 文件列表
  },
  methods: {
    resetBindData(file, fileList) {
      this.$emit('input', fileList)
      this.$emit('update:raws', fileList.map(value => value.raw))
    }
  }
}
</script>

<style scoped>

</style>
