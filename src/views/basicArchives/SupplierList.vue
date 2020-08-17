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
          <!-- 
             default-value   默认值
             style="width:220px"   样式设置   宽度为220像素
             @change  监听事件变化 当value变化时触发change事件绑定的函数
          -->
          <a-input-search @search="onSearch" style="width:220px;margin-left:20px" placeholder="请输入搜索内容" />
          <!-- @search  监听搜索事件 搜索框输入时触发onSearch函数 -->
        </a-col>
        <a-col :span="8">
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
        <!--
        ref="table"  ref给一个名称之后可以用this.$refs.table 来获取这个元素 比如下面刷新表格就是用这个方法获取的表格元素
        size="default"   将表格尺寸设为默认   其他值： middle  中号 | small  小号
        :columns="targetTitle"  表头绑定数据
        :data="loadData"        表格内容数据绑定
        -->
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <span slot="customTitle">
          {{ Operation }}
          <a-icon :type="isfold" :style="{ fontSize: '18px' }" @click="WidthChange()"></a-icon>
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
          <a @click="onDelete(record)">删除</a>
        </span>
      </s-table>
    </a-card>
    <!--
        调用自定义组件 approval 
        :visible="approval_visible"  控制组件显隐
        :product="product"           获取product对象      
         @change="change"            绑定自定义事件      发生变化时触发
     -->
    <approval :visible="approval_visible" :product="product" @change="change"></approval>
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
        <a-descriptions-item label="供应商编码">{{ product.SupplierCode }}</a-descriptions-item>
        <a-descriptions-item label="供应商名称">{{ product.SupplierName }}</a-descriptions-item>
        <a-descriptions-item label="供应商简称">{{ product.SupplierAbbreviation }}</a-descriptions-item>
        <a-descriptions-item label="发展日期">{{ product.DevelopmentDate }}</a-descriptions-item>
        <a-descriptions-item label="电话">{{ product.Tel }}</a-descriptions-item>
        <a-descriptions-item label="专营业务员名称">{{ product.Salesman }}</a-descriptions-item>
        <a-descriptions-item label="分管部门名称">{{ product.department }}</a-descriptions-item>
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
    </a-drawer> -->

    <a-modal
      title="设置"
      :visible="visible_transfer"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <!-- 穿梭框
        :data-source="columns"                       数据源
        :titles="['选择显示字段', '已选择字段']"       标题集合，顺序从左至右
        :target-keys="targetKeys"                    显示在右侧框数据的 key 集合
        :selected-keys="selectedKeys"                设置哪些项应该被选中
        :render="item => item.title"
        :disabled="disabled"                        是否禁用
        @change="handleChange"                       选项在两栏之间转移时的回调函数
        @selectChange="handleSelectChange"          选中项发生改变时的回调函数
        @scroll="handleScroll"                       选项列表滚动时的回调函数-->
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
import moment from 'moment' //vue  时间管理
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
import { getSupplierList, getSupplierListColumns } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval' //导入自定义组件 Approval

