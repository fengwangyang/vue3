<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div style='text-align:center'>
       <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="150">
          <template slot-scope="props">
            <EditTable :text="props.row.date" @saveEdit="saveEdit"></EditTable>
          </template>
        </el-table-column>
        <el-table-column 
          label="配送信息" 
          >
          <template slot-scope="props">
            <el-table border :data="props.row.list">
            <el-table-column
            prop="name"
            label="姓名"
            width="120">
             <template slot-scope="props">
              <EditTable :text="props.row.name"></EditTable>
            </template>
          </el-table-column>
          <el-table-column
              prop="province"
              label="省份"
              width="120">
               <template slot-scope="props">
                 <EditTable :text="props.row.province"></EditTable>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="省份"
              >
               <template slot-scope="props">
                <EditTable :text="props.row.date"></EditTable>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
          <span class="add" @click="addData(props.row)">添加</span>
          </template>
        </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>
      <span class="add">添加</span>
      </div>
    </div>
</template>

<script>
import EditTable from './editTable';
export default {
  components:{
    EditTable,
  },
  data(){
    return{
      form: {
        name:'',
       },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          list:[]
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          list:[{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          }]
        }],
    }
  },
  methods:{
    addData(val){ // 增加数据
      val.list.push({
        date: '',
        name: '',
        province: '',
      });
    },
    saveEdit(el, val){
      console.log(el,val);
    }
  }
}
</script>

<style scoped>
.add{
  display: inline-block;
  border:1px solid #ebeef5;
  cursor: pointer;
  width:60px;
  text-align: center;
  line-height: 20px;
  height:20px;
  background: white;
}
</style>
<style>
.el-table .cell{
  text-align: center;
}
</style>

