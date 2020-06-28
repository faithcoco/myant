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
        <a-descriptions-item label="供应商编码">{{product.Type}}</a-descriptions-item>
        <a-descriptions-item label="供应商名称">{{product.StorageProduct }}</a-descriptions-item>
        <a-descriptions-item label="供应商类型">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="联系人编码">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="备注">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item label="纳税人识别号">{{product.StorageProduct}}</a-descriptions-item>
        <a-descriptions-item
          label="Address"
        >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" @click="chatClick">聊一聊</a-button>
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
      title="评论"
      :visible="chat_visible"
      :confirm-loading="confirmLoading"
      @ok="chatOk"
      @cancel="chatCancel"
    >
      <div>
        <a-list
          v-if="comments.length"
          :data-source="comments"
          :header="`${comments.length} ${comments.length > 1 ? '回复' : '回复'}`"
          item-layout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment
              :author="item.author"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="item.datetime"
            />
          </a-list-item>
        </a-list>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" :value="value" @change="chatChange" />
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
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import { getOrgTree, getServiceList } from '@/api/manage'

const columns = [
  {
    key: '0',
    title: '供应商编码',
    dataIndex: 'Type',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.name - b.name,
    scopedSlots: { customRender: 'name' }
  },

  {
    key: '1',
    title: '供应商名称',
    dataIndex: 'StorageProduct',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '2',
    title: '供应商类型',
    dataIndex: 'StorageProduct',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '3',
    title: '负责人',
    dataIndex: 'StorageProduct',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '4',
    title: '纳税人识别号',
    dataIndex: 'StorageProduct',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '5',
    title: '联系人编码',
    dataIndex: 'StorageProduct',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '6',
    title: '备注',
    dataIndex: 'StorageProduct',
    defaultSortOrder: 'descend',
    width: 100,
    sorter: (a, b) => a.age - b.age
  },
  {
    key: '7',
    title: '操作',
    dataIndex: 'StorageProduct',
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
    type: `国营`,
    principal: '王五',
    TaxpayerIdentificationNumber: `000${i}`,
    ContactPerson: '王五',
    tel: '13333333333'
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
      product,
      columns,
      targetTitle,
      selectedRowKeys: [], // Check here to configure the default column
      modal_visible: false,
      confirmLoading: false,
      targetKeys: oriTargetKeys,
      selectedKeys: ['0'],
      disabled: false,
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log('/service-->', JSON.stringify(res.result))
          return res.result
        })
      },
      comments: [],
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

      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow()
          },
          ...this.comments
        ]
        this.value = ''
      }, 1000)
    },
    chatChange(e) {
      this.value = e.target.value
    },
    chatClick() {
      this.chat_visible = true
    },
    chatOk(e) {
      this.chat_visible = false
    },
    chatCancel(e) {
      this.chat_visible = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
