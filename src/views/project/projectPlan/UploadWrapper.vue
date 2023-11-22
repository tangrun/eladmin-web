<template>
  <div ref="ddd">
    <slot :value="slotValue" @input="slotValue = $event.target.value" />
  </div>
</template>
<script>

export default {
  name: 'UploadWrapper',
  data() {
    return {
      slotValue: null
    }
  },
  watch: {
    slotValue(value) {
      console.log('slotValue', value)
    }
  },
  mounted() {
    console.log('mounted', this.$slots)
    console.log('mounted', this.slotValue)
    console.log('mounted', this.$refs.ddd)

    if (this.$slots.default) {
      const elUpload = this.$slots.default[0]
      console.log(elUpload)

      const resetBindData = function(file, fileList) {
        console.log('resetBindData', this.slotValue, fileList)
        this.slotValue = fileList
      }

      elUpload.componentInstance.onChange = resetBindData
      elUpload.componentInstance.onRemove = resetBindData

      // elUpload.componentOptions.propsData.onChange = resetBindData
      // elUpload.componentOptions.propsData.onRemove = resetBindData

      console.log(elUpload)
    }
  }
}
</script>

<style scoped>

</style>
