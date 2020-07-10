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
        :scroll="{ x: 1500 }"
        bordered
      >
        <a slot="name" slot-scope="text, record" @click="handleSearch(record)">{{ text }}</a>

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
        <a-descriptions-item label="审批状态">
          <a-tag :color="color">{{status}}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="入库单编码">{{product.Type}}</a-descriptions-item>
        <a-descriptions-item label="入库类型编码">{{product.Num}}</a-descriptions-item>
        <a-descriptions-item label="关联单据">{{product.Warehouse}}</a-descriptions-item>
        <a-descriptions-item label="入库日期">{{product.StorageDate}}</a-descriptions-item>
        <a-descriptions-item label="供应商编码">{{product.Principal}}</a-descriptions-item>
        <a-descriptions-item label="客户编码">{{product.RelatedDocuments}}</a-descriptions-item>
        <a-descriptions-item label="部门编码">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="存货编码">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="货位编码">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="批次编码">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="数量">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="计量单位">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="包装数量">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="包装单位">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="单价">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="金额">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item
          label="Address"
        >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</a-descriptions-item>
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
                <a-mentions-option value="高明亮">高明亮</a-mentions-option>
                <a-mentions-option value="张勇">张勇</a-mentions-option>
                <a-mentions-option value="吴杨">吴杨</a-mentions-option>
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
import { getOrgTree, getServiceList, getStorageManagementList } from '@/api/manage'

const timelinelist = [
  {
    key: '0',
    title: 'curry 提交合同申请',
    time: '2020-07-01 10:00',
    content: ''
  },
  {
    key: '1',
    title: 'curry 评论',
    time: '2020-07-02 10:00',
    content: '了解一下功能',
    mentions: [{ name: '高明亮' }, { name: '张勇' }]
  },
  {
    key: '1',
    title: 'curry 评论',
    time: '2020-07-03 10:00',
    content: '发一张图片',
    img: [
      { src: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
      { src: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' }
    ],
    isShow: 'true'
  }
]
const columns = [
  {
    key: '0',
    title: '记账人',
    dataIndex: 'Bookkeeper',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age,
    scopedSlots: { customRender: 'name' }
  },
  {
    key: '1',
    title: '仓库编码',
    dataIndex: 'WarehouseCode',
    width: 120,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },

  {
    key: '2',
    title: '仓库',
    dataIndex: 'Warehouse',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '3',
    title: '入库日期',
    dataIndex: 'StorageDate',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '4',
    title: '入库单号',
    dataIndex: 'StorageNumber',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },

  {
    key: '5',
    title: '入库类别编码',
    dataIndex: 'DepartmentCode',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '6',
    title: '入库类别',
    dataIndex: 'StorageCategory',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '7',
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '8',
    title: '部门',
    dataIndex: 'Department',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '9',
    title: '业务员',
    dataIndex: 'Salesman',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '10',
    title: '供应商',
    dataIndex: 'Supplier',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '11',
    title: '存货编码',
    dataIndex: 'InventoryCode',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '12',
    title: '存货名称',
    dataIndex: 'InventoryName',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '13',
    title: '规格型号',
    dataIndex: 'SpecificationModel',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '14',
    title: '主计量单位',
    dataIndex: 'MainUnit',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '15',
    title: '数量',
    dataIndex: 'Quantity',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '16',
    title: '本币无税单价',
    dataIndex: 'NoTaxUnitPrice',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '17',
    title: '本币无税金额',
    dataIndex: 'NoTaxAmount',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '18',
    title: '工厂编码',
    dataIndex: 'FactoryCode',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '19',
    title: '工厂名称',
    dataIndex: 'FactoryName',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '20',
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    Num: `000${i}`,
    Type: '生活用品',
    Warehouse: `K${i}`,
    StorageDate: `1月${i + 1}日`,
    Principal: 'zhangsan',
    RelatedDocuments: `qwsadas${i}`,
    StorageProduct: `000${i}`
  })
}

const product = {}
const targetTitle = columns
export default {
  components: {
    STable,
    STree
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      visible: false,
      chat_visible: false,
      data,
      status: '正在审批',
      color: '',
      product,
      columns,
      timelinelist,
      targetTitle,
      selectedRowKeys: [], // Check here to configure the default column
      modal_visible: false,
      confirmLoading: false,
      targetKeys: oriTargetKeys,
      selectedKeys: ['0'],
      disabled: false,
      loadData: parameter => {
        return getStorageManagementList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log('/getStorageManagementList-->', JSON.stringify(res))
          return res.result
        })
      },
      comments: [
        {
          actions: ['回复'],
          author: 'TOM',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: ' 你好 请问有什么可以帮助你',
          datetime: moment().subtract(1, 'days')
        },
        {
          actions: ['回复'],
          author: 'Jerry',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: '很高兴见到你',
          datetime: moment().subtract(2, 'days')
        }
      ],
      submitting: false,
      value: '',
      moment
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
