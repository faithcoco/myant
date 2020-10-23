<template>
  <a-layout>
    <a-cascader
      :field-names="{ label: 'title', value: 'key', children: 'children' }"
      :options="options"
      placeholder="Please select"
      @change="onChange"
      v-model="data"
    />
    <a-divider>{{ data }}</a-divider>
  </a-layout>
</template>
<script>
import Vue from 'vue'

import { Cascader } from 'ant-design-vue'
Vue.use(Cascader)
const options = [
  {
    fatherid: '',
    materialclasscode: 'test',
    title: '测试',
    key: '2512774b-0049-4337-8150-71e4c1397813',
    slots: {
      icon: 'apartment',
    },
    scopedSlots: {
      icon: 'apartment',
    },
    children: [
      {
        fatherid: '2512774b-0049-4337-8150-71e4c1397813',
        materialclasscode: '001',
        title: 'hello',
        key: 'f5728e20-ca54-4549-bd9f-e178a94b13a2',
        slots: {
          icon: 'apartment',
        },
        scopedSlots: {
          icon: 'apartment',
        },
      },
    ],
  },
  {
    fatherid: '',
    materialclasscode: 'anker',
    title: '安科1',
    key: '8e65cff8-217d-4753-a88c-b69371c7de95',
    slots: {
      icon: 'apartment',
    },
    scopedSlots: {
      icon: 'apartment',
    },
    children: [
      {
        fatherid: '8e65cff8-217d-4753-a88c-b69371c7de95',
        materialclasscode: 'anker',
        title: '安科2',
        key: 'c56d8391-9701-4298-b507-831e4c5042de',
        slots: {
          icon: 'apartment',
        },
        scopedSlots: {
          icon: 'apartment',
        },
      },
    ],
  },
  {
    fatherid: '',
    materialclasscode: '0-3',
    title: '键盘',
    key: '912730c8-40ab-4566-8f62-b9ad25e5dd29',
    slots: {
      icon: 'apartment',
    },
    scopedSlots: {
      icon: 'apartment',
    },
  },
  {
    fatherid: null,
    materialclasscode: '02',
    title: '电脑',
    key: 'b3336fac-2fa7-4539-b4db-4b9afa10d999',
    slots: {
      icon: 'apartment',
    },
    scopedSlots: {
      icon: 'apartment',
    },
  },
  {
    fatherid: '',
    materialclasscode: '05',
    title: '手机',
    key: 'b60078ae-50c5-43f5-aca1-436d09a8f18a',
    slots: {
      icon: 'apartment',
    },
    scopedSlots: {
      icon: 'apartment',
    },
  },
]
export default {
  data() {
    return {
      options,
      data: ['2512774b-0049-4337-8150-71e4c1397813', null],
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
      console.log(this.data)
    },
  },
}
</script>
