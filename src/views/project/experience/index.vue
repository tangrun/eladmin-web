<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="项目经验ID">
            <el-input v-model="form.experienceId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开始日期">
            <el-date-picker v-model="form.startTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="执行单位">
            <el-input v-model="form.workUnit" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目状态：0、执行中；1、已结项">
            <el-select v-model="form.status" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.execution_status"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目佐证">
            <el-input v-model="form.files" style="width: 370px;" />
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
        <!--<el-table-column prop="experienceId" label="项目经验ID" />-->
        <!--<el-table-column prop="projectId" label="项目ID" />-->
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="startTime" label="开始日期" />
        <el-table-column prop="workUnit" label="执行单位" />
        <el-table-column prop="status" label="项目状态">
          <template slot-scope="scope">
            {{ dict.label.execution_status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column prop="files" label="项目佐证" />
        <el-table-column v-if="checkPer(['admin','project:experience:edit','project:experience:del'])" label="操作" width="150px" align="center">
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
import crudProjectExperience from '@/api/project/experience'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { experienceId: null, projectId: null, name: null, startTime: null, workUnit: null, status: null, files: null }
export default {
  name: 'ProjectExperience',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['execution_status'],
  cruds() {
    return CRUD({ title: 'experience', url: 'api/project/experience', idField: 'experienceId', sort: 'experienceId,desc', crudMethod: { ...crudProjectExperience }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'project:experience:add'],
        edit: ['admin', 'project:experience:edit'],
        del: ['admin', 'project:experience:del']
      },
      rules: {
        projectId: [
          { required: true, message: '项目ID不能为空', trigger: 'blur' }
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
