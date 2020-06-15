

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    size="middle"
    :scroll="{ x: 'calc(700px + 50%)', y: 400 }"
  />
</template>
<script>
const columns = [
  {
    title: '存货编码',
    dataIndex: 'InventoryCode',
    key: 'InventoryCode',
    width: 100,
    fixed: 'left'
  },
  {
    title: '存货信息',
    children: [
      {
        title: '存货名称',
        dataIndex: 'InventoryName',
        key: 'InventoryName',
        width: 100,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '主计量单位',
        dataIndex: 'MainUnit',
        key: 'MainUnit',
        width: 100,
        sorter: (a, b) => a.age - b.age
      }
    ]
  },
  {
    title: '现存量',
    dataIndex: 'ExistingStock',
    key: 'ExistingStock'
  },
  {
    title: '预计入库量',
    children: [
      {
        title: '存货名称',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '主计量单位',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        sorter: (a, b) => a.age - b.age
      }
    ]
  },
  {
    title: '预计出库量',
    dataIndex: 'gender1',
    key: 'gender1',
    width: 80,
    fixed: 'right'
  },
  {
    title: '不合格品量',
    dataIndex: 'gender2',
    key: 'gender2',
    width: 80,
    fixed: 'right'
  },
  {
    title: '可用量',
    dataIndex: 'gender3',
    key: 'gender3',
    width: 80,
    fixed: 'right'
  },
  {
    title: '安全库存量',
    dataIndex: 'gender4',
    key: 'gender4',
    width: 80,
    fixed: 'right'
  },
  {
    title: '低于安全库存量',
    dataIndex: 'gender5',
    key: 'gender5',
    width: 80,
    fixed: 'right'
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    InventoryCode: i + 1,   //编号
    InventoryName: 'John Brown', //名称
    MainUnit: 'Lake Park',//主计量单位
    ExistingStock: i*1000.00+1,//
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
    gender1: 'M',
    gender2: 'M',
    gender3: 'M',
    gender4: 'M',
    gender5: 'M'
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