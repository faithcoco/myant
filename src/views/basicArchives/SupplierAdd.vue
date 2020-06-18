<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="供应商名称" prop="supplierName">
        <a-input
          v-model="form.supplierName"
          placeholder="请输入供应商名称"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }"
        />
      </a-form-model-item>
      <a-form-model-item label="供应商编号" required prop="date1">
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

      <a-form-model-item label="供应商类型">
        <a-input v-model="form.type" placeholder="请选择供应商类型">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="负责人" prop="region">
        <a-input v-model="form.region" placeholder="请选择负责人">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item ref="name" label="纳税人识别号">
        <a-input
          v-model="form.taxpayerId"
          placeholder="请输入纳税人识别号"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="联系人">
        <a-input
          v-model="form.contactPerson"
          placeholder="请输入联系人"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="联系电话">
        <a-input
          v-model="form.phone"
          placeholder="请输入联系电话"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>

      <a-form-model-item label="备注">
        <a-input v-model="form.desc" type="textarea" placeholder="30字以内产品说明" />
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
      visible: false,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        supplierName: '', //供应商名称
        region: '', //负责人
        date1: '', //供应商编号
        delivery: false,
        type: '',
        resource: '',
        desc: '',
        taxpayerId: '', //纳税人识别号
        contactPerson: '', //联系人
        phone: ''
      },
      rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
          { min: 3, max: 5, message: '', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择负责人', trigger: 'change' }],
        date1: [{ required: true, message: '请输入供应商编号', trigger: 'change' }],
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
