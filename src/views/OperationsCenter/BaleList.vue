<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="16">
          <a-select default-value="全部" style="width:220px" @change="selectChange(value)">
            <a-select-option
              v-for="SList in selectList"
              :key="SList.value"
              :value="SList.value"
            >{{SList.value}}</a-select-option>
          </a-select>
          <a-input-search
            @search="onSearch"
            style="width:220px;margin-left:20px"
            placeholder="请输入搜索内容"
          />
        </a-col>
        <a-col :span="8">
          <span
            class="table-page-search-submitButtons"
            :style="{ float: 'right', overflow: 'hidden' } || {} "
          >
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>
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
        :scroll="{ x: 1500 }"
        bordered
      >
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <span slot="customTitle">
          <a-icon type="menu-fold" :style="{ fontSize: '18px'}" @click="WidthChange()" />
          {{Operation}}
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
        <a-descriptions-item label="装箱单编码">{{product.PackingCode }}</a-descriptions-item>
        <a-descriptions-item label="装箱仓库编码">{{product.PackingWarehouseCode}}</a-descriptions-item>
        <a-descriptions-item label="部门编码">{{product.DepartmentCode}}</a-descriptions-item>
        <a-descriptions-item label="业务员编码">{{product.SalesmanCode}}</a-descriptions-item>
        <a-descriptions-item label="装箱日期">{{product.PackingDate}}</a-descriptions-item>
        <a-descriptions-item label="装箱状态">{{product.Status}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.InventoryName}}</a-descriptions-item>
        <a-descriptions-item label="批次编码">{{product.BatchCode}}</a-descriptions-item>
        <a-descriptions-item label="货位编码">{{product.BatchCode}}</a-descriptions-item>
        <a-descriptions-item label="数量">{{product.Quantity}}</a-descriptions-item>
        <a-descriptions-item label="计量单位">{{product.Unit}}</a-descriptions-item>
        <a-descriptions-item label="包装数量">{{product.PackingQuantity}}</a-descriptions-item>
        <a-descriptions-item label="包装单位">{{product.PackingUnit}}</a-descriptions-item>
        <a-descriptions-item label="单价">{{product.UnitPrice}}</a-descriptions-item>
        <a-descriptions-item label="金额">{{product.Amount}}</a-descriptions-item>
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
import { getBaleList, getApproval, getPersonnelList, getBaleListColumns } from '@/api/manage'

const selectList = [
  { value: '全部' },
  { value: '装箱单编码' },
  { value: '装箱仓库编码' },
  { value: '部门编码' },
  { value: '业务员编码' },
  { value: '装箱日期' },
  { value: '装箱状态' },
  { value: '存货名称' },
  { value: '批次编码' },
  { value: '货位编码' },
  { value: '数量' },
  { value: '计量单位' },
  { value: '包装数量' },
  { value: '包装单位' },
  { value: '单价' },
  { value: '金额' },
]
const timelinelist = []
const columns = [
  {
    key: '0',
    title: '装箱单编码',
    dataIndex: 'PackingCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: true,
    scopedSlots: {
      customRender: 'name',
    },
    fixed: '',
  },
  {
    key: '1',
    title: '装箱仓库编码',
    dataIndex: 'PackingWarehouseCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '2',
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '3',
    title: '业务员编码',
    dataIndex: 'SalesmanCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '4',
    title: '装箱日期',
    dataIndex: 'PackingDate',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '5',
    title: '装箱状态',
    dataIndex: 'PackingStatus',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '7',
    title: '存货名称',
    dataIndex: 'InventoryName',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '8',
    title: '批次编码',
    dataIndex: 'BatchCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '9',
    title: '货位编码',
    dataIndex: 'LocationCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '10',
    title: '数量',
    dataIndex: 'Quantity',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '11',
    title: '计量单位',
    dataIndex: 'Unit',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '12',
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '13',
    title: '包装单位',
    dataIndex: 'UnitPrice',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '14',
    title: '单价',
    dataIndex: 'Unit',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '15',
    title: '金额',
    dataIndex: 'Amount',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: '',
    },
    fixed: '',
  },
  {
    key: '16',
    slots: { title: 'customTitle' },
    dataIndex: 'action',
    defaultSortOrder: '',
    width: 155,
    sorter: '',
    scopedSlots: {
      customRender: 'action',
    },
    fixed: 'right',
  },
]
const personnelList = []
const width = 120
const product = {}
const targetTitle = columns
const Operat_visible = true
export default {
  components: {
    STable,
    STree,
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      personnelList,
      selectList,
      visible: false,
      chat_visible: false,
      Operat_visible,
      status: '正在审批',
      Operation: '操作',
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
      loadData: (parameter) => {
        return getBaleList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      },
      submitting: false,
      value: '',
      moment,
    }
  },
  created() {
    // getBaleListColumns().then((res) => {
    //   this.columns = res.result
    //   this.targetTitle = this.columns
    // })
    for (const key in this.columns) {
      if (this.columns[key].dataIndex == 'action' && this.columns[key].width == 85) {
        this.Operat_visible = false
      }
    }
    getPersonnelList().then((res) => {
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
        onSelection: this.onSelection,
      }
    },
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
      this.targetList = this.data.filter(function (data) {
        return Object.keys(data).some(function (key) {
          return String(data[key]).toLowerCase().indexOf(value) > -1
        })
      })
    },
    handleDetail(record) {
      console.log(record),
        (this.visible = true),
        (this.product = record),
        getApproval().then((res) => {
          this.timelinelist = res.result
        })
    },
    WidthChange() {
      for (const key in this.columns) {
        if (this.columns[key].dataIndex == 'action') {
          if (this.Operat_visible) {
            this.Operat_visible = false
            this.columns[key].width = 85
          } else {
            this.Operat_visible = true
            this.columns[key].width = 155
          }
        }
      }
    },
    add() {
      this.$router.push({ name: 'BaleAdd' })
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
      this.data = data.filter((item) => item.key !== key)
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
          content: this.value,
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
    },
  },
}
</script>
<style lang='less' scoped>
</style>
