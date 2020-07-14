<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="19">
          <a-input-search @search="onSearch" placeholder="请输入搜索内容" />
        </a-col>
        <a-col :span="5">
          <span
            class="table-page-search-submitButtons"
            :style="{ float: 'right', overflow: 'hidden' } || {} "
          >
            <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">设置</a-button>
            <a-button style="margin-left: 5px" @click="() => queryParam = {}">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => queryParam = {}">导出</a-button>
          </span>
        </a-col>
      </a-row>
      <br />
      <s-table
        ref="table"
        size="default"
        :columns="targetTitle"
        :data="loadData"
        :alert="false"
        :scroll="{ x: 1400 }"
        bordered
      >
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>

        <span slot="action" slot-scope="text, record">
          <template v-if="$auth('table.update')">
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">删除</a>
          </template>
        </span>
        6t
      </s-table>
    </a-card>
    <a-drawer
      title="产品详情"
      placement="right"
      :width="720"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-descriptions title :column="1">
        <a-descriptions-item label="仓库编码">{{product.WarehouseCode}}</a-descriptions-item>
        <a-descriptions-item label="仓库名称">{{product.WarehouseName }}</a-descriptions-item>
        <a-descriptions-item label="部门名称">{{product.DepartmentName}}</a-descriptions-item>
        <a-descriptions-item label="仓库地址">{{product.WarehouseAddress}}</a-descriptions-item>
        <a-descriptions-item label="电话">{{product.Tel}}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{product.Principal}}</a-descriptions-item>
        <a-descriptions-item label="计价方式">{{product.PricingMethod}}</a-descriptions-item>
        <a-descriptions-item label="仓库核算组">{{product.WarehouseAccountingTeam}}</a-descriptions-item>
        <a-descriptions-item label="是否货位管理">{{product.CargoSpaceManagement}}</a-descriptions-item>
        <a-descriptions-item label="资金定额">{{product.FundingQuota}}</a-descriptions-item>
        <a-descriptions-item label="对应条形码">{{product.CorrespondingBarcode}}</a-descriptions-item>
        <a-descriptions-item label="参与需求计划运算">{{product.DemandPlanningcalculation}}</a-descriptions-item>
        <a-descriptions-item label="是否参与ROP计算">{{product.ROPCalculation}}</a-descriptions-item>
        <a-descriptions-item label="仓库属性">{{product.WarehouseAttributes}}</a-descriptions-item>
        <a-descriptions-item label="配额">{{product.quota}}</a-descriptions-item>
        <a-descriptions-item label="资产仓">{{product.AssetWarehouse}}</a-descriptions-item>
        <a-descriptions-item label="控制序列号">{{product.ControlSerialNumber}}</a-descriptions-item>
        <a-descriptions-item label="记入成本">{{product.Creditcost}}</a-descriptions-item>
        <a-descriptions-item label="纳入可用量计算">{{product.Availablequantitycalculation}}</a-descriptions-item>
        <a-descriptions-item label="代管仓">{{product.Escrow}}</a-descriptions-item>
        <a-descriptions-item label="销售可用量控制方式">{{product.Salesavailabilitycontrol}}</a-descriptions-item>
        <a-descriptions-item label="出口可用量控制方式">{{product.Outavailabilitycontrol}}</a-descriptions-item>
        <a-descriptions-item label="库存可用量控制方式">{{product.Inventoryavailabilitycontrol}}</a-descriptions-item>
        <a-descriptions-item label="是否门店">{{product.Store}}</a-descriptions-item>
        <a-descriptions-item label="保税仓">{{product.BondedWarehouse}}</a-descriptions-item>
        <a-descriptions-item label="停用日期">{{product.DeactivationDate}}</a-descriptions-item>
        <a-descriptions-item label="拣货货位">{{product.PickingLocation}}</a-descriptions-item>
        <a-descriptions-item label="电商仓">{{product.Ecommercewarehouse}}</a-descriptions-item>
        <a-descriptions-item label="省/直辖市">{{product.province}}</a-descriptions-item>
        <a-descriptions-item label="市">{{product.city}}</a-descriptions-item>
        <a-descriptions-item label="区县">{{product.District}}</a-descriptions-item>
        <a-descriptions-item label="工厂名称">{{product.FactoryName}}</a-descriptions-item>
        <a-descriptions-item label="审批状态">
          <a-tag :color="color">{{status}}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider>审批详情</a-divider>
      <a-timeline>
        <a-timeline-item v-for="item in timelinelist" :key="item.key">
          <p>
            <a-row>
              <a-col :span="5">
                <b>{{item.title}}</b>
              </a-col>
              <a-col :span="12">{{item.time}}</a-col>
            </a-row>
          </p>
          <p>
            <a href="#" v-for="item in item.mentions" :key="item.name">@{{item.name}}</a>
            {{item.content}}
          </p>
          <p v-show="item.isShow">
            <a-card v-for="item in item.img" :key="item.src" :bordered="false">
              <img slot="extra" alt="logo" :src="item.src" />
              <br />
            </a-card>
          </p>
        </a-timeline-item>
      </a-timeline>
      <a-row>
        <a-col :span="3">
          <a-button type="primary" @click="approvalClick">审批</a-button>
        </a-col>
        <a-col :span="3">
          <a-button type="danger" @click="cancelClick">撤销</a-button>
        </a-col>
        <a-col :span="3">
          <a-button type="primary" @click="chatClick">评论</a-button>
        </a-col>
      </a-row>
    </a-drawer>
    <a-modal
      title="Title"
      :visible="modal_visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-transfer
        :data-source="columns"
        :titles="['选择显示字段', '已选择字段']"
        :target-keys="targetKeys"
        :selected-keys="selectedKeys"
        :render="item => item.title"
        :disabled="disabled"
        @change="handleChange"
        @selectChange="handleSelectChange"
        @scroll="handleScroll"
      />
    </a-modal>
    <a-modal
      width="1000px"
      title="聊天"
      :visible="chat_visible"
      :confirm-loading="confirmLoading"
      @ok="chatOk"
      @cancel="chatCancel"
    >
      <div>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-mentions v-model="value" :rows="4" @change="onChange" @select="onSelect">
                <a-mentions-option
                  v-for="item in personnelList"
                  :key="item.name"
                  :value="item.name"
                >{{item.name}}</a-mentions-option>
              </a-mentions>
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="fileChange"
              >
                <a-button type="link" :size="size">添加附件</a-button>
              </a-upload>
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit"
              >评论</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
      <div slot="footer"></div>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import { Descriptions } from 'ant-design-vue'
