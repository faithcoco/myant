<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="仓库编码" prop="WarehouseId">
        <a-input
          v-model="form.name"
          placeholder="请输入仓库编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">自动获取</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="仓库名称" prop="date1">
        <a-input v-model="form.date1" placeholder="请输入仓库名称"></a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="Basic Modal" width="1000px" @ok="handleOk">
        <a-table
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="data"
          :pagination="false"
          bordered
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item label="仓库负责人" prop="code">
        <a-input v-model="form.code" placeholder="请选择仓库负责人">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item ref="name" label="仓库地址">
        <a-input
          v-model="form.address"
          placeholder="请选择省、区、市"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="仓库地址">
        <a-input
          v-model="form.detailed"
          type="textarea"
          placeholder="请输入仓库详细地址"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>

      <a-form-model-item ref="principal" label="货位管理" prop="principal">
        <a-input
          v-model="form.principal"
          placeholder="请输入货位管理"
          @blur="
          () => {
          
         
          }
        "
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="批次管理">
        <a-input
          v-model="form.phone"
          placeholder="请输入批次管理"
          @blur="
          () => {
          
         
          }
        "
        />
      </a-form-model-item>

      <a-form-model-item label="附件">
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
        >
          <a-button type="link" :size="size">添加附件</a-button>
        </a-upload>
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
    title: '仓库编码',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '仓库名称',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '仓库负责人',
    dataIndex: 'address',
    key: 'address 1'
  },
  {
    title: '仓库地址',
    dataIndex: 'address',
    key: 'address 2'
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address 3'
  },
  {
    title: '货位管理',
    dataIndex: 'address',
    key: 'address 4'
  },
  {
    title: '批次管理',
    dataIndex: 'address',
    key: 'address 4'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  data() {
    return {
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
        principal: '', //负责人
        WarehouseId: '', //仓库编号
        region: undefined,
        date1: '',
        delivery: false,
        type: [],
        resource: '',
        address: '', //地址
        phone: '', //电话
        desc: '',
        code: '',
        price: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入产品编码', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请选择负责人', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        WarehouseId: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        region: [{ required: true, message: '', trigger: 'change' }],
        date1: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
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

    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    }
  }
}
</script>
