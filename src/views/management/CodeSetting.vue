<template>
  <div>
    <a-card>
      <a-table :columns="targetTitle" :data-source="data">
        <span slot="use" style="margin: 0">
          <a-checkbox @change="onChange" />
        </span>
        <span slot="prefix">
          <a-input value="pt" style="width: 50px" />
        </span>
        <span slot="suffix">
          <a-input value="5" style="width: 50px" />
        </span>
        <span slot="initial" style="margin: 0">
          <a-input value="1" style="width: 50px" />
        </span>
        <span slot="date" slot-scope="text, record" @click="handleDate(record)">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">{{text}}</a>
            <a-menu slot="overlay" @click="onClick">
              <a-menu-item key="1">年</a-menu-item>
              <a-menu-item key="2">年/月</a-menu-item>
              <a-menu-item key="3">年/月/日</a-menu-item>
              <a-menu-item key="4">不包含日期</a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <a slot="name" slot-scope="text, record" @click="handleSearch(record)">{{ text }}</a>
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
        <a-descriptions-item label="功能模块">{{product.name }}</a-descriptions-item>
        <a-descriptions-item label="字符名称">{{product.code}}</a-descriptions-item>
        <a-descriptions-item label="前缀编号">{{product.type}}</a-descriptions-item>
        <a-descriptions-item label="日期">{{product.unit}}</a-descriptions-item>
        <a-descriptions-item label="后缀位数">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="初始值">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item
          label="示例"
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
import { getCodeSettingColumns } from '@/api/manage'

const columns = []
const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    code: `合同编号`,
    name: `应收合同普通`,
    unit: 46 - i,
    sales_unit_price: 5,
    purchase_unit_price: 3,
    example: 'PT2020062200001',
    date: '年'
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
      selectedRowKeys: [], 
      modal_visible: false,
      confirmLoading: false,
      targetKeys: oriTargetKeys,
      selectedKeys: ['0'],
      disabled: false
    }
  },
  created() {
    getCodeSettingColumns().then(res => {
      this.targetTitle = res.columns
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
    onClick({ key }) {
      console.log(`Click on item ${key}`)
    },
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
    handleDate(record) {
      console.log(record)
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
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    }
  }
}
</script>
<style lang='less' scoped>
</style>
