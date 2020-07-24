<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="存货编码" required prop="InventoryCode">
        <a-input
          v-model="form.InventoryCode"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-input-search
          placeholder="搜索"
          style="width: 400px;margin-bottom:20px"
          @search="onSearch"
        />
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1200 }"
          :pagination="false"
          bordered
        >
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item ref="name" label="仓库编码" prop="WarehouseCode">
        <a-input
          v-model="form.WarehouseCode"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
        <a-table
          :columns="selectcolumns"
          :data-source="numberRow"
          :scroll="{ x: 1000 }"
          :pagination="false"
          bordered
        ></a-table>
      </a-form-model-item>
      <a-form-model-item label="货位编码" prop="LocationCode">
        <a-input
          v-model="form.LocationCode"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="批次编码" prop="BatchManagement">
        <a-input
          v-model="form.BatchManagement"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="数量" prop="Quantity">
        <a-input
          v-model="form.Quantity"
          placeholder="请输入数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="Unit">
        <a-input
          v-model="form.Unit"
          placeholder="请输入计量单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装数量" prop="PackingQuantity">
        <a-input
          v-model="form.PackingQuantity"
          placeholder="请输入包装数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装单位" prop="PackingUnit">
        <a-input
          v-model="form.PackingUnit"
          placeholder="请输入包装单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="单价" prop="UnitPrice">
        <a-input
          v-model="form.UnitPrice"
          placeholder="请输入单价"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="金额" prop="Amount">
        <a-input
          v-model="form.Amount"
          placeholder="请输入金额"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type @click="resetForm">重置表单</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
import { postOpeningInventoryAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' },
  },
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode',
    width: 80,
    scopedSlots: { customRender: 'InventoryCode' },
  },
  {
    title: '仓库编码',
    dataIndex: 'WarehouseCode',
    key: 'WarehouseCode',
    width: 80,
  },
  {
    title: '货位编码',
    dataIndex: 'LocationCode',
    key: 'LocationCode',
    width: 80,
  },
  {
    title: '批次编码',
    dataIndex: 'BatchCode',
    key: 'BatchCode',
    width: 80,
  },
  {
    title: '数量',
    dataIndex: 'Quantity',
    key: 'Quantity',
    width: 80,
  },
  {
    title: '计量单位',
    dataIndex: 'Unit',
    key: 'Unit',
    width: 80,
  },
  {
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    key: 'PackingQuantity',
    width: 80,
  },
  {
    title: '包装单位',
    dataIndex: 'PackingUnit',
    key: 'PackingUnit',
    width: 80,
  },
  {
    title: '单价',
    dataIndex: 'UnitPrice',
    key: 'UnitPrice',
    width: 80,
  },
  {
    title: '金额',
    dataIndex: 'Amount',
    key: 'Amount',
    width: 80,
  },
]
const selectcolumns = [
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode',
    width: 80,
    scopedSlots: { customRender: 'InventoryCode' },
  },
  {
    title: '仓库编码',
    dataIndex: 'WarehouseCode',
    key: 'WarehouseCode',
    width: 80,
  },
  {
    title: '货位编码',
    dataIndex: 'LocationCode',
    key: 'LocationCode',
    width: 80,
  },
  {
    title: '批次编码',
    dataIndex: 'BatchCode',
    key: 'BatchCode',
    width: 80,
  },
  {
    title: '数量',
    dataIndex: 'Quantity',
    key: 'Quantity',
    width: 80,
  },
  {
    title: '计量单位',
    dataIndex: 'Unit',
    key: 'Unit',
    width: 80,
  },
  {
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    key: 'PackingQuantity',
    width: 80,
  },
  {
    title: '包装单位',
    dataIndex: 'PackingUnit',
    key: 'PackingUnit',
    width: 80,
  },
  {
    title: '单价',
    dataIndex: 'UnitPrice',
    key: 'UnitPrice',
    width: 80,
  },
  {
    title: '金额',
    dataIndex: 'Amount',
    key: 'Amount',
    width: 80,
  },
]

const data = [
  {
    key: '1',
    InventoryCode: '1010111',
    WarehouseCode: '0111011',
    LocationCode: '01010110',
    BatchCode: '0001',
    Quantity: '1000.00',
    Unit: '台',
    PackingQuantity: '1000.00',
    PackingUnit: '箱',
    UnitPrice: '3999.00',
    Amount: '3999000.00',
  },
  {
    key: '2',
    InventoryCode: '1010111',
    WarehouseCode: '0111011',
    LocationCode: '01010110',
    BatchCode: '0001',
    Quantity: '1000.00',
    Unit: '台',
    PackingQuantity: '1000.00',
    PackingUnit: '箱',
    UnitPrice: '3999.00',
    Amount: '3999000.00',
  },
  {
    key: '3',
    InventoryCode: '1010111',
    WarehouseCode: '0111011',
    LocationCode: '01010110',
    BatchCode: '0001',
    Quantity: '1000.00',
    Unit: '台',
    PackingQuantity: '1000.00',
    PackingUnit: '箱',
    UnitPrice: '3999.00',
    Amount: '3999000.00',
  },
  {
    key: '4',
    InventoryCode: '1010111',
    WarehouseCode: '0111011',
    LocationCode: '01010110',
    BatchCode: '0001',
    Quantity: '1000.00',
    Unit: '台',
    PackingQuantity: '1000.00',
    PackingUnit: '箱',
    UnitPrice: '3999.00',
    Amount: '3999000.00',
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        InventoryCode: '', //存货编码
        WarehouseCode: '', //仓库编码
        LocationCode: '', //货位编码
        BatchCode: '', //批次编码
        Quantity: '', //数量
        Unit: '', //单位
        PackingQuantity: '', //包装数量
        PackingUnit: '', //包装单位
        UnitPrice: '', //单价
        Amount: '', //金额
      },
      rules: {
        InventoryCode: [{ required: true, message: '请输入存货编码', trigger: 'blur' }],
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
          postOpeningInventoryAdd(this.form).then((res) => {
            console.log(res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'OpeningInventoryList' })
        } else {
          console.log('error submit!!')
          alert('亲，您的填写内容不符合要求，请重新填写！！！')
          return false
        }
      })
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
      this.form.InventoryCode = 'PT2020062200001'
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
