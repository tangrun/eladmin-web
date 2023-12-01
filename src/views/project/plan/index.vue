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
        <el-select
          v-model="query.planStatus"
          size="small"
          class="filter-item"
          clearable
          filterable
          placeholder="项目状态"
        >
          <el-option
            v-for="item in dict.plan_status"
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
        :visible="crud.status.cu > 0"
        :title="form.parent? '拆分项目':crud.status.title"
        width="550px"
      >
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
          <!--        <el-form-item label="计划ID">-->
          <!--          <el-input v-model="form.planId"  />-->
          <!--        </el-form-item>-->
          <el-form-item v-if="form.parent" label="上级项目">
            <span>{{ form.parent.planName }}</span>
            <!--            <el-input :disabled="false"></el-input>-->
          </el-form-item>
          <el-form-item label="项目名称" prop="planName">
            <el-input v-model="form.planName" />
          </el-form-item>
          <!--          <el-form-item label="项目状态">-->
          <!--            <el-select v-model="form.planStatus" filterable placeholder="请选择">-->
          <!--              <el-option-->
          <!--                v-for="item in dict.plan_status"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
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
          <el-form-item label="项目负责人" prop="leader">
            <!--          <el-input v-model="form.leaderId"  />-->
            <el-select
              v-model="form.leader"
              value-key="id"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in leaderList"
                :key="item.id"
                :label="`${item.nickName} [${item.dept.name}]`"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目书">
            <!--          <el-input v-model="form.proposal"  />-->
            <el-upload
              ref="proposals"
              :action="this.$store.getters.baseApi + '/api/project/plan/upload'"
              :show-file-list="true"
              list-type="text"
              :headers="uploadHeaders"
              :file-list="form.proposals"
              :auto-upload="true"
              :multiple="true"
              :limit="1"
              :accept="mimeTypeOfAllDoc"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="项目合同">
            <!--          <el-input v-model="form.contract"  />-->
            <el-upload
              ref="contracts"
              :action="this.$store.getters.baseApi + '/api/project/plan/upload'"
              :show-file-list="true"
              list-type="text"
              :headers="uploadHeaders"
              :file-list="form.contracts"
              :auto-upload="true"
              :multiple="true"
              :limit="1"
              :accept="mimeTypeOfAllDoc"
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
          <el-button :loading="crud.status.cu === 2" type="primary" @click="isPublish = true; crud.submitCU()">
            提交项目
          </el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="isSave = true; crud.submitCU()">保存草稿
          </el-button>
          <el-button type="primary" @click="crud.cancelCU">取消创建</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%;"
        class="table_1"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="expand">
          <template slot-scope="props">
            <!--            <el-form label-position="top" size=" small " class="table-expand">
              <el-form-item label="上级项目">
                &lt;!&ndash;                label-width="50px"&ndash;&gt;
                <span>{{ props.row.parent ? props.row.parent.planName : '无' }}</span>
              </el-form-item>
              <el-form-item label="项目概述">
                <span>{{ props.row.overview }}</span>
              </el-form-item>
              &lt;!&ndash;              <el-form-item label="项目概述">
                <span>{{ props.row.overview }}</span>
              </el-form-item>&ndash;&gt;
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
                <span v-if="props.row.province">{{
                  props.row.province
                }}</span>
                <span v-if="props.row.city">{{
                  '-' + props.row.city
                }}</span>
                <span v-if="props.row.county">{{
                  '-' + props.row.county
                }}</span> <span v-if="props.row.street">{{
                  '-' + props.row.street
                }}</span>
              </el-form-item>
            </el-form>-->
            <el-descriptions id="el" title="项目详情" :column="3" :size="'medium'" border>
              <el-descriptions-item label="上级项目">
                <span
                  class="el_size"
                  style="display: inline-block; width: 100px;text-align: center"
                >{{ props.row.parent ? props.row.parent.planName : '无' }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="项目概述">
                <span style="display: inline-block; width: 100px;text-align: center">{{ props.row.overview }}</span>
              </el-descriptions-item>
              <!--              <el-form-item label="项目概述">
                  <span>{{ props.row.overview }}</span>
                </el-form-item>-->
              <el-descriptions-item label="项目备注">
                <span style="display: inline-block;width: 100px; text-align: center">{{ props.row.remark }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="项目公告">
                <span style="display: inline-block; width: 100px;text-align: center">{{ props.row.notice }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="项目负责人">
                <span
                  style="display: inline-block; width: 100px;text-align: center"
                >{{ props.row.leader ? props.row.leader.nickName : '' }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="项目时间">
                <span
                  v-if="props.row.startTime||props.row.endTime"
                  style="display: inline-block; width: 300px;text-align: center"
                >{{ props.row.startTime + '-' + props.row.endTime }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="联系人">
                <span style="display: inline-block; width: 100px;text-align: center">{{ props.row.contacts }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="联系电话">
                <span style="display: inline-block; width: 100px;text-align: center">{{ props.row.phone }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="项目投稿邮箱">
                <span style="display: inline-block; width: 300px;text-align: center">{{ props.row.email }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="联系地址">
                <span style="display: inline-block; width: 100px;text-align: center">{{ props.row.address }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="投稿截止时间">
                <span style="display: inline-block; width: 200px;text-align: center">{{ props.row.deadline }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="落地地区" style="display: inline-block; width: 100px;text-align: center">
                <span v-if="props.row.province">{{
                  props.row.province
                }}</span>
                <span v-if="props.row.city">{{
                  '-' + props.row.city
                }}</span>
                <span v-if="props.row.county">{{
                  '-' + props.row.county
                }}</span> <span v-if="props.row.street">{{
                  '-' + props.row.street
                }}</span>
              </el-descriptions-item>
              <el-descriptions-item v-if="checkPer(['admin','project:plan:review'])" span="3" label="审核">
                <div style="width: 100%;height: 42px">
                  <el-button
                    type="primary"
                    style="position: absolute;margin-left:100px;margin-top: 0px"
                    @click="review(props.row.id,true,'通过')"
                  >{{ '通过' }}
                  </el-button>
                  <el-button
                    type="primary"
                    style="position: absolute;margin-left: 500px;margin-top:0px"
                    @click="review(props.row.id,false,'不通过')"
                  >{{ '不通过' }}
                  </el-button>
                </div>
              </el-descriptions-item>
            </el-descriptions>

          </template>
        </el-table-column>
        <!--<el-table-column prop="planId" label="计划ID" />-->
        <el-table-column prop="planName" label="项目名称" align="center" />
        <el-table-column prop="categoryId" label="项目类别" align="center">
          <template slot-scope="scope">
            {{ dict.label.project_category[scope.row.category] }}
          </template>
        </el-table-column>
        <!--        <el-table-column prop="planStatus" label="计划状态" align="center">
          <template slot-scope="scope">
            {{ dict.label.plan_status[scope.row.planStatus] }}
          </template>
        </el-table-column>-->
        <!--        <el-table-column prop="source" label="资金来源">
          <template slot-scope="scope">
            {{ dict.label.source_funds[scope.row.province] }}
          </template>
        </el-table-column>-->
        <el-table-column prop="area" label="落地区域" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.province">{{
              scope.row.province
            }}</span>
            <span v-if="scope.row.city">{{
              '-' + scope.row.city
            }}</span>
            <span v-if="scope.row.county">{{
              '-' + scope.row.county
            }}</span> <span v-if="scope.row.street">{{
              '-' + scope.row.street
            }}</span>
            <!--            {{ scope.row.province + '-' + scope.row.city + '-' + scope.row.county + '-' + scope.row.street }}-->
          </template>
        </el-table-column>

        <!--        <el-table-column
          v-if="checkPer(['admin','projectPlan:edit','projectPlan:del'])"
          label="操作"
          width="150px"
          align="center"
        >-->
        <!--<el-table-column prop="overview" label="项目概述" />-->
        <!--<el-table-column prop="remark" label="项目备注" />-->
        <!--<el-table-column prop="notice" label="项目公告" />-->
        <!--<el-table-column prop="createBy" label="创建人" />-->
        <el-table-column prop="createTime" label="创建时间" sortable align="center" />
        <!--<el-table-column prop="leaderId" label="项目负责人" />-->
        <!--<el-table-column prop="proposal" label="项目书" />-->
        <!--<el-table-column prop="contract" label="项目合同" />-->
        <el-table-column prop="startTime" label="启动时间" sortable align="center" />
        <el-table-column prop="endTime" label="结束时间" sortable align="center" />
        <el-table-column prop="planStatus" label="项目状态" align="center">
          <template slot-scope="scope">
            <span>{{ dict.label.plan_status[scope.row.planStatus] }}</span>
          </template>
        </el-table-column>
        >
        <!--<el-table-column prop="contacts" label="联系人" />-->
        <!--<el-table-column prop="phone" label="联系电话" />-->
        <!--<el-table-column prop="email" label="项目投稿邮箱" />-->
        <!--<el-table-column prop="address" label="联系地址" />-->
        <!--<el-table-column prop="deadline" label="投稿截止时间" />-->
        <!--<el-table-column prop="landingArea" label="落地地区" />-->
        <el-table-column
          v-if="checkPer(['admin','project:plan:edit','project:plan:del'])"
          label="操作"
          width="200px"
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
import crudProjectPlan, { publish } from '@/api/project/projectPlan'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import CitySelector from '@/components/CitySelector/index.vue'
import { initData } from '@/api/data'
import DateTimeRangePicker from '@/components/DateTimeRangePicker/index.vue'
import { mapGetters } from 'vuex'
import { uploadHelper } from '@/components/Uploader'
import { save, review } from '@/api/project/projectPlan'
// import { get_save_draft } from '@/utils/globalParam'

const defaultForm = {
  planId: null,
  parent: null,
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
  mixins: [presenter(), header(), form(defaultForm), crud(), uploadHelper()],
  dicts: ['execution_status', 'source_funds', 'plan_status', 'project_category'],
  computed: {
    ...mapGetters([
      'baseApi'
    ])
  },
  cruds() {
    return CRUD({
      title: '项目计划',
      url: 'api/project/plan',
      idField: 'id',
      sort: 'id,desc',
      crudMethod: { ...crudProjectPlan }
    })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'project:plan:add'],
        edit: ['admin', 'project:plan:edit'],
        del: ['admin', 'project:plan:del'],
        split: ['admin', 'project:plan:split'],
        review: ['admin', 'project:plan:review']
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
      leaderList: [],
      // saveProject: true, // 是否显示草稿框
      loading_save: false,
      isSave: false,
      isPublish: false
    }
  },
  methods: {
    toSpilt() {
      this.crud.toAdd()
      this.form.parent = this.crud.selections[0]
    },
    review(param1, param2, param3) {
      var data = {
        'id': param1,
        'pass': param2,
        'remark': param3
      }
      review(data).then(() => {
        this.$notify.success('提交成功')
        this.crud.toQuery()
      })
    },
    [CRUD.HOOK.beforeToCU]() {
      // 加载领导
      if (this.leaderList.length === 0) {
        initData('api/project/plan/deptUsers', {
          enabled: true
        }).then(res => {
          this.leaderList = res.content
        })
      }
    },
    [CRUD.HOOK.beforeToEdit]() {
      // 文件列表
      this.form.contracts = this.getFileListFromLocalStoreList(this.form.contracts)
      this.form.proposals = this.getFileListFromLocalStoreList(this.form.proposals)
      console.log('beforeToEdit', this.form)
    },
    [CRUD.HOOK.beforeSubmit]() {
      let action = null
      if (this.isSave) {
        action = save
      }
      if (this.isPublish) {
        action = publish
      }
      if (action) {
        this.crud.status.add = CRUD.STATUS.PROCESSING
        action(this.crud.form).then(() => {
          this.crud.status.add = CRUD.STATUS.NORMAL
          this.crud.resetForm()
          this.$notify.success(this.isSave ? '保存成功' : this.isPublish ? '发布成功' : '')
          this.crud.toQuery()
        }).catch(() => {
          this.crud.status.add = CRUD.STATUS.PREPARED
        })
        return false
      }
      return true
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

/*.split{
  margin-left: 5px;
}*/
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
