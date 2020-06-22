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
          v-model="form.name"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item ref="name" label="仓库编码">
        <a-input
          v-model="form.cangku"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
        <a-table :columns="selectcolumns" :data-source="numberRow" :pagination="false" bordered></a-table>
      </a-form-model-item>
      <a-form-model-item label="货位编码">
        <a-input
          v-model="form.name"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="批次编码">
        <a-input
          v-model="form.name"
          placeholder="请输入产品编码"
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
    title: '存货编码',
    dataIndex: 'name',
    key: 'name',
    width: 80,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '仓库编码',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: '货位编码',
    dataIndex: 'address',
    key: 'address 1',
    width: 80
  },
  {
    title: '批次编码',
    dataIndex: 'address',
    key: 'address 2',
    width: 80
  },
  {
    title: '数量',
    dataIndex: 'address',
    key: 'address 3',
    width: 80
  },
  {
    title: '计量单位',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '包装数量',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '包装单位',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '单价',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '金额',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  }
]
const selectcolumns = [
  {
    title: '存货编码',
    dataIndex: 'name',
    key: 'name',
    width: 80,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '仓库编码',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: '货位编码',
    dataIndex: 'address',
    key: 'address 1',
    width: 80
  },
  {
    title: '批次编码',
    dataIndex: 'address',
    key: 'address 2',
    width: 80
  },
  {
    title: '数量',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true
  },
  {
    title: '计量单位',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '包装数量',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true
  },
  {
    title: '包装单位',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '单价',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  },
  {
    title: '金额',
    dataIndex: 'address',
    key: 'address 4',
    width: 80
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York ',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney',
    tags: ['cool', 'teacher']
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
        name: '',
        PickingApplicationCode: '', //领料申请单编码
        DepartmentCode: '', //部门编码
        SalesmanCode: '',
        ExpectedOutWarehouseDate: '', //日期
        ExpectedOutWarehouseCode: '',
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
        name: [
          { required: true, message: '请输入产品编码', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
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
      this.form.name = 'PT2020062200001'
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
