<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">类别名称</label>
        <el-input v-model="query.name" clearable placeholder="类别名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="form.categoryId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上级类别ID" prop="pid">
            <el-input v-model="form.pid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="类别名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="类别状态" prop="enabled">
            <el-input v-model="form.enabled" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.jobSort" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新者">
            <el-input v-model="form.updateBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建日期">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input v-model="form.updateTime" style="width: 370px;" />
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
        <!--<el-table-column prop="categoryId" label="ID" />-->
        <!--<el-table-column prop="pid" label="上级类别ID" />-->
        <el-table-column prop="name" label="类别名称" />
        <el-table-column prop="jobSort" label="排序" />
        <el-table-column prop="enabled" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row, scope.row.enabled)"
            />
          </template>
        </el-table-column>
        <!--<el-table-column prop="createBy" label="创建者" />-->
        <!--<el-table-column prop="updateBy" label="更新者" />-->
        <el-table-column prop="createTime" label="创建日期" />
        <!--<el-table-column prop="updateTime" label="更新时间" />-->
        <el-table-column v-if="checkPer(['admin','projectCategory:edit','projectCategory:del'])" label="操作" width="150px" align="center">
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
import crudProjectCategory from '@/api/project/category'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { categoryId: null, pid: null, name: null, enabled: null, jobSort: null, createBy: null, updateBy: null, createTime: null, updateTime: null }
export default {
  name: 'ProjectCategory',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'category', url: 'api/projectCategory', idField: 'categoryId', sort: 'categoryId,desc', crudMethod: { ...crudProjectCategory }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'projectCategory:add'],
        edit: ['admin', 'projectCategory:edit'],
        del: ['admin', 'projectCategory:del']
      },
      rules: {
        pid: [
          { required: true, message: '上级类别ID不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '类别名称不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '类别状态不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'name', display_name: '类别名称' }
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
