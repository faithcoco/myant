<template>
  <div>
    <a-card :bordered="false">
      <a-row :gutter="8">
        <a-col :span="4">
          <a-tree
            showLine
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="FormSettingTree"
            @expand="onExpand"
            @select="onSelect"
            :selectedKeys="checkedKeys"
            :replaceFields="{ children: 'children', title: 'title', key: 'memuid' }"
          ></a-tree>
        </a-col>
        <a-col :span="20">
          <a-table
            :rowKey="(record) => record.fieldsort"
            :columns="columns"
            :data-source="formSettingList.data"
            bordered
            :scroll="{ x: 2000, y: 700 }"
            :pagination="{ hideOnSinglePage: true, pageSize: 500 }"
          >
            <span slot="fielddecription" slot-scope="text, record">
              <a-input
                :disabled="record.fielddisabled"
                @change="(e) => fielddecription(e.target.value, record)"
                :value="record.fielddecription"
              />
            </span>

            <span slot="fieldlength" slot-scope="text, record">
              <a-input-number
                :min="0"
                :max="record.maxlength"
                :disabled="record.fielddisabled"
                @change="(e) => fieldlength(e.target.value, record)"
                v-model="record.fieldlength"
              />
            </span>
            <span slot="fieldmax" slot-scope="text, record">
              <a-input-number
                :min="0"
                :max="record.maxmax"
                :disabled="record.fielddisabled"
                @change="(e) => fieldmax(e.target.value, record)"
                v-model="record.fieldmax"
              />
            </span>

            <span slot="fieldprecision" slot-scope="text, record">
              <a-input-number
                :min="0"
                :max="record.maxprecision"
                :disabled="record.fielddisabled"
                @change="(e) => fieldprecision(e.target.value, record)"
                v-model="record.fieldprecision"
              />
            </span>

            <span slot="fielddisplay" style="margin: 0" slot-scope="text, record">
              <a-checkbox
                :disabled="record.fielddisabled"
                @change="(e) => fielddisplayChange(e.target.checked, record)"
                :checked="record.fielddisplay"
              />
            </span>
            <a
              slot="fieldsort"
              :disabled="record.fielddisabled"
              slot-scope="text, record"
              @click="showSort('fieldsort', record)"
              >{{ record.fieldsort }}</a
            >
            <a
              slot="fieldsortlist"
              :disabled="record.fielddisabled"
              slot-scope="text, record"
              @click="showSort('fieldsortlist', record)"
              >{{ record.fieldsortlist }}</a
            >

            <span slot="fieldwidthlist" slot-scope="text, record">
              <a-input
                :disabled="record.fielddisabled"
                @change="(e) => vdef2Change(e.target.value, record)"
                :value="record.fieldwidthlist"
                style="width: 50px"
              />px
            </span>

            <span slot="fieldedit" style="margin: 0" slot-scope="text, record">
              <a-checkbox
                :disabled="record.fielddisabled"
                @change="(e) => fieldeditChange(e.target.checked, record)"
                :checked="record.fieldedit"
              />
            </span>

            <span slot="fielddisplaylist" style="margin: 0" slot-scope="text, record">
              <a-checkbox
                @change="(e) => fielddisplaylistChange(e.target.checked, record)"
                :checked="record.fielddisplaylist"
                :disabled="record.fielddisabled"
              />
            </span>
            <span slot="fieldmust" style="margin: 0" slot-scope="text, record">
              <a-checkbox
                @change="(e) => fieldmustChange(e.target.checked, record)"
                :checked="record.fieldmust"
                :disabled="record.fielddisabled"
              />
            </span>
          </a-table>

          <a-row :style="{ marginTop: '30px' }">
            <a-col :span="2" :offset="8">
              <a-button type="primary" @click="resetForm" :loading="restorestate" :disabled="restorestate"
                >恢复默认值</a-button
              >
            </a-col>

            <a-col :span="1" :offset="1">
              <a-button type="primary" @click="onSubmit" :loading="savestate" :disabled="savestate">保存</a-button>
            </a-col>

            <a-col :span="1" :offset="1">
              <a-button type @click="onBack">取消</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-modal title="提示" :visible="sortVisible" @ok="sortOk" @cancel="sortCancel">
        <p>请输入想要移动位置：</p>
        <a-input v-model="sortAfter" />
      </a-modal>
      <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
    </a-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tree } from 'ant-design-vue'
Vue.use(Tree)
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import {
  getFormSettingTree,
  getServiceList,
  getFormSettingList,
  getFormSettingColumns,
  updateForm,
  postData,
} from '@/api/manage'
import { logininfo } from '@/store/mutation-types'

