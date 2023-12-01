<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="form.planId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="目标名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="目标阶段：投入、产出、影响、成效">
            <el-radio v-for="item in dict.target_status" :key="item.id" v-model="form.targetType" :label="item.value">{{ item.label }}</el-radio>
          </el-form-item>
          <el-form-item label="目标值">
            <el-input v-model="form.targetNum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="权重">
            <el-input v-model="form.weight" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-input v-model="form.startTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.endTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="录入人">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="录入时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
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
        <!--<el-table-column prop="planId" label="ID" />-->
        <!--<el-table-column prop="projectId" label="项目ID" />-->
        <el-table-column prop="name" label="目标名称" />
        <el-table-column prop="targetType" label="目标阶段">
          <template slot-scope="scope">
            {{ dict.label.target_status[scope.row.targetType] }}
          </template>
        </el-table-column>
        <el-table-column prop="targetNum" label="目标值" />
        <el-table-column prop="weight" label="权重" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createBy" label="录入人" />
        <el-table-column prop="createTime" label="录入时间" />
        <el-table-column v-if="checkPer(['admin','project:objective:edit','project:objective:del'])" label="操作" width="150px" align="center">
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
import crudProjectApplicationPlan from '@/api/project/plan'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { planId: null, projectId: null, name: null, targetType: null, targetNum: null, weight: null, startTime: null, endTime: null, remark: null, createBy: null, createTime: null }
export default {
  name: 'ProjectApplicationPlan',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['target_status'],
  cruds() {
    return CRUD({ title: 'plan', url: 'api/project/objective', idField: 'planId', sort: 'planId,desc', crudMethod: { ...crudProjectApplicationPlan }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'project:objective:add'],
        edit: ['admin', 'project:objective:edit'],
        del: ['admin', 'project:objective:del']
      },
      rules: {
        projectId: [
          { required: true, message: '项目ID不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '目标名称不能为空', trigger: 'blur' }
        ]
      }
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
