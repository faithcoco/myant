<template>
  <div>
    <a-card>
      <a-row :gutter="10">
        <a-col :span="4">
          <span>货品分类</span>
          <a-button style="margin-left: 40px" type="primary" @click="Classify()">分类设置</a-button>
          <a-divider type="horizontal" />
          <s-tree
            :dataSource="ClassifyTree"
            :openKeys.sync="openKeys"
            @click="handleClick"
            @add="handleAdd"
            @titleClick="handleTitleClick"
          ></s-tree>
        </a-col>

        <a-col :span="20">
          <a-select default-value="全部" style="width: 220px" @change="selectChange(value)">
            <a-select-option v-for="SList in selectList" :key="SList.value" :value="SList.value">{{
              SList.value
            }}</a-select-option>
          </a-select>

          <a-input-search @search="onSearch" style="width: 220px; margin-left: 20px" placeholder="请输入搜索内容" />

          <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>

            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
          </span>
          <s-table
            ref="table"
            size="default"
            :columns="columns"
            :data="loadData"
            :alert="false"
            :scroll="{ x: 1500 }"
            bordered
            style="margin-top: 20px"
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
        </a-col>
      </a-row>
    </a-card>

    <approval :visible="approval_visible" :product="product" @change="change"></approval>
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
        :render="(item) => item.title"
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
import { getProductList, getProductListColumns, getclassificationGoodsList } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'
import { logininfo } from '@/store/mutation-types'
const columns = []
const selectList = [
  { value: '全部' },
  { value: '货品编码' },
  { value: '货品名称' },
  { value: '规格型号' },
  { value: '存货编码' },
  { value: '存货名称' },
  { value: '主计量单位' },
  { value: '电商销售单位' },
  { value: '分销单位' },
  { value: '最低售价' },
  { value: '商品描述' },
  { value: '默认发货仓库' },
  { value: '是否虚拟物品' },
  { value: '图片' },
  { value: '预发货日期' },
  { value: '单位毛重' },
]

const product = {}
const targetTitle = columns
const Operat_visible = true
export default {
  components: {
    STable,
    STree,
    Approval,
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      openKeys: ['key-01'],
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
      loadData: (parameter) => {
        parameter.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71003'
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        return getProductList(Object.assign(parameter, this.queryParam)).then((res) => {
          console.log("list-->",JSON.stringify(res))
          return res.result
        })
      },
      ClassifyTree: [],
      moment,
    }
  },
  created() {
    const columnsParams = {}
    columnsParams.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71003'
    columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
    getProductListColumns(columnsParams).then((res) => {
      console.log('columns------->', JSON.stringify(res))
      this.columns = res.result.columns

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
    getclassificationGoodsList().then((res) => {
      this.ClassifyTree = res.result
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
    onSearch(value) {
      console.log(value)
      this.queryParam = {
        key: value,
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
    Classify() {
      this.$router.push({ name: 'ClassificationGoods' }) //编程式导航  修改 url，完成跳转
    },
    add() {
      this.$router.push({ name: 'ProductAdd' }) //编程式导航  修改 url，完成跳转
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
          //
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
    },
    handleClick(e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key,
      }
      this.$refs.table.refresh(true)
    },
    handleAdd(item) {
      console.log('add button, item', item)
      //   this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick(item) {
      console.log('handleTitleClick', item)
    },
  },
}
</script>
<style lang="less" scoped></style>
