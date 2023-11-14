<template>
  <div class="app-container">
    <el-row>
      <el-input
        v-model="queryForm.blurry"
        clearable
        size="small"
        placeholder="输入部门名称搜索"
        prefix-icon="el-icon-search"
        class="filter-item"
        style="width: 200px;"
      />
      <span>
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-refresh-left"
        >重置</el-button>
      </span>
    </el-row>
    <el-row>
      <div class="crud-opts">
        <span class="crud-opts-left">
          <router-link to="/project/create">
            <el-button type="primary" size="mini" icon="el-icon-plus">新增项目</el-button>
          </router-link>
          <router-link to="/project/createPlan">
            <el-button type="primary" size="mini" icon="el-icon-plus">新增储备项目</el-button>
          </router-link>

        </span>
        <el-button-group class="crud-opts-right">
          <el-button
            size="mini"
            plain
            type="info"
            icon="el-icon-search"
            @click="toggleSearch()"
          />
          <el-button
            size="mini"
            icon="el-icon-refresh"
            @click="crud.refresh()"
          />
          <el-popover
            placement="bottom-end"
            width="150"
            trigger="click"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-s-grid"
            >
              <i
                class="fa fa-caret-down"
                aria-hidden="true"
              />
            </el-button>
            <el-checkbox
              v-model="rightToolConfig.allColumnsSelected"
              :indeterminate="rightToolConfig.allColumnsSelectedIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox
              v-for="item in tableColumns"
              :key="item.property"
              v-model="item.visible"
              @change="handleCheckedTableColumnsChange(item)"
            >
              {{ item.label }}
            </el-checkbox>
          </el-popover>
        </el-button-group>
      </div>

      <el-table :data="projectList" class="table" row>
        <el-table-column :show-overflow-tooltip="true" prop="projectCode" min-width="80" label="项目编号" />
        <el-table-column :show-overflow-tooltip="true" prop="projectName" min-width="200" label="项目名称">
          <template slot-scope="scope">
            <router-link :to="'/project/detail/'+scope.row.id">
              <span>{{ scope.row.projectName }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="projectStatus" min-width="80" label="项目状态" />
        <el-table-column :show-overflow-tooltip="true" prop="approvalStatus" min-width="100" label="审批状态" />
      </el-table>
      <el-pagination
        class="page"
        :page-size.sync="projectPage.size"
        :total="projectPage.total"
        :current-page.sync="projectPage.page"
        style="margin-top: 8px;"
        layout="total, prev, pager, next"
      />
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'ProjectList',
  data() {
    return {
      rightToolConfig: {
        tableColumns: [],
        allColumnsSelected: true,
        allColumnsSelectedIndeterminate: false
      },
      queryForm: {
        blurry: ''
      },
      projectList: [{
        projectCode: 'E01',
        projectName: '一路有你老人关爱项目',
        projectStatus: '未开始',
        approvalStatus: '未审批'
      }, {
        projectCode: 'E02',
        projectName: '乡音回味助农项目',
        projectStatus: '执行中',
        approvalStatus: '未审批'
      }, {
        projectCode: 'E03',
        projectName: '非常6+1老人关爱项目',
        projectStatus: '未开始',
        approvalStatus: '未审批'
      }, {
        projectCode: 'E04',
        projectName: '走进历史文化项目',
        projectStatus: '未开始',
        approvalStatus: '未审批'
      }],
      projectPage: {
        size: 4,
        page: 1,
        total: 4
      }
    }
  }
}
</script>

<style scoped>

.crud-opts {
  padding: 4px 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}

.crud-opts .crud-opts-right {
  margin-left: auto;
}

.crud-opts .crud-opts-right span {
  float: left;
}

</style>
