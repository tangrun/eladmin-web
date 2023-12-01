<template>
  <el-row type="flex" justify="center">
    <el-card header="新增储备项目" style="margin: 20px;width: 80%">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <!--        <el-form-item label="上级项目" required>-->
        <!--          <el-select v-model="form.planStatus" filterable placeholder="请选择">-->
        <!--            <el-option-->
        <!--              v-for="item in dict.execution_status"-->
        <!--              :key="item.id"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="项目名称" required>
          <el-input v-model="form.planName" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目类别" required>
          <el-select v-model="form.projectCategory" filterable placeholder="请选择">
            <el-option
              v-for="item in dict.project_category"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="资金来源" required>
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
          <el-input v-model="form.overview" type="textarea" rows="3" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目备注">
          <el-input v-model="form.remark" type="textarea" rows="3" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目公告">
          <el-input v-model="form.notice" type="textarea" rows="3" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目负责人" required>
          <el-select v-model="form.source" filterable placeholder="请选择">
            <el-option
              v-for="item in dict.source_funds"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目书" required>
          <el-input v-model="form.proposal" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目合同" required>
          <el-input v-model="form.contract" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目时间" required>
          <el-date-picker
            v-model="form.projectTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="启动时间"
            end-placeholder="结束时间"
            @change="form.onTimeChange"
          />
        </el-form-item>
        <el-form-item label="联系人" required>
          <el-input v-model="form.contacts" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="form.phone" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="项目投稿邮箱" required>
          <el-input v-model="form.email" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="联系地址" required>
          <el-input v-model="form.address" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="投稿截止时间" required>
          <el-date-picker
            v-model="form.projectTime"
            type="datetime"
            range-separator="至"
            start-placeholder="启动时间"
            end-placeholder="结束时间"
            @change="form.onTimeChange"
          />
        </el-form-item>
        <el-form-item label="落地地区" required>
          <el-cascader
            style="width: 100%"
            :options="cityOptions"
            :props="cityOptionsProps"
            :clearable="true"
            :show-all-levels="true"
            :filterable="true"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="$router.back()">取消
          </el-button>
          <el-button :loading="createPlanProjectConfig.loading" type="primary" @click="onCreatePlanProjectClick">确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
<script>

import { cityOptions, cityOptionsProps } from '@/utils/cityOptions'

export default {
  name: 'Create3',
  data() {
    return {
      cityOptions,
      cityOptionsProps,
      form: {},
      rules: {},
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
  },
  dicts: ['source_funds', 'execution_status', 'project_category'],
  methods: {
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
