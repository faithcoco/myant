<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="发货通知单编码" required prop="ShippingNoticeCode">
        <a-input
          v-model="form.ShippingNoticeCode"
          placeholder="请输入发货通知单编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1200px" @ok="handleOk">
        <a-input-search
          placeholder="搜索"
          style="width: 400px;margin-bottom:20px"
          @search="onSearch"
        />
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1500 }"
          :pagination="false"
          bordered
        >
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item ref="name" label="客户编码" prop="CustomerCode">
        <a-input
          v-model="form.CustomerCode"
          placeholder="请输入客户编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="客户地址编码" prop="CustomerAddressCode">
        <a-input
          v-model="form.CustomerAddressCode"
          placeholder="请输入客户地址编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="联系人编码" prop="ContactCode">
        <a-input
          v-model="form.ContactCode"
          placeholder="请输入联系人编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="部门编码" prop="DepartmentCode">
        <a-input
          v-model="form.DepartmentCode"
          placeholder="请输入部门编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="业务员编码" prop="SalesmanCode">
        <a-input
          v-model="form.SalesmanCode"
          placeholder="请输入业务员编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="预计出库日期" prop="ExpectedOutWarehouseDate">
        <a-date-picker
          v-model="form.ExpectedOutWarehouseDate"
          show-time
          type="date"
          placeholder="请选择预计出库日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item ref="Principal" label="商品清单" prop="Principal">
        <a-input
          v-model="form.Principal"
          placeholder="请选择存货编码"
          @blur="
          () => {
          
         
          }
        "
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
        <a-table
          :columns="selectcolumns"
          :data-source="numberRow"
          :scroll="{ x: 1500 }"
          :pagination="false"
          bordered
        ></a-table>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="resetForm">重置表单</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
        <a-button type style="margin-left: 10px;" @click="Back">返回</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
import { postShippingNoticeAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' },
  },
  {
    title: '发货通知单编码',
    dataIndex: 'ShippingNoticeCode',
    width: 155,
    key: 'ShippingNoticeCode',
    scopedSlots: { customRender: 'ShippingNoticeCode' },
  },
  {
    title: '发货仓库编码',
    dataIndex: 'CustomerCode',
    width: 155,
    key: 'CustomerCode',
  },
  {
    title: '存货编码',
    dataIndex: 'BatchCode',
    width: 155,
    key: 'BatchCode',
  },
  {
    title: '存货名称',
    dataIndex: 'CustomerAddressCode',
    width: 155,
    key: 'CustomerAddressCode',
  },
  {
    title: '批次编码',
    dataIndex: 'DepartmentCode',
    width: 155,
    key: 'DepartmentCode',
  },
  {
    title: '数量',
    dataIndex: 'SalesmanCode',
    width: 155,
    key: 'SalesmanCode',
  },
  {
    title: '计量单位',
    dataIndex: 'ShippingWarehouseCode',
    width: 155,
    key: 'ShippingWarehouseCode',
  },
  {
    title: '包装数量',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '1',
  },
  {
    title: '包装单位',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '2',
  },
  {
    title: '单价',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '3',
  },
  {
    title: '含税单价',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '4',
  },
  {
    title: '税率',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '5',
  },
  {
    title: '金额',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '6',
  },
  {
    title: '含税金额',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '7',
  },
  {
    title: '税额',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '8',
  },
]
const selectcolumns = [
  {
    title: '发货通知单编码',
    dataIndex: 'ShippingNoticeCode',
    width: 155,
    key: 'ShippingNoticeCode',
    scopedSlots: { customRender: 'ShippingNoticeCode' },
  },
  {
    title: '发货仓库编码',
    dataIndex: 'CustomerCode',
    width: 155,
    key: 'CustomerCode',
  },
  {
    title: '存货编码',
    dataIndex: 'BatchCode',
    width: 155,
    key: 'BatchCode',
  },
  {
    title: '存货名称',
    dataIndex: 'CustomerAddressCode',
    width: 155,
    key: 'CustomerAddressCode',
  },
  {
    title: '批次编码',
    dataIndex: 'DepartmentCode',
    width: 155,
    key: 'DepartmentCode',
  },
  {
    title: '数量',
    dataIndex: 'SalesmanCode',
    width: 155,
    key: 'SalesmanCode',
  },
  {
    title: '计量单位',
    dataIndex: 'ShippingWarehouseCode',
    width: 155,
    key: 'ShippingWarehouseCode',
  },
  {
    title: '包装数量',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '1',
  },
  {
    title: '包装单位',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '2',
  },
  {
    title: '单价',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '3',
  },
  {
    title: '含税单价',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '4',
  },
  {
    title: '税率',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '5',
  },
  {
    title: '金额',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '6',
  },
  {
    title: '含税金额',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '7',
  },
  {
    title: '税额',
    dataIndex: 'InventoryCode',
    width: 155,
    key: '8',
  },
]

