<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 500 }"
  />
</template>
<script>
const columns = [
  {
    title: '存货编码',
    dataIndex: 'code',
    width: 150,
  },
  {
    title: '存货名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '仓库',
    dataIndex: 'warehouse',
  },
    {
    title: '期初数量',
    dataIndex: 'OpeningQuantity',
  },
    {
    title: '本期入',
    dataIndex: 'thisperiodinwarehouse',
  },
    {
    title: '本期出',
    dataIndex: 'thisperiodoutwarehouse',
  },
    {
    title: '结存数量',
    dataIndex: 'ClearinventoryQuantity',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    code: 1000110+i,
    name: `Edward King ${i}`,
    warehouse: `London, Park Lane no. ${i}`,
    OpeningQuantity: 1000110+i,
    thisperiodinwarehouse: 1111110+i,
    thisperiodoutwarehouse: 100110+i,
    ClearinventoryQuantity: 1010110+i,

  });
}

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
