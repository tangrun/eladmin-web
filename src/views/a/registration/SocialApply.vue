<template>
  <el-card header="社会组织注册" style="width: 60%">
    <el-form ref="form" :model="formData" :rules="formRules" label-width="150px">
      <el-form-item label="机构名称" :required="true" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="机构简介" prop="description">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item label="机构社会信用代码" :required="true" prop="creditCode">
        <el-input v-model="formData.creditCode" />
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

      <el-form-item label="营业执照复印件" :required="true" prop="businessLicenseCopy">
        <el-upload
          action="#"
          :show-file-list="true"
          list-type="picture"
          :on-change="handleChange"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <router-link key="collapse" class="navbar-logo-link" to="/">
          <el-button>返回</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'SocialApply',
  data() {
    return {
      formData: {
        name: '',
        description: '',
        creditCode: '',
        managerName: '',
        managerPhone: '',
        managerEmail: '',
        businessLicenseCopy: null
      },
      formRules: {
        name: [
          {
            required: true,
            message: '请输入机构名称',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '名字不能太长',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ],
        creditCode: [
          {
            required: true,
            message: '请输入机构社会信用代码',
            trigger: 'blur'
          }
        ],
        managerName: [
          {
            required: true,
            message: '请输入管理员名字',
            trigger: 'blur'
          }
        ],
        managerPhone: [
          {
            required: true,
            message: '请输入管理员电话',
            trigger: 'blur'
          }
        ],
        managerEmail: [
          {
            required: true,
            message: '请输入管理员邮箱',
            trigger: 'blur'
          }
        ],
        businessLicenseCopy: [
          {
            required: true,
            message: '请上传营业执照复印件',
            trigger: 'blur'
          }
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
          url: 'registration/social/apply',
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
    },
    handleChange(file, fileList) {
      this.formData.businessLicenseCopy = file
    }
  }
}
</script>

<style scoped>

</style>
