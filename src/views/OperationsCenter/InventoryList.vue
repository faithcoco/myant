<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="21">
          <a-input-search @search="onSearch" placeholder="请输入搜索内容" />
        </a-col>
        <a-col :span="3">
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
      <a-table
        :row-selection="rowSelection"
        :columns="targetTitle"
        :data-source="data"
        bordered
        size="middle"
        :scroll="{ x: 'calc(700px + 50%)', y: 400 }"
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
        <a-descriptions-item label="盘点单编码">{{product.name }}</a-descriptions-item>
        <a-descriptions-item label="盘点仓库编码">{{product.code}}</a-descriptions-item>
        <a-descriptions-item label="部门编码">{{product.unit}}</a-descriptions-item>
        <a-descriptions-item label="盘点日期">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="存货编码">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="货位编码">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="批次编码">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="数量">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="计量单位">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="包装数量">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="包装单位">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="单价">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="金额">{{product.purchase_unit_price}}</a-descriptions-item>
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
    title: '盘点单编码',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age,
    scopedSlots: { customRender: 'name' }
  },
  {
    key: '1',
    title: '盘点仓库编码',
    dataIndex: 'code',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.name - b.name
  },
  {
    key: '2',
    title: '部门编码',
    dataIndex: 'unit',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '3',
    title: '盘点日期',
    dataIndex: 'sales_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '4',
    title: '存货编码',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '5',
    title: '存货名称',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '6',
    title: '货位编码',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '7',
    title: '批次编码',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '8',
    title: '数量',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '9',
    title: '计量单位',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '10',
    title: '包装数量',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '11',
    title: '包装单位',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '12',
    title: '单价',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '13',
    title: '金额',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '14',
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    code: `000${i}`,
    name: `电热毛巾架${i}`,
    type: `K-0000T-${i}`,
    unit: 46 - i,
    sales_unit_price: 5,
    purchase_unit_price: 3
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
