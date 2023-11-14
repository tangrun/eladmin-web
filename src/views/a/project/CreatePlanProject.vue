<template>

  <el-card header="新增储备项目" style="margin: 20px">
    <el-form
      :inline="false"
      :model="createPlanProjectForm"
      :rules="createPlanProjectRules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="项目名称" prop="projectName" required>
        <el-input v-model="createPlanProjectForm.projectName" />
      </el-form-item>
      <el-form-item label="项目类别" prop="categoryType" required>
        <el-input v-model="createPlanProjectForm.categoryType" />
      </el-form-item>
      <el-form-item label="项目概述" prop="overview" required>
        <el-input v-model.number="createPlanProjectForm.overview" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="项目备注" prop="remark">
        <el-input v-model.number="createPlanProjectForm.remark" />
      </el-form-item>
      <el-form-item label="项目公告" prop="notice">
        <el-input v-model.number="createPlanProjectForm.notice" />
      </el-form-item>
    </el-form>
    <el-row justify="center" type="flex">
      <el-button type="text" @click="$router.back()">取消
      </el-button>
      <el-button :loading="createPlanProjectConfig.loading" type="primary" @click="onCreatePlanProjectClick">确认
      </el-button>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'CreatePlanProject',
  data() {
    return {
      createPlanProjectConfig: {
        visible: false,
        loading: false
      },
      createPlanProjectForm: {},
      createPlanProjectRules: {
        projectName: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        }], categoryType: [{
          required: true,
          message: '请选择项目类别',
          trigger: 'blur'
        }], overview: [{
          required: true,
          message: '请输入项目概述',
          trigger: 'blur'
        }]
      }
    }
  }, methods: {
    onCreatePlanProjectClick() {
      this.createPlanProjectConfig.loading = true
      setTimeout(() => {
        this.createPlanProjectConfig.loading = false
        this.createPlanProjectConfig.visible = false
        this.$message({
          message: '新增成功',
          type: 'info'
        })
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>
