<template>
  <a-card>
    <a-row>
      <a-col :span="19"></a-col>
      <a-col :span="5">
        <span
          class="table-page-search-submitButtons"
          :style="{ float: 'right', overflow: 'hidden' } || {} "
        >
          <a-button style="margin-left: 5px" type="primary" @click="handleAdd">新增</a-button>
          <a-button style="margin-left: 5px" type="primary" @click='back'>返回</a-button>
        </span>
      </a-col>
    </a-row>
    <br />
    <a-table :columns="columns" :data-source="list" defaultExpandAllRows>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleAddItem(record)">添加子类</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm v-if="list.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
      <span slot="use" style="margin: 0">
        <a-checkbox @change="onChange" />
      </span>
    </a-table>
    <a-modal v-model="visible" title="新增类别" @ok="handleOk">
      <p>请输入类别名称：</p>
      <a-input ref="userNameInput" v-model="typeName" placeholder />
    </a-modal>
  </a-card>
</template>
<script>
import { getclassificationGoodsColumns, getclassificationGoodsList } from '@/api/manage'

export default {
  data() {
    return {
      list: [],
      columns: [],
      visible: false,
      typeName: '',
      currentRecord: '',
      tag: -1,
     
    }
  },
  created() {
    getclassificationGoodsColumns().then((res) => {
      this.columns = res.columns
      console.log('columns-->', JSON.stringify(res.columns))
    })
    getclassificationGoodsList().then((res) => {
      this.list = res.result
      console.log('data-->', JSON.stringify(res.result))
    
    })
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    handleAddItem(record) {
      this.currentRecord = record
      this.tag = 2
      this.visible=true
    },
    handleEdit(record) {
      console.log(record)
    },
    handleSub(record) {
      console.log(record)
    },
    handleAdd() {
      this.tag = 1
      this.visible = true
    },
    back() {
      this.$router.push({ name: 'ProductList' }) //编程式导航  修改 url，完成跳转
    },
    handleOk(e) {
      this.visible = false
      if (this.tag == 1) {
        this.list.push({
          key: this.list.length + 1,
          name: this.typeName,
        })
      } else if (this.tag == 2) {
        for (const key in this.list) {
          if (this.list[key] == this.currentRecord) {
            this.currentRecord.children.push({
              key: this.list[key].key + '' + (this.currentRecord.children.length + 1),
              name: this.typeName,
            })
            console.log(JSON.stringify(this.currentRecord))
          }
        }
      }

      this.typeName = ''
    },
    onDelete(key) {
      const list = [...this.list]
      this.list = list.filter((item) => item.key !== key)
    },
  },
}
</script>
