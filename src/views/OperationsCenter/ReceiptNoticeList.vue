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
      <a-table
        :row-selection="rowSelection"
        :columns="targetTitle"
        :data-source="data"
        bordered
        size="middle"
        :scroll="{ x: 'calc(1200px + 50%)', y: 400 }"
      >
        <a slot="name" slot-scope="text, record" @click="handleSearch(record)">{{ text }}</a>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm v-if="data.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
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
        <a-descriptions-item label="收货通知单编码">{{product.ReceiptNotificationCode }}</a-descriptions-item>
        <a-descriptions-item label="供应商编码">{{product.SupplierCode}}</a-descriptions-item>
        <a-descriptions-item label="联系人编码">{{product.ContactCode}}</a-descriptions-item>
        <a-descriptions-item label="部门编码">{{product.DepartmentCode}}</a-descriptions-item>
        <a-descriptions-item label="业务员编码">{{product.SalesmanCode}}</a-descriptions-item>
        <a-descriptions-item label="预计入库日期">{{product.ExpectedInWarehouseDate}}</a-descriptions-item>
        <a-descriptions-item label="收货仓库编码">{{product.ReceivingWarehouseCode}}</a-descriptions-item>
        <a-descriptions-item label="存货编码">{{product.InventoryCode}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.InventoryName}}</a-descriptions-item>
        <a-descriptions-item label="批次编码">{{product.BatchCode}}</a-descriptions-item>
        <a-descriptions-item label="数量">{{product.Quantity}}</a-descriptions-item>
        <a-descriptions-item label="计量单位">{{product.Unit}}</a-descriptions-item>
        <a-descriptions-item label="包装数量">{{product.PackingQuantity}}</a-descriptions-item>
        <a-descriptions-item label="包装单位">{{product.PackingUnit}}</a-descriptions-item>
        <a-descriptions-item label="单价">{{product.UnitPrice}}</a-descriptions-item>
        <a-descriptions-item label="含税单价">{{product.TaxIncludedUnitPrice}}</a-descriptions-item>
        <a-descriptions-item label="税率">{{product.TaxRate}}</a-descriptions-item>
        <a-descriptions-item label="金额">{{product.Amount}}</a-descriptions-item>
        <a-descriptions-item label="含税金额">{{product.TaxIncludedAmount}}</a-descriptions-item>
        <a-descriptions-item label="税额">{{product.Tax}}</a-descriptions-item>
        <a-descriptions-item
          label="Address"
        >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</a-descriptions-item>
      </a-descriptions>
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
  </div>
</template>

<script>
import Vue from 'vue'
import { Descriptions } from 'ant-design-vue'
import { Transfer } from 'ant-design-vue'
Vue.use(Descriptions)
Vue.use(Transfer)

const columns = [
  {
    key: '0',
    title: '收货通知单编码',
    dataIndex: 'ReceiptNotificationCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
    scopedSlots: { customRender: 'name' }
  },
  {
    key: '1',
    title: '供应商编码',
    dataIndex: 'SupplierCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name
  },

  {
    key: '2',
    title: '联系人编码',
    dataIndex: 'ContactCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '3',
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '4',
    title: '业务员编码',
    dataIndex: 'SalesmanCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '5',
    title: '预计入库日期',
    dataIndex: 'ExpectedInWarehouseDate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '6',
    title: '收货仓库编码',
    dataIndex: 'ReceivingWarehouseCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '7',
    title: '存货编码',
    dataIndex: 'InventoryCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '8',
    title: '存货名称',
    dataIndex: 'InventoryName',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '9',
    title: '批次编码',
    dataIndex: 'BatchCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '10',
    title: '数量',
    dataIndex: 'Quantity',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '11',
    title: '计量单位',
    dataIndex: 'Unit',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '12',
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '13',
    title: '包装单位',
    dataIndex: 'PackingUnit',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '14',
    title: '单价',
    dataIndex: 'UnitPrice',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '15',
    title: '含税单价',
    dataIndex: 'TaxIncludedUnitPrice',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '16',
    title: '税率',
    dataIndex: 'TaxRate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '17',
    title: '金额',
    dataIndex: 'Amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '18',
    title: '含税金额',
    dataIndex: 'TaxIncludedAmount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '19',
    title: '税额',
    dataIndex: 'Tax',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '20',
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    ReceiptNotificationCode: `000${i}`,
    SupplierCode: `000${i}`,
    ContactCode: `000${i}`,
    DepartmentCode: `000${i}`,
    SalesmanCode: `000${i}`,
    ExpectedInWarehouseDate: `5月${1+i}日`,
    ReceivingWarehouseCode: `000${i}`,
    InventoryCode: `000${i}`,
    InventoryName: `杯子`,
    BatchCode: `000${i}`,
    Quantity: `1000${i}`,
    Unit: `个`,
    PackingQuantity: `1${i}`,
    PackingUnit: `箱`,
    UnitPrice: `5`,
    TaxIncludedUnitPrice: `6`,
    TaxRate: `20%`,
    Amount: `11000${i}`,
    TaxIncludedAmount: `12000${i}`,
    Tax: `1`
  })
}
const product = {}
const targetTitle = columns
export default {
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      visible: false,
      data,
      product,
      columns,
      targetTitle,
      selectedRowKeys: [], // Check here to configure the default column
      modal_visible: false,
      confirmLoading: false,
      targetKeys: oriTargetKeys,
      selectedKeys: ['0'],
      disabled: false
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
    handleSearch(record) {
      console.log(record), (this.visible = true), (this.product = record)
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
    handleScroll(direction, e) {}
  }
}
</script>
<style lang='less' scoped>
</style>
