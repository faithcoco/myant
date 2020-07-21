<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="仓库编码" prop="WarehouseCode">
        <a-input
          v-model="form.WarehouseCode"
          placeholder="请输入仓库编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="仓库名称" prop="WarehouseName">
        <a-input v-model="form.WarehouseName" placeholder="请输入仓库名称"></a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-input-search
          placeholder="搜索"
          style="width: 400px;margin-bottom:20px"
          @search="onSearch"
        />
        <a-table :columns="columns"  :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item label="仓库负责人" prop="WarehouseManager">
        <a-input v-model="form.WarehouseManager" placeholder="请选择仓库负责人">
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
        <a-table
          :columns="selectcolumns"
          :scroll="{ x: 750 }"
          :data-source="numberRow"
          :pagination="false"
          bordered
        ></a-table>
      </a-form-model-item>

      <a-form-model-item ref="name" label="仓库地址">
        <a-input
          v-model="form.WarehouseAddress"
          placeholder="请选择省、区、市"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="仓库地址">
        <a-input
          v-model="form.WarehouseDetailedAddress"
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
          v-model="form.CargoSpaceManagement"
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
          v-model="form.BatchManagement"
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
import { postWarehouseAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' }
  },
  {
    title: '仓库编码',
    dataIndex: 'WarehouseCode',
    key: 'WarehouseCode',
    scopedSlots: { customRender: 'WarehouseCode' }
  },
  {
    title: '仓库名称',
    dataIndex: 'WarehouseName',
    key: 'WarehouseName'
  },
  {
    title: '仓库负责人',
    dataIndex: 'WarehouseManager',
    key: 'WarehouseManager'
  },
  {
    title: '仓库地址',
    dataIndex: 'WarehouseAddress',
    key: 'WarehouseAddress'
  },
  {
    title: '详细地址',
    dataIndex: 'WarehouseDetailedAddress',
    key: 'WarehouseDetailedAddress'
  },
  {
    title: '货位管理',
    dataIndex: 'CargoSpaceManagement',
    key: 'CargoSpaceManagement'
  },
  {
    title: '批次管理',
    dataIndex: 'BatchManagement',
    key: 'BatchManagement'
  }
]
const selectcolumns = [
  {
    title: '仓库编码',
    dataIndex: 'WarehouseCode',
    key: 'WarehouseCode',
    scopedSlots: { customRender: 'WarehouseCode' }
  },
  {
    title: '仓库名称',
    dataIndex: 'WarehouseName',
    key: 'WarehouseName'
  },
  {
    title: '仓库负责人',
    dataIndex: 'WarehouseManager',
    key: 'WarehouseManager'
  },
  {
    title: '仓库地址',
    dataIndex: 'WarehouseAddress',
    key: 'WarehouseAddress'
  },
  {
    title: '详细地址',
    dataIndex: 'WarehouseDetailedAddress',
    key: 'WarehouseDetailedAddress'
  },
  {
    title: '货位管理',
    dataIndex: 'CargoSpaceManagement',
    key: 'CargoSpaceManagement'
  },
  {
    title: '批次管理',
    dataIndex: 'BatchManagement',
    key: 'BatchManagement'
  }
]

const data = [
  {
    key: '1',
    WarehouseCode: '10000001',
    WarehouseName: '电商仓',
    WarehouseManager: '玛丽',
    WarehouseAddress: '上海闵行区',
    WarehouseDetailedAddress: '宝龙城113弄',
    CargoSpaceManagement: '',
    BatchManagement: ''
  },
  {
    key: '2',
    WarehouseCode: '10000002',
    WarehouseName: '电商仓',
    WarehouseManager: '罗拉',
    WarehouseAddress: '上海闵行区',
    WarehouseDetailedAddress: '宝龙城113弄',
    CargoSpaceManagement: '',
    BatchManagement: ''
  },
  {
    key: '3',
    WarehouseCode: '10000003',
    WarehouseName: '电商仓',
    WarehouseManager: '迈克',
    WarehouseAddress: '上海闵行区',
    WarehouseDetailedAddress: '宝龙城113弄',
    CargoSpaceManagement: '',
    BatchManagement: ''
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
        WarehouseCode: '', //仓库编码
        WarehouseName: '', //仓库名称
        WarehouseManager: '', //仓库负责人
        WarehouseAddress: '', //仓库地址
        WarehouseDetailedAddress: '', //仓库详细地址
        CargoSpaceManagement: '', //货位管理
        BatchManagement: '' //批次管理
      },
      rules: {
        WarehouseCode: [{ required: true, message: '请输入产品编码', trigger: 'blur' }]
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
          postWarehouseAdd(this.form).then(res => {
            console.log(res)
          })
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
      this.form.WarehouseCode = 'PT2020062200001'
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
