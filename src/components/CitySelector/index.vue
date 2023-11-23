<script>
import { Cascader } from 'element-ui'
import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'

export default {
  name: 'CitySelector',
  mixins: [Cascader],
  props: {
    ...Cascader.props,
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
    }
  }

}
</script>
