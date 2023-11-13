<template>
  <el-row>
    <el-row justify="center" :gutter="20" type="flex" style="margin-top: 20px">
      <el-col span="11">
        <el-card header="招标项目区">
          <el-table :data="tenderingProjectList">
            <el-table-column :show-overflow-tooltip="true" prop="number" width="80" label="项目编号" />
            <el-table-column :show-overflow-tooltip="true" prop="region" width="120" label="所属区域" />
            <el-table-column :show-overflow-tooltip="true" prop="name" width="200" label="项目名称" />
          </el-table>
          <el-pagination
            :page-size.sync="tenderingProjectPage.size"
            :total="tenderingProjectPage.total"
            :current-page.sync="tenderingProjectPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
          />
        </el-card>
      </el-col>
      <el-col span="11">
        <el-card header="储备项目区">
          <el-table :data="reserveProjectList">
            <el-table-column :show-overflow-tooltip="true" prop="number" width="80" label="项目编号" />
            <el-table-column :show-overflow-tooltip="true" prop="region" width="120" label="所属区域" />
            <el-table-column :show-overflow-tooltip="true" prop="name" width="200" label="项目名称" />
          </el-table>
          <el-pagination
            :page-size.sync="reserveProjectPage.size"
            :total="reserveProjectPage.total"
            :current-page.sync="reserveProjectPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row justify="center" :gutter="20" type="flex" style="margin-top: 20px; margin-bottom: 20px">
      <el-col span="11">
        <el-card header="待办提示区">
          <el-table :data="todoList">
            <el-table-column :show-overflow-tooltip="true" prop="title" width="200" label="待办事项" />
            <el-table-column :show-overflow-tooltip="true" prop="value" width="100" label="数量" />
          </el-table>
          <el-pagination
            :page-size.sync="todoPage.size"
            :total="todoPage.total"
            :current-page.sync="todoPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
          />
        </el-card>
      </el-col>
      <el-col span="11">
        <el-card header="预警提示区">
          <el-table :data="warningList">
            <el-table-column :show-overflow-tooltip="true" prop="title" width="200" label="待办事项" />
            <el-table-column :show-overflow-tooltip="true" prop="value" width="100" label="数量" />
          </el-table>
          <el-pagination
            :page-size.sync="warningPage.size"
            :total="warningPage.total"
            :current-page.sync="warningPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
          />
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      tenderingProjectList: [
        {}
      ],
      tenderingProjectPage: {
        size: 5,
        page: 1,
        total: 5
      },
      reserveProjectList: [{}],
      reserveProjectPage: {
        size: 2,
        page: 1,
        total: 2
      },
      todoList: [{
        title: '机构用户注册审核',
        value: '2条'
      }, {
        title: '评估专家用户审核',
        value: '1条'
      }, {
        title: '中标项目审核',
        value: '3条'
      }, {
        title: '项目信息审核',
        value: '1条'
      }],
      todoPage: {
        size: 4,
        page: 1,
        total: 4
      },
      warningList: [{
        title: '项目未按时启动',
        value: '3条'
      }, {
        title: '项目即将审核',
        value: '1条'
      }, {
        title: '项目即将终审',
        value: '2条'
      }, {
        title: '项目资金使用异常',
        value: '1条'
      }],
      warningPage: {
        size: 4,
        page: 1,
        total: 4
      }
    }
  }
}
</script>

<style scoped>

</style>
