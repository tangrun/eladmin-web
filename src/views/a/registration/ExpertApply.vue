<template>
  <el-card header="专家注册" style="width: 60%">
    <el-form ref="form" :model="formData" :rules="formRules" label-width="150px">
      <el-form-item label="姓名" :required="true" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formData.sex" placeholder="请选择">
          <el-option
            v-for="item in optionsSex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单位" :required="true" prop="company">
        <el-input v-model="formData.company" />
      </el-form-item>
      <el-form-item label="资质" :required="true" prop="qualification">
        <el-select v-model="formData.qualification" placeholder="请选择">
          <el-option
            v-for="item in optionsQualification"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌" :required="true" prop="political">
        <el-select v-model="formData.political" placeholder="请选择">
          <el-option
            v-for="item in optionsPolitical"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码" :required="true" prop="identity">
        <el-input v-model="formData.identity" />
      </el-form-item>
      <el-form-item label="电话" :required="true" prop="mobile">
        <el-input v-model="formData.mobile" />
      </el-form-item>
      <el-form-item label="银行账户" :required="true" prop="bankAccountNumber">
        <el-input v-model="formData.bankAccountNumber" />
      </el-form-item>
      <el-form-item label="开户银行" :required="true" prop="depositBank">
        <el-input v-model="formData.depositBank" />
      </el-form-item>
      <el-form-item label="个人简介" :required="true" prop="personalProfile">
        <el-input v-model="formData.personalProfile" />
      </el-form-item>

      <el-form-item label="身份证复印件正面" :required="true" prop="identityFrontCopy">
        <el-upload
          action="#"
          :show-file-list="true"
          list-type="picture"
          :on-change="handleChangeIdentityFront"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="身份证复印件背面" :required="true" prop="identityBackCopy">
        <el-upload
          action="#"
          :show-file-list="true"
          list-type="picture"
          :on-change="handleChangeIdentityBack"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="资质扫描件" :required="true" prop="qualificationCopy">
        <el-upload
          action="#"
          :show-file-list="true"
          list-type="picture"
          :on-change="handleChangeQualification"
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
  name: 'ExpertApply',
  data() {
    return {
      optionsSex: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ], optionsQualification: [
        {
          value: '正高',
          label: '正高'
        },
        {
          value: '副高',
          label: '副高'
        },
        {
          value: '中级',
          label: '中级'
        }
      ], optionsPolitical: [
        {
          value: '党员',
          label: '党员'
        },
        {
          value: '团员',
          label: '团员'
        },
        {
          value: '群众',
          label: '群众'
        }
      ],
      formData: {
        name: null,
        sex: null,
        company: null,
        qualification: null,
        political: null,
        identity: null,
        mobile: null,
        bankAccountNumber: null,
        depositBank: null,
        personalProfile: null,
        identityFrontCopy: null,
        identityBackCopy: null,
        qualificationCopy: null
      },
      formRules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: false,
            message: '请选择性别',
            trigger: 'blur'
          }
        ],
        company: [
          {
            required: true,
            message: '请输入单位',
            trigger: 'blur'
          }
        ],
        qualification: [
          {
            required: true,
            message: '请选择资质',
            trigger: 'blur'
          }
        ],
        political: [
          {
            required: true,
            message: '请选择政治面貌',
            trigger: 'blur'
          }
        ],
        identity: [
          {
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }
        ],
        bankAccountNumber: [
          {
            required: true,
            message: '请输入银行账户',
            trigger: 'blur'
          }
        ],
        depositBank: [
          {
            required: true,
            message: '请输入开户银行信息',
            trigger: 'blur'
          }
        ], personalProfile: [
          {
            required: true,
            message: '请输入个人简介',
            trigger: 'blur'
          }
        ],
        identityFrontCopy: [
          {
            required: true,
            message: '请上传身份证复印件正面',
            trigger: 'blur'
          }
        ], identityBackCopy: [
          {
            required: true,
            message: '请上传身份证复印件背面',
            trigger: 'blur'
          }
        ], qualificationCopy: [
          {
            required: true,
            message: '请上传资质扫描件',
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
          url: 'registration/expert/apply',
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
    handleChangeIdentityFront(file, fileList) {
      this.formData.identityFrontCopy = file
    },
    handleChangeIdentityBack(file, fileList) {
      this.formData.identityBackCopy = file
    },
    handleChangeQualification(file, fileList) {
      this.formData.qualificationCopy = file
    }
  }
}
</script>

<style scoped>

</style>
