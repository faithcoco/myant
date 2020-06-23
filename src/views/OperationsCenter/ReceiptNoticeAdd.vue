<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="收货通知单编码" required prop="ReceiptNotificationCode">
        <a-input
          v-model="form.ReceiptNotificationCode"
          placeholder="请输入收货通知单编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-input-search
          placeholder="搜索"
          style="width: 400px;margin-bottom:20px"
          @search="onSearch"
        />
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>
      <a-form-model-item ref="name" label="供应商编码" prop="SupplierCode">
        <a-input
          v-model="form.SupplierCode"
          placeholder="请输入供应商编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
        <a-table :columns="selectcolumns" :data-source="numberRow" :pagination="false" bordered></a-table>
      </a-form-model-item>
      <a-form-model-item label="联系人编码" prop="ContactCode ">
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
      <a-form-model-item ref="name" label="部门编码">
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
      <a-form-model-item ref="name" label="业务员编码">
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
      <a-form-model-item ref="name" label="预计入库日期">
        <a-date-picker
          v-model="form.ExpectedInWarehouseDate"
          show-time
          type="date"
          placeholder="请选择预计入库日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="收货仓库编码">
        <a-input
          v-model="form.ReceivingWarehouseCode"
          placeholder="请输入收货仓库编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货编码">
        <a-input
          v-model="form.InventoryCode"
          placeholder="请输入存货编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货名称">
        <a-input
          v-model="form.InventoryName"
          placeholder="请输入存货名称"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="批次编码">
        <a-input
          v-model="form.BatchCode"
          placeholder="请输入批次编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="数量">
        <a-input
          v-model="form.Quantity"
          placeholder="请输入数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="计量单位">
        <a-input
          v-model="form.Unit"
          placeholder="请输入计量单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装数量">
        <a-input
          v-model="form.PackingQuantity"
          placeholder="请输入包装数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装单位">
        <a-input
          v-model="form.PackingUnit"
          placeholder="请输入包装单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="单价">
        <a-input
          v-model="form.UnitPrice"
          placeholder="请输入单价"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="含税单价">
        <a-input
          v-model="form.TaxIncludedUnitPrice"
          placeholder="请输入含税单价"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="税率">
        <a-input
          v-model="form.TaxRate"
          placeholder="请输入税率"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="金额">
        <a-input
          v-model="form.Amount"
          placeholder="请输入金额"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="含税金额">
        <a-input
          v-model="form.TaxIncludedAmount"
          placeholder="请输入含税金额"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="税额">
        <a-input
          v-model="form.Tax"
          placeholder="请输入税额"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type @click="resetForm">保存并继续</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' }
  },
  {
    title: '收货通知单编码',
    dataIndex: 'ReceiptNotificationCode',
    key: 'ReceiptNotificationCode',
    scopedSlots: { customRender: 'ReceiptNotificationCode' }
  },
  {
    title: '供应商编码',
    dataIndex: 'SupplierCode',
    key: 'SupplierCode'
  },
  {
    title: '联系人编码',
    dataIndex: 'ContactCode',
    key: 'ContactCode'
  },
  {
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '业务员编码',
    dataIndex: 'SalesmanCode',
    key: 'SalesmanCode'
  },
  {
    title: '收货仓库编码',
    dataIndex: 'ReceivingWarehouseCode',
    key: 'ReceivingWarehouseCode'
  },
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode'
  },
  {
    title: '批次编码',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  }
]
const selectcolumns = [
  {
    title: '收货通知单编码',
    dataIndex: 'ReceiptNotificationCode',
    key: 'ReceiptNotificationCode',
    scopedSlots: { customRender: 'ReceiptNotificationCode' }
  },
  {
    title: '供应商编码',
    dataIndex: 'SupplierCode',
    key: 'SupplierCode'
  },
  {
    title: '联系人编码',
    dataIndex: 'ContactCode',
    key: 'ContactCode'
  },
  {
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '业务员编码',
    dataIndex: 'SalesmanCode',
    key: 'SalesmanCode'
  },
  {
    title: '收货仓库编码',
    dataIndex: 'ReceivingWarehouseCode',
    key: 'ReceivingWarehouseCode'
  },
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode'
  },
  {
    title: '批次编码',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  }
]

const data = [
  {
    key: '1',
    ReceiptNotificationCode: 'a121345',
    SupplierCode: 'a121345',
    ContactCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    ReceivingWarehouseCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '2',
    ReceiptNotificationCode: 'a121345',
    SupplierCode: 'a121345',
    ContactCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    ReceivingWarehouseCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '3',
    ReceiptNotificationCode: 'a121345',
    SupplierCode: 'a121345',
    ContactCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    ReceivingWarehouseCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345'
  }
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
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        ReceiptNotificationCode: '', //收货通知单编码
        SupplierCode: '', //供应商编码
        ContactCode: '', //联系人编码
        DepartmentCode: '', //部门编码
        SalesmanCode: '', //业务员编码
        ExpectedInWarehouseDate: '', //日期
        ReceivingWarehouseCode: '', //收货仓库编码
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
        Tax: '' //税额
      },
      rules: {
        ReceiptNotificationCode: [
          { required: true, message: '请输入收货通知单编码', trigger: 'blur' },
          { min: 1, max: 3, message: '请输入收货通知单编码', trigger: 'blur' }
        ],
        SupplierCode: [{ required: true, message: '请输入供应商编码', trigger: 'change' }]
      }
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
      this.$refs.ruleForm.validate(valid => {
        console.log('name--->', this.form)
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
      this.form.ReceiptNotificationCode = 'PT2020062200001'
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
    }
  }
}
</script>
