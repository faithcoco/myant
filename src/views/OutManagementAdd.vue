<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="出库单编码" required>
        <a-input
          v-model="form.Desc"
          placeholder="请输入出库单编码"
          @blur="
          () => {
            
          }
        "
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="出库类型编码" required prop="Num">
        <a-input
          v-model="form.Num"
          placeholder="请输入出库类型编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
        <a-table :columns="selectcolumns" :data-source="numberRow" :pagination="false" bordered></a-table>
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
      <a-form-model-item ref="name" label="关联单据" prop="Warehouse">
        <a-input
          v-model="form.Warehouse"
          placeholder="请选择关联单据"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="供应商编码" prop="Warehouse">
        <a-input
          v-model="form.Warehouse"
          placeholder="请输入供应商编码"
          @blur="
          () => {
            
          }"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="客户编码" prop="Warehouse">
        <a-input
          v-model="form.Warehouse"
          placeholder="请输入客户编码"
          @blur="
          () => {
            
          }"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="部门编码" prop="Warehouse">
        <a-input
          v-model="form.Warehouse"
          placeholder="请输入部门编码"
          @blur="
          () => {
            
          }"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="出库日期" prop="OutDate">
        <a-date-picker
          v-model="form.OutDate"
          show-time
          type="date"
          placeholder="请输入出库日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="存货编码">
        <a-input
          v-model="form.Principal"
          placeholder="请输入存货编码"
          @blur="
          () => {
         
          }
        "
        ></a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货名称" prop="RelatedDocuments">
        <a-input
          v-model="form.RelatedDocuments"
          placeholder="请输入存货名称"
          @blur="
          () => {
          
         
          }
        "
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="货位编码" prop="OutProduct">
        <a-input
          v-model="form.OutProduct"
          placeholder="请输入货位编码"
          @blur="
          () => {
            
          }
        "
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="批次编码">
        <a-input
          v-model="form.Desc"
          placeholder="请输入批次编码"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="数量">
        <a-input
          v-model="form.Desc"
          placeholder="请输入数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="计量单位">
        <a-input
          v-model="form.Desc"
          placeholder="请输入计量单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装数量">
        <a-input
          v-model="form.Desc"
          placeholder="请输入包装数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装单位">
        <a-input
          v-model="form.Desc"
          placeholder="请输入包装单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="单价">
        <a-input
          v-model="form.Desc"
          placeholder="请输入单价"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="金额">
        <a-input
          v-model="form.Desc"
          placeholder="请输入金额"
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
    title: '类型',
    dataIndex: 'Type',
    key: 'Type',
    scopedSlots: { customRender: 'Type' }
  },
  {
    title: '编号',
    dataIndex: 'Num',
    key: 'Num',
    width: 80
  },
  {
    title: '仓库',
    dataIndex: 'Warehouse',
    key: 'Warehouse',
    ellipsis: true
  },
  {
    title: '出库产品',
    dataIndex: 'OutProduct',
    key: 'OutProduct',
    ellipsis: true
  }
]
const selectcolumns = [
  {
    title: '类型',
    dataIndex: 'Type',
    key: 'Type',
    scopedSlots: { customRender: 'Type' }
  },
  {
    title: '编号',
    dataIndex: 'Num',
    key: 'Num',
    width: 80
  },
  {
    title: '仓库',
    dataIndex: 'Warehouse',
    key: 'Warehouse',
    ellipsis: true
  },
  {
    title: '出库产品',
    dataIndex: 'OutProduct',
    key: 'OutProduct',
    ellipsis: true
  }
]

const data = [
  {
    key: '1',
    Type: '食品',
    Num: 32,
    Warehouse: 'A1',
    OutProduct: '牛肉'
  },
  {
    key: '2',
    Type: '消费品',
    Num: 42,
    Warehouse: 'A1',
    OutProduct: '卫生纸'
  },
  {
    key: '3',
    Type: '奢侈品',
    Num: 32,
    Warehouse: 'A1',
    OutProduct: '香莱尔口红'
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
        type: '', //类型
        Warehouse: '', //仓库
        Num: '', //编号
        OutDate: '', //出库日期
        Principal: '', //负责人
        RelatedDocuments: '', //关联单据
        OutProduct: '', //出库产品
        Desc: '' //备注
      },
      rules: {
        Num: [{ required: true, message: '请输入出库编号', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择出库类型', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        Warehouse: [{ required: true, message: '请输入仓库', trigger: 'blur' }],

        OutDate: [{ required: true, message: '请选择出库日期', trigger: 'change' }],
        RelatedDocuments: [{ required: true, message: '请选择需要关联的单据', trigger: 'blur' }],
        OutProduct: [{ required: true, message: '请输入出库产品', trigger: 'blur' }]
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
      this.form.Desc = 'PT2020062200001'
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
