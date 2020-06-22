<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="货位调整单编码" required prop="coding">
        <a-input
          v-model="form.CargoSpaceAdjustmentCode"
          placeholder="请输入货位调整单编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="请选择编码" width="1000px" @ok="handleOk">
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

      <a-form-model-item ref="name" label="源货位编码" prop="name">
        <a-input
          v-model="form.SourceLocationCode"
          placeholder="请输入源货位编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="目标货位编码" prop="code">
        <a-input
          v-model="form.TargetLocationCode"
          placeholder="请输入目标货位编码"
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
      <a-form-model-item ref="name" label="调整日期">
        <a-date-picker
          v-model="form.AdjustmentDate"
          show-time
          type="date"
          placeholder="请选择调整日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货编码">
        <a-input
          v-model="form.InventoryCode"
          placeholder="请输入存货编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货名称">
        <a-input
          v-model="form.InventoryName"
          placeholder="请输入存货名称"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="货位编码">
        <a-input
          v-model="form.LocationCode"
          placeholder="请输入货位编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="批次编码">
        <a-input
          v-model="form.BatchCode"
          placeholder="请输入批次编码"
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
    title: '货位调整单编码',
    dataIndex: 'CargoSpaceAdjustmentCode',
    key: 'CargoSpaceAdjustmentCode',
    scopedSlots: { customRender: 'CargoSpaceAdjustmentCode' }
  },
  {
    title: '源货位编码',
    dataIndex: 'SourceLocationCode',
    key: 'SourceLocationCode'
  },
  {
    title: '目标货位编码',
    dataIndex: 'TargetLocationCode',
    key: 'TargetLocationCode'
  },
  {
    title: '部门编码',
    dataIndex: 'DepartmentCode',
    key: 'DepartmentCode'
  },
  {
    title: '业务员编码',
    dataIndex: 'SalesmanCode',
    key: 'SalesmanCode'
  },
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode'
  },
  {
    title: '货位编码',
    dataIndex: 'LocationCode',
    key: 'LocationCode'
  },
  {
    title: '批次编码',
    dataIndex: 'BatchCode',
    key: 'BatchCode'
  }
]

const data = [
  {
    key: '1',
    CargoSpaceAdjustmentCode: 'a121345',
    SourceLocationCode: 'a121345',
    TargetLocationCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    InventoryCode: 'a121345',
    LocationCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '2',
    CargoSpaceAdjustmentCode: 'a121345',
    SourceLocationCode: 'a121345',
    TargetLocationCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    InventoryCode: 'a121345',
    LocationCode: 'a121345',
    BatchCode: 'a121345'
  },
  {
    key: '3',
    CargoSpaceAdjustmentCode: 'a121345',
    SourceLocationCode: 'a121345',
    TargetLocationCode: 'a121345',
    DepartmentCode: 'a121345',
    SalesmanCode: 'a121345',
    InventoryCode: 'a121345',
    LocationCode: 'a121345',
    BatchCode: 'a121345'
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
        CargoSpaceAdjustmentCode: '',
        SourceLocationCode: '',
        TargetLocationCode: '',
        DepartmentCode: '', //部门编码
        SalesmanCode: '', //业务员编码
        AdjustmentDate: '', //日期
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
