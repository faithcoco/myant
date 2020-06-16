<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    size="middle"
    :scroll="{ x: 'calc(400px + 50%)', y: 400 }"
  />
</template>
<script>
const columns = [
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode',
    width: 10
  },
  {
    title: '存货名称',
    dataIndex: 'InventoryName',
    key: 'InventoryName',
    width: 10
  },
  {
    title: '180天',
    dataIndex: 'HalfYear',
    key: 'HalfYear',
    width: 10
  },
    {
    title: '360天',
    dataIndex: 'OneYear',
    key: 'OneYear',
    width: 10
  },
    {
    title: '360天以上',
    dataIndex: 'OverOneYear',
    key: 'OverOneYear',
    width: 10
  },
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    InventoryCode: 'A' + 100 + i,
    InventoryName: `Edward King ${i}`,
    HalfYear: i,
    OneYear:i+i,
    OverOneYear:i+1
  })
}

export default {
  data() {
    return {
      data,
      columns
    }
  }
}
</script>
