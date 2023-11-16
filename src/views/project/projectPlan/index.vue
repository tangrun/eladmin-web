<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">资金来源</label>
        <el-select
          v-model="query.source"
          clearable
          size="small"
          placeholder="资金来源"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.source_funds"
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
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="计划ID">
            <el-input v-model="form.planId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上级项目">
            <el-input v-model="form.parentId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="form.planStatus" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.execution_status"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.planName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目类别">
            <el-input v-model="form.categoryId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="资金来源">
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
            <el-input v-model="form.overview" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目备注">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目公告">
            <el-input v-model="form.notice" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目负责人">
            <el-input v-model="form.leaderId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目书">
            <el-input v-model="form.proposal" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目合同">
            <el-input v-model="form.contract" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="启动时间">
            <el-input v-model="form.startTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.endTime" style="width: 370px;" />
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
            <el-input v-model="form.deadline" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="落地地区">
            <el-input v-model="form.landingArea" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <!--<el-table-column prop="planId" label="计划ID" />-->
        <el-table-column prop="parentId" label="上级项目" />
        <el-table-column prop="planStatus" label="项目状态">
          <template slot-scope="scope">
            {{ dict.label.plan_status[scope.row.planStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="planName" label="项目名称" />
        <el-table-column prop="categoryId" label="项目类别">
          <template slot-scope="scope">
            {{ dict.label.project_category[scope.row.categoryId] }}
          </template>
        </el-table-column>
        <el-table-column prop="source" label="资金来源">
          <template slot-scope="scope">
            {{ dict.label.source_funds[scope.row.source] }}
          </template>
        </el-table-column>
        <!--<el-table-column prop="overview" label="项目概述" />-->
        <!--<el-table-column prop="remark" label="项目备注" />-->
        <!--<el-table-column prop="notice" label="项目公告" />-->
        <!--<el-table-column prop="createBy" label="创建人" />-->
        <el-table-column prop="createTime" label="创建时间" />
        <!--<el-table-column prop="leaderId" label="项目负责人" />-->
        <!--<el-table-column prop="proposal" label="项目书" />-->
        <!--<el-table-column prop="contract" label="项目合同" />-->
        <el-table-column prop="startTime" label="启动时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <!--<el-table-column prop="contacts" label="联系人" />-->
        <!--<el-table-column prop="phone" label="联系电话" />-->
        <!--<el-table-column prop="email" label="项目投稿邮箱" />-->
        <!--<el-table-column prop="address" label="联系地址" />-->
        <!--<el-table-column prop="deadline" label="投稿截止时间" />-->
        <!--<el-table-column prop="landingArea" label="落地地区" />-->
        <el-table-column v-if="checkPer(['admin','projectPlan:edit','projectPlan:del'])" label="操作" width="150px" align="center">
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
import crudProjectPlan from '@/api/project/projectPlan'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { planId: null, parentId: null, planStatus: null, planName: null, categoryId: null, source: null, overview: null, remark: null, notice: null, createBy: null, createTime: null, leaderId: null, proposal: null, contract: null, startTime: null, endTime: null, contacts: null, phone: null, email: null, address: null, deadline: null, landingArea: null }
export default {
  name: 'ProjectPlan',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['execution_status', 'source_funds', 'plan_status', 'project_category'],
  cruds() {
    return CRUD({ title: 'projectPlan', url: 'api/projectPlan', idField: 'planId', sort: 'planId,desc', crudMethod: { ...crudProjectPlan }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'projectPlan:add'],
        edit: ['admin', 'projectPlan:edit'],
        del: ['admin', 'projectPlan:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'source', display_name: '资金来源：专项资金、配套资金、支持资金' }
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
