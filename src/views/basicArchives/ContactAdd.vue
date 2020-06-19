<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="联系人编码" required prop="ContactCode">
        <a-input
          v-model="form.ContactCode"
          placeholder="请输入产品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择联系人编码" width="1000px" @ok="handleOk">
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

      <a-form-model-item ref="name" label="联系人名称" prop="ContactName">
        <a-input
          v-model="form.ContactName"
          placeholder="请输入联系人名称"
          @blur="
          () => {
            
          }"
        />
      </a-form-model-item>
      <a-form-model-item label="客户或供应商" prop="Supplier">
        <a-input v-model="form.Supplier" placeholder="请输入客户或供应商" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="关联公司">
        <a-input
          v-model="form.Company"
          placeholder="请输入关联公司"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="联系电话">
        <a-input
          v-model="form.Tel"
          placeholder="请输入联系电话"
          @blur="
          () => {
          
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="职务">
        <a-select
          show-search
          default-value="1"
          placeholder="请选择职务"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="1">经理</a-select-option>
          <a-select-option value="2">营销部长</a-select-option>
          <a-select-option value="3">员工</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="name" label="部门">
        <a-input
          v-model="form.Department"
          placeholder="请输入部门"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="地址">
        <a-input
          v-model="form.Address"
          placeholder="请输入地址"
          @blur="
          () => {
            
          }
        "
        />
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
    title: '联系人名称',
    dataIndex: 'ContactName',
    key: 'ContactName',
    scopedSlots: { customRender: 'ContactName' },
    width: 80
  },
  {
    title: '联系人编码',
    dataIndex: 'ContactCode',
    key: 'ContactCode',
    width: 80
  },
  {
    title: '客户或供应商',
    dataIndex: 'Supplier',
    key: 'Supplier',
    width: 80
  },
  {
    title: '关联公司',
    dataIndex: 'Company',
    key: 'Company',
    width: 80
  }
]

const data = [
  {
    key: '1',
    ContactName: 'John Brown',
    ContactCode: 3213123,
    Supplier: '张三',
    Company: '京东'
  },
  {
    key: '2',
    ContactName: 'Jim Green',
    ContactCode: 4223141,
    Supplier: '李四',
    Company: '淘宝'
  },
  {
    key: '3',
    ContactName: 'Joe Black',
    ContactCode: 3223144,
    Supplier: 'andy',
    Company: '拼多多'
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
        ContactCode: '',
        ContactName: '',
        Supplier: '', //客户或者供应商
        Company: '',
        Tel: '',
        Job: '',
        Department: '',
        Address: ''
      },
      rules: {
        ContactCode: [
          { required: true, message: '请输入产品编码', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ]
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
