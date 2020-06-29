<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="盘点单编码" required prop="InventoryListCode">
        <a-input
          v-model="form.InventoryListCode"
          placeholder="请输入盘点单编码"
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

      <a-form-model-item ref="name" label="盘点仓库编码" prop="InventoryWarehouseCode">
        <a-input
          v-model="form.InventoryWarehouseCode"
          placeholder="请输入盘点仓库编码"
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
      <a-form-model-item ref="name" label="盘点日期">
        <a-date-picker
          v-model="form.InventoryDate"
          show-time
          type="date"
          placeholder="请选择盘点日期"
          style="width: 100%;"
        />
      </a-form-model-item>

      <a-form-model-item ref="Principal" label="商品清单：">
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
    title: '盘点单编码',
    dataIndex: 'TransferCode',
    key: 'TransferCode',
    scopedSlots: { customRender: 'TransferCode' }
  },
  {
    title: '存货编码',
    dataIndex: 'SourceWarehouseCode',
    key: 'SourceWarehouseCode'
  },
  {
    title: '存货名称',
    dataIndex: 'TargetWarehouseCode',
    key: 'TargetWarehouseCode'
  },
  {
    title: '货位编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '批次编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode'
  },
  {
    title: '数量',
    dataIndex: 'LocationCode',
    key: 'LocationCode'
  },
  {
    title: '计量单位',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '包装数量',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '包装单位',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '单价',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '金额',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  }
]
const selectcolumns = [
  {
    title: '盘点单编码',
    dataIndex: 'TransferCode',
    key: 'TransferCode',
    scopedSlots: { customRender: 'TransferCode' }
  },
  {
    title: '存货编码',
    dataIndex: 'SourceWarehouseCode',
    key: 'SourceWarehouseCode'
  },
  {
    title: '存货名称',
    dataIndex: 'TargetWarehouseCode',
    key: 'TargetWarehouseCode'
  },
  {
    title: '货位编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '批次编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode'
  },
  {
    title: '数量',
    dataIndex: 'LocationCode',
    key: 'LocationCode'
  },
  {
    title: '计量单位',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '包装数量',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '包装单位',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '单价',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  },
  {
    title: '金额',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  }
]

const data = [
  {
    key: '1',
    InventoryListCode: 'a121345',
    InventoryWarehouseCode: 'a121345',
    TargetWarehouseCode: 'a121345',
    DepartmentCode: 'a121345',
    InventoryCode: 'a121345',
    LocationCode: 'a121345',
    TransferCode: 'a121345',
    SourceWarehouseCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '2',
    InventoryListCode: 'a121345',
    InventoryWarehouseCode: 'a121345',
    TargetWarehouseCode: 'a121345',
    DepartmentCode: 'a121345',
    InventoryCode: 'a121345',
    LocationCode: 'a121345',
    TransferCode: 'a121345',
    SourceWarehouseCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '3',
    InventoryListCode: 'a121345',
    InventoryWarehouseCode: 'a121345',
    TargetWarehouseCode: 'a121345',
    DepartmentCode: 'a121345',
    InventoryCode: 'a121345',
    LocationCode: 'a121345',
    TransferCode: 'a121345',
    SourceWarehouseCode: 'a121345',
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
      form: {
        InventoryListCode: '', //盘点单编码
        InventoryWarehouseCode: '', //盘点仓库编码
        DepartmentCode: '', //部门编码
        InventoryDate: '', //日期
        InventoryCode: '', //存货编码
        InventoryName: '', //存货名称
        LocationCode: '', //货位编码
        BatchCode: '', //批次编码
        Quantity: '', //数量
        Unit: '', //单位
        PackingQuantity: '', //包装数量
        PackingUnit: '', //包装单位
        UnitPrice: '', //单价
        Amount: '' //金额
      },
      rules: {
        InventoryListCode: [
          { required: true, message: '请输入盘点单编码', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        InventoryWarehouseCode: [{ required: true, message: '请输入盘点仓库编码', trigger: 'change' }],
        date1: [{ required: true, message: '', trigger: 'change' }]
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
      this.form.InventoryListCode = 'PT2020062200001'
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
