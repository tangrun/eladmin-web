<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="活动ID">
            <el-input v-model="form.activeId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目目标ID">
            <el-input v-model="form.planId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动主题">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动内容">
            <el-input v-model="form.content" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动时间">
            <el-input v-model="form.activeTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动地点">
            <el-input v-model="form.venue" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="参与活动人数">
            <el-input v-model="form.num" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动成效">
            <el-input v-model="form.effect" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动费用">
            <el-input v-model="form.fee" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否验收">
            <el-input v-model="form.ischecked" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
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
        <!--<el-table-column prop="activeId" label="活动ID" />-->
        <!--<el-table-column prop="projectId" label="项目ID" />-->
        <!--<el-table-column prop="planId" label="项目目标ID" />-->
        <el-table-column prop="name" label="活动主题" />
        <el-table-column prop="content" label="活动内容" />
        <el-table-column prop="activeTime" label="活动时间" />
        <el-table-column prop="venue" label="活动地点" />
        <el-table-column prop="num" label="参与活动人数" />
        <el-table-column prop="effect" label="活动成效" />
        <el-table-column prop="fee" label="活动费用" />
        <el-table-column prop="ischecked" label="是否验收" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ischecked"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row, scope.row.ischecked)"
            />
          </template>
        </el-table-column>
        <!--<el-table-column prop="createBy" label="创建人" />-->
        <!--<el-table-column prop="createTime" label="创建时间" />-->
        <el-table-column v-if="checkPer(['admin','active:edit','active:del'])" label="操作" width="150px" align="center">
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
import crudActive from '@/api/project/active'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { activeId: null, projectId: null, planId: null, name: null, content: null, activeTime: null, venue: null, num: null, effect: null, fee: null, ischecked: null, createBy: null, createTime: null }
export default {
  name: 'Active',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'active', url: 'api/active', idField: 'activeId', sort: 'activeId,desc', crudMethod: { ...crudActive }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'active:add'],
        edit: ['admin', 'active:edit'],
        del: ['admin', 'active:del']
      },
      rules: {
        projectId: [
          { required: true, message: '项目ID不能为空', trigger: 'blur' }
        ]
      }    }
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
