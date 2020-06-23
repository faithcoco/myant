<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="19">
          <a-input-search @search="onSearch" placeholder="请输入搜索内容" />
        </a-col>
        <a-col :span="5">
          <span
            class="table-page-search-submitButtons"
            :style="{ float: 'right', overflow: 'hidden' } || {} "
          >
            <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">设置</a-button>
            <a-button style="margin-left: 5px" @click="() => queryParam = {}">导出</a-button>
            <a-button style="margin-left: 5px" @click="() => queryParam = {}">显示</a-button>
          </span>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        size="middle"
        :scroll="{ x: 'calc(400px + 50%)', y: 400 }"
      ></a-table>
    </a-card>
  </div>
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
    title: '存货规格',
    dataIndex: 'InventorySpecifications',
    key: 'InventorySpecifications',
    width: 10
  },
  {
    title: '数量',
    dataIndex: 'Quantity',
    key: 'Quantity',
    width: 10
  },
  {
    title: '单位',
    dataIndex: 'Unit',
    key: 'Unit',
    width: 10
  },
  {
    title: '批次',
    dataIndex: 'Batch',
    key: 'Batch',
    width: 10
  },
  {
    title: '批次属性',
    dataIndex: 'BatchAttributes',
    key: 'BatchAttributes',
    width: 10
  },
  {
    title: '包装单位',
    dataIndex: 'PackingUnit',
    key: 'PackingUnit',
    width: 10
  },
  {
    title: '包装数量',
    dataIndex: 'PackingQuantity',
    key: 'PackingQuantity',
    width: 10
  },
  {
    title: '仓库名称',
    dataIndex: 'WarehouseName',
    key: 'WarehouseName',
    width: 10
  },
  {
    title: '货位',
    dataIndex: 'CargoSpace',
    key: 'CargoSpace',
    width: 10
  }
]

const data = []
for (let i = 1; i < 30; i++) {
  data.push({
    key: i,
    InventoryCode: 'A' + 100 + i,
    InventoryName: `Edward King ${i}`,
    InventorySpecifications: `Edward King ${i}`,
    Quantity: i + i,
    Unit: 'KG',
    PackingUnit: 'KG',
    PackingQuantity: 100 + i,
    Batch: 100 + i,
    BatchAttributes: '优秀',
    WarehouseName: 'A' + 100 + i,
    CargoSpace: 'L' + 101 + i
  })
}

export default {
  data() {
    return {
      data,
      columns
    }
  },

  methods: {
    onSearch(value) {
      const data = [...this.data]
      this.data = this.data.filter(function(data) {
        return Object.keys(data).some(function(key) {
          return (
            String(data[key])
              .toLowerCase()
              .indexOf(value) > -1
          )
        })
      })
    },
    handleSetting(record) {
      this.modal_visible = true
    }
  }
}
</script>
