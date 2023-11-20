<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" v-for="item in dict.user_sex" :key="item.id" :label="item.value">{{ item.label }}</el-radio>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="form.company" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="资质">
            <el-input v-model="form.qualification" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="form.political" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="form.identity" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="银行账户">
            <el-input v-model="form.bankAccountNumber" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开户银行">
            <el-input v-model="form.depositBank" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="form.personalProfile" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="身份证复印件正面">
            <el-input v-model="form.identityFrontId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="身份证复印件背面">
            <el-input v-model="form.identityBackId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="资质扫描件">
            <el-input v-model="form.qualificationId" style="width: 370px;" />
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
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别 1男 2女">
          <template slot-scope="scope">
            {{ dict.label.user_sex[scope.row.sex] }}
          </template>
        </el-table-column>
        <el-table-column prop="company" label="单位" />
        <el-table-column prop="qualification" label="资质" />
        <el-table-column prop="political" label="政治面貌" />
        <el-table-column prop="identity" label="身份证" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="bankAccountNumber" label="银行账户" />
        <el-table-column prop="depositBank" label="开户银行" />
        <el-table-column prop="personalProfile" label="个人简介" />
        <el-table-column prop="identityFrontId" label="身份证复印件正面" />
        <el-table-column prop="identityBackId" label="身份证复印件背面" />
        <el-table-column prop="qualificationId" label="资质扫描件" />
        <el-table-column v-if="checkPer(['admin','sysUserExpertApply:edit','sysUserExpertApply:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="115"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
              :disabled-dle="scope.row.id === user.id"
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
import crudSysUserExpertApply from '@/api/sysUserExpertApply'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, name: null, sex: null, company: null, qualification: null, political: null, identity: null, mobile: null, bankAccountNumber: null, depositBank: null, personalProfile: null, identityFrontId: null, identityBackId: null, qualificationId: null, state: null, remark: null }
export default {
  name: 'SysUserExpertApply',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['user_sex'],
  cruds() {
    return CRUD({ title: 'ss', url: 'api/sysUserExpertApply', idField: 'id', sort: 'id,desc', crudMethod: { ...crudSysUserExpertApply }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'sysUserExpertApply:add'],
        edit: ['admin', 'sysUserExpertApply:edit'],
        del: ['admin', 'sysUserExpertApply:del']
      },
      rules: {
      }    }
  },
  created() {
    this.crud.opt.add = false
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
