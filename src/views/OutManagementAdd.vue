<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="类型" required>
        <a-select
          :model="value"
          show-search
          default-value="1"
          placeholder="请选择出库类型"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="1">销售出库1</a-select-option>
          <a-select-option value="2">销售出库2</a-select-option>
          <a-select-option value="3">销售出库3</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="编号" required prop="Num">
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="仓库" prop="warehouse">
        <a-input
          v-model="form.warehouse"
          placeholder="请选择仓库"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="出库日期" prop="date">
        <a-date-picker
          v-model="form.date"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="负责人">
        <a-input
          v-model="form.person"
          placeholder="请选择负责人"
          @blur="
          () => {
         
          }
        "
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="关联单据" prop="document">
        <a-input
          v-model="form.document"
          placeholder="请选择需要关联的单据"
          @blur="
          () => {
          
         
          }
        "
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="出库产品" prop="product">
        <a-input
          v-model="form.product"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }
        "
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="备注">
        <a-input
          v-model="form.Remarks"
          placeholder="请输入备注"
          type="textarea"
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

      <a-form-model-item label="审批人" required>
        流程未设置
        <a href="#">如何设置</a>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">取消</a-button>
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true
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
        type: '', //类型
        warehouse: '', //仓库
        Num: '', //编号
        date: '', //出库日期
        person: '', //负责人
        document: '', //关联单据
        product: '', //出库产品
        Remarks: '', //备注
        resource: '',
        desc: '',
        code: '',
        price: ''
      },
      rules: {
        Num: [{ required: true, message: '请输入出库编号', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择出库类型', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        warehouse: [{ required: true, message: '请选择仓库', trigger: 'blur' }],

        date: [{ required: true, message: '请选择出库日期', trigger: 'change' }],
        document: [{ required: true, message: '请选择需要关联的单据', trigger: 'blur' }],
        product: [{ required: true, message: '请选择出库产品', trigger: 'blur' }]
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
    }
  }
}
</script>
