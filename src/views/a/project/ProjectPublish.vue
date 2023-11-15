<template>
  <el-card header="选择项目类型" style="width: 60%">
    <el-row>
      <el-radio-group v-model="to">
        <el-radio-button label="/registration/competentApply">储备项目</el-radio-button>
        <el-radio-button label="/registration/sociaApply">招标项目</el-radio-button>
        <el-radio-button label="/registration/expertApply">评审专家注册</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row style="height: 80px" />
    <el-row justify="center" type="flex">
      <el-button @click="next">下一步</el-button>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'RegistrationIndex',
  data() {
    return {
      to: '/registration/competentApply'
    }
  },
  methods: {
    next() {
      this.$router.push(this.to)
    }
  }
}
</script>

<style scoped>

</style>
