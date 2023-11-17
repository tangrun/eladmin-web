<template>
  <el-card header="项目申报" style="margin: 20px;width: 80%">
    <el-form
      ref="form"
      :inline="false"
      :model="createProjectForm"
      :rules="createProjectRules"
      size="small"
      label-width="100px"
    >
      <el-form-item label="项目名称" prop="projectName" required>
        <el-input v-model="createProjectForm.projectName" />
      </el-form-item>
      <el-form-item label="项目编号" prop="projectCode" required>
        <el-input v-model.number="createProjectForm.projectCode" />
      </el-form-item>
      <el-form-item label="项目类别" prop="categoryType" required>
        <el-input v-model.number="createProjectForm.categoryType" />
      </el-form-item>
      <el-form-item label="上级项目" prop="projectParent" required>
        <el-select v-model="createProjectForm.projectParent" filterable placeholder="请选择">
          <el-option
            v-for="item in dict.source_funds"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目计划" prop="projectPlan" required>
        <el-select v-model="createProjectForm.projectPlan" filterable placeholder="请选择">
          <el-option
            v-for="item in dict.source_funds"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目负责人" required>
        <el-select v-model="createProjectForm.source" filterable placeholder="请选择">
          <el-option
            v-for="item in dict.source_funds"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型" prop="categoryType" required>
        <el-select v-model="createProjectForm.source" filterable placeholder="请选择">
          <el-option
            v-for="item in dict.source_funds"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="行政区域" required>
        <el-cascader
          style="width: 100%"
          :options="cityOptions"
          :props="cityOptionsProps"
          :clearable="true"
          :show-all-levels="true"
          :filterable="true"
        />
      </el-form-item>
      <el-form-item label="项目时间" prop="projectTime">
        <el-date-picker
          v-model="createProjectForm.projectTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="启动时间"
          end-placeholder="结束时间"
          @change="createProjectForm.onTimeChange"
        />
      </el-form-item>
      <el-form-item label="项目概述" prop="overview">
        <el-input v-model.number="createProjectForm.overview" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="需求分析" prop="demand">
        <el-input v-model.number="createProjectForm.demand" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="项目备注" prop="remark">
        <el-input v-model.number="createProjectForm.remark" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="项目书" prop="proposal">
        <el-upload
          action="#"
          :show-file-list="true"
          list-type="picture"
          :on-change="createProjectForm.onProposalChange"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="项目合同" prop="contract">
        <el-upload
          action="#"
          :show-file-list="true"
          list-type="picture"
          :on-change="createProjectForm.onContractChange"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="合同金额" prop="amount">
        <el-input v-model.number="createProjectForm.amount" type="number">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="配套资金" prop="counterpartFunding">
        <el-input v-model.number="createProjectForm.counterpartFunding" type="number">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-row justify="center" type="flex">
      <el-button type="text" @click="$router.back()">取消
      </el-button>
      <el-button :loading="createProjectConfig.loading" type="primary" @click="onCreateProjectClick">确认
      </el-button>
    </el-row>
  </el-card>
</template>

<script>
import cityOptions from '@/utils/cityOptions'

export default {
  name: 'CreateProject',
  dicts: ['source_funds'],
  data() {
    return {
      createProjectConfig: {
        visible: false,
        loading: false
      },
      createProjectForm: {
        onTimeChange: (params) => {
          if (params) {
            this.createProjectForm.startTime = params[0]
            this.createProjectForm.endTime = params[1]
          } else {
            this.createProjectForm.startTime = null
            this.createProjectForm.endTime = null
          }
          console.log(params, this.createProjectForm)
        },
        // onTimeChange(time) {
        //   console.log(time)
        // },
        onProposalChange(file, fileList) {
          console.log(file, fileList)
        },
        onContractChange(file, fileList) {
          console.log(file, fileList)
        }
      },
      createProjectRules: {
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
      },
      cityOptions,
      cityOptionsProps: {
        value: 'name',
        label: 'name',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  methods: {
    onCreateProjectClick() {
      this.createProjectConfig.loading = true
      setTimeout(() => {
        this.createProjectConfig.loading = false
        this.createProjectConfig.visible = false
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
