<template>
  <div>
    <a-card>
      <a-table :columns="columns" :data-source="data" :pagination="{ hideOnSinglePage: true, pageSize: 500 }">
        <span slot="prefix1" slot-scope="text, record">
          <a-input :value="text" style="width: 50px" />
        </span>
        <span slot="maxserialnumber" slot-scope="text, record">
          <a-input :value="text" style="width: 50px" />
        </span>
        <span slot="currentserialnumber" slot-scope="text, record">
          <a-input :value="text" style="width: 150px" />
        </span>
        <span slot="ismanual" slot-scope="text, record">
          <a-select :value="record.ismanual" @change="(value) => ruleChange(value, record)" style="width: 150px">
            <a-select-option value="0"> 否</a-select-option>
            <a-select-option value="1"> 是 </a-select-option>
          </a-select>
        </span>
        <span slot="prefix2" slot-scope="text, record">
          <a-select :value="text" @change="(value) => ruleChange(value, record)" style="width: 150px">
            <a-select-option value="yyyyMMdd"> 年月日yyyyMMdd </a-select-option>
            <a-select-option value="yyMMdd"> 年月日yyMMdd </a-select-option>
            <a-select-option value="yyyyMM"> 年月yyyyMM </a-select-option>
            <a-select-option value="yyMM "> 年月yyMM </a-select-option>
            <a-select-option value="yyyy"> 年yyyy </a-select-option>
          </a-select>
        </span>
      </a-table>
      <a-row :style="{ marginTop: '30px' }" type="flex" justify="center">
        <a-col :span="1" :offset="1">
          <a-button type="primary" @click="onSubmit">保存</a-button>
        </a-col>

        <a-col :span="1" :offset="1">
          <a-button type @click="onBack">取消</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Descriptions } from 'ant-design-vue'
import { Transfer } from 'ant-design-vue'
Vue.use(Descriptions)
Vue.use(Transfer)
import { getCodeSettingColumns } from '@/api/manage'
import { postData, getData } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'

const product = {}

export default {
  data() {
    return {
      data: [],
      columns: [],
    }
  },
  created() {
    this.getColumns()
    this.getDataSource()
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection,
      }
    },
  },
  methods: {
    onSubmit(e) {
      this.submit()
    },
    onBack(e) {
      this.getlist()
    },
    submit() {
      const params = {}
      params.data = this.data
      postData(params, '/bd/numbersettings/updateNumSettings').then((res) => {
        if(res.status=='FAILED'){
            this.$message.warn(res.errorMsg)
        }else{
          this.$message.info('保存成功')
          this.getDataSource()
        }
        console.log('submit--->', JSON.stringify(res))
      })
    },
    getColumns() {
      const params = {}
      params.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getData(params, '/bd/numbersettings/numTop').then((res) => {
        console.log('columns--->', JSON.stringify(res.result.columns))
        this.columns = res.result.columns
      })
    },
    getDataSource() {
      const params = {}
      params.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getData(params, '/bd/numbersettings/numbersettingslist').then((res) => {
        console.log('data--->', JSON.stringify(res))
        this.data = res.result
      })
    },
    ruleChange(value, record) {
      console.log(`selected ${value}`)
      record.prefix2 = value
    },
  },
}
</script>
<style lang='less' scoped>
</style>
