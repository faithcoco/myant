<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="仓库" required prop="date1">
        <a-input placeholder="请输入产品编码">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
       <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300 }">
      
    </a-table>
       <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">保存并继续</a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">保存</a-button>
    </a-form-model-item>
    </a-form-model>
   
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
const columns = [
  { title: '产品编码', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '产品名称', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '产品条码', dataIndex: 'address', key: '1' },
  { title: '规格型号', dataIndex: 'address', key: '2' },
  { title: '计量单位', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park'
  }
]

export default {
  data() {
    return {
      labelCol: { span: 1 },
      wrapperCol: { span: 14 },
      data,
      columns
    }
  }
}
</script>
