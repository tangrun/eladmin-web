<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">行政等级</label>
        <el-input v-model="query.administrativeLevel" clearable placeholder="行政等级" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="行政等级" prop="administrativeLevel">
            未设置字典，请手动设置 Select
          </el-form-item>
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
          <el-form-item label="管理员名字" prop="managerName">
            <el-input v-model="form.managerName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管理员电话" prop="managerPhone">
            <el-input v-model="form.managerPhone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管理员邮箱" prop="managerEmail">
            <el-input v-model="form.managerEmail" style="width: 370px;" />
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
        <el-table-column prop="administrativeLevel" label="行政等级" />
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
        <el-table-column prop="state" label="审核状态" />
        <el-table-column prop="remark" label="审核说明" />
        <el-table-column v-if="checkPer(['admin','sysUserCompetentApply:edit','sysUserCompetentApply:del'])" label="操作" width="150px" align="center">
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
import crudSysUserCompetentApply from '@/api/sysUserCompetentApply'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation.vue'
import crudOperation from '@crud/CRUD.operation.vue'
import udOperation from '@crud/UD.operation.vue'
import pagination from '@crud/Pagination.vue'

const defaultForm = { id: null, administrativeLevel: null, province: null, city: null, county: null, street: null, community: null, name: null, description: null, phone: null, email: null, fax: null, address: null, managerName: null, managerPhone: null, managerEmail: null, state: null, remark: null }
export default {
  name: 'SysUserCompetentApply',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'cccccs', url: '/registration/competent/list', idField: 'id', sort: 'id,desc', crudMethod: { ...crudSysUserCompetentApply }})
  },
  data() {
    return {
      permission: {
        del: ['admin', 'registration:competent:del']
      },
      rules: {
        administrativeLevel: [
          { required: true, message: '行政等级不能为空', trigger: 'blur' }
        ],
        managerName: [
          { required: true, message: '管理员名字不能为空', trigger: 'blur' }
        ],
        managerPhone: [
          { required: true, message: '管理员电话不能为空', trigger: 'blur' }
        ],
        managerEmail: [
          { required: true, message: '管理员邮箱不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'administrativeLevel', display_name: '行政等级' }
      ]
    }
  },
  created() {
    this.crud.optShow.add = false
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
