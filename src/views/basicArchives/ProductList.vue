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
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
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
          <a-descriptions-item label="产品名称">{{product.name }}</a-descriptions-item>
          <a-descriptions-item label="产品编码">{{product.code}}</a-descriptions-item>
          <a-descriptions-item label="规格型号">{{product.type}}</a-descriptions-item>
          <a-descriptions-item label="计量单位">{{product.unit}}</a-descriptions-item>
          <a-descriptions-item label="销售单价">{{product.sales_unit_price}}</a-descriptions-item>
          <a-descriptions-item label="采购单价">{{product.purchase_unit_price}}</a-descriptions-item>
          <a-descriptions-item
            label="Address"
          >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</a-descriptions-item>
        </a-descriptions>
      </a-drawer>
  </div>
</template>

<script>
import Vue from 'vue'
import { Descriptions } from 'ant-design-vue'
Vue.use(Descriptions)

const columns = [
  {
    title: '产品名称',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '产品编码',
    dataIndex: 'code',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name
  },

  {
    title: '规格型号',
    dataIndex: 'type',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '计量单位',
    dataIndex: 'unit',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '销售单价',
    dataIndex: 'sales_unit_price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '采购单价',
    dataIndex: 'purchase_unit_price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
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
    code: `000${i}`,
    name: `电热毛巾架${i}`,
    type: `K-0000T-${i}`,
    unit: 46 - i,
    sales_unit_price: 5,
    purchase_unit_price: 3,
    age: i + 1,
    address: `London, Park Lane no. ${i}`
  })
}
const product = {}

export default {
  data() {
    return {
      visible: false,
      data,
      product,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      visible: false,
      confirmLoading: false
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
      console.log(value)
    },
    handleSearch(record) {
      console.log(record), (this.visible = true), (this.product = record)
    },
     handleSetting(record) {
      console.log(record)
    },
    handleEdit(record) {
      console.log(record),
       this.$router.push({path:'/add'})
    },
    handleSub(record) {
      console.log(record)
    },
    onDelete(key) {
      const data = [...this.data]
      this.data = data.filter(item => item.key !== key)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
<style lang='less' scoped>
</style>
