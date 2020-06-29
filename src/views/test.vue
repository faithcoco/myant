<template>
  <a-card>
    <a-table :columns="columns" :data-source="data" bordered>
      <template slot="checked" >
         <a-checkbox @change="onChange">
  </a-checkbox>
      </template>
    
    </a-table>
  </a-card>
</template>
<script>
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  if (index === 4) {
    obj.attrs.colSpan = 0
  }
  return obj
}

const data = [
  {
    key: '1',
    name: '系统将新建合同消息推送给',
    address: '消息会实时推送'
  },
  {
    key: '2',
    name: 'John Brown',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: '消息会实时推送'
  },
  {
    key: '3',
    name: 'John Brown',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '消息会实时推送'
  }
  
]

export default {
  data() {
    const columns = [
      {
         colSpan: 1,
        title: '推送内容',
        dataIndex: 'name',
 
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index === 0) {
            obj.attrs.rowSpan = 3
          }
          // These two are merged into above cell
          if (index === 1) {
            obj.attrs.rowSpan = 0
          }
          
          if (index === 2) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      },
      {
        title: '推送人员或角色',
        dataIndex: 'age',
        customRender: (text, row, index) => {
          if (index == 0) {
            return <p>合同推送人</p>;
          }
          if (index==1){
            return <p>人员： <a-input style="width: 400px"  /></p>
          }if (index==2){
            return <p>角色： <a-input style="width: 400px"  /></p>
          }
          return {
            children: <a href="javascript:;">{text}</a>,
           
          };
        },
      },
      {
        title: '是否推送',
        colSpan: 1,
        dataIndex: 'tel',
         scopedSlots: { customRender: 'checked' },
      },
      {
        title: '推送时间',
        dataIndex: 'address',
        customRender: renderContent,
                customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index === 0) {
            obj.attrs.rowSpan = 3
          }
          // These two are merged into above cell
          if (index === 1) {
            obj.attrs.rowSpan = 0
          }
          
          if (index === 2) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      }
    ]
    return {
      data,
      columns
    }
  }
}
</script>
