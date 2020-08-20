<template>
  <div>
    <a-card>
      <a-row :gutter="8">
        <a-col :span="5">
          <span>货品分类</span>
          <a-button style="margin-left: 90px" type="primary" @click="Classify()">分类设置</a-button>
          <a-divider type="horizontal" />
          <s-tree
            :dataSource="ClassifyTree"
            :openKeys.sync="openKeys"
            @click="handleClick"
            @add="handleAdd"
            @titleClick="handleTitleClick"
          ></s-tree>
        </a-col>

        <a-col :span="19">
          <a-select default-value="全部" style="width:220px" @change="selectChange(value)">
            <a-select-option v-for="SList in selectList" :key="SList.value" :value="SList.value">{{
              SList.value
            }}</a-select-option>
          </a-select>
          <!-- 
             default-value   默认值
             style="width:220px"   样式设置   宽度为220像素
             @change  监听事件变化 当value变化时触发change事件绑定的函数
          -->

          <a-input-search @search="onSearch" style="width:220px;margin-left:20px" placeholder="请输入搜索内容" />
          <!-- @search  监听搜索事件 搜索框输入时触发onSearch函数 -->
          <!-- 将显示区域的宽度分为24等份，用:span 来表示每一个内容占的分数、比例 -->
          <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
            <!-- 
              float: 'right',  向右浮动
              overflow: 'hidden'   内容超出给定宽高值后会隐藏超出部分内容
            -->

            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>
            <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">设置</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
            <!--  @click 点击事件 绑定函数可以在点击按钮时触发 -->
          </span>
          <s-table
            ref="table"
            size="default"
            :columns="targetTitle"
            :data="loadData"
            :alert="false"
            :scroll="{ x: 1500 }"
            bordered
            style="margin-top:20px"
          >
            <!--
        ref="table"  ref给一个名称之后可以用this.$refs.table 来获取这个元素 比如下面刷新表格就是用这个方法获取的表格元素
        size="default"   将表格尺寸设为默认   其他值： middle  中号 | small  小号
        :columns="targetTitle"  表头绑定数据
        :data="loadData"        表格内容数据绑定
        -->
            <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
            <span slot="customTitle">
              {{ Operation }}
              <a-icon :type="isfold" :style="{ fontSize: '18px' }" @click="WidthChange()" />
              <!--
            :type="isfold"                  图标类型
            :style="{ fontSize: '18px' }"   图标样式   fontsize  字体大小
             @click="WidthChange()"         点击事件绑定函数    
           -->
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
    <!--
        调用自定义组件 approval 
        :visible="approval_visible"  控制组件显隐
        :product="product"           获取product对象      
         @change="change"            绑定自定义事件      发生变化时触发
     -->
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
import { getProductList, getProductListColumns, getclassificationGoodsList } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'

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
  { value: '单位毛重' }
]

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
      loadData: parameter => {
        return getProductList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      ClassifyTree: [],
      moment
    }
  },
  created() {
    getProductListColumns().then(res => {
      console.log('res------->', res)
      this.columns = res.result
      this.columns = [
        {
          key: '0',
          title: '货品编码',
          dataIndex: 'productCode',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: true,
          isShow: true,
          scopedSlots: {
            customRender: 'name'
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '1',
          title: '货品名称',
          dataIndex: 'productName',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '2',
          title: '规格型号',
          dataIndex: 'SpecificationModel',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '3',
          title: '存货编码',
          dataIndex: 'InventoryCode',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '4',
          title: '存货名称',
          dataIndex: 'InventoryName',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '5',
          title: '主计量单位',
          dataIndex: 'MainUnit',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '6',
          title: '电商销售单位',
          dataIndex: 'SalesUnit',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '7',
          title: '分销单位',
          dataIndex: 'DistributionUnit',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '8',
          title: '最低售价',
          dataIndex: 'LowestPrice',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '9',
          title: '商品描述',
          dataIndex: 'description',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '10',
          title: '默认发货仓库',
          dataIndex: 'DefaultShippingWarehouse',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '11',
          title: '是否虚拟物品',
          dataIndex: 'VirtualItem',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '12',
          title: '图片',
          dataIndex: 'Image',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '13',
          title: '预发货日期',
          dataIndex: 'StorageDate',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '14',
          title: '单位毛重',
          dataIndex: 'UnitGrossWeight',
          defaultSortOrder: 'descend',
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: null
          },
          fixed: null,
          slots: {
            title: null
          }
        },
        {
          key: '15',
          slots: { title: 'customTitle' },
          dataIndex: 'action',
          defaultSortOrder: null,
          width: 155,
          sorter: null,
          isShow: true,
          scopedSlots: {
            customRender: 'action'
          },
          fixed: 'right'
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
    getclassificationGoodsList().then(res => {
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
    Classify() {
      this.$router.push({ name: 'ClassificationGoods' }) //编程式导航  修改 url，完成跳转
    },
    add() {
      this.$router.push({ name: 'ProductAdd' }) //编程式导航  修改 url，完成跳转
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
        key: e.key
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
    }
  }
}
</script>
<style lang="less" scoped></style>
