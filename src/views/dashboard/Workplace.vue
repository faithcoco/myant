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
          <a-card title="审批" :bordered="false">
            <a-table :columns="columns" :data-source="data">
              <a slot="commitdate" slot-scope="text, record">{{ record.commitdate | formatDate }}</a>
            </a-table>
          </a-card>
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-top: 24px"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">全部项目</a>
            <div>
              <a-row :gutter="24" :style="{ marginTop: '24px' }">
                <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                  <chart-card :loading="loading" title="总销售额" total="￥126,560">
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                      <trend flag="up" style="margin-right: 16px">
                        <span slot="term">周同比</span>
                        12%
                      </trend>
                      <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                      </trend>
                    </div>
                    <template slot="footer">
                      日均销售额
                      <span>￥ 234.56</span>
                    </template>
                  </chart-card>
                </a-col>
                <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                  <chart-card :loading="loading" title="访问量" :total="8846 | NumberFormat">
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                      <mini-area />
                    </div>
                    <template slot="footer">
                      日访问量
                      <span>{{ '1234' | NumberFormat }}</span>
                    </template>
                  </chart-card>
                </a-col>
                <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                  <chart-card :loading="loading" title="支付笔数" :total="6560 | NumberFormat">
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                      <mini-bar />
                    </div>
                    <template slot="footer">
                      转化率
                      <span>60%</span>
                    </template>
                  </chart-card>
                </a-col>
                <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                  <chart-card :loading="loading" title="运营活动效果" total="78%">
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                      <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px" />
                    </div>
                    <template slot="footer">
                      <trend flag="down" style="margin-right: 16px">
                        <span slot="term">同周比</span>
                        12%
                      </trend>
                      <trend flag="up">
                        <span slot="term">日环比</span>
                        80%
                      </trend>
                    </template>
                  </chart-card>
                </a-col>
              </a-row>
            </div>
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
    title: '业务单号',
    width: 100,
    dataIndex: 'billcode',
    key: 'billcode',
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
    this.getPending()
  },

  methods: {
    getPending() {
      const params = {}
      getData(params, '/desk/getPendingpprovalList').then((res) => {
       
        this.data = res.result
        this.data=this.data.map((item, index) => {
          return { ...item,commitdate: moment(item.commitdate).format('YYYY-MM-DD HH:mm') }
        })
         console.log('getPending res-->', JSON.stringify(this.data[0]) )
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
