<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="装箱单编码" required prop="PackingListCode">
        <a-input
          v-model="form.PackingListCode"
          placeholder="请输入装箱单编码"
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

      <a-form-model-item ref="name" label="装箱仓库编码">
        <a-input
          v-model="form.PackingWarehouseCode"
          placeholder="请输入装箱仓库编码"
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
      <a-form-model-item ref="name" label="装箱日期">
        <a-date-picker
          v-model="form.PackingDate"
          show-time
          type="date"
          placeholder="请选择装箱日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="装箱状态">
        <a-select default-value="1" style="width: 120px" @change="handleChanges">
          <a-select-option value="1">执行完毕</a-select-option>
          <a-select-option value="2">未执行</a-select-option>
          <a-select-option value="3">手工关闭</a-select-option>
        </a-select>
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
import { postBaleAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' }
  },
  {
    title: '装箱单编码',
    dataIndex: 'PackingListCode',
    key: 'PackingListCode',
    scopedSlots: { customRender: 'PackingListCode' }
  },
  {
    title: '存货编码',
    dataIndex: 'PackingWarehouseCode',
    key: 'PackingWarehouseCode'
  },
  {
    title: '存货名称',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '批次编码',
    dataIndex: 'SalesmanCode',
    key: 'SalesmanCode'
  },
  {
    title: '货位编码',
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
    dataIndex: 'Unit',
    key: 'Unit'
  },
  {
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    key: 'PackingQuantity'
  },
  {
    title: '包装单位',
    dataIndex: 'PackingUnit',
    key: 'PackingUnit'
  },
  {
    title: '单价',
    dataIndex: 'UnitQrice',
    key: 'UnitQrice'
  },
  {
    title: '金额',
    dataIndex: 'Amount',
    key: 'Amount'
  }
]
const selectcolumns = [
  {
    title: '装箱单编码',
    dataIndex: 'PackingListCode',
    key: 'PackingListCode',
    scopedSlots: { customRender: 'PackingListCode' }
  },
  {
    title: '存货编码',
    dataIndex: 'PackingWarehouseCode',
    key: 'PackingWarehouseCode'
  },
  {
    title: '存货名称',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '批次编码',
    dataIndex: 'SalesmanCode',
    key: 'SalesmanCode'
  },
  {
    title: '货位编码',
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
    dataIndex: 'Unit',
    key: 'Unit'
  },
  {
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    key: 'PackingQuantity'
  },
  {
    title: '包装单位',
    dataIndex: 'PackingUnit',
    key: 'PackingUnit'
  },
  {
    title: '单价',
    dataIndex: 'UnitQrice',
    key: 'UnitQrice'
  },
  {
    title: '金额',
    dataIndex: 'Amount',
    key: 'Amount'
  }
]

const data = [
  {
    key: '1',
    PackingListCode: 'a121345',
    PackingWarehouseCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '2',
    PackingListCode: 'a121345',
    PackingWarehouseCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    InventoryCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '3',
    PackingListCode: 'a121345',
    PackingWarehouseCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
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
        PackingListCode: '', //装箱单编码
        PackingWarehouseCode: '', //装箱仓库编码
        DepartmentCode: '', //部门编码
        SalesmanCode: '', //业务员编码
        PackingDate: '', //日期
        Status: '', //装箱状态
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
        PackingListCode: [{ required: true, message: '请输入装箱单编码', trigger: 'blur' }],
        region: [{ required: true, message: '', trigger: 'change' }],
        date1: [{ required: true, message: '', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        desc: [{ required: true, message: '请输入产品说明', trigger: 'blur' }]
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
          postBaleAdd(this.form).then(res => {
            console.log('res---->', res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'BaleList' })
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
    handleChanges(value) {
      console.log(`selected ${value}`)
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    elect() {
      this.form.PackingListCode = 'PT2020062200001'
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
