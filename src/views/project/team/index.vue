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
            <el-input v-model="form.memberId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="form.title" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目职务">
            <el-input v-model="form.duties" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="任职开始时间">
            <el-input v-model="form.entryTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="form.education" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.speciality" style="width: 370px;" />
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
        <!--<el-table-column prop="memberId" label="ID" />-->
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <!--<el-table-column prop="age" label="年龄" />-->
        <el-table-column prop="title" label="职称" />
        <el-table-column prop="duties" label="项目职务" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="entryTime" label="任职开始时间" />
        <!--<el-table-column prop="education" label="学历" />-->
        <!--<el-table-column prop="speciality" label="专业" />-->
        <el-table-column prop="remark" label="备注" />
        <!--<el-table-column prop="createBy" label="录入人" />-->
        <!--<el-table-column prop="createTime" label="录入时间" />-->
        <el-table-column v-if="checkPer(['admin','project:team:edit','project:team:del'])" label="操作" width="150px" align="center">
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
import crudApplicationTeam from '@/api/project/applicationTeam'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { memberId: null, name: null, sex: null, age: null, title: null, duties: null, mobile: null, email: null, entryTime: null, education: null, speciality: null, remark: null, createBy: null, createTime: null }
export default {
  name: 'ApplicationTeam',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'team', url: 'api/project/team', idField: 'memberId', sort: 'memberId,desc', crudMethod: { ...crudApplicationTeam }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'project:team:add'],
        edit: ['admin', 'project:team:edit'],
        del: ['admin', 'project:team:del']
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
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
