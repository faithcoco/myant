<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="16">
          <a-select default-value="全部" style="width:220px" @change="selectChange(value)">
            <a-select-option v-for="SList in selectList" :key="SList.value" :value="SList.value">{{
              SList.value
            }}</a-select-option>
          </a-select>
          <a-input-search @search="onSearch" style="width:220px;margin-left:20px" placeholder="请输入搜索内容" />
        </a-col>
        <a-col :span="8">
          <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>
            <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">设置</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
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
        :scroll="{ x: 1500 }"
        bordered
      >
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <span slot="customTitle">
          {{ Operation }}
          <a-icon :type="isfold" :style="{ fontSize: '18px' }" @click="WidthChange()" />
        </span>
        <span slot="action" v-show="Operat_visible" slot-scope="text, record">
          <a @click="handleDetail(record)">审批</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">删除</a>
        </span>
      </s-table>
    </a-card>
    <approval :visible="approval_visible" :product="product" @change="change"></approval>
    <!--<a-drawer
      title="产品详情"
      placement="right"
      :width="720"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-descriptions title :column="1">
        <a-descriptions-item label="仓库编码">{{ product.WarehouseCode }}</a-descriptions-item>
        <a-descriptions-item label="仓库名称">{{ product.WarehouseName }}</a-descriptions-item>
        <a-descriptions-item label="部门名称">{{ product.DepartmentName }}</a-descriptions-item>
        <a-descriptions-item label="仓库地址">{{ product.WarehouseAddress }}</a-descriptions-item>
        <a-descriptions-item label="电话">{{ product.Tel }}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{ product.Principal }}</a-descriptions-item>
        <a-descriptions-item label="计价方式">{{ product.PricingMethod }}</a-descriptions-item>
        <a-descriptions-item label="仓库核算组">{{ product.WarehouseAccountingTeam }}</a-descriptions-item>
        <a-descriptions-item label="是否货位管理">{{ product.CargoSpaceManagement }}</a-descriptions-item>
        <a-descriptions-item label="资金定额">{{ product.FundingQuota }}</a-descriptions-item>
        <a-descriptions-item label="对应条形码">{{ product.CorrespondingBarcode }}</a-descriptions-item>
        <a-descriptions-item label="参与需求计划运算">{{ product.DemandPlanningcalculation }}</a-descriptions-item>
        <a-descriptions-item label="是否参与ROP计算">{{ product.ROPCalculation }}</a-descriptions-item>
        <a-descriptions-item label="仓库属性">{{ product.WarehouseAttributes }}</a-descriptions-item>
        <a-descriptions-item label="配额">{{ product.quota }}</a-descriptions-item>
        <a-descriptions-item label="资产仓">{{ product.AssetWarehouse }}</a-descriptions-item>
        <a-descriptions-item label="控制序列号">{{ product.ControlSerialNumber }}</a-descriptions-item>
        <a-descriptions-item label="记入成本">{{ product.Creditcost }}</a-descriptions-item>
        <a-descriptions-item label="纳入可用量计算">{{ product.Availablequantitycalculation }}</a-descriptions-item>
        <a-descriptions-item label="代管仓">{{ product.Escrow }}</a-descriptions-item>
        <a-descriptions-item label="销售可用量控制方式">{{ product.Salesavailabilitycontrol }}</a-descriptions-item>
        <a-descriptions-item label="出口可用量控制方式">{{ product.Outavailabilitycontrol }}</a-descriptions-item>
        <a-descriptions-item label="库存可用量控制方式">{{ product.Inventoryavailabilitycontrol }}</a-descriptions-item>
        <a-descriptions-item label="是否门店">{{ product.Store }}</a-descriptions-item>
        <a-descriptions-item label="保税仓">{{ product.BondedWarehouse }}</a-descriptions-item>
        <a-descriptions-item label="停用日期">{{ product.DeactivationDate }}</a-descriptions-item>
        <a-descriptions-item label="拣货货位">{{ product.PickingLocation }}</a-descriptions-item>
        <a-descriptions-item label="电商仓">{{ product.Ecommercewarehouse }}</a-descriptions-item>
        <a-descriptions-item label="省/直辖市">{{ product.province }}</a-descriptions-item>
        <a-descriptions-item label="市">{{ product.city }}</a-descriptions-item>
        <a-descriptions-item label="区县">{{ product.District }}</a-descriptions-item>
        <a-descriptions-item label="工厂名称">{{ product.FactoryName }}</a-descriptions-item>
        <a-descriptions-item label="审批状态">
          <a-tag :color="color">{{ status }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider>审批详情</a-divider>
      <a-timeline>
        <a-timeline-item v-for="item in timelinelist" :key="item.key">
          <p>
            <a-row>
              <a-col :span="5">
                <b>{{ item.title }}</b>
              </a-col>
              <a-col :span="12">{{ item.time }}</a-col>
            </a-row>
          </p>
          <p>
            <a href="#" v-for="item in item.mentions" :key="item.name">@{{ item.name }}</a>
            {{ item.content }}
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
    </a-drawer>-->
    <a-modal
      title="设置"
      :visible="visible_transfer"
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
import { getWarehouseList, getWarehouseListColumns } from '@/api/manage'
import action from '../../../core/directives/action'
import Approval from '../../Approval'

const selectList = [
  { value: '全部' },
  { value: '仓库编码' },
  { value: '仓库名称' },
  { value: '仓库地址' },
  { value: '电话' },
  { value: '负责人' },
  { value: '计价方式' },
  { value: '仓库核算组' },
  { value: '是否货位管理' },
  { value: '资金定额' },
  { value: '对应条形码' },
  { value: '参与需求计划运算' },
  { value: '是否参与ROP计算' },
  { value: '仓库属性' },
  { value: '配额' },
  { value: '资产仓' },
  { value: '控制序列号' },
  { value: '记入成本' },
  { value: '纳入可用量计算' },
  { value: '代管仓' },
  { value: '销售可用量控制方式' },
  { value: '出口可用量控制方式' },
  { value: '库存可用量控制方式' },
  { value: '是否门店' },
  { value: '保税仓' },
  { value: '停用日期' },
  { value: '拣货货位' },
  { value: '电商仓' },
  { value: '省/直辖市' },
  { value: '市' },
  { value: '区县' },
  { value: '工厂名称' }
]

const columns = []
const product = {}
const targetTitle = columns
const Operat_visible = true
export default {
  components: {
    STable,
    STree,
    Approval
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      selectList,
      approval_visible: false,
      Operat_visible,
      Operation: '操作',
      visible_transfer: false,
      confirmLoading: false,
      product,
      columns,
      targetTitle,
      queryParam: {},
      selectedRowKeys: [],
      isfold: 'menu-unfold',
      size: 'small',
      targetKeys: [],
      selectedKeys: [],
      disabled: false,
      moment,
      loadData: parameter => {
        return getWarehouseList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  created() {
    getWarehouseListColumns().then(res => {
      this.columns = res.result
      this.columns = [
        {
          key: '0',
          title: '仓库编码',
          dataIndex: 'WarehouseCode',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: true,
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: 'name'
          }
        },
        {
          key: '1',
          title: '仓库名称',
          dataIndex: 'WarehouseName',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '2',
          title: '部门名称',
          dataIndex: 'DepartmentName',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '3',
          title: '仓库地址',
          dataIndex: 'WarehouseAddress',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '4',
          title: '电话',
          dataIndex: 'Tel',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '5',
          title: '负责人',
          dataIndex: 'Principal',
          defaultSortOrder: 'descend',
          width: 165,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '6',
          title: '计价方式',
          dataIndex: 'PricingMethod',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '7',
          title: '仓库核算组',
          dataIndex: 'WarehouseAccountingTeam',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '8',
          title: '是否货位管理',
          dataIndex: 'CargoSpaceManagement',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '9',
          title: '资金定额',
          dataIndex: 'FundingQuota',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '10',
          title: '对应条形码',
          dataIndex: 'CorrespondingBarcode',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '11',
          title: '参与需求计划运算',
          dataIndex: 'DemandPlanningcalculation',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '12',
          title: '是否参与ROP计算',
          dataIndex: 'ROPCalculation',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '13',
          title: '仓库属性',
          dataIndex: 'WarehouseAttributes',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '14',
          title: '配额',
          dataIndex: 'quota',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '15',
          title: '资产仓',
          dataIndex: 'AssetWarehouse',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '16',
          title: '控制序列号',
          dataIndex: 'ControlSerialNumber',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '17',
          title: '记入成本',
          dataIndex: 'Creditcost',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '18',
          title: '纳入可用量计算',
          dataIndex: 'Availablequantitycalculation',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '19',
          title: '代管仓',
          dataIndex: 'Escrow',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '20',
          title: '销售可用量控制方式',
          dataIndex: 'Salesavailabilitycontrol',
          defaultSortOrder: 'descend',
          width: 160,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '21',
          title: '出口可用量控制方式',
          dataIndex: 'Outavailabilitycontrol',
          defaultSortOrder: 'descend',
          width: 160,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '22',
          title: '库存可用量控制方式',
          dataIndex: 'Inventoryavailabilitycontrol',
          defaultSortOrder: 'descend',
          width: 160,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '23',
          title: '是否门店',
          dataIndex: 'Store',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '24',
          title: '保税仓',
          dataIndex: 'BondedWarehouse',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '25',
          title: '停用日期',
          dataIndex: 'DeactivationDate',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '26',
          title: '拣货货位',
          dataIndex: 'PickingLocation',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '27',
          title: '电商仓',
          dataIndex: 'Ecommercewarehouse',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '28',
          title: '省/直辖市',
          dataIndex: 'province',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '29',
          title: '市',
          dataIndex: 'city',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '30',
          title: '区县',
          dataIndex: 'District',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '31',
          title: '工厂名称',
          dataIndex: 'FactoryName',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: '',
          fixed: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '32',
          slots: { title: 'customTitle' },
          dataIndex: 'action',
          defaultSortOrder: '',
          width: 155,
          sorter: '',
          fixed: 'right',
          isShow: true,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ]
      this.targetTitle = []
      for (const key in this.columns) {
        if (this.columns[key].isShow == true) {
          this.targetKeys.push(this.columns[key].key)
          this.targetTitle.push(this.columns[key])
        }
      }
    })
    for (const key in this.columns) {
      if (this.columns[key].dataIndex == 'action') {
        if (this.columns[key].width == 35) {
          this.Operat_visible = false
          this.Operation = ''
          this.isfold = 'menu-fold'
        }
      }
    }
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
    onSearch(value) {
      console.log(value)
      this.queryParam = {
        key: value
      }
      this.$refs.table.refresh(true) //用refresh方法刷新表格
    },
    selectChange() {},
    handleDetail(record) {
      console.log(record), (this.approval_visible = true), (this.product = record)
    },
    WidthChange() {
      for (const key in this.columns) {
        if (this.columns[key].dataIndex == 'action') {
          if (this.Operat_visible) {
            this.Operat_visible = false
            this.columns[key].width = 35
            this.Operation = ''
            this.isfold = 'menu-fold'
          } else {
            this.Operat_visible = true
            this.columns[key].width = 155
            this.Operation = '操作'
            this.isfold = 'menu-unfold'
          }
        }
      }
    },
    add() {
      this.$router.push({ name: 'WarehouseAdd' })
    },
    handleSetting(record) {
      console.log(record), (this.visible_transfer = true)
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
    handleChange(nextTargetKeys, direction, moveKeys) {
      console.log(nextTargetKeys)
      for (const key in moveKeys) {
        if (direction == 'right') {
          this.targetKeys.push(moveKeys[key])
        } else {
          for (const item in this.targetKeys) {
            // console.log(this.targetKeys[item])
            if (this.targetKeys[item] == moveKeys[key]) {
              this.targetKeys.splice(item, 1)
            }
          }
        }
      }
    },
    handleScroll(direction, e) {},
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
    },
    handleCancel(e) {
      this.visible_transfer = false
    },
    handleOk(e) {
      this.visible_transfer = false
      this.confirmLoading = false
      const columns = [...this.columns]

      this.targetTitle = []
      for (let i = 0; i < this.targetKeys.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          if (columns[j].key == this.targetKeys[i]) {
            columns[j].isShow = true
            this.targetTitle.push(columns[j])
          }
        }
      }
    },
    change(visible) {
      this.approval_visible = visible
    }
  }
}
</script>
<style lang="less" scoped></style>
