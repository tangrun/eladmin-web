<template>
  <el-card header="主管机构注册" style="width: 60%">
    <el-form ref="form" :model="formData" :rules="formRules" label-width="150px">
      <el-form-item label="机构名称" :required="true" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="机构简介" :required="false" prop="description">
        <el-input v-model="formData.description" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="行政级别" :required="true" prop="administrativeArea">
        <el-cascader
          v-model="formData.administrativeArea"
          style="width: 100%"
          :options="cityOptions"
          :props="cityOptionsProps"
          :clearable="true"
          :show-all-levels="true"
          :filterable="true"
        />
      </el-form-item>
      <el-form-item label="机构电话" :required="false" prop="phone">
        <el-input v-model="formData.phone" />
      </el-form-item>
      <el-form-item label="机构邮箱" :required="false" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="机构传真" :required="false" prop="fax">
        <el-input v-model="formData.fax" />
      </el-form-item>
      <el-form-item label="机构地址" :required="false" prop="address">
        <el-input v-model="formData.address" />
      </el-form-item>
      <el-form-item label="管理员名字" :required="true" prop="managerName">
        <el-input v-model="formData.managerName" />
      </el-form-item>
      <el-form-item label="管理员电话" :required="true" prop="managerPhone">
        <el-input v-model="formData.managerPhone" />
      </el-form-item>
      <el-form-item label="管理员邮箱" :required="true" prop="managerEmail">
        <el-input v-model="formData.managerEmail" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import request from '@/utils/request'
import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'

export default {
  name: 'SocialApply',
  data() {
    return {
      cityOptions,
      cityOptionsProps,
      formData: {},
      formRules: {
        administrativeArea: [
          { required: true, type: 'array', message: '请选择行政级别', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '请输入单位简介', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '请输入单位电话', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入单位邮箱', trigger: 'blur' }
        ],
        fax: [
          { required: false, message: '请输入单位传真', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '请输入单位地址', trigger: 'blur' }
        ],
        managerName: [
          { required: true, message: '请输入管理员名字', trigger: 'blur' }
        ],
        managerPhone: [
          { required: true, message: '请输入管理员电话', trigger: 'blur' }
        ],
        managerEmail: [
          { required: true, message: '请输入管理员邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.formData)
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        request({
          url: 'registration/competent/apply',
          method: 'post',
          data: this.formData
        }).then(res => {
          this.$notify({
            title: '提交成功',
            type: 'success',
            duration: 2500
          })
        }).catch(error => {
          console.log(error)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
