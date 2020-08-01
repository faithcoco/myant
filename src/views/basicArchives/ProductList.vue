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
          <!-- 
             default-value   默认值
             style="width:220px"   样式设置   宽度为220像素
             @change  监听事件变化 当value变化时触发change事件绑定的函数
          -->
          <a-input-search
            @search="onSearch"
            style="width:220px;margin-left:20px"
            placeholder="请输入搜索内容"
          />
          <!-- @search  监听搜索事件 搜索框输入时触发onSearch函数 -->
        </a-col>

        <a-col :span="8">
          <!-- 将显示区域的宽度分为24等份，用:span 来表示每一个内容占的分数、比例 -->
          <span
            class="table-page-search-submitButtons"
            :style="{ float: 'right', overflow: 'hidden' } || {} "
          >
            <!-- 
              float: 'right',  向右浮动
              overflow: 'hidden'   内容超出给定宽高值后会隐藏超出部分内容
            -->
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>
            <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">设置</a-button>
            <a-button style="margin-left: 5px" @click="() => queryParam = {}">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => queryParam = {}">导出</a-button>
            <!--  @click 点击事件 绑定函数可以在点击按钮时触发 -->
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
        :scroll="{ x: 1500}"
        bordered
      >
        <!--
        ref="table"  ref给一个名称之后可以用this.$refs.table 来获取这个元素 比如下面刷新表格就是用这个方法获取的表格元素
        size="default"   将表格尺寸设为默认   其他值： middle  中号 | small  小号
        :columns="targetTitle"  表头绑定数据
        :data="loadData"        表格内容数据绑定
        -->
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
        <a-descriptions-item label="货品编码">{{product.productCode }}</a-descriptions-item>
        <a-descriptions-item label="货品名称">{{product.productName}}</a-descriptions-item>
        <a-descriptions-item label="规格型号">{{product.SpecificationModel}}</a-descriptions-item>
        <a-descriptions-item label="存货编码">{{product.InventoryCode}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.InventoryName}}</a-descriptions-item>
        <a-descriptions-item label="主计量单位">{{product.MainUnit}}</a-descriptions-item>
        <a-descriptions-item label="电商销售单位">{{product.SalesUnit}}</a-descriptions-item>
        <a-descriptions-item label="分销单位">{{product.SalesUnit}}</a-descriptions-item>
        <a-descriptions-item label="最低售价">{{product.LowestPrice}}</a-descriptions-item>
        <a-descriptions-item label="商品描述">{{product.description}}</a-descriptions-item>
        <a-descriptions-item label="默认发货仓库">{{product.DefaultShippingWarehouse}}</a-descriptions-item>
        <a-descriptions-item label="是否虚拟物品">{{product.VirtualItem}}</a-descriptions-item>
        <a-descriptions-item label="图片">{{product.Image}}</a-descriptions-item>
        <a-descriptions-item label="预发货日期">{{product.StorageDate}}</a-descriptions-item>
        <a-descriptions-item label="单位毛重">{{product.UnitGrossWeight}}</a-descriptions-item>
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
import { getProductList, getProductListColumns, getPersonnelList, getApproval } from '@/api/manage'
import action from '../../core/directives/action'

const columns = [
  {
    key: '0',
    title: '货品编码',
    dataIndex: 'productCode',
    defaultSortOrder: 'descend',
    width: 155,
    sorter: true,
    isShow: true,
    scopedSlots: {
      customRender: 'name',
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
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
      customRender: null,
    },
    fixed: null,
    slots: {
      title: null,
    },
  },
  {
   
    slots: { title: 'customTitle' },
    dataIndex: 'action',
    defaultSortOrder: null,
    width: 155,
    sorter: null,
    isShow: true,
    scopedSlots: {
      customRender: 'action',
    },
    fixed: 'right',
  
  },
]
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

const timelinelist = []
const personnelList = []
const product = {}
const targetTitle = columns
const Operat_visible=true
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
      Operation: '操作',
      status: '正在审批',
      color: '',
      product,
      columns,
      timelinelist,
      targetTitle,
      queryParam: {},
      selectedRowKeys: [],
      modal_visible: false,

      headers: {
        authorization: 'authorization-text',
      },
      size: 'small',

      confirmLoading: false,
      targetKeys: [],
      selectedKeys: [],
      disabled: false,
      loadData: (parameter) => {
        return getProductList(Object.assign(parameter, this.queryParam)).then((res) => {
          console.log(res)
          return res.result
        })
      },
      submitting: false,
      value: '',
      moment,
    }
  },
  created() {
    // getProductListColumns().then(res => {
    //   console.log('res------->',res);
    //   this.columns = res.result

    //   this.targetTitle = []

    //   for (const key in this.columns) {
    //     if (this.columns[key].isShow == true) {
    //       this.targetKeys.push(this.columns[key].key)
    //       this.targetTitle.push(this.columns[key])
    //     }
    //   }
    // })
    for (const key in this.columns) {
      if (this.columns[key].dataIndex=="action") {
      
        if(this.columns[key].width==85){
          this.Operat_visible=false
        }
      }
    }
    getPersonnelList().then((res) => {
      this.personnelList = res.result
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
      console.log(value)
      this.queryParam = {
        key: value,
      }
      this.$refs.table.refresh(true) //用refresh方法刷新表格
    },
    selectChange() {},
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
        console.log("is run--->",this.Operat_visible)
    },
    add() {
      this.$router.push({ name: 'ProductAdd' }) //编程式导航  修改 url，完成跳转
    },
    handleSetting(record) {
      console.log(record), (this.modal_visible = true) // modal_visible 置为 true  让设置界面显示
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
            columns[j].isShow = true
            this.targetTitle.push(columns[j])
          }
        }
      }
    },
    handleCancel(e) {
      this.modal_visible = false
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
    },
  },
}
</script>
<style lang='less' scoped>
</style>
