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
            <el-input v-model="form.userId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="form.deptId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="头像地址">
            <el-input v-model="form.avatarName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="头像真实路径">
            <el-input v-model="form.avatarPath" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否为admin账号">
            <el-input v-model="form.isAdmin" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="状态：1启用、0禁用">
            <el-input v-model="form.enabled" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新者">
            <el-input v-model="form.updateBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="修改密码的时间">
            <el-input v-model="form.pwdResetTime" style="width: 370px;" />
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
        <el-table-column prop="userId" label="ID" />
        <el-table-column prop="deptId" label="部门名称" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="phone" label="手机号码" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="avatarName" label="头像地址" />
        <el-table-column prop="avatarPath" label="头像真实路径" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="isAdmin" label="是否为admin账号" />
        <el-table-column prop="enabled" label="状态：1启用、0禁用" />
        <el-table-column prop="createBy" label="创建者" />
        <el-table-column prop="updateBy" label="更新者" />
        <el-table-column prop="pwdResetTime" label="修改密码的时间" />
        <el-table-column prop="createTime" label="创建日期" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column v-if="checkPer(['admin','sysUser:edit','sysUser:del'])" label="操作" width="150px" align="center">
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
import crudSysUser from '@/api/sysUser'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import crudUser from '@/api/system/user'

const defaultForm = { userId: null, deptId: null, username: null, nickName: null, gender: null, phone: null, email: null, avatarName: null, avatarPath: null, password: null, isAdmin: null, enabled: null, createBy: null, updateBy: null, pwdResetTime: null, createTime: null, updateTime: null }
export default {
  name: 'SysUser',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '用户', url: 'api/users', crudMethod: { ...crudUser }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'sysUser:add'],
        edit: ['admin', 'sysUser:edit'],
        del: ['admin', 'sysUser:del']
      },
      rules: {
      }}
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
