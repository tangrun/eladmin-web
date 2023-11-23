<template>
  <el-date-picker v-model="datetime" v-bind="$attrs" type="datetimerange" v-on="$listeners" @input="onChange">
    <template v-for="(slot, name) in $slots" :slot="name">
      <slot :name="name" />
    </template>
  </el-date-picker>
</template>
<script>
import { DatePicker } from 'element-ui'

export default {
  name: 'DateTimeRangePicker',
  mixins: [DatePicker],
  props: {
    startTime: Date,
    endTime: Date
  },
  data: function() {
    return {
      datetime: null
    }
  },
  methods: {
    onChange(date) {
      console.log(date)
      if (date) {
        this.$emit('update:startTime', date[0])
        this.$emit('update:endTime', date[1])
      } else {
        this.$emit('update:startTime', null)
        this.$emit('update:endTime', null)
      }
    }
  }
}
</script>

<style scoped>

</style>
