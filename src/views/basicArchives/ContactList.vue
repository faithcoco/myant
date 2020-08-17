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
      <approval :visible="approval_visible" :product="product" @change="change"></approval>
    </a-card>
    <!-- <a-drawer
      title="产品详情"
      placement="right"
      :width="720"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-descriptions title :column="1">
        <a-descriptions-item label="联系人编码">{{ product.ContactCode }}</a-descriptions-item>
        <a-descriptions-item label="联系人名称">{{ product.ContactName }}</a-descriptions-item>
        <a-descriptions-item label="所属客户">{{ product.Customer }}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{ product.Principal }}</a-descriptions-item>
        <a-descriptions-item label="是否是主要联系人">{{ product.PrimaryContact }}</a-descriptions-item>
        <a-descriptions-item label="称呼">{{ product.Call }}</a-descriptions-item>
        <a-descriptions-item label="性别">{{ product.Gender }}</a-descriptions-item>
        <a-descriptions-item label="默认联系人">{{ product.DefaultContact }}</a-descriptions-item>
        <a-descriptions-item label="职务">{{ product.Job }}</a-descriptions-item>
        <a-descriptions-item label="手机">{{ product.Tel }}</a-descriptions-item>
        <a-descriptions-item label="爱好">{{ product.Hobby }}</a-descriptions-item>
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
import { getContactList, getContactListColumns } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'

const selectList = [
  { value: '全部' },
  { value: '联系人编码' },
  { value: '联系人名称' },
  { value: '所属客户' },
  { value: '负责人' },
  { value: '是否是主要联系人' },
  { value: '称呼' },
  { value: '性别' },
  { value: '默认联系人' },
  { value: '职务' },
  { value: '手机' },
  { value: '爱好' }
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
        return getContactList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  created() {
    getContactListColumns().then(res => {
      this.columns = res.result
      this.columns = [
        {
          key: '0',
          title: '联系人编码',
          dataIndex: 'ContactCode',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: true,
          isShow: true,
          scopedSlots: {
            customRender: 'name'
          }
        },
        {
          key: '1',
          title: '联系人名称',
          dataIndex: 'ContactName',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '2',
          title: '所属客户',
          dataIndex: 'Customer',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '3',
          title: '负责人',
          dataIndex: 'Principal',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '4',
          title: '是否是主要联系人',
          dataIndex: 'PrimaryContact',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '5',
          title: '称呼',
          dataIndex: 'Call',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '6',
          title: '性别',
          dataIndex: 'Gender',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '7',
          title: '默认联系人',
          dataIndex: 'DefaultContact',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '8',
          title: '职务',
          dataIndex: 'Job',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '9',
          title: '手机',
          dataIndex: 'Tel',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '10',
          title: '爱好',
          dataIndex: 'Hobby',
          defaultSortOrder: 'descend',
          width: 155,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: ''
          }
        },
        {
          key: '11',
          slots: { title: 'customTitle' },
          dataIndex: 'action',
          defaultSortOrder: '',
          width: 155,
          fixed: 'right',
          sorter: '',
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
      this.$router.push({ name: 'ContactAdd' })
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
