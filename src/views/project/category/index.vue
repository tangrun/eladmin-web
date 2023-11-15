<!--<template>-->
<!--  <div class="app-container">-->
<!--    &lt;!&ndash;工具栏&ndash;&gt;-->
<!--    <div class="head-container">-->
<!--      <eHeader :dict="dict" :permission="permission" />-->
<!--      <crudOperation :permission="permission" />-->
<!--    </div>-->
<!--    &lt;!&ndash;表格渲染&ndash;&gt;-->
<!--    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">-->
<!--      <el-table-column type="selection" width="55" />-->
<!--      <el-table-column prop="name" label="名称" />-->
<!--      <el-table-column prop="categorySort" label="排序">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.jobSort }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="status" label="状态" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-switch-->
<!--            v-model="scope.row.enabled"-->
<!--            active-color="#409EFF"-->
<!--            inactive-color="#F56C6C"-->
<!--            @change="changeEnabled(scope.row, scope.row.enabled)"-->
<!--          />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="createTime" label="创建日期" />-->
<!--      &lt;!&ndash;   编辑与删除   &ndash;&gt;-->
<!--      <el-table-column-->
<!--        v-if="checkPer(['admin','job:edit','job:del'])"-->
<!--        label="操作"-->
<!--        width="130px"-->
<!--        align="center"-->
<!--        fixed="right"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          <udOperation-->
<!--            :data="scope.row"-->
<!--            :permission="permission"-->
<!--          />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    &lt;!&ndash;分页组件&ndash;&gt;-->
<!--    <pagination />-->
<!--    &lt;!&ndash;表单渲染&ndash;&gt;-->
<!--    <eForm :job-status="dict.job_status" />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import crudJob from '@/api/system/job'-->
<!--import eHeader from './module/header'-->
<!--import eForm from './module/form'-->
<!--import CRUD, { presenter } from '@crud/crud'-->
<!--import crudOperation from '@crud/CRUD.operation'-->
<!--import pagination from '@crud/Pagination'-->
<!--import udOperation from '@crud/UD.operation'-->
<!--export default {-->
<!--  name: 'Category',-->
<!--  components: { eHeader, eForm, crudOperation, pagination, udOperation },-->
<!--  cruds() {-->
<!--    return CRUD({-->
<!--      title: '项目类别',-->
<!--      url: 'api/category',-->
<!--      sort: ['categorySort,asc', 'id,desc'],-->
<!--      crudMethod: { ...crudJob }-->
<!--    })-->
<!--  },-->
<!--  mixins: [presenter()],-->
<!--  // 数据字典-->
<!--  dicts: ['job_status'],-->
<!--  data() {-->
<!--    return {-->
<!--      permission: {-->
<!--        add: ['admin', 'category:add'],-->
<!--        edit: ['admin', 'category:edit'],-->
<!--        del: ['admin', 'category:del']-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 改变状态-->
<!--    changeEnabled(data, val) {-->
<!--      this.$confirm('此操作将 "' + this.dict.label.job_status[val] + '" ' + data.name + '项目类别, 是否继续？', '提示', {-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning'-->
<!--      }).then(() => {-->
<!--        // eslint-disable-next-line no-undef-->
<!--        crudJob.edit(data).then(() => {-->
<!--          // eslint-disable-next-line no-undef-->
<!--          this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')-->
<!--        }).catch(err => {-->
<!--          data.enabled = !data.enabled-->
<!--          console.log(err.data.message)-->
<!--        })-->
<!--      }).catch(() => {-->
<!--        data.enabled = !data.enabled-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style rel="stylesheet/scss" lang="scss" scoped>-->
<!-- ::v-deep .el-input-number .el-input__inner {-->
<!--    text-align: left;-->
<!--  }-->
<!--</style>-->
