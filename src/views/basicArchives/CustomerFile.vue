<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="客户名称" prop="name">
        <a-input
          v-model="form.name"
          placeholder="请输入客户名称"
          @blur="
          () => {
            
          }"
        />
      </a-form-model-item>
      <a-form-model-item label="客户编号" required prop="date1">
        <a-input placeholder="请输入客户编号">
          <a-button slot="suffix" type="link">自动获取</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="客户性质" prop="code">
        <a-input v-model="form.code" placeholder="请输入客户性质" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="所属行业">
        <a-input
          v-model="form.name"
          placeholder="请输入所属行业"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="办公地址">
        <a-input
          v-model="form.name"
          placeholder="请输入办公地址"
          @blur="
          () => {
          
         
          }
        "
        />
      </a-form-model-item>

      <a-form-model-item label="详细地址">
        <a-input v-model="form.detailAddress" type="textarea" placeholder="请输入详细地址" />
      </a-form-model-item>

      <a-form-model-item label="负责人">
        <a-select
          show-search
          placeholder="请选择负责人"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="jack">专用设备</a-select-option>
          <a-select-option value="lucy">芯片</a-select-option>
          <a-select-option value="tom">汽车零部件</a-select-option>
        </a-select>
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

      <a-form-model-item ref="name" label="发票抬头">
        <a-input
          v-model="form.price"
          placeholder="请输入发票抬头"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="纳税人识别号">
        <a-input
          v-model="form.name"
          placeholder="请输入纳税人识别号"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="开户银行">
        <a-input v-model="form.desc"  placeholder="请输入开户银行" />
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

export default {
  data() {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        code: '',
        price: ''
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
