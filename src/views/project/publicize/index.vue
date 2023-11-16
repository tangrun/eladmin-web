<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">媒体名称</label>
        <el-input v-model="query.mediaName" clearable placeholder="媒体名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">宣传主题</label>
        <el-input v-model="query.theme" clearable placeholder="宣传主题" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="宣传ID" prop="publicizeId">
            <el-input v-model="form.publicizeId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目ID" prop="projectId">
            <el-input v-model="form.projectId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="媒体名称" prop="mediaName">
            <el-input v-model="form.mediaName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="宣传主题">
            <el-input v-model="form.theme" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="媒体级别">
            <el-input v-model="form.mediaLevel" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="发布时间">
            <el-input v-model="form.publishTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="网站链接">
            <el-input v-model="form.url" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="form.files" style="width: 370px;" />
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
        <!--<el-table-column prop="publicizeId" label="宣传ID" />-->
        <!--<el-table-column prop="projectId" label="项目ID" />-->
        <el-table-column prop="mediaName" label="媒体名称" />
        <el-table-column prop="theme" label="宣传主题" />
        <el-table-column prop="mediaLevel" label="媒体级别">
          <template slot-scope="scope">
            {{ dict.label.media_level[scope.row.mediaLevel] }}
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" />
        <el-table-column prop="url" label="网站链接" />
        <el-table-column prop="files" label="图片" />
        <!--<el-table-column prop="createBy" label="创建人" />-->
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column v-if="checkPer(['admin','publicize:edit','publicize:del'])" label="操作" width="150px" align="center">
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
import crudPublicize from '@/api/project/publicize'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { publicizeId: null, projectId: null, mediaName: null, theme: null, mediaLevel: null, publishTime: null, url: null, files: null, createBy: null, createTime: null }
export default {
  name: 'Publicize',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['media_level'],
  cruds() {
    return CRUD({ title: 'publicize', url: 'api/publicize', idField: 'publicizeId', sort: 'publicizeId,desc', crudMethod: { ...crudPublicize }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'publicize:add'],
        edit: ['admin', 'publicize:edit'],
        del: ['admin', 'publicize:del']
      },
      rules: {
        publicizeId: [
          { required: true, message: '宣传ID不能为空', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '项目ID不能为空', trigger: 'blur' }
        ],
        mediaName: [
          { required: true, message: '媒体名称不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'mediaName', display_name: '媒体名称' },
        { key: 'theme', display_name: '宣传主题' }
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
