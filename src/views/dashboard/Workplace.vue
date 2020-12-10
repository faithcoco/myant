<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ user.name }}
        <span class="welcome-text">，{{ welcome }}</span>
      </div>
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
          <a-card :loading="loading" title="审批" :bordered="false">
            <a-radio-group
              v-model="size"
              style="margin-bottom: 16px;  display: flex;justify-content: space-between;"
              @change="onChange"
            >
              <div>
                <a-radio-button value="approval">审批待办</a-radio-button>
                <a-radio-button value="notification">系统通知</a-radio-button>
                <a-radio-button value="contract">合同动态</a-radio-button>
              </div>
              <a-input-search class="search" placeholder="请输入搜索内容" style="width:300px" @search="onSearch" />
            </a-radio-group>
            <br />
            <div v-show="isShow">
              <a-tabs default-active-key="1" :size="size" @change="callback">
                <a-tab-pane key="1" tab="待我处理"></a-tab-pane>
                <a-tab-pane key="2" tab="我已处理"></a-tab-pane>
                <a-tab-pane key="3" tab="我发起的"></a-tab-pane>
                <a-tab-pane key="4" tab="抄送我的"></a-tab-pane>
              </a-tabs>
            </div>

            <div class="group1">
              <a-radio-group class="radio1" default-value="a" button-style="solid">
                {{ type }}
                <a-radio-button value="a">全部</a-radio-button>
                <a-radio-button value="b">@我的</a-radio-button>
                <a-radio-button value="c">非@我的</a-radio-button>
              </a-radio-group>
              <br />
              <br />

              <div class="group2">
                <div class="group2-btn1">
                  <a-radio-group default-value="a" button-style="solid">
                    {{ module }}
                    <a-radio-button value="a">全部</a-radio-button>
                    <a-radio-button value="b">应收</a-radio-button>
                    <a-radio-button value="c">应付</a-radio-button>
                  </a-radio-group>

                  <a-checkbox class="read">仅显示未读</a-checkbox>
                </div>
                <a-radio-group class="group2-btn2" default-value="a" button-style="solid">
                  <a-radio-button value="a" style="margin-right:10px">标为已读</a-radio-button>
                  <a-radio-button value="b">导出</a-radio-button>
                </a-radio-group>
              </div>

              <a-table :columns="columns" :data-source="data" style="margin-top:20px" bordered>
                <a slot="name" slot-scope="text">{{ text }}</a>
              </a-table>
            </div>
            <!-- <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;
                    <a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list> -->
          </a-card>
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-top: 24px;"
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
                      <trend flag="up" style="margin-right: 16px;">
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
                      <trend flag="down" style="margin-right: 16px;">
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
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'

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
  MiniSmoothArea
} from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

const DataSet = require('@antv/data-set')

const columns = [
  {
    title: '标题',
    width: 200,
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '内容',
    width: 200,
    dataIndex: 'LR',
    key: 'LR'
  },
  {
    title: '来源/合同名称',
    width: 200,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '时间',
    width: 100,
    dataIndex: 'time',
    key: 'time',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '状态',
    width: 60,
    dataIndex: 'status',
    key: 'status'
  }
]

const data = [
  {
    key: '1',
    title: "在'上海固圣信息技术有限公司一次性服务款项目'@了你",
    LR: '@高铭亮，高总，我的项目什么时候审批好',
    name: '上海固圣信息技术有限公司一次性服务款项目',
    time: '2020-04-21',
    status: '未读'
  }
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
    MiniSmoothArea
  },
  data() {
    return {
      isShow: true,
      size: 'default',
      columns,
      data,
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
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    // getRoleList().then(res => {
    //    console.log('workplace -> call getRoleList()', res)
    // })

    // getServiceList().then(res => {
    //    console.log('workplace -> call getServiceList()', res)
    // })
  },
  mounted() {
    // this.getProjects()
    // this.getActivity()
    // this.getTeams()
    // this.initRadar()
  },
  methods: {
    getProjects() {
      this.$http.get('/list/search/projects').then(res => {
        console.log('/list/search/projects res-->', JSON.stringify(res))
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity() {
      this.$http.get('/workplace/activity').then(res => {
        console.log('/workplace/activity res-->', JSON.stringify(res))
        this.activities = res.result
      })
    },
    getTeams() {
      this.$http.get('/workplace/teams').then(res => {
        console.log('/workplace/teams res-->', JSON.stringify(res))
        this.teams = res.result
      })
    },
    initRadar() {
      this.radarLoading = true

      this.$http.get('/workplace/radar').then(res => {
        console.log('/workplace/radar res-->', JSON.stringify(res))
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['个人', '团队', '部门'],
          key: 'user',
          value: 'score'
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    },
    onChange(e) {
      console.log(`checked = ${e.target.value}`)

      if (e.target.value == 'approval') {
        this.isShow = true
        this.type = '审批类型：'
        this.module = '审批模块：'
      } else if (e.target.value == 'notification') {
        this.isShow = false
        this.type = '通知类型：'
        this.module = '通知模块：'
      } else if (e.target.value == 'contract') {
        this.isShow = false
        this.type = '类型：'
        this.module = '模块：'
      }
    },
    onSearch(value) {
      console.log(value)
    },
    callback(value) {
      console.log(value)
    }
  }
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
