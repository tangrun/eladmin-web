<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">变更类型</label>
        <el-input v-model="query.changeType" clearable placeholder="变更类型：项目内容变更、预算变更" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.changeTime"
          start-placeholder="changeTimeStart"
          end-placeholder="changeTimeStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="变更ID">
            <el-input v-model="form.changeId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="变更类型">
            <el-input v-model="form.changeType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="变更时间">
            <el-date-picker v-model="form.changeTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="变更内容">
            <el-input v-model="form.changeContent" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="变更文件">
            <el-input v-model="form.changeFiles" style="width: 370px;" />
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
        <!--<el-table-column prop="changeId" label="变更ID" />-->
        <!--<el-table-column prop="projectId" label="项目ID" />-->
        <el-table-column prop="changeType" label="变更类型：项目内容变更、预算变更" />
        <el-table-column prop="changeTime" label="变更时间" />
        <el-table-column prop="changeContent" label="变更内容" />
        <el-table-column prop="changeFiles" label="变更文件" />
        <el-table-column v-if="checkPer(['admin','project:change:edit','project:change:del'])" label="操作" width="150px" align="center">
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
import crudChange from '@/api/project/change'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { changeId: null, projectId: null, changeType: null, changeTime: null, changeContent: null, changeFiles: null }
export default {
  name: 'Change',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'change', url: 'api/project/change', idField: 'changeId', sort: 'changeId,desc', crudMethod: { ...crudChange }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'project:change:add'],
        edit: ['admin', 'project:change:edit'],
        del: ['admin', 'project:change:del']
      },
      rules: {
        projectId: [
          { required: true, message: '项目ID不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'changeType', display_name: '变更类型：项目内容变更、预算变更' }
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
