<template>
  <el-row>
    <el-row justify="center" :gutter="20" type="flex" style="margin-top: 20px">
      <el-col span="11">
        <el-card header="招标项目区" class="card" :body-style="cardStyle">
          <el-table :data="tenderingProjectList" class="table">
            <el-table-column :show-overflow-tooltip="true" prop="number" width="80" label="项目编号" />
            <el-table-column :show-overflow-tooltip="true" prop="region" min-width="120" label="所属区域" />
            <el-table-column :show-overflow-tooltip="true" prop="name" min-width="200" label="项目名称" />
          </el-table>
          <el-pagination
            class="page"
            :page-size.sync="tenderingProjectPage.size"
            :total="tenderingProjectPage.total"
            :current-page.sync="tenderingProjectPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next"
          />
        </el-card>
      </el-col>
      <el-col span="11">
        <el-card header="储备项目区" class="card" :body-style="cardStyle">
          <el-table :data="reserveProjectList" class="table">
            <el-table-column :show-overflow-tooltip="true" prop="number" width="80" label="项目编号" />
            <el-table-column :show-overflow-tooltip="true" prop="region" min-width="120" label="所属区域" />
            <el-table-column :show-overflow-tooltip="true" prop="name" min-width="200" label="项目名称" />
          </el-table>
          <el-pagination
            class="page"
            :page-size.sync="reserveProjectPage.size"
            :total="reserveProjectPage.total"
            :current-page.sync="reserveProjectPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row justify="center" :gutter="20" type="flex" style="margin-top: 20px; margin-bottom: 50px">
      <el-col span="11">
        <el-card header="待办提示区" class="card" :body-style="cardStyle">
          <el-table :data="todoList" class="table">
            <el-table-column :show-overflow-tooltip="true" prop="title" min-width="200" label="待办事项" />
            <el-table-column :show-overflow-tooltip="true" prop="value" min-width="60" label="数量" />
          </el-table>
          <el-pagination
            class="page"
            :page-size.sync="todoPage.size"
            :total="todoPage.total"
            :current-page.sync="todoPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next"
          />
        </el-card>
      </el-col>
      <el-col span="11">
        <el-card header="预警提示区" class="card" :body-style="cardStyle">
          <el-table :data="warningList" class="table" row>
            <el-table-column :show-overflow-tooltip="true" prop="title" min-width="200" label="待办事项" />
            <el-table-column :show-overflow-tooltip="true" prop="value" min-width="60" label="数量" />
          </el-table>
          <el-pagination
            class="page"
            :page-size.sync="warningPage.size"
            :total="warningPage.total"
            :current-page.sync="warningPage.page"
            style="margin-top: 8px;"
            layout="total, prev, pager, next"
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
      cardStyle: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column'
      },
      tenderingProjectList: [
        {
          number: 'E01',
          region: '四川省成华区',
          name: '一路有你老人关爱项目'
        }, {
          number: 'E02',
          region: '四川省成华区',
          name: '乡音回味助农项目'
        }, {
          number: 'E03',
          region: '四川省成华区',
          name: '非常6+1老人关爱项目'
        }, {
          number: 'E04',
          region: '四川省成华区',
          name: '走进历史文化项目'
        }, {
          number: 'E05',
          region: '四川省成华区',
          name: '知音文化项目'
        }
      ],
      tenderingProjectPage: {
        size: 5,
        page: 1,
        total: 5
      },
      reserveProjectList: [{
        number: 'S01',
        region: '四川省广安市',
        name: '红色文化传播'
      }, {
        number: 'S02',
        region: '四川省眉山市',
        name: '书法文化传播'
      }],
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

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page {
  text-align: end;
}

.table {
  flex: 1 1 auto;
}

</style>
