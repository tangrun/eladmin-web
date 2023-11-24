<template>
  <el-cascader
    ref="cascader"
    :value="value"
    :clearable="true"
    :show-all-levels="true"
    :placeholder="placeholder"
    :size="size"
    :filterable="true"
    :options="cityOptions"
    :props="cityOptionsProps"
    @input="onChange"
  />
</template>

<script>
import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'

export default {
  name: 'CitySelector',
  props: {
    value: {
      type: Object
    },
    size: { type: String },
    placeholder: {
      type: String
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    county: {
      type: String
    },
    street: {
      type: String
    }
  },
  data() {
    return {
      cityOptions,
      cityOptionsProps
    }
  },
  methods: {
    onChange(value) {
      this.$emit('input', value)
      this.$emit('update:province', this.getArrayIndexValue(value, 0))
      this.$emit('update:city', this.getArrayIndexValue(value, 1))
      this.$emit('update:county', this.getArrayIndexValue(value, 2))
      this.$emit('update:street', this.getArrayIndexValue(value, 3))
    },
    getArrayIndexValue(array, index) {
      return array && array instanceof Array && array.length > index && index >= 0 ? array[index] : null
    }
  }
}
</script>
