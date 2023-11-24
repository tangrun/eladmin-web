<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.blurry"
          clearable
          size="small"
          placeholder="输入关键词搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <el-select
          v-model="query.category"
          size="small"
          class="filter-item"
          clearable
          filterable
          placeholder="项目类别"
        >
          <el-option
            v-for="item in dict.project_category"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <CitySelector
          placeholder="落地区域"
          class="filter-item"
          size="small"
          :province.sync="query.province"
          :city.sync="query.city"
          :county.sync="query.county"
          :street.sync="query.street"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission">
        <span slot="right">
          <el-button
            v-permission="permission.split"
            class="filter-item"
            type="primary"
            icon="el-icon-delete"
            size="mini"
            :loading="crud.status.cu === 2"
            :disabled="crud.selections.length !== 1"
            @click="toSpilt"
          >
            项目拆分
          </el-button>
        </span>
      </crudOperation>
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu > 0"
        :title="splitProject? '拆分项目':crud.status.title"
        width="550px"
      >
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
          <!--        <el-form-item label="计划ID">-->
          <!--          <el-input v-model="form.planId"  />-->
          <!--        </el-form-item>-->
          <el-form-item v-if="splitProject" label="上级项目">
            <span>{{ splitProject.planName }}</span>
            <!--            <el-input :disabled="false"></el-input>-->
          </el-form-item>
          <el-form-item label="项目名称" prop="planName">
            <el-input v-model="form.planName" />
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="form.planStatus" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.plan_status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目类别" prop="categoryId">
            <el-select v-model="form.category" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.project_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="资金来源" prop="source">
            <el-select v-model="form.sourceFunds" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.source_funds"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目概述">
            <el-input v-model="form.overview" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="项目备注">
            <el-input v-model="form.remark" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="项目公告">
            <el-input v-model="form.notice" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="项目负责人" prop="leaderId">
            <!--          <el-input v-model="form.leaderId"  />-->
            <el-select
              v-model="form.leader"
              filterable
              placeholder="请选择"
              :loading="leaderConfig.loading"
              @visible-change="onLeaderSelectVisibleChange"
            >
              <el-option
                v-for="item in leaderConfig.users"
                :key="item.id"
                :label="`${item.nickName}[${item.dept.name}]`"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目书">
            <!--          <el-input v-model="form.proposal"  />-->
            <el-upload
              ref="proposals"
              :action="this.$store.getters.baseApi + '/api/projectPlan/upload'"
              :show-file-list="true"
              list-type="text"
              :headers="uploadHeaders"
              :auto-upload="true"
              :multiple="true"
              :limit="1"
              :accept="mimetypeAllDoc()"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="项目合同">
            <!--          <el-input v-model="form.contract"  />-->
            <el-upload
              ref="contracts"
              :action="this.$store.getters.baseApi + '/api/projectPlan/upload'"
              :show-file-list="true"
              list-type="text"
              :headers="uploadHeaders"
              :auto-upload="true"
              :multiple="true"
              :limit="1"
              :accept="mimetypeAllDoc()"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <!--        <el-form-item label="启动时间">-->
          <!--          <el-input v-model="form.startTime"  />-->
          <!--        </el-form-item>-->
          <!--        <el-form-item label="结束时间">-->
          <!--          <el-input v-model="form.endTime"  />-->
          <!--        </el-form-item>-->
          <el-form-item label="项目时间">
            <!--          <el-input v-model="form.endTime"  />-->
            <DateTimeRangePicker
              :start-time.sync="form.startTime"
              :end-time.sync="form.endTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="启动时间"
              end-placeholder="结束时间"
            />
            <!--            <el-date-picker-->
            <!--              v-model="form.projectTime"-->
            <!--              type="datetimerange"-->
            <!--              range-separator="至"-->
            <!--              start-placeholder="启动时间"-->
            <!--              end-placeholder="结束时间"-->
            <!--            />-->
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.contacts" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="项目投稿邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item label="投稿截止时间">
            <el-date-picker
              v-model="form.deadline"
              type="datetime"
              range-separator="至"
              start-placeholder="启动时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="落地地区">
            <CitySelector
              :province.sync="form.province"
              :city.sync="form.city"
              :county.sync="form.county"
              :street.sync="form.street"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%;"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" size="mini" class="table-expand">
              <el-form-item label="上级项目" label-width="50px">
                <span>{{ props.row.parent ? props.row.parent.planName : '无' }}</span>
              </el-form-item>
              <el-form-item label="项目概述">
                <span>{{ props.row.overview }}</span>
              </el-form-item>
              <el-form-item label="项目概述">
                <span>{{ props.row.overview }}</span>
              </el-form-item>
              <el-form-item label="项目备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
              <el-form-item label="项目公告">
                <span>{{ props.row.notice }}</span>
              </el-form-item>
              <el-form-item label="项目负责人">
                <span>{{ props.row.leader ? props.row.leader.name : '' }}</span>
              </el-form-item>
              <el-form-item label="项目时间">
                <span>{{ props.row.startTime + '-' + props.row.endTime }}</span>
              </el-form-item>
              <el-form-item label="联系人">
                <span>{{ props.row.contacts }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="项目投稿邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="联系地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="投稿截止时间">
                <span>{{ props.row.deadline }}</span>
              </el-form-item>
              <el-form-item label="落地地区">
                <span>{{
                  props.row.province + '-' + props.row.city + '-' + props.row.county + '-' + props.row.street
                }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!--<el-table-column prop="planId" label="计划ID" />-->
        <el-table-column prop="planName" label="项目名称" />
        <el-table-column prop="categoryId" label="项目类别">
          <template slot-scope="scope">
            {{ dict.label.project_category[scope.row.categoryId] }}
          </template>
        </el-table-column>
        <el-table-column prop="planStatus" label="计划状态">
          <template slot-scope="scope">
            {{ dict.label.plan_status[scope.row.planStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="source" label="资金来源">
          <template slot-scope="scope">
            {{ dict.label.source_funds[scope.row.source] }}
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkPer(['admin','projectPlan:edit','projectPlan:del'])"
          label="操作"
          width="150px"
          align="center"
        >
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
import crudProjectPlan from '@/api/project/projectPlan'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import CitySelector from '@/components/CitySelector/index.vue'
import { mimetypeAllDoc } from '@/utils'
import { initData } from '@/api/data'
import DateTimeRangePicker from '@/components/DateTimeRangePicker/index.vue'
import { mapGetters } from 'vuex'
import { uploader } from '@/components/Uploader'

const defaultForm = {
  planId: null,
  parent: null,
  planStatus: null,
  planName: null,
  category: null,
  sourceFunds: null,
  overview: null,
  remark: null,
  notice: null,
  leader: null,
  proposals: [],
  contracts: [],
  startTime: null,
  endTime: null,
  contacts: null,
  phone: null,
  email: null,
  address: null,
  deadline: null,
  province: null,
  city: null,
  county: null,
  street: null,
  community: null
}
export default {
  name: 'ProjectPlan',
  components: { DateTimeRangePicker, CitySelector, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud(), uploader()],
  dicts: ['execution_status', 'source_funds', 'plan_status', 'project_category'],
  computed: {
    ...mapGetters([
      'baseApi'
    ])
  },
  mounted() {
    console.log('created', this.$refs)
  },
  cruds() {
    return CRUD({
      title: '项目计划',
      url: 'api/projectPlan',
      idField: 'planId',
      sort: 'planId,desc',
      crudMethod: { ...crudProjectPlan }
    })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'projectPlan:add'],
        edit: ['admin', 'projectPlan:edit'],
        del: ['admin', 'projectPlan:del'],
        split: ['admin', 'projectPlan:split']
      },
      rules: {
        planName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        category: { required: true, message: '请选择项目类型', trigger: 'blur' },
        sourceFund: { required: true, message: '请选择资金来源', trigger: 'blur' },
        startTime: { required: true, message: '请选择启动时间', trigger: 'blur' },
        endTime: { required: true, message: '请选择结束时间', trigger: 'blur' }
      },
      queryTypeOptions: [
        { key: 'source', display_name: '资金来源：专项资金、配套资金、支持资金' }
      ],
      leaderConfig: {
        loaded: false,
        loading: false,
        users: []
      },
      splitProject: null
    }
  },
  methods: {
    toSpilt() {
      console.log(this)
      this.splitProject = this.crud.selections[0]
      console.log(this.splitProject)
      this.crud.toAdd()
    },
    mimetypeAllDoc,
    [CRUD.HOOK.beforeValidateCU]() {
      console.log('beforeValidateCU', this.form.planName)
      return true
    },
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    [CRUD.HOOK.beforeSubmit]() {
      this.form.contracts = this.getUploadIds(this.$refs.contracts)
      this.form.proposals = this.getUploadIds(this.$refs.proposals)
      console.log(this.form)
      return true
    },
    onLeaderSelectVisibleChange(visible) {
      if (!visible) return
      if (this.leaderConfig.loaded) return
      this.leaderConfig.loading = true
      initData('api/users/deptUsers', {
        enabled: true
      }).then(res => {
        this.leaderConfig.loaded = true
        this.leaderConfig.loading = false
        this.leaderConfig.users = res.content
      }).catch(() => {
        this.leaderConfig.loading = false
      })
    }
  }
}
</script>

<style scoped>
.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
