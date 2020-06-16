

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
    width: 110,
     sorter: (a, b) => a.age - b.age
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
        width: 120,
        sorter: (a, b) => a.age - b.age
      }
    ]
  },
  {
    title: '现存量',
    dataIndex: 'ExistingStock',
    key: 'ExistingStock',
    width: 60,
     sorter: (a, b) => a.age - b.age
  },
  {
    title: '预计入库量',
    children: [
      {
        title: '已清购量',
        dataIndex: 'ClearedPurchase',
        key: 'ClearedPurchase',
        width: 100,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '订单在途量',
        dataIndex: 'Orderintransit',
        key: 'Orderintransit',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '到货/在检量',
        dataIndex: 'arrival',
        key: 'arrival',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '调拨在途量',
        dataIndex: 'Allotmentintransit',
        key: 'Allotmentintransit',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '生产订单量',
        dataIndex: 'Productionordervolume',
        key: 'Productionordervolume',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '委外订单量',
        dataIndex: 'Outsourcingorders',
        key: 'Outsourcingorders',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '合计',
        dataIndex: 'InWarehouseTotal',
        key: 'InWarehouseTotal',
        width: 100,
        sorter: (a, b) => a.age - b.age
      }
    ]
  },
  {
    title: '预计出库量',
    children: [
      {
        title: '销售订单量',
        dataIndex: 'Salesordervolume',
        key: 'Salesordervolume',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '待发货量',
        dataIndex: 'Pendingshipment',
        key: 'aPendingshipmentge',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '调拨待发量',
        dataIndex: 'Redeployment',
        key: 'Redeployment',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '备料计划量',
        dataIndex: 'Stockplanningamount',
        key: 'Stockplanningamount',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '生产未领量',
        dataIndex: 'Productionnotreceived',
        key: 'Productionnotreceived',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '委外未领量',
        dataIndex: 'age',
        key: 'age',
        width: 120,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '合计',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        sorter: (a, b) => a.age - b.age
      }
    ]
  },
  {
    title: '不合格品量',
    dataIndex: 'gender2',
    key: 'gender2',
    width: 110,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '可用量',
    dataIndex: 'gender3',
    key: 'gender3',
    width: 80,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '安全库存量',
    dataIndex: 'gender4',
    key: 'gender4',
    width: 110,
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '低于安全库存量',
    dataIndex: 'gender5',
    key: 'gender5',
    width: 100,
    sorter: (a, b) => a.age - b.age
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    InventoryCode: i + 10101010101, //编号
    InventoryName: 'John Brown', //名称
    MainUnit: 'Lake Park', //主计量单位
    ExistingStock: i * 1000.0 + 1, //
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

