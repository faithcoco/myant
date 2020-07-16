<template>
  <a-card>
    <a-row>
      <a-col :span="19"></a-col>
      <a-col :span="5">
        <span
          class="table-page-search-submitButtons"
          :style="{ float: 'right', overflow: 'hidden' } || {} "
        >
          <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">新增</a-button>
        </span>
      </a-col>
    </a-row>
    <br />
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
import { getclassificationGoodsColumns, getclassificationGoodsList } from '@/api/manage'
const columns = []

const data = []

export default {
  data() {
    return {
      data,
      columns
    }
  },
  created() {
    getclassificationGoodsColumns().then(res => {
      this.columns = res.columns
    })
    getclassificationGoodsList().then(res => {
      this.data = res.result
    })
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
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