const columns = []
//表单设置
export default {
  name: 'TreeList',
  components: {
    STable,
    OrgModal,
  },
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      openKeys: ['01'],
      selectedKeys: ['01-01'],
      menuid: '',
      // 查询参数
      queryParam: {},
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象

      FormSettingTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      formSettingList: {},
      sortVisible: false,
      sortAfter: '',
      currentItem: '',
      editVisible: false,
      currentId: '',
      disabled: true,
      value: 3,
      isReference: false,
      restorestate: false,
      savestate: false,
    }
  },
  created() {
    getFormSettingColumns().then((res) => {
      console.log('form columns-->', JSON.stringify(res))
      this.columns = res.result.columns
    })
    getFormSettingTree().then((res) => {
      this.FormSettingTree = res.result
      console.log('this--->', JSON.stringify(res.result[0].children[0].memuid))
      var treekey = res.result[0].memuid
      this.checkedKeys.push(res.result[0].children[0].memuid)
      this.expandedKeys.push(treekey)
      this.menuid = res.result[0].children[0].memuid
      this.getlist()
    })
  },
  methods: {
    onSelect(selectedKeys, info) {
      this.checkedKeys = []
      this.checkedKeys.push(selectedKeys[0])

      this.menuid = selectedKeys.join()
      this.getlist()
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    getlist() {
      const parameter = {
        enterpriseid: Vue.ls.get(logininfo).basepersonPO.enterpriseid,
        menuid: this.menuid,
        pageNo: 1,
        pageSize: 10,
      }

      getFormSettingList(parameter).then((res) => {
        if (res.status == 'FAILED') {
          this.$message.error(res.errorMsg)
        } else {
          this.formSettingList = res.result
        }
      })
    },
    upGo(arr, index) {
      if (index != 0) {
        arr[index] = arr.splice(index - 1, 1, arr[index])[0]
      } else {
        arr.push(arr.shift())
      }
    },
    sortOk(e) {
      var tamp = this.currentItem
      if (this.currentId == 'fieldsort') {
        tamp.fieldsort=this.sortAfter
        this.formSettingList.data.splice(parseInt(this.currentItem.fieldsort) - 1, 1)
        this.formSettingList.data.splice(parseInt(this.sortAfter) - 1, 0, tamp)

        this.formSettingList.data = this.formSettingList.data.map((item, index) => {
          return { ...item, fieldsort: index + 1 }
        })
        this.formSettingList.data.sort(function (a, b) {
          return a.fieldsort - b.fieldsort
        })
      } else {
        
        //列表排序
        tamp.fieldsortlist=this.sortAfter
        this.formSettingList.data.splice(parseInt(this.currentItem.fieldsortlist) - 1, 1)
       this.formSettingList.data.splice(parseInt(this.sortAfter) - 1, 0, tamp)


        this.formSettingList.data = this.formSettingList.data.map((item, index) => {
          return { ...item, fieldsortlist: index+1}
        })
        this.formSettingList.data.sort(function (a, b) {
          return a.fieldsortlist - b.fieldsortlist
        })
      }

      this.sortAfter = ''
      this.sortVisible = false
    },
    sortCancel(e) {
      this.sortVisible = false
    },
    showSort(text, record) {
      this.sortVisible = true
      this.currentId = text
      this.currentItem = record
    },
    onSubmit(e) {
      this.savestate = true
      updateForm(this.formSettingList).then((res) => {
        if (res.status == 'FAILED') {
          this.$message.error(res.errorMsg)
        } else {
          this.getlist()
          this.$message.info('保存成功')
        }

        this.savestate = false
      })
    },
    resetForm(e) {
      this.restorestate = true
      const parameter = {
        enterpriseid: Vue.ls.get(logininfo).basepersonPO.enterpriseid,
        memuid: this.menuid,
      }
      var url = '/bd/FormSetting/initdefault'
      postData(parameter, url).then((res) => {
        console.log('init form-->', JSON.stringify(res))
        if (res.status == 'FAILED') {
          this.$message.error(res.errorMsg)
        } else {
          this.getlist()
          this.$message.info('恢复默认值成功')
        }
        this.restorestate = false
      })
    },
    onBack(e) {
      this.getlist()
    },

    vdef2Change(value, record) {
      for (const key in this.formSettingList.data) {
        if (record.id == this.formSettingList.data[key].id) {
          this.formSettingList.data[key].vdef2 = value
        }
      }
    },

    fielddecription(value, record) {
      record.fielddecription = value
    },
    fielddefault(value, record) {
      record.fielddefault = value
    },

    fieldlength(value, record) {
      record.fieldlength = value
    },
    fieldprecision(value, record) {
      record.fieldprecision = value
    },
    fieldmax(value, record) {
      record.fieldmax = value
    },
    fieldeditChange(value, record) {
      record.fieldedit = value
    },
    systemChange(e) {
      console.log('radio checked', e.target.value)
    },
    fielddisplayChange(value, record) {
      record.fielddisplay = value
    },
    fielddisplaylistChange(value, record) {
      record.fielddisplaylist = value
    },
    fieldmustChange(value, record) {
      record.fieldmust = value
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    handleClick(e) {
      console.log('click', e)
      for (const key in this.FormSettingTree) {
        for (const i in this.FormSettingTree[key].children) {
          if (e.key == this.FormSettingTree[key].children[i].key) {
            this.menuid = this.FormSettingTree[key].children[i].memuid
          }
        }
      }
      this.getlist()
    },
    handleAdd(item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
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
.tree {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 2px;
  height: 750px;
}
</style>
