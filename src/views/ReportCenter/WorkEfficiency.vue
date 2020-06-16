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
    title: '人员档案',
    dataIndex: 'PersonnelFile',
    key: 'PersonnelFile',
    width: 10
  },
  {
    title: '作业',
    dataIndex: 'work',
    key: 'work',
    width: 10
  },
  {
    title: '5.11日',
    children: [
      {
        title: '上架',
        dataIndex: 'Putonshelves',
        key: 'Putonshelves',
        width: 10
      },
      {
        title: '下架',
        dataIndex: 'OffShelf',
        key: 'OffShelf',
        width: 10
      }
    ]
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    PersonnelFile: 'A' + 100 + i,
    work: '次数'+i ,
    Putonshelves: i,
    OffShelf:i+i,
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
