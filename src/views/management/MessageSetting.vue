<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <a-menu v-model="currentmenu" @click="handleClick">
          <a-menu-item key="1">发送通知</a-menu-item>
          <a-menu-item key="2">通知历史</a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="19">
        <a-form
          v-show="formVisible"
          layout="horizontal"
          :form="form"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 10 }"
          @submit="handleSubmit"
        >
          <a-form-item label="标题">
            <a-input v-decorator="['msgtitle', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
          </a-form-item>
          <a-form-item label="通知内容">
            <a-input
              v-decorator="['msgcontent', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item>
          <a-form-item label="发送时间" v-show="false">
            <a-radio-group v-model="time" @change="onChange">
              <a-radio :value="1"> 立即</a-radio>
              <a-radio :value="2"> 定时 </a-radio>
            </a-radio-group>
            <a-date-picker mode="time" show-time />
          </a-form-item>
          <a-form-item label="选择目标">
            <a-radio-group v-model="time" @change="onChange">
              <a-radio :value="1"> 所有人</a-radio>
              <a-radio :value="2"> 部门 </a-radio>
              <a-radio :value="3"> 特定人员 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit"> 确定 </a-button>
          </a-form-item>
        </a-form>

        <a-table v-show="tableVisible" :columns="columns" :data-source="data" bordered>
         
            <a slot="sendtime" slot-scope="text, record">{{ record.sendtime | formatDate }}</a>
        </a-table>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import { postData, getData } from '@/api/manage'
import Vue from 'vue'
import { Layout } from 'ant-design-vue'
import { Descriptions } from 'ant-design-vue'
Vue.use(Descriptions)
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {},
  }
  if (index === 4) {
    obj.attrs.colSpan = 0
  }
  return obj
}

const data = []

export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal,
  },
  data() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'msgtitle',
        key: 'msgtitle',
      },
      {
        title: '内容',
        dataIndex: 'msgcontent',
        key: 'msgcontent',
      },
      {
        title: '推送对象',
        key: 'objectType',
        dataIndex: 'objectType',
        scopedSlots: { customRender: 'objectType' },
      },
      {
        title: '是否推送',
        key: 'pushType',
        dataIndex: 'pushType',
        scopedSlots: { customRender: 'pushType' },
      },
      {
        title: '推送时间',
        key: 'sendtime',
        dataIndex: 'sendtime',
        scopedSlots: { customRender: 'sendtime' },
      },
    ]

    return {
      openKeys: ['key-01'],
      // 查询参数
      queryParam: {},
      // 表头
      MessageSettinTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      data: [],
      columns,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formLayout: 'horizontal',
      time: 1,
      currentmenu: ['1'],
      formVisible: true,
      tableVisible: false,
    }
  },
  created() {},
  methods: {
    getTable() {
      const param = {}
      param.pageNo = 1
      param.pageSize = 10
      getData(param, '/msg/getMsgListData').then((res) => {
     
        this.data = res.result.data
      })
    },
    handleClick(e) {
      if (e.key == '1') {
        this.formVisible = true
        this.tableVisible = false
      } else {
        this.tableVisible = true
        this.formVisible = false
        this.getTable()
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.id = ''
          values.objectType = '1'
          values.personIdList = []
          values.sysAttachList = []
          postData(values, '/msg/insertMsg').then((res) => {
            console.log('message res-->', JSON.stringify(res))
          })
        }
      })
    },

    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },

    handleAdd(item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick(item) {
      console.log('handleTitleClick', item)
    },
    titleClick(e) {
      console.log('titleClick', e)
    },
    handleSaveOk() {},
    handleSaveClose() {},
  },
}
</script>

<style lang="less">
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: rgba(255, 255, 255, 1);

  height: 100px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgba(255, 255, 255, 1);

  height: 100px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 480px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}

.custom-tree {
  /deep/ .ant-menu-item-group-title {
    position: relative;
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .ant-menu-item {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }
}
</style>
