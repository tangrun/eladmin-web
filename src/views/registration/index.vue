<template>
  <el-card header="选择注册类型" style="width: 60%">
    <el-row>
      <el-radio-group v-model="to">
        <el-radio-button label="/registration/competent">主管机构注册</el-radio-button>
        <el-radio-button label="/registration/socia">社会组织注册</el-radio-button>
        <el-radio-button label="/registration/expert">评审专家注册</el-radio-button>
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
      to: '/registration/competent'
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
