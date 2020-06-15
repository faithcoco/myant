<template>
  <div class="container">
    <div class="group1">
      <div class="search">
        <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
        <a class="a">展开高级搜索</a>
      </div>
      <br />

      <a-radio-group class="RG1" default-value="a" button-style="solid">
        通知模块:
        <a-radio-button value="a">全部</a-radio-button>
        <a-radio-button value="b">应收</a-radio-button>
        <a-radio-button value="c">应付</a-radio-button>
        <a-radio-button value="d">其他</a-radio-button>
      </a-radio-group>
    </div>
    <br />
    <div class="group2">
      <div class="sel">
        通知类型:
        <a-select default-value="lucy" style="width: 120px" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled">Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>

        <a-radio class="radio">仅显示未读</a-radio>
      </div>
      <a-radio-group default-value="a" button-style="solid">
        <a-radio-button value="a">标为已读</a-radio-button>
        <a-radio-button value="b">导出</a-radio-button>
      </a-radio-group>
    </div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "创建人",
    dataIndex: "man",
    key: "man"
  },
  {
    title: "摘要",
    dataIndex: "ZY",
    key: "ZY"
  },

  {
    title: "时间",
    dataIndex: "time",
    key: "time"
  },

  {
    title: "状态",
    dataIndex: "status",
    key: "status"
  }
];

const data = [
  {
    key: "1",
    title: "回款计划逾期通知",
    man: "系统自动创建",
    ZY: "逾期未收款：3笔",
    time: "2020-04-21",
    status: "未读"
  }
];
export default {
  data() {
    return {
      columns,
      data
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    }
  }
};
</script>
<style scoped>
.container {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
}
.search {
  margin-left: 15px;
  display: flex;
}
.a {
  margin-top: 5px;
  margin-left: 20px;
}
.RG1 {
  width: 330px;
}
.group1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sel {
  margin-left: 8px;
  width: 330px;
}
.radio {
  margin-left: 20px;
}

.group2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>