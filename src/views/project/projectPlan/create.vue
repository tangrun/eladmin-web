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
        <el-form-item label="项目类别" prop="projectCategory">
          <el-select v-model="form.projectCategory" filterable placeholder="请选择">
            <el-option
              v-for="item in dict.project_category"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="资金来源" prop="sourceFunds">
          <el-select v-model="form.sourceFunds" filterable placeholder="请选择">
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
        <el-form-item label="项目负责人">
          <el-input v-model="form.leaderId" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目书">
          <!--          <el-input v-model="form.proposal" style="width: 370px;" />-->
          <el-upload
            v-model="form.proposal"
            action="#"
            :show-file-list="true"
            list-type="picture"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="项目合同">
          <!--          <el-input v-model="form.contract" style="width: 370px;" />-->
          <el-upload
            v-model="form.contract"
            action="#"
            :show-file-list="true"
            list-type="picture"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>

import CRUD, { form, presenter } from '@crud/crud'
import crudProjectPlan from '@/api/project/projectPlan'
import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'

const defaultForm = { planId: null, parentId: null, planStatus: null, planName: null, categoryId: null, source: null, overview: null, remark: null, notice: null, createBy: null, createTime: null, leaderId: null, proposal: null, contract: null, startTime: null, endTime: null, contacts: null, phone: null, email: null, address: null, deadline: null, landingArea: null }
export default {
  name: 'CreatePlanProject',
  mixins: [presenter(), form(defaultForm)],
  dicts: ['execution_status', 'source_funds', 'plan_status', 'project_category'],
  cruds() {
    return CRUD({ title: 'projectPlan', url: 'api/projectPlan', idField: 'planId', sort: 'planId,desc', crudMethod: { ...crudProjectPlan }})
  },
  data: function() {
    return {
      cityOptions,
      cityOptionsProps,
      rules: {
        planName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        projectCategory: { required: true, message: '请选择项目类型', trigger: 'blur' },
        sourceFunds: { required: true, message: '请选择资金来源', trigger: 'blur' }
      }
    }
  },
  created() {
    this.crud.toAdd()
  }
}
</script>

<style scoped>

</style>
