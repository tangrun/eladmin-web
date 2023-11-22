<template>
  <el-row type="flex" justify="center">
    <el-card header="新增储备项目" style="margin: 20px;width: 80%">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <!--        <el-form-item label="计划ID">-->
        <!--          <el-input v-model="form.planId" style="width: 370px;" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="上级项目">-->
        <!--          <el-input v-model="form.parentId" style="width: 370px;" />-->
        <!--        </el-form-item>-->
        <el-form-item label="项目名称" prop="planName">
          <el-input v-model="form.planName" style="width: 370px;" />
        </el-form-item>
        <!--        <el-form-item label="项目状态">-->
        <!--          <el-select v-model="form.planStatus" filterable placeholder="请选择">-->
        <!--            <el-option-->
        <!--              v-for="item in dict.execution_status"-->
        <!--              :key="item.id"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="项目类别" prop="categoryId">
          <el-select v-model="form.categoryId" filterable placeholder="请选择">
            <el-option
              v-for="item in dict.project_category"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="资金来源" prop="source">
          <el-select v-model="form.source" filterable placeholder="请选择">
            <el-option
              v-for="item in dict.source_funds"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目概述">
          <el-input v-model="form.overview" style="width: 370px;" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="项目备注">
          <el-input v-model="form.remark" style="width: 370px;" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="项目公告">
          <el-input v-model="form.notice" style="width: 370px;" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="项目负责人" prop="leaderId">
          <!--          <el-input v-model="form.leaderId" style="width: 370px;" />-->
          <el-select
            v-model="form.leaderId"
            filterable
            placeholder="请选择"
            :loading="leaderConfig.loading"
            @visible-change="onLeaderSelectVisibleChange"
          >
            <el-option
              v-for="item in leaderConfig.users"
              :key="item.id"
              :label="`${item.nickName}[${item.dept.name}]`"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目书">
          <!--          <el-input v-model="form.proposal" style="width: 370px;" />-->
          <UploadWrapper>
            <el-upload
              v-model="form.proposalFiles"
              action="#"
              :show-file-list="true"
              list-type="text"
              :auto-upload="false"
              :multiple="true"
              :limit="3"
              :accept="mimetypeAllDoc"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </UploadWrapper>
        </el-form-item>
        <el-form-item label="项目合同">
          <!--          <el-input v-model="form.contract" style="width: 370px;" />-->
          <el-upload
            :file-list="form.contractFiles"
            action="#"
            :show-file-list="true"
            list-type="text"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
            :accept="mimetypeAllDoc"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!--        <el-form-item label="启动时间">-->
        <!--          <el-input v-model="form.startTime" style="width: 370px;" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="结束时间">-->
        <!--          <el-input v-model="form.endTime" style="width: 370px;" />-->
        <!--        </el-form-item>-->
        <el-form-item label="项目时间">
          <!--          <el-input v-model="form.endTime" style="width: 370px;" />-->

          <el-date-picker
            v-model="form.projectTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="启动时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目投稿邮箱">
          <el-input v-model="form.email" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="form.address" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="投稿截止时间">
          <el-date-picker
            v-model="form.deadline"
            type="datetime"
            range-separator="至"
            start-placeholder="启动时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="落地地区">
          <el-cascader
            v-model="form.landingArea"
            style="width: 100%"
            :options="cityOptions"
            :props="cityOptionsProps"
            :clearable="true"
            :show-all-levels="true"
            :filterable="true"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="$router.back()">取消</el-button>
          <el-button :loading="submitConfig.loading" type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>

import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'
import { initData } from '@/api/data'
import { mimetypeAllDoc } from '@/utils'
import { add } from '@/api/project/projectPlan'
import UploadWrapper from '@/views/project/projectPlan/UploadWrapper.vue'

// const defaultForm = {
//   planId: null,
//   parentId: null,
//   planStatus: null,
//   planName: null,
//   categoryId: null,
//   source: null,
//   overview: null,
//   remark: null,
//   notice: null,
//   createBy: null,
//   createTime: null,
//   leaderId: null,
//   proposal: null,
//   contract: null,
//   startTime: null,
//   endTime: null,
//   contacts: null,
//   phone: null,
//   email: null,
//   address: null,
//   deadline: null,
//   landingArea: null,
//   proposalFiles: []
// }
export default {
  name: 'CreatePlanProject',
  components: { UploadWrapper },
  dicts: ['execution_status', 'source_funds', 'plan_status', 'project_category'],
  data: function() {
    return {
      proposalFiles: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      mimetypeAllDoc,
      cityOptions,
      cityOptionsProps,
      submitConfig: {
        loading: false
      },
      leaderConfig: {
        loaded: false,
        loading: false,
        users: []
      },
      form: {
        proposalFiles: [],
        contractFiles: []
      },
      rules: {
        planName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        categoryId: { required: true, message: '请选择项目类型', trigger: 'blur' },
        source: { required: true, message: '请选择资金来源', trigger: 'blur' },
        leaderId: { required: true, message: '请选择负责人', trigger: 'blur' }
      }
    }
  },
  watch: {
    'form.projectTime': {
      handler(value, old) {
        if (value && value.length === 2) {
          this.form.startTime = value[0].getTime()
          this.form.endTime = value[1].getTime()
        } else {
          this.form.startTime = null
          this.form.endTime = null
        }
      },
      deep: true
    },
    'form.contractFiles': {
      handler(value, old) {
        this.form.contract = value && value.length > 0 ? value[0].raw : null
      },
      deep: true
    },
    'form.proposalFiles': {
      handler(value, old) {
        console.log('----', value, old)
        this.form.proposal = value && value.length > 0 ? value[0].raw : null
      },
      deep: true
    }
  },
  created() {
    // this.resetForm()
    setTimeout(() => {
      this.form.proposalFiles = [{}, {}]
    }, 3000)
  },
  methods: {
    onRemove(file) {
      console.log('onRemove', file)
    },
    onChange(file, fileList) {
      console.log('onChange', file, fileList)
      this.proposalFiles = fileList
    },
    onSubmit() {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.submitConfig.loading = true
        add(this.form).then(() => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
        }).catch((err) => {
          this.$notify({
            title: '添加失败',
            message: err,
            type: 'error',
            duration: 2500
          })
        })
      })
    },
    resetForm() {
      // this.form = { ...defaultForm }
    },
    onLeaderSelectVisibleChange(visible) {
      if (!visible) return
      if (this.leaderConfig.loaded) return
      this.leaderConfig.loading = true
      initData('api/users/deptUsers', {
        enabled: true
      }).then(res => {
        this.leaderConfig.loaded = true
        this.leaderConfig.loading = false
        this.leaderConfig.users = res.content
      }).catch(() => {
        this.leaderConfig.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
