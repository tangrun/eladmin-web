<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="省">
            <el-input v-model="form.province" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="市">
            <el-input v-model="form.city" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="县、区">
            <el-input v-model="form.county" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="街道">
            <el-input v-model="form.street" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="社区">
            <el-input v-model="form.community" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构名称">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构简介">
            <el-input v-model="form.description" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构电话">
            <el-input v-model="form.phone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构邮箱">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构传真">
            <el-input v-model="form.fax" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="机构地址">
            <el-input v-model="form.address" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管理员名字">
            <el-input v-model="form.managerName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管理员电话">
            <el-input v-model="form.managerPhone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管理员邮箱">
            <el-input v-model="form.managerEmail" style="width: 370px;" />
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
        <el-table-column prop="province" label="省" />
        <el-table-column prop="city" label="市" />
        <el-table-column prop="county" label="县、区" />
        <el-table-column prop="street" label="街道" />
        <el-table-column prop="community" label="社区" />
        <el-table-column prop="name" label="机构名称" />
        <el-table-column prop="description" label="机构简介" />
        <el-table-column prop="phone" label="机构电话" />
        <el-table-column prop="email" label="机构邮箱" />
        <el-table-column prop="fax" label="机构传真" />
        <el-table-column prop="address" label="机构地址" />
        <el-table-column prop="managerName" label="管理员名字" />
        <el-table-column prop="managerPhone" label="管理员电话" />
        <el-table-column prop="managerEmail" label="管理员邮箱" />
        <el-table-column prop="createBy" label="创建者" />
        <el-table-column prop="updateBy" label="更新者" />
        <el-table-column prop="createTime" label="创建日期" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column v-if="checkPer(['admin','sysUserCompetent:edit','sysUserCompetent:del'])" label="操作" width="150px" align="center">
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
import crudSysUserCompetent from '@/api/sysUserCompetent'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, administrativeLevel: null, province: null, city: null, county: null, street: null, community: null, name: null, description: null, phone: null, email: null, fax: null, address: null, managerName: null, managerPhone: null, managerEmail: null, createBy: null, updateBy: null, createTime: null, updateTime: null }
export default {
  name: 'SysUserCompetent',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '主管机构信息', url: 'api/sysUserCompetent', idField: 'id', sort: 'id,desc', crudMethod: { ...crudSysUserCompetent }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'sysUserCompetent:add'],
        edit: ['admin', 'sysUserCompetent:edit'],
        del: ['admin', 'sysUserCompetent:del']
      },
      rules: {
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