import { Transfer } from 'ant-design-vue'
import { Comment } from 'ant-design-vue'
Vue.use(Descriptions)
Vue.use(Transfer)
Vue.use(Comment)
import { Timeline } from 'ant-design-vue'
Vue.use(Timeline)
import { Mentions } from 'ant-design-vue'
Vue.use(Mentions)
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import { getWarehouseList, getApproval, getPersonnelList,getWarehouseListColumns } from '@/api/manage'

const timelinelist = []
const columns = []
const personnelList = []
const width = 120
const product = {}
const targetTitle = []
export default {
  components: {
    STable,
    STree
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      personnelList,
      visible: false,
      chat_visible: false,
      status: '正在审批',
      color: '',
      product,
      columns,
      timelinelist,
      targetTitle,
      selectedRowKeys: [],
      modal_visible: false,
      confirmLoading: false,
      targetKeys: oriTargetKeys,
      selectedKeys: ['0'],
      disabled: false,
      loadData: parameter => {
        return getWarehouseList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },

      submitting: false,
      value: '',
      moment
    }
  },
  created() {
    getWarehouseListColumns().then(res => {
      this.columns = res.result
      this.targetTitle = this.columns
    })
    getPersonnelList().then(res => {
      this.personnelList = res.result
      console.log(this.personnelList)
    })
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection
      }
    }
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val)
    },
    onClose() {
      this.visible = false
    },
    onSearch(value) {
      console.log('value', value)
      const data = [...this.data]
      //this.data = data.filter(item => item.code == value)
      this.data = this.data.filter(function(data) {
        return Object.keys(data).some(function(key) {
          return (
            String(data[key])
              .toLowerCase()
              .indexOf(value) > -1
          )
        })
      })
    },
    handleDetail(record) {
      console.log(record),
        (this.visible = true),
        (this.product = record),
        getApproval().then(res => {
          this.timelinelist = res.result
        })
    },
    handleSetting(record) {
      console.log(record), (this.modal_visible = true)
    },
    handleEdit(record) {
      console.log(record), this.$router.push({ path: '/add' })
    },
    handleSub(record) {
      console.log(record)
    },
    onDelete(key) {
      const data = [...this.data]
      this.data = data.filter(item => item.key !== key)
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleOk(e) {
      this.modal_visible = false
      this.confirmLoading = false
      const columns = [...this.columns]
      this.targetTitle = []
      for (let i = 0; i < this.targetKeys.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          if (columns[j].key == this.targetKeys[i]) {
            this.targetTitle.push(columns[j])
          }
        }
      }
    },
    handleCancel(e) {
      this.modal_visible = false
    },
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
    },
    handleScroll(direction, e) {},
    handleSubmit() {
      if (!this.value) {
        return
      }

      this.submitting = true
      const time = new Date()
      setTimeout(() => {
        this.submitting = false
        this.timelinelist.push({
          key: '1',
          title: 'curry 评论',
          time: moment(new Date()).format('YYYY-MM-DD HH:mm'),
          content: this.value
        })
      }, 1000)
      this.chat_visible = false
    },
    chatChange(e) {
      this.value = e.target.value
    },
    chatClick() {
      this.value = ''
      this.chat_visible = true
    },
    cancelClick() {
      this.status = '已撤销'
      this.color = '#f00707a6'
    },
    approvalClick() {
      this.status = '已审批'
      this.color = '#108ee9'
    },
    chatOk(e) {
      this.chat_visible = false
    },
    chatCancel(e) {
      this.chat_visible = false
    },
    reply(item) {
      this.value = `回复 ${item.author}:`
      console.log(item.datetime)
    },
    onSelect(option) {
      console.log('select', option)
    },
    onChange(value) {
      console.log('Change:', value)
    }
  }
}
</script>
<style lang='less' scoped>
</style>
