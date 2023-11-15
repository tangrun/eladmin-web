<template>
  <el-card header="主管机构注册" style="width: 60%">
    <el-form ref="form" :model="formData" :rules="formRules" label-position="left" label-width="150px">
<!--      <el-form-item label="行政级别" :required="true" prop="administrativeLevel">-->
<!--        <el-select-->
<!--          v-model="formData.administrativeLevel"-->
<!--          placeholder="请选择行政级别"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="item in optionsAdministrativeLevel"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item v-if="formData.administrativeLevel >= 2 " label="行政区域" prop="administrativeArea">-->
<!--        <el-select-->
<!--          v-if="formData.administrativeLevel >= 2 "-->
<!--          v-model="formData.province"-->
<!--          placeholder="请选择省"-->
<!--          prop="description"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="item in optionsAdministrativeLevel"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--        <el-select-->
<!--          v-if="formData.administrativeLevel >= 3 "-->
<!--          v-model="formData.city"-->
<!--          placeholder="请选择市"-->
<!--          prop="description1"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="item in optionsAdministrativeLevel"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--        <el-select v-if="formData.administrativeLevel >= 4 " v-model="formData.county" placeholder="请选择县/区">-->
<!--          <el-option-->
<!--            v-for="item in optionsAdministrativeLevel"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--        <el-select v-if="formData.administrativeLevel >= 5 " v-model="formData.street" placeholder="请选择街道">-->
<!--          <el-option-->
<!--            v-for="item in optionsAdministrativeLevel"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--        <el-select v-if="formData.administrativeLevel >= 6 " v-model="formData.community" placeholder="请选择社区">-->
<!--          <el-option-->
<!--            v-for="item in optionsAdministrativeLevel"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="机构名称" :required="true" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="机构简介" :required="false" prop="description">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item label="行政级别" :required="true" prop="administrativeLevel">
        <el-cascader
          style="width: 100%"
          v-model="formData.administrativeArea"
          :onchange="onAdministrativeAreaChange"
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
import cityOptions from '@/utils/cityOptions'

export default {
  name: 'SocialApply',
  data() {
    const validatorAdministrativeArea = (rule, value, callback) => {
      if (this.formData.administrativeLevel >= 2 && !this.formData.province) {
        callback(new Error('请选择省'))
        return
      }
      if (this.formData.administrativeLevel >= 3 && !this.formData.city) {
        callback(new Error('请选择市'))
        return
      }
      if (this.formData.administrativeLevel >= 4 && !this.formData.county) {
        callback(new Error('请选择县/区'))
        return
      }
      if (this.formData.administrativeLevel >= 5 && !this.formData.street) {
        callback(new Error('请选择街道'))
        return
      }
      if (this.formData.administrativeLevel >= 6 && !this.formData.community) {
        callback(new Error('请选择社区'))
        return
      }
      if (this.formData.administrativeLevel <= 5) {
        this.formData.community = null
      }
      if (this.formData.administrativeLevel <= 4) {
        this.formData.street = null
        this.formData.community = null
      }
      if (this.formData.administrativeLevel <= 3) {
        this.formData.county = null
        this.formData.street = null
        this.formData.community = null
      }
      if (this.formData.administrativeLevel <= 2) {
        this.formData.city = null
        this.formData.county = null
        this.formData.street = null
        this.formData.community = null
      }
      callback()
    }
    return {
      cityOptions,
      cityOptionsProps: {
        value: 'name',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      optionsAdministrativeLevel: [
        {
          value: 1,
          label: '国家'
        }, {
          value: 2,
          label: '省'
        }, {
          value: 3,
          label: '市'
        }, {
          value: 4,
          label: '县'
        }, {
          value: 5,
          label: '街道'
        }, {
          value: 6,
          label: '社区'
        }
      ],
      formData: {
        administrativeLevel: null,
        administrativeArea: null,
        province: null,
        city: null,
        county: null,
        street: null,
        community: null,
        name: null,
        description: null,
        phone: null,
        email: null,
        fax: null,
        address: null,
        managerName: null,
        managerPhone: null,
        managerEmail: null
      },
      formRules: {
        administrativeLevel: [
          {
            required: true,
            message: '请选择行政等级',
            trigger: 'blur'
          }
        ],
        administrativeArea: [
          {
            validator: validatorAdministrativeArea,
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入单位名称',
            trigger: 'blur'
          }
        ], description: [
          {
            required: false,
            message: '请输入单位简介',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: false,
            message: '请输入单位电话',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: false,
            message: '请输入单位邮箱',
            trigger: 'blur'
          }
        ],
        fax: [
          {
            required: false,
            message: '请输入单位传真',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: false,
            message: '请输入单位地址',
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
    },
    onAdministrativeAreaChange(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
