<template>
  <a-tree
    v-model="checkedKeys"
    checkable
    :expanded-keys="expandedKeys"
    :auto-expand-parent="autoExpandParent"
    :selected-keys="selectedKeys"
    :tree-data="treeData"
    @expand="onExpand"
    @select="onSelect"
  />
</template>
<script>
import Vue from 'vue'
import { Tree } from 'ant-design-vue'
Vue.use(Tree)
const treeData = [
  {
    fatherid: null,
    materialclassid: 'a02fc978-c8c4-4697-83e5-db33d43fed46',
    title: '水产',
    key: '01',
    slots: {
      icon: 'apartment',
    },
    scopedSlots: {
      icon: 'apartment',
    },
    children: [
      {
        fatherid: '01',
        materialclassid: '4ab777a4-63f1-406c-a23e-bae134148343',
        title: '水产',
        key: '01-01',
        slots: {
          icon: 'apartment',
        },
        scopedSlots: {
          icon: 'apartment',
        },
        children: [
          {
            fatherid: '01-01',
            materialclassid: 'e86c1123-5fbe-493b-b984-e042cd91b69c',
            title: '水产',
            key: '01-01-01',
            slots: {
              icon: 'apartment',
            },
            scopedSlots: {
              icon: 'apartment',
            },
            children: [
              {
                fatherid: '01-01-01',
                materialclassid: '5bba4a27-2b72-43b4-9bca-79065992959a',
                title: '水产',
                key: '01-01-01-01',
                slots: {
                  icon: 'apartment',
                },
                scopedSlots: {
                  icon: 'apartment',
                },
                children: [
                  {
                    fatherid: '01-01-01-01',
                    materialclassid: 'c14b7cae-df3d-4fba-a9a7-6ea021d9eea3',
                    title: '水产',
                    key: '01-01-01-01-01',
                    slots: {
                      icon: 'apartment',
                    },
                    scopedSlots: {
                      icon: 'apartment',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default {
  data() {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData,
    }
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    },
  },
  methods: {
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
  },
}
</script>
