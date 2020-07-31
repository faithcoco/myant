<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="入库单编码" required prop="StorageCode">
        <a-input
          v-model="form.StorageCode"
          placeholder="请输入入库单编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="入库类型编码" required prop="StorageTypeCode">
        <a-input
          v-model="form.StorageTypeCode"
          placeholder="请输入入库类型编码"
          @blur="
          () => {
            
          }"
        ></a-input>
      </a-form-model-item>

      <a-form-model-item label="关联单据" prop="AssociatedDocuments">
        <a-input v-model="form.AssociatedDocuments" placeholder="请选择关联单据">
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="供应商编码" prop="supplierCode">
        <a-input v-model="form.supplierCode" placeholder="请选择供应商编码">
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="客户编码" prop="ClientCode">
        <a-input v-model="form.ClientCode" placeholder="请选择客户编码"></a-input>
      </a-form-model-item>
      <a-form-model-item label="部门编码" prop="DepartmentCode">
        <a-input v-model="form.DepartmentCode" placeholder="请选择部门编码"></a-input>
      </a-form-model-item>
      <a-form-model-item ref="date" label="入库日期" prop="StorageDate">
        <a-date-picker
          v-model="form.StorageDate"
          show-time
          type="date"
          placeholder="请选择入库日期"
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
          :scroll="{ x: 800 }"
          :pagination="false"
          bordered
        ></a-table>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="resetForm">重置表单</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
        <a-button type style="margin-left: 10px;" @click="Back">返回</a-button>
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
          :scroll="{ x: 800 }"
          :pagination="false"
          bordered
        >
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)

import { postStorageManagementAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 100,
    scopedSlots: { customRender: 'checked' },
  },
  {
    title: '入库单编码',
    dataIndex: 'StorageCode',
    key: 'StorageCode',
    scopedSlots: { customRender: 'StorageCode' },
    width: 100,
  },
  {
    title: '入库类型编码',
    dataIndex: 'StorageTypeCode',
    key: 'StorageTypeCode',
    scopedSlots: { customRender: 'StorageTypeCode' },
    width: 100,
  },
  {
    title: '关联单据',
    dataIndex: 'AssociatedDocuments',
    key: 'AssociatedDocuments',
    width: 100,
  },
  {
    title: '供应商编码',
    dataIndex: 'supplierCode',
    key: 'supplierCode',
    width: 100,
  },
  {
    title: '客户编码',
    dataIndex: 'ClientCode',
    key: 'ClientCode',
    width: 100,
  },
  {
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode',
    width: 100,
  },
  {
    title: '入库日期',
    dataIndex: 'StorageDate',
    key: 'StorageDate',
    width: 100,
  },
]
const selectcolumns = [
  {
    title: '入库单编码',
    dataIndex: 'StorageCode',
    key: 'StorageCode',
    scopedSlots: { customRender: 'StorageCode' },
    width: 100,
  },
  {
    title: '入库类型编码',
    dataIndex: 'StorageTypeCode',
    key: 'StorageTypeCode',
    scopedSlots: { customRender: 'StorageTypeCode' },
    width: 120,
  },
  {
    title: '关联单据',
    dataIndex: 'AssociatedDocuments',
    key: 'AssociatedDocuments',
    width: 100,
  },
  {
    title: '供应商编码',
    dataIndex: 'supplierCode',
    key: 'supplierCode',
    width: 100,
  },
  {
    title: '客户编码',
    dataIndex: 'ClientCode',
    key: 'ClientCode',
    width: 100,
  },
  {
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode',
    width: 100,
  },
  {
    title: '入库日期',
    dataIndex: 'StorageDate',
    key: 'StorageDate',
    width: 100,
  },
]

const data = [
  {
    key: '1',
    StorageCode: 'A11111',
    StorageTypeCode: 322311,
    AssociatedDocuments: 'A1',
    supplierCode: 'S11111',
    ClientCode: 'S11111',
    DepartmentCode: 'S11111',
    StorageDate: '2015-10-07',
  },
  {
    key: '2',
    StorageCode: 'A11111',
    StorageTypeCode: 322311,
    AssociatedDocuments: 'A1',
    supplierCode: 'S11111',
    ClientCode: 'S11111',
    DepartmentCode: 'S11111',
    StorageDate: '2015-10-07',
  },
  {
    key: '3',
    StorageCode: 'A11111',
    StorageTypeCode: 322311,
    AssociatedDocuments: 'A1',
    supplierCode: 'S11111',
    ClientCode: 'S11111',
    DepartmentCode: 'S11111',
    StorageDate: '2015-10-07',
  },
  {
    key: '4',
    StorageCode: 'A11111',
    StorageTypeCode: 322311,
    AssociatedDocuments: 'A1',
    supplierCode: 'S11111',
    ClientCode: 'S11111',
    DepartmentCode: 'S11111',
    StorageDate: '2015-10-07',
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
        StorageTypeCode: '', //入库类型编码
        AssociatedDocuments: '', //关联单据
        StorageDate: '', //入库日期
        Principal: '', //负责人
        RelateDocuments: '', //关联单据
        StorageProduct: '', //入库产品
        Remarks: '', //备注
        desc: '',
        StorageCode: '',
        order: '',
        supplierCode: '',
        ClientCode: '',
        DepartmentCode: '',
        price: '',
      },
      rules: {
        type: [{ required: true, message: '请选择入库类型编码', trigger: 'blur' }],
        StorageCode: [{ required: true, message: '请输入入库单编码', trigger: 'blur' }],
        StorageTypeCode: [{ required: true, message: '请选择入库类型编码', trigger: 'change' }],
        Warehouse: [{ required: true, message: '请选择需要关联的单据', trigger: 'change' }],
        supplierCode: [{ required: true, message: '请选择供应商编码', trigger: 'change' }],
        ClientCode: [{ required: true, message: '请选择客户编码', trigger: 'change' }],
        DepartmentCode: [{ required: true, message: '请选择部门编码', trigger: 'change' }],

        StorageDate: [{ required: true, message: '请选择入库日期', trigger: 'change' }],
        order: [{ required: true, message: '请选择需要关联的单据', trigger: 'blur' }],
        StorageProduct: [{ required: true, message: '请输入入库产品', trigger: 'blur' }],
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
          postStorageManagementAdd(this.form).then((res) => {
            console.log('res------->', res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'StorageManagementList' })
        } else {
          console.log('error submit!!')
          alert('亲，您的填写内容不符合要求，请重新填写！！！')
          return false
        }
      })
    },
    Back() {
      this.$router.push({ name: 'StorageManagementList' })
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
      this.form.StorageCode = 'PT2020062200001'
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
