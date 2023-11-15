<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="督导ID">
            <el-input v-model="form.superviseId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="督导内容">
            <el-input v-model="form.content" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="督导主题">
            <el-input v-model="form.theme" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="督导评分">
            <el-input v-model="form.rating" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="督导建议">
            <el-input v-model="form.advise" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="form.files" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="督导老师">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="督导时间">
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
        <el-table-column prop="superviseId" label="督导ID" />
        <el-table-column prop="projectId" label="项目ID" />
        <el-table-column prop="content" label="督导内容" />
        <el-table-column prop="theme" label="督导主题" />
        <el-table-column prop="rating" label="督导评分" />
        <el-table-column prop="advise" label="督导建议" />
        <el-table-column prop="files" label="图片" />
        <el-table-column prop="createBy" label="督导老师" />
        <el-table-column prop="createTime" label="督导时间" />
        <el-table-column v-if="checkPer(['admin','projectSupervise:edit','projectSupervise:del'])" label="操作" width="150px" align="center">
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
import crudProjectSupervise from '@/api/project/supervise'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { superviseId: null, projectId: null, content: null, theme: null, rating: null, advise: null, files: null, createBy: null, createTime: null }
export default {
  name: 'ProjectSupervise',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'project', url: 'api/projectSupervise', idField: 'superviseId', sort: 'superviseId,desc', crudMethod: { ...crudProjectSupervise }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'projectSupervise:add'],
        edit: ['admin', 'projectSupervise:edit'],
        del: ['admin', 'projectSupervise:del']
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
