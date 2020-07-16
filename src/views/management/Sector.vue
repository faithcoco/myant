<template>
  <a-card>
    <a-tree :tree-data="treeData" show-icon :default-expanded-keys="['0-0-1']">
      <a-icon slot="apartment" type="apartment" :style="{ color: '#1890FF' }" />
      <template slot="custom" slot-scope="{ selected }">
        <a-icon :type="selected ? 'frown' : 'frown-o'" />
      </template>
    </a-tree>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { Tree } from 'ant-design-vue'
Vue.use(Tree)
import { getSector } from '@/api/manage'

const treeData = []

export default {
  data() {
    return {
      treeData
    }
  },
  created() {
    getSector().then(res => {
      console.log('res.result---------->', res.result)
      this.treeData = res.result
    })
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    }
  }
}
</script>
