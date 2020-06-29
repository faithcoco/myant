<template>
  <div>
    <a-card>
      <a-radio-group v-model="size" style="margin-bottom: 16px" @change="onChange">
        <a-radio-button value="approval">审批待办</a-radio-button>
        <a-radio-button value="notification">系统通知</a-radio-button>
        <a-radio-button value="contract">合同动态</a-radio-button>
      </a-radio-group>
      <div v-show="isShow">
        <a-tabs default-active-key="1" :size="size" @change="callback">
          <a-tab-pane key="1" tab="待我处理"></a-tab-pane>
          <a-tab-pane key="2" tab="我已处理"></a-tab-pane>
          <a-tab-pane key="3" tab="我发起的"></a-tab-pane>
          <a-tab-pane key="4" tab="抄送我的"></a-tab-pane>
        </a-tabs>
      </div>
     
        <div class="group1">
          <a-input-search
            class="search"
            placeholder="请输入搜索内容"
            style="width: 200px"
            @search="onSearch"
          />
          <br />
          <br />
          <a-radio-group class="radio1" default-value="a" button-style="solid">
             {{type}}
            <a-radio-button value="a">全部</a-radio-button>
            <a-radio-button value="b">@我的</a-radio-button>
            <a-radio-button value="c">非@我的</a-radio-button>
          </a-radio-group>
        <br />
          <br />

        <div class="group2">
          <div class="group2-btn1">
            <a-radio-group default-value="a" button-style="solid">
               {{module}}
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
    </a-card>
  </div>
</template>
<script>
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '内容',
    dataIndex: 'LR',
    key: 'LR'
  },
  {
    title: '来源/合同名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
]

const data = [
  {
    key: '1',
    title: "在'上海固圣信息技术有限公司一次性服务款项目'@了你",
    LR: '@高铭亮，高总，我的项目什么时候审批好',
    name: '上海固圣信息技术有限公司一次性服务款项目',
    time: '2020-04-21',
    status: '未读',
    

  }
]
export default {
  data() {
    return {
      isShow: true,
      size: 'default',
      columns,
      data,
      type:"审批类型：",
      module:"审批模块"
    }
  },
  methods: {
    onSearch(value) {
      console.log(value)
    },
    onChange(e) {
      console.log(`checked = ${e.target.value}`)
        
      if(e.target.value=="approval"){
          this.isShow=true
          this.type="审批类型："
          this.module='审批模块：'
      }else if(e.target.value=="notification"){
          this.isShow=false
           this.type="通知类型："
            this.module='通知模块：'
      }else if(e.target.value=="contract"){
          this.isShow=false
           this.type="类型："
            this.module='模块：'
      }
    }
  }
}
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
  
  display: flex;
  justify-content: space-between;
}
.read {
  margin-left: 20px;
}
.group2-btn1 {
  width: 400px;
}

.group2-btn2 {
  width: 150px;
}
</style>