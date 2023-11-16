<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="自评ID">
            <el-input v-model="form.selfId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="评估期">
            <el-input v-model="form.interim" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目执行总结">
            <el-input v-model="form.summary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="下一步工作安排记建议">
            <el-input v-model="form.nextRule" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目创新性">
            <el-input v-model="form.innovation" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目可持续性">
            <el-input v-model="form.continuity" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目特色、高点">
            <el-input v-model="form.characteristic" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目反思">
            <el-input v-model="form.reflect" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建日期">
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
        <!--<el-table-column prop="selfId" label="自评ID" />-->
        <!--<el-table-column prop="projectId" label="项目ID" />-->
        <el-table-column prop="interim" label="评估期" />
        <el-table-column prop="summary" label="项目执行总结" />
        <el-table-column prop="nextRule" label="下一步工作安排记建议" />
        <el-table-column prop="innovation" label="项目创新性" />
        <el-table-column prop="continuity" label="项目可持续性" />
        <el-table-column prop="characteristic" label="项目特色、高点" />
        <el-table-column prop="reflect" label="项目反思" />
        <el-table-column prop="createBy" label="创建者" />
        <el-table-column prop="createTime" label="创建日期" />
        <el-table-column v-if="checkPer(['admin','projectSelf:edit','projectSelf:del'])" label="操作" width="150px" align="center">
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
import crudProjectSelf from '@/api/project/self'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { selfId: null, projectId: null, interim: null, summary: null, nextRule: null, innovation: null, continuity: null, characteristic: null, reflect: null, createBy: null, createTime: null }
export default {
  name: 'ProjectSelf',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'project', url: 'api/projectSelf', idField: 'selfId', sort: 'selfId,desc', crudMethod: { ...crudProjectSelf }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'projectSelf:add'],
        edit: ['admin', 'projectSelf:edit'],
        del: ['admin', 'projectSelf:del']
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
