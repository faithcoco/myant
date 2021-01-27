<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}</div>
      <div>hello world</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="项目" content="56" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="团队排名" content="8/24" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="项目数" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="我的任务" :bordered="false">
            <a-tabs default-active-key="1" @change="callback">
              <a-tab-pane key="1" tab="待办">
                <a-table :columns="columns" :data-source="data">
                  <a slot="billcode" slot-scope="text, record" @click="handleClick(record)">{{ text }}</a>
                  <a slot="commitdate" slot-scope="text, record">{{ record.commitdate | formatDate }}</a>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2" tab="已审核">
                <a-table :columns="columns" :data-source="data">
                  <a slot="billcode" slot-scope="text, record" @click="handleClick(record)">{{ text }}</a>
                  <a slot="commitdate" slot-scope="text, record">{{ record.commitdate | formatDate }}</a>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="3" tab="已创建">
                <a-table :columns="columns" :data-source="data">
                  <a slot="billcode" slot-scope="text, record" @click="handleClick(record)">{{ text }}</a>
                  <a slot="commitdate" slot-scope="text, record">{{ record.commitdate | formatDate }}</a>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </a-card>
          <a-card title="我的消息" :bordered="false">
            <a-list item-layout="horizontal" :data-source="messageData">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta   :description="item.time">
                  <a slot="title" href="https://www.antdv.com/">{{ item.sendpersonname+":"+item.title}}</a>
                  <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import moment from 'moment'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import Vue from 'vue'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import {
  Radar,
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea,
} from '@/components'

import { getData } from '@/api/manage'

const DataSet = require('@antv/data-set')

const columns = [
  {
    title: '业务单号',
    width: 100,
    dataIndex: 'billcode',
    key: 'billcode',
    scopedSlots: { customRender: 'billcode' },
  },
  {
    title: '单据类型',
    width: 100,
    dataIndex: 'memuname',
    key: 'memuname',
  },
  {
    title: '业务类别',
    width: 200,
    dataIndex: 'businessname',
    key: 'businessname',
  },

  {
    title: '提交日期',
    width: 100,
    dataIndex: 'commitdate',
    key: 'commitdate',
  },
  {
    title: '天数',
    width: 60,
    dataIndex: 'days',
    key: 'days',
    sorter: (a, b) => a.days - b.days,
  },
]

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    Radar,
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
  },
  data() {
    return {
      isShow: true,
      size: 'default',
      columns,
      data: [],
      type: '审批类型：',
      module: '审批模块',

      loading: true,
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],
      messageData: [],
      // data
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome,
    }),
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
    this.getPending(1)
    this.getMessage()
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.getPending(1)
        this.getMessage()
      },
      // 深度观察监听
    },
  },

  methods: {
    callback(key) {
      this.getPending(key)
    },
    handleClick(record) {
      if (record.memuname == '收货通知') {
        this.$router.push({
          name: 'ReceiptNoticeList',
        })
      } else if (record.memuname == '入库产品清单') {
        this.$router.push({
          name: 'StorageManagementList',
        })
      }
    },
    getMessage() {
      const params = {}
      console.log('getMessage-->', params)
      getData(params, '/desk/getCommentList').then((res) => {
        this.messageData = res.result
        this.messageData = this.messageData.map((item, index) => {
          return { ...item, time: moment(item.time).format('YYYY-MM-DD HH:mm') }
        })
        console.log('getMessage res-->', JSON.stringify(res))
      })
    },
    getPending(querystatus) {
      const params = {}
      params.querystatus = querystatus
      console.log('getPending-->', params)
      getData(params, '/desk/getPendingpprovalList').then((res) => {
        this.data = res.result
        this.data = this.data.map((item, index) => {
          return { ...item, commitdate: moment(item.commitdate).format('YYYY-MM-DD HH:mm') }
        })
        console.log('getPending res-->', JSON.stringify(res))
      })
    },
  },
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}
.group2 {
  display: flex;
  justify-content: space-between;
}
.read {
  margin-left: 20px;
}
.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
