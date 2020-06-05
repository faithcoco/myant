<template>
  <a-card>
    <a-tree :tree-data="treeData" show-icon :default-expanded-keys="['0-0-1']" >
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

const treeData = [
  {
    title: '上海砺学信息科技有限公司',
    key: '0-0',
    slots: {
      icon: 'apartment'
    },
    children: [
      { title: '渠道业务', key: '0-0-0', slots: { icon: 'apartment' } },
      {
        title: '销售总部',
        key: '0-0-1',
        scopedSlots: { icon: 'apartment' },
        children: [
          { title: '销售一部 孙玉战区', key: '0-0-1-0', slots: { icon: 'apartment' } },
          { title: '销售二部 陶冯战区', key: '0-0-1-1', slots: { icon: 'apartment' } },
          {
            title: '销售部',
            key: '0-0-1-2',
            scopedSlots: { icon: 'apartment' },
            children: [
              { title: '司宏宇组', key: '0-0-2-0', slots: { icon: 'apartment' } },
              { title: '胡燕菲组', key: '0-0-2-1', slots: { icon: 'apartment' } }
            ]
          },
          { title: '销售四部 谢祎战区', key: '0-0-1-3', slots: { icon: 'apartment' } },
          { title: '售前中心', key: '0-0-1-4', slots: { icon: 'apartment' } },
          { title: '市场部', key: '0-0-1-5', slots: { icon: 'apartment' } }
        ]
      },
      {
        title: '交付中心',
        key: '0-0-2',
        scopedSlots: { icon: 'apartment' },
        children: [{ title: 'a', key: '0-0-2-0', slots: { icon: 'apartment' } }]
      },
      {
        title: '管理部门',
        key: '0-0-3',
        scopedSlots: { icon: 'apartment' },
      },
      {
        title: '管理',
        key: '0-0-4',
        scopedSlots: { icon: 'apartment' }
      },
      {
        title: '智能制造',
        key: '0-0-5',
        scopedSlots: { icon: 'apartment' },
        children: [{ title: 'a', key: '0-0-5-0', slots: { icon: 'apartment' } }]
      }
    ]
  }
]

export default {
  data() {
    return {
      treeData
    }
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
