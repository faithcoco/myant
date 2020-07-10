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
        <a-descriptions-item label="货品编码">{{product.Type }}</a-descriptions-item>
        <a-descriptions-item label="货品名称">{{product.code}}</a-descriptions-item>
        <a-descriptions-item label="规格型号">{{product.type}}</a-descriptions-item>
        <a-descriptions-item label="存货编码">{{product.type}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.unit}}</a-descriptions-item>
        <a-descriptions-item label="主计量单位">{{product.sales_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="电商销售单位">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="分销单位">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="最低售价">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="商品描述">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="默认发货仓库">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="是否虚拟物品">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="图片">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="预发货日期">{{product.purchase_unit_price}}</a-descriptions-item>
        <a-descriptions-item label="单位毛重">{{product.purchase_unit_price}}</a-descriptions-item>
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
          <p>{{item.content}}</p>
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
                <a-mentions-option value="黄平">黄平</a-mentions-option>
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
import { getOrgTree, getServiceList } from '@/api/manage'



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
    content: '了解一下功能'
  }
]

const columns = [
  {
    key: '0',
    title: '货品编码',
    dataIndex: 'productCode',
    defaultSortOrder: 'descend',
    width: 150,
    sorter: (a, b) => a.age - b.age,
    scopedSlots: { customRender: 'name' }
  },
  {
    key: '1',
    title: '货品名称',
    dataIndex: 'productName',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.name - b.name
  },

  {
    key: '2',
    title: '规格型号',
    dataIndex: 'SpecificationModel',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '3',
    title: '存货编码',
    dataIndex: 'InventoryCode',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '4',
    title: '存货名称',
    dataIndex: 'InventoryName',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '5',
    title: '主计量单位',
    dataIndex: 'MainUnit',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '6',
    title: '电商销售单位',
    dataIndex: 'SalesUnit',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '7',
    title: '分销单位',
    dataIndex: 'DistributionUnit',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '8',
    title: '最低售价',
    dataIndex: 'LowestPrice',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '9',
    title: '商品描述',
    dataIndex: 'description',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '10',
    title: '默认发货仓库',
    dataIndex: 'DefaultShippingWarehouse',
    defaultSortOrder: 'descend',
    width: 150,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '11',
    title: '是否虚拟物品',
    dataIndex: 'VirtualItem',
    defaultSortOrder: 'descend',
    width: 160,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '12',
    title: '图片',
    dataIndex: 'Image',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '13',
    title: '预发货日期',
    dataIndex: 'StorageDate',
    defaultSortOrder: 'descend',
    width: 140,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '14',
    title: '单位毛重',
    dataIndex: 'UnitGrossWeight',
    defaultSortOrder: 'descend',
    width: 120,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '15',
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
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
    unit: '箱',
    StorageProduct: `000${i}`,
    purchase_unit_price: `000${i}`
  })
}
const width = 120
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

      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',

      confirmLoading: false,
      targetKeys: oriTargetKeys,
      selectedKeys: ['0'],
      disabled: false,
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          // console.log('/service-->', JSON.stringify(res.result))
          res.result = {
            pageSize: 10,
            pageNo: 1,
            totalCount: 3,
            totalPage: 1,
            data: [
              {
                productCode: '01019002060001',
                productName: '硬盘-1000G',
                SpecificationModel: '希捷 1000G/7222RPM/32M/SATA2/企业级',
                InventoryCode: '01019002065',
                InventoryName: '硬盘-1000G',
                MainUnit: 'PCS',
                SalesUnit: 'PCS',
                DistributionUnit: 'PCS',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '0390',
                productName: '三星手机S6贴膜',
                SpecificationModel: '',
                InventoryCode: '0390',
                InventoryName: '三星手机S6贴膜',
                MainUnit: '盒',
                SalesUnit: '张',
                DistributionUnit: '张',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00000102040001',
                productName: '大容量存储器',
                SpecificationModel: '',
                InventoryCode: '010204',
                InventoryName: '大容量存储器',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00000102060001',
                productName: '普通存储器',
                SpecificationModel: '',
                InventoryCode: '010206',
                InventoryName: '普通存储器',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00000102070001',
                productName: '高速处理器',
                SpecificationModel: '',
                InventoryCode: '010207',
                InventoryName: '高速处理器',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00000102080001',
                productName: '普通处理器',
                SpecificationModel: '',
                InventoryCode: '010208',
                InventoryName: '普通处理器',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00010210010001',
                productName: '蓝牙耳机',
                SpecificationModel: '',
                InventoryCode: '01021001',
                InventoryName: '蓝牙耳机',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00000102110001',
                productName: '充电器',
                SpecificationModel: '',
                InventoryCode: '010211',
                InventoryName: '充电器',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00010211010001',
                productName: '旅充',
                SpecificationModel: '',
                InventoryCode: '01021101',
                InventoryName: '旅充',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00010211020001',
                productName: '新式旅充',
                SpecificationModel: '',
                InventoryCode: '01021102',
                InventoryName: '新式旅充',
                MainUnit: '个',
                SalesUnit: '个',
                DistributionUnit: '个',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              },
              {
                productCode: '00000102170001',
                productName: '蓝牙',
                SpecificationModel: '',
                InventoryCode: '010217',
                InventoryName: '蓝牙',
                MainUnit: '只',
                SalesUnit: '只',
                DistributionUnit: '只',
                LowestPrice: '0.00',
                description: '',
                DefaultShippingWarehouse: '',
                VirtualItem: '否',
                Image: '',
                StorageDate: '',
                UnitGrossWeight: '0.00'
              }
            ]
          }
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
      }, 1000),
        (this.chat_visible = false)
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
    onSelect(option) {
      console.log('select', option)
    },
    onChange(value) {
      console.log('Change:', value)
    },
    fileChange(info) {
      if (info.file.status !== 'uploading') {
             console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
