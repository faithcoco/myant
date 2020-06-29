<template>
  <div class="contant">
    <div class="group1">
      <a-input-search
        class="search"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <br />
      <br />
      <a-radio-group class="radio1" default-value="a" button-style="solid">
        类型:
        <a-radio-button value="a">全部</a-radio-button>
        <a-radio-button value="b">@我的</a-radio-button>
        <a-radio-button value="c">非@我的</a-radio-button>
      </a-radio-group>
    </div>

    <div class="group2">
      <div class="group2-btn1">
        <a-radio-group default-value="a" button-style="solid">
          模块:
          <a-radio-button value="a">全部</a-radio-button>
          <a-radio-button value="b">应收</a-radio-button>
          <a-radio-button value="c">应付</a-radio-button>
        </a-radio-group>

        <a-radio class="read">仅显示未读</a-radio>
      </div>
      <a-radio-group class="group2-btn2" default-value="a" button-style="solid">
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
    title: "内容",
    dataIndex: "LR",
    key: "LR"
  },
  {
    title: "来源/合同名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    sorter: (a, b) => a.age - b.age,
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
    title: "在'上海固圣信息技术有限公司一次性服务款项目'@了你",
    LR: "@高铭亮，高总，我的项目什么时候审批好",
    name: "上海固圣信息技术有限公司一次性服务款项目",
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
    }
  }
};
</script>
<style scoped>
.contant {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
}
.group1 {
  height: 100px;
}
.search {
  float: left;
}

.radio1 {
  float: left;
}

.group2 {
    margin-left: -30px;
  display: flex;
  justify-content: space-between;
}
.read{
    margin-left: 20px;
}
.group2-btn1 {
  width: 400px;
}

.group2-btn2 {
  width: 150px;
}
</style>