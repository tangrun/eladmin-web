<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->        <!-- 搜索 -->
        <el-input
          v-model="query.blurry"
          clearable
          size="small"
          placeholder="输入关键词搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <!--        <label class="el-form-item-label">项目类型</label>-->
        <!--        <el-input v-model="query.projectType" clearable placeholder="项目类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <el-select
          v-model="query.projectType"
          clearable
          size="small"
          placeholder="项目类型"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.project_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query.category"
          clearable
          size="small"
          placeholder="项目类别"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.project_category"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query.projectStatus"
          clearable
          size="small"
          placeholder="项目状态"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.project_status"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query.approvalStatus"
          clearable
          size="small"
          placeholder="审批状态"
          class="filter-item"
          style="width: 185px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="item in dict.approval_status"
            :key="item.id"
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
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'--><!--    fullscreen:true      "-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu > 0"
        :title="crud.status.title"
        width="550px"
      >
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="form.projectName" />
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="form.projectCode" />
          </el-form-item>
          <el-form-item label="项目类别">
            <!--            <el-input v-model="form.categoryId" style="width: 370px;" />-->
            <el-select v-model="form.category" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.project_category"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上级项目" prop="planProject">
            <!--          <el-input v-model="form.leaderId"  />-->
            <el-select
              v-model="form.planProject"
              value-key="id"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in planProjectList"
                :key="item.id"
                :label="item.planName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <!--            -->
          <!--              <el-form-item label="项目计划及资助方">-->
          <!--                <el-input v-model="form.planId"  />-->
          <!--              </el-form-item>-->
          <!--            -->
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
          <el-form-item label="项目类型">
            <el-select
              v-model="form.projectType"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in dict.project_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!--              <el-input v-model="form.projectType"  />-->
          </el-form-item>
          <el-form-item label="选择地区">
            <CitySelector
              :province.sync="form.province"
              :city.sync="form.city"
              :county.sync="form.county"
              :street.sync="form.street"
            />
          </el-form-item>
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
          <el-form-item label="项目概述">
            <el-input v-model="form.overview" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="需求分析">
            <el-input v-model="form.demand" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="项目备注">
            <!--            <el-input v-model="form.remark"  />-->
            <el-input v-model="form.remark" type="textarea" rows="3" />
          </el-form-item>
          <!--<el-form-item label="审批状态">
          &lt;!&ndash;            <el-input v-model="form.approvalStatus"  />&ndash;&gt;
          <el-select v-model="form.approvalStatus" filterable placeholder="请选择" >
            <el-option
              v-for="item in approvalStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>-->
          <el-form-item label="项目书">
            <!--          <el-input v-model="form.proposal"  />-->
            <el-upload
              ref="proposals"
              :action="this.$store.getters.baseApi + '/api/project/application/upload'"
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
          <el-form-item label="项目合同">
            <!--          <el-input v-model="form.contract"  />-->
            <el-upload
              ref="contracts"
              :action="this.$store.getters.baseApi + '/api/project/application/upload'"
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
          <el-form-item label="合同金额">
            <el-input v-model="form.amount" />
          </el-form-item>
          <el-form-item label="配套资金">
            <el-input v-model="form.counterpartFunding" />
          </el-form-item>
          <el-form-item />
          <!--              <el-form-item label="创建时间">
                             &lt;!&ndash;            <el-input v-model="form.createTime"  />&ndash;&gt;
                             <el-date-picker
                               v-model="form.createTime"
                               type="datetime"

                               placeholder="创建时间"
                             />
                           </el-form-item>-->
          <!--              <el-form-item label="创建人">
            <el-input v-model="form.createBy"  />
          </el-form-item>-->

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :loading="crud.status.cu === 2" type="primary" @click=" crud.submitCU">确认
          </el-button>
          <el-button type="primary" @click="crud.cancelCU">取消</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%;"
        @row-click="(row,colume,event)=>{$router.push({path: $route.path+'/'+row.id})}"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <!--<el-table-column prop="projectId" label="ID" />-->
        <!--<el-table-column prop="organId" label="机构ID" />-->
        <el-table-column prop="projectName" label="项目名称">
          <template slot-scope="scope">
            <span
              @click="$router.push({path: $route.path+'/'+scope.row.id})"
            >{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectCode" label="项目编号" />
        <el-table-column prop="category" label="项目类别">
          <template slot-scope="scope">
            {{ dict.label.project_category[scope.row.category] }}
          </template>
        </el-table-column>
        <el-table-column prop="planProject" label="上级项目">
          <template slot-scope="scope">
            {{ scope.row.planProject ? scope.row.planProject.planName : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="planId" label="项目计划" />
        <!--<el-table-column prop="leaderId" label="项目负责人" />-->
        <el-table-column prop="projectType" label="项目类型">
          <template slot-scope="scope">
            {{ dict.label.project_type[scope.row.projectType] }}
          </template>
        </el-table-column>
        <!--<el-table-column prop="provinceId" label="省" />-->
        <!--<el-table-column prop="cityId" label="市" />-->
        <!--<el-table-column prop="countyId" label="区" />-->
        <!--<el-table-column prop="streetId" label="街道" />-->
        <!--<el-table-column prop="communityId" label="社区" />-->
        <el-table-column prop="startTime" label="启动时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <!--<el-table-column prop="overview" label="项目概述" />-->
        <!--<el-table-column prop="demand" label="需求分析" />-->
        <!--<el-table-column prop="remark" label="项目备注" />-->
        <!--        <el-table-column prop="projectStatus" label="项目状态">
          <template slot-scope="scope">
            {{ dict.label.execution_status[scope.row.projectStatus] }}
          </template>
        </el-table-column>-->
        <!--        <el-table-column prop="approvalStatus" label="审批状态">
          <template slot-scope="scope">
            {{ dict.label.approval_status[scope.row.approvalStatus] }}
          </template>
        </el-table-column>-->
        <!-- 审批状态：0、未审批；1、审批通过；2、审批不通过-->
        <!--<el-table-column prop="proposal" label="项目书" />-->
        <!--<el-table-column prop="contract" label="项目合同" />-->
        <!--<el-table-column prop="amount" label="合同金额" />-->
        <!--<el-table-column prop="counterpartFunding" label="配套资金" />-->
        <!--<el-table-column prop="createTime" label="创建时间" />-->
        <!--<el-table-column prop="createBy" label="创建人" />-->
        <!--        <el-table-column v-if="checkPer(['admin','application:edit','application:del'])" label="操作" width="150px" align="center">-->
        <el-table-column
          v-if="checkPer(['admin','project:application:edit','project:application:del'])"
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
import crudApplication from '@/api/project/application'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { initData } from '@/api/data'
import CitySelector from '@/components/CitySelector/index.vue'
import DateTimeRangePicker from '@/components/DateTimeRangePicker'
import { uploadHelper } from '@/components/Uploader'

const defaultForm = {
  projectName: null,
  projectCode: null,
  category: null,
  parentProject: null, // 上级招标项目，是个planProject
  planProject: null, // 上级储备项目
  leader: null, // 是个uer对象
  projectType: null,
  province: null,
  city: null,
  county: null,
  street: null,
  // community: null,
  startTime: null,
  endTime: null,
  overview: null,
  demand: null,
  remark: null,
  proposals: [], // 是个数组
  contracts: [], // 是个数组
  amount: null,
  counterpartFunding: null

}
export default {
  name: 'Application',
  components: { DateTimeRangePicker, pagination, CitySelector, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud(), uploadHelper()],
  dicts: ['project_category', 'target_status', 'execution_status', 'project_type', 'approval_status'],
  cruds() {
    return CRUD({
      title: 'application',
      url: 'api/project/application',
      idField: 'id',
      sort: 'id,desc',
      crudMethod: { ...crudApplication } // 每一个这个都不一样，都是先引入，再搞
    })
  },
  data() {
    // const name =
    return {
      leaderList: [],
      planProjectList: [],
      permission: {
        add: ['admin', 'project:application:add'],
        edit: ['admin', 'project:application:edit'],
        del: ['admin', 'project:application:del']
      },
      rules: {
        projectName: [
          {
            required: true, message: '项目名称不能为空', trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    if (this.$route.name === 'ProjectApplicationList') {
      return true
    } else {
      // 选择项目时就不显示操作按钮了
      this.crud.optShow = {
        add: false,
        edit: false,
        del: false,
        reset: false,
        download: false
      }
    }
  },
  methods: {
    [CRUD.HOOK.beforeToCU]() {
      // 加载领导
      if (this.leaderList.length === 0) {
        initData('api/project/application/deptUsers', {
          enabled: true
        }).then(res => {
          this.leaderList = res.content
        })
      }
      if (this.planProjectList.length === 0) {
        initData('api/project/application/queryAllAvailablePlanProject', {
          enabled: true
        }).then(res => {
          this.planProjectList = res.content
        })
      }
    },
    [CRUD.HOOK.beforeValidateCU]() {
      // 文件列表
      this.form.contracts = this.getUploadIdObjectList(this.$refs.contracts)
      this.form.proposals = this.getUploadIdObjectList(this.$refs.proposals)
      console.log('beforeValidateCU', this.form)
    }
  }
}
</script>

<style scoped>

</style>
