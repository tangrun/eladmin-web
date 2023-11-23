<template>
  <el-cascader
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :clearable="true"
    :show-all-levels="true"
    :filterable="true"
    :options="cityOptions"
    :props="cityOptionsProps"
    style="width: 100%"
    @input="onChange"
  />
</template>

<script>
import {Cascader} from 'element-ui'
import CityOptions, {cityOptions, cityOptionsProps} from '@/utils/cityOptions'

export default {
  name: 'CitySelector',
  computed: {
    cityOptions() {
      return cityOptions
    },
    cityOptionsProps() {
      return cityOptionsProps
    }
  },
  mixins: [Cascader],
  data() {
    return {}
  },
  props: {
    ...Cascader.props,
    value: {
      type: String | Number | Object,
    },
    options: {
      type: Array,
      default: () => {
        return cityOptions
      }
    },
    props: {
      type: Object,
      default: () => {
        return cityOptionsProps
      }
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
  methods: {
    CityOptions,
    onChange(value) {
      console.log('cccc ', this.value, value)
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