const data = [
  {
    key: '1',
    ShippingNoticeCode: 'a121345',
    CustomerCode: 'a121345',
    CustomerAddressCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    ShippingWarehouseCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345',
  },
  {
    key: '2',
    ShippingNoticeCode: 'a121345',
    CustomerCode: 'a121345',
    CustomerAddressCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    ShippingWarehouseCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345',
  },
  {
    key: '3',
    ShippingNoticeCode: 'a121345',
    CustomerCode: 'a121345',
    CustomerAddressCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    ShippingWarehouseCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345',
  },
]
const numberRow = []
export default {
  data() {
    return {
      numberRow,
      selectedRow: [],
      selectcolumns,
      visible: false,
      selectedRowKeys: [],
      data,
      columns,
      headers: {
        authorization: 'authorization-text',
      },
      size: 'small',
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      other: '',
      form: {
        ShippingNoticeCode: '', //发货通知单编码
        CustomerCode: '', //客户编码
        CustomerAddressCode: '', //客户地址编码
        ContactCode: '', //联系人编码
        DepartmentCode: '', //部门编码
        SalesmanCode: '', //业务员编码
        ExpectedOutWarehouseDate: '', //日期
        ShippingWarehouseCode: '', //发货仓库编码
        InventoryCode: '', //存货编码
        InventoryName: '', //存货名称
        BatchCode: '', //批次编码
        Quantity: '', //数量
        Unit: '', //单位
        PackingQuantity: '', //包装数量
        PackingUnit: '', //包装单位
        UnitPrice: '', //单价
        TaxIncludedUnitPrice: '', //含税单价
        TaxRate: '', //税率
        Amount: '', //金额
        TaxIncludedAmount: '', //含税金额
        Tax: '', //税额
      },
      rules: {
        ShippingNoticeCode: [{ required: true, message: '请输入发货通知单编码', trigger: 'blur' }],
        CustomerCode: [{ required: true, message: '请输入客户编码', trigger: 'change' }],
      },
    }
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
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    handleSearchChange(value) {
      console.log(`selected ${value}`)
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        console.log('name--->', this.form)
        if (valid) {
          postShippingNoticeAdd(this.form).then((res) => {
            console.log('res', res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'ShippingNoticeList' })
        } else {
          console.log('error submit!!')
          alert('亲，您的填写内容不符合要求，请重新填写！！！')
          return false
        }
      })
    },
    Back() {
      this.$router.push({ name: 'ShippingNoticeList' })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    elect() {
      this.form.ShippingNoticeCode = 'PT2020062200001'
    },
    showModal() {
      this.visible = true
    },

    handleOk(e) {
      console.log(e)
      this.visible = false
      this.numberRow = this.selectedRow
      console.log(this.numberRow)
    },
    onChange(record) {
      console.log('check', record)
      if (record.checked) {
        this.selectedRow.push(record)
        console.log(this.selectedRow)
      }
    },
  },
}
</script>
