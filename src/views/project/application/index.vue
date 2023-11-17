<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">项目类型</label>
        <!--        <el-input v-model="query.projectType" clearable placeholder="项目类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <el-select
          v-model="query.projectType"
          clearable
          size="small"
          placeholder="项目类型"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.project_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query.category"
          clearable
          size="small"
          placeholder="项目类别"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.project_category"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu > 0"
        :title="crud.status.title"
        width="500px"
      >
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构ID">
            <el-input v-model="form.organId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.projectName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="form.projectCode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目类别">
            <el-input v-model="form.categoryId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上级项目">
            <el-input v-model="form.parentId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目计划及资助方">
            <el-input v-model="form.planId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目负责人">
            <el-input v-model="form.leaderId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目类型">
            <el-input v-model="form.projectType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="form.provinceId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="市">
            <el-input v-model="form.cityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="区">
            <el-input v-model="form.countyId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="街道">
            <el-input v-model="form.streetId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="社区">
            <el-input v-model="form.communityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="启动时间">
            <el-input v-model="form.startTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.endTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目概述">
            <el-input v-model="form.overview" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="需求分析">
            <el-input v-model="form.demand" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目备注">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目状态：0、未开始；1、执行中；2、已完成">
            <el-input v-model="form.projectStatus" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="审批状态：0、未审批；1、审批通过；2、审批不通过">
            <el-input v-model="form.approvalStatus" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目书">
            <el-input v-model="form.proposal" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目合同">
            <el-input v-model="form.contract" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="合同金额">
            <el-input v-model="form.amount" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="配套资金">
            <el-input v-model="form.counterpartFunding" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%;"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <!--<el-table-column prop="projectId" label="ID" />-->
        <!--<el-table-column prop="organId" label="机构ID" />-->
        <el-table-column prop="projectName" label="项目名称">
          <template slot-scope="scope">
            <router-link :to="$router.currentRoute.path+'/'+scope.row.id">
              <span>{{ scope.row.projectName }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="projectCode" label="项目编号" />
        <el-table-column prop="categoryId" label="项目类别">
          <template slot-scope="scope">
            {{ dict.label.project_category[scope.row.categoryId] }}
          </template>
        </el-table-column>
        <el-table-column prop="parentId" label="上级项目" />
        <el-table-column prop="planId" label="项目计划" />
        <!--<el-table-column prop="leaderId" label="项目负责人" />-->
        <el-table-column prop="projectType" label="项目类型">
          <template slot-scope="scope">
            {{ dict.label.project_type[scope.row.projectType] }}
          </template>
        </el-table-column>
        <!--<el-table-column prop="provinceId" label="省" />-->
        <!--<el-table-column prop="cityId" label="市" />-->
        <!--<el-table-column prop="countyId" label="区" />-->
        <!--<el-table-column prop="streetId" label="街道" />-->
        <!--<el-table-column prop="communityId" label="社区" />-->
        <el-table-column prop="startTime" label="启动时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <!--<el-table-column prop="overview" label="项目概述" />-->
        <!--<el-table-column prop="demand" label="需求分析" />-->
        <!--<el-table-column prop="remark" label="项目备注" />-->
        <el-table-column prop="projectStatus" label="项目状态">
          <template slot-scope="scope">
            {{ dict.label.execution_status[scope.row.projectStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="approvalStatus" label="审批状态">
          <template slot-scope="scope">
            {{ dict.label.approval_status[scope.row.approvalStatus] }}
          </template>
        </el-table-column>
        <!-- 审批状态：0、未审批；1、审批通过；2、审批不通过-->
        <!--<el-table-column prop="proposal" label="项目书" />-->
        <!--<el-table-column prop="contract" label="项目合同" />-->
        <!--<el-table-column prop="amount" label="合同金额" />-->
        <!--<el-table-column prop="counterpartFunding" label="配套资金" />-->
        <!--<el-table-column prop="createTime" label="创建时间" />-->
        <!--<el-table-column prop="createBy" label="创建人" />-->
        <!--        <el-table-column v-if="checkPer(['admin','application:edit','application:del'])" label="操作" width="150px" align="center">-->
        <el-table-column
          v-if="checkPer(['admin','application:edit','application:del'])"
          label="操作"
          width="150px"
          align="center"
        >
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudApplication from '@/api/project/application'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { projectId: null, organId: null, projectName: null, projectCode: null, categoryId: null, parentId: null, planId: null, leaderId: null, projectType: null, provinceId: null, cityId: null, countyId: null, streetId: null, communityId: null, startTime: null, endTime: null, overview: null, demand: null, remark: null, projectStatus: null, approvalStatus: null, proposal: null, contract: null, amount: null, counterpartFunding: null, createTime: null, createBy: null }
export default {
  name: 'Application',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['project_category', 'target_status', 'execution_status', 'project_type', 'approval_status'],
  cruds() {
    return CRUD({ title: 'application', url: 'api/application', idField: 'projectId', sort: 'projectId,desc', crudMethod: { ...crudApplication }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'application:add'],
        edit: ['admin', 'application:edit'],
        del: ['admin', 'application:del']
      },
      rules: {
        projectId: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'projectType', display_name: '项目类型' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
