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
  />
</template>

<script>
import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'

export default {
  name: 'CitySelector',
  props: {
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
      cityOptionsProps,
      value: []
    }
  },
  watch: {
    value(value) {
      console.log('value change', value)
      this.$emit('input', value)
      this.$emit('update:province', this.getArrayIndexValue(value, 0))
      this.$emit('update:city', this.getArrayIndexValue(value, 1))
      this.$emit('update:county', this.getArrayIndexValue(value, 2))
      this.$emit('update:street', this.getArrayIndexValue(value, 3))
    },
    province(value) {
      this.resetCityValueList()
    },
    city(value) {
      this.resetCityValueList()
    },
    county(value) {
      this.resetCityValueList()
    },
    street(value) {
      this.resetCityValueList()
    }
  },
  created() {
    this.resetCityValueList()
  },
  methods: {
    resetCityValueList() {
      this.value = [this.province, this.city, this.county, this.street]
    },
    getArrayIndexValue(array, index) {
      return array && array instanceof Array && array.length > index && index >= 0 ? array[index] : null
    }
  }
}
</script>
