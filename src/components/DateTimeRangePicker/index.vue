<template>
  <el-date-picker
    v-model="datetime"
    v-bind="$attrs"
    type="datetimerange"
    @input="onChange"
  />
</template>
<script>

export default {
  name: 'DateTimeRangePicker',
  props: {
    startTime: {
      type: String | Object
    },
    endTime: {
      type: String | Object
    }
  },
  data: function() {
    return {
      // datetime: []
    }
  },
  computed: {
    datetime() {
      if (this.startTime && this.endTime) {
        return [this.startTime, this.endTime]
      } else {
        return []
      }
    }
  },

  methods: {

    onChange(value) {
      this.$emit('input', value)
      this.$emit('update:startTime', this.getArrayIndexValue(value, 0))
      this.$emit('update:endTime', this.getArrayIndexValue(value, 1))
    },
    getArrayIndexValue(array, index) {
      return array && array instanceof Array && array.length > index && index >= 0 ? array[index] : null
    }
  }
}
</script>

<style scoped>

</style>