const columns = []
const selectList = [
  { value: '全部' },
  { value: '供应商编码' },
  { value: '供应商名称' },
  { value: '供应商简称' },
  { value: '发展日期' },
  { value: '电话' },
  { value: '专营业务员名称' },
  { value: '分管部门名称' }
]
const product = {}
const targetTitle = columns
const Operat_visible = true
export default {
  components: {
    STable,
    STree,
    Approval //注册组件
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSupplierList(Object.assign(parameter, this.queryParam)).then(res => {
          //   console.log('res', res.result)
          return res.result
        })
      }
    }
  },
  created() {
    getSupplierListColumns().then(res => {
      //调用axios封装的方法  获取表头数据
      this.columns = res.result //将result中的数据保存到 this.columns中
      this.columns = [
        //本地数据
        {
          key: '0',
          title: '供应商编码',
          dataIndex: 'SupplierCode',
          defaultSortOrder: 'descend',
          width: 160,
          fixed: '',
          isShow: true,
          sorter: true,
          scopedSlots: {
            customRender: 'name',
            slots: {
              title: null
            }
          }
        },
        {
          key: '1',
          title: '供应商名称',
          dataIndex: 'SupplierName',
          defaultSortOrder: 'descend',
          width: 161,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: '',
            slots: {
              title: null
            }
          }
        },
        {
          key: '2',
          title: '供应商简称',
          dataIndex: 'SupplierAbbreviation',
          defaultSortOrder: 'descend',
          width: 162,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: '',
            slots: {
              title: null
            }
          }
        },
        {
          key: '3',
          title: '发展日期',
          dataIndex: 'DevelopmentDate',
          defaultSortOrder: 'descend',
          width: 163,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: '',
            slots: {
              title: null
            }
          }
        },
        {
          key: '4',
          title: '电话',
          dataIndex: 'Tel',
          defaultSortOrder: 'descend',
          width: 164,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: '',
            slots: {
              title: null
            }
          }
        },
        {
          key: '5',
          title: '专营业务员名称',
          dataIndex: 'Salesman',
          defaultSortOrder: 'descend',
          width: 165,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: '',
            slots: {
              title: null
            }
          }
        },
        {
          key: '6',
          title: '分管部门名称',
          dataIndex: 'department',
          defaultSortOrder: 'descend',
          width: 166,
          fixed: '',
          sorter: '',
          isShow: true,
          scopedSlots: {
            customRender: '',
            slots: {
              title: null
            }
          }
        },
        {
          key: '7',
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
      //   console.log('this.targetTitle', this.targetTitle)

      for (const key in this.columns) {
        // for in 循环遍历 columns  得到 key=0~7   正好对应数组元素的索引值
        if (this.columns[key].isShow == true) {
          //判断每一个元素的isShow 若等于true 那这个元素要展示在表格中
          this.targetKeys.push(this.columns[key].key) //把要展示的元素的key值推到targetKeys中，让其在穿梭框右边显示
          this.targetTitle.push(this.columns[key]) //将要展示的元素推到targetTitle中，让其在表头展示
        }
      }
    })
    for (const key in this.columns) {
      if (this.columns[key].dataIndex == 'action') {
        //判断元素的dataIndex属性值是否等于action   等于才是操作栏
        if (this.columns[key].width == 35) {
          //判断操作栏的宽度是否为 35  35是操作栏收缩状态的宽度值
          this.Operat_visible = false // 收缩状态  文本隐藏
          this.Operation = '' //把‘操作’替换为空格
          this.isfold = 'menu-fold' //设置显示图标
        }
      }
    }
  },
  computed: {
    //计算属性
    //computed是在HTML DOM加载后马上执行的
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
      //   console.log('record------------>', record)   record  是点击行数据
      //this.approval_visible = true     显示抽屉
      //this.product = record            将点击行的数据传给抽屉的product
      console.log(record), (this.approval_visible = true), (this.product = record)
    },
    WidthChange() {
      for (const key in this.columns) {
        //   for in 循环遍历 columns  得到 key=0~7   正好对应数组元素的索引值
        // console.log(key)
        if (this.columns[key].dataIndex == 'action') {
          //  将key值带入就可以判断每一个元素的dataIndex是否等于 action  （只有操作栏的dataIndex值为action）就可以知道是不是操作栏
          if (this.Operat_visible) {
            //判断v-show的值是否为true  为true表示文本显示
            this.Operat_visible = false //设置为false，将文本隐藏
            this.columns[key].width = 35 //将操作栏宽度设置为35  实现操作栏收缩的效果
            this.Operation = '' // 将‘操作’替换成空格   达到隐藏效果
            this.isfold = 'menu-fold' //设置图标
          } else {
            //如果等于false  文本为隐藏状态
            this.Operat_visible = true //将v-show的值设置为true  让文本显示
            this.columns[key].width = 155 //将宽度设置为155   实现展开效果
            this.Operation = '操作' //将空格替换成‘操作’   显示操作
            this.isfold = 'menu-unfold' //设置图标
          }
        }
      }
    },
    add() {
      this.$router.push({ name: 'SupplierAdd' }) //路由跳转
    },
    handleSetting(record) {
      console.log(record), (this.visible_transfer = true) // 让设置对话框显示
    },
    handleEdit(record) {
      console.log(record), this.$router.push({ path: '/add' }) //路由跳转
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
      for (const key in moveKeys) {
        // console.log('moveKeys-------->', moveKeys[key])
        //遍历moveKeys
        if (direction == 'right') {
          //判断是否在右边选中框里
          this.targetKeys.push(moveKeys[key]) //  如果是   就把选中的推到表格表头中
        } else {
          //如果没有在右边选中框里
          for (const item in this.targetKeys) {
            //遍历targetKeys
            if (this.targetKeys[item] == moveKeys[key]) {
              //判断选中的值等于右边的值
              this.targetKeys.splice(item, 1)
              // console.log(this.targetKeys.splice(item, 1))
            }
          }
        }
      }
    },
    handleScroll(direction, e) {},
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      //    console.log('sourceSelectedKeys', sourceSelectedKeys, 'targetSelectedKeys', targetSelectedKeys)
      //    sourceSelectedKeys   为左边的选中值
      //    targetSelectedKeys   为右边的选中值
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys] //将左右两边的选中值都赋值给应该选中的值selectedKeys
      //   console.log(this.selectedKeys)
    },
    handleCancel(e) {
      this.visible_transfer = false // 关闭对话框
    },
    handleOk(e) {
      this.visible_transfer = false // 关闭对话框
      this.confirmLoading = false //关闭等待效果
      const columns = [...this.columns] //将表头数据传给穿梭框
      this.targetTitle = [] //将空数组赋值给targetTitle
      for (let i = 0; i < this.targetKeys.length; i++) {
        //i=0~this.targetKeys.length-1
        for (let j = 0; j < columns.length; j++) {
          //j=0~columns.length-1
          if (columns[j].key == this.targetKeys[i]) {
            //穿梭框的数据的key值如果等于右侧框数据的 key 值
            columns[j].isShow = true //让这个值得isShow属性置为true 使其显示
            this.targetTitle.push(columns[j]) //将这个值推到表头展示
          }
        }
      }
    },
    change(visible) {
      this.approval_visible = visible //    visible = false   将false给approval_visible 使 approval组件隐藏
    }
  }
}
</script>
<style lang="less" scoped></style>
