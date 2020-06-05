<template>
  <a-card>
    <a-table :columns="columns" :data-source="data" :defaultExpandAllRows="true">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleAdd(record)">添加子类</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm v-if="data.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
      <span slot="use" style="margin: 0">
        <a-checkbox @change="onChange" />
      </span>
    </a-table>
  </a-card>
</template>
<script>
const columns = [
  { title: '类别名称', dataIndex: 'name', key: 'name' },
  { title: '类别编号', dataIndex: 'age', key: 'age' },
  { title: '启用', dataIndex: '', key: 'address', scopedSlots: { customRender: 'use' } },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
]



const data = [
  {
    key: 1,
    name: '原材料',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: '钢材',
        age: 42,
        address: 'New York No. 2 Lake Park'
      }
           
    ]
  },
  {
    key: 2,
    name: '成品',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]
export default {
  data() {
    return {
      data,
      columns
    }
  },
  methods: {
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    },
    handleAdd(record) {
      console.log(record)
    },
    handleEdit(record) {
      console.log(record)
    },
    handleSub(record) {
      console.log(record)
    },
    onDelete(key) {
      const data = [...this.data]
      this.data = data.filter(item => item.key !== key)
    }
  }
}
</script>
