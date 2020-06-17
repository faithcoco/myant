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
    title: '发货日期',
    dataIndex: 'ShippingDate',
    key: 'ShippingDate',
    width: 10
  },
  {
    title: '客户名称',
    dataIndex: 'ClientName',
    key: 'ClientName',
    width: 10
  },
  {
    title: '超期多少天',
    dataIndex: 'Overdue',
    key: 'Overdue',
    width: 10
  },
  {
    title: '产品编码',
    dataIndex: 'ProductCode',
    key: 'ProductCode',
    width: 10
  },
  {
    title: '产品名称',
    dataIndex: 'ProductName',
    key: 'ProductName',
    width: 10
  },
  {
    title: '发货仓库',
    dataIndex: 'ShippingWarehouse',
    key: 'ShippingWarehouse',
    width: 10
  },
  {
    title: '发货数量',
    dataIndex: 'ShippingQuantity',
    key: 'ShippingQuantity',
    width: 10
  },
  {
    title: '计量单位',
    dataIndex: 'Unit',
    key: 'Unit',
    width: 10
  },
  {
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    key: 'PackingQuantity',
    width: 10
  },
  {
    title: '包装单位',
    dataIndex: 'PackingUnit',
    key: 'PackingUnit',
    width: 10
  }
]

const data = []
for (let i = 1; i < 30; i++) {
  data.push({
    key: i,
    ShippingDate: '1.' + i,
    ClientName: `Edward King ${i}`,
    Overdue: i,
    ProductCode: 'A111' + i,
    ProductName: `Edward Name ${i}`,
    ShippingWarehouse: 100 + i,
    ShippingQuantity: 1000 + i,
    Unit: '',
    PackingQuantity: '',
    PackingUnit: ''
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
