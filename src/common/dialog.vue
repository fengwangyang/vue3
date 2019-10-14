<template>
  <div>
    <el-form ref="dialogData" :model="dialogData" label-width="120px">
        <el-form-item label="安装程序名称">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
         <el-form-item label="安装方式">
          <el-input v-model="dialogData.installWay"></el-input>
        </el-form-item>
         <el-form-item label="遇错是否继续">
          <el-input v-model="dialogData.continueWhenError"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="dialogData.author"></el-input>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input v-model="dialogData.explain"></el-input>
        </el-form-item>
        <!-- <el-form-item label="最后修改时间">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item> -->
      </el-form>
      <div style='text-align:center'>
       <el-table
        :data="dialogData.commandList"
        border
        style="width: 100%">
        <el-table-column
          prop="cmdId"
          label="命令id"
          width="100">
          <template slot-scope="props">
            <EditTable :text="props.row.cmdId" @saveEdit="val=>props.row.cmdId=val"></EditTable>
          </template>
        </el-table-column>
        <el-table-column
          prop="cmdStr"
          label="命令内容"
          width="150">
          <template slot-scope="props">
            <EditTable :text="props.row.cmdStr" @saveEdit="val=>props.row.cmdStr=val"></EditTable>
          </template>
        </el-table-column>
        <el-table-column
          prop="timeConsuming"
          label="预估执行时间"
          width="150">
          <template slot-scope="props">
            <EditTable :text="props.row.timeConsuming" @saveEdit="val=>props.row.timeConsuming=val"></EditTable>
          </template>
        </el-table-column>
        <el-table-column
          prop="retryCount"
          label="重复次数"
          width="100">
          <template slot-scope="props">
            <EditTable :text="props.row.retryCount" @saveEdit="val=>props.row.retryCount=val"></EditTable>
          </template>
        </el-table-column>
        <el-table-column
          prop="successExplain"
          label="执行成功提示"
          width="150">
          <template slot-scope="props">
            <EditTable :text="props.row.successExplain" @saveEdit="val=>props.row.successExplain=val"></EditTable>
          </template>
        </el-table-column>
         <el-table-column
          prop="failureExplain"
          label="执行失败提示"
          width="150">
          <template slot-scope="props">
            <EditTable :text="props.row.failureExplain" @saveEdit="val=>props.row.failureExplain=val"></EditTable>
          </template>
        </el-table-column>
        <el-table-column 
          label="命令期望" 
          >
          <template slot-scope="props">
            <el-table border :data="props.row.expectResults">
            <el-table-column
            prop="enumCompareWay"
            label="检测方式"
            width="150">
             <template slot-scope="props">
              <!-- <EditTable :text="props.row.name" @saveEdit="val=>props.row.name=val"></EditTable> -->
              <el-select v-model="props.row.enumCompareWay" placeholder="请选择">
                <el-option
                  v-for="item in enumCompareWayOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              prop="markStr"
              label="标记文本"
              width="120">
               <template slot-scope="props">
                 <EditTable :text="props.row.markStr" @saveEdit="val=>props.row.markStr=val"></EditTable>
              </template>
            </el-table-column>
            <el-table-column
              prop="count"
              label="出现次数"
              width="100"
              >
               <template slot-scope="props">
                <EditTable :text="props.row.count" @saveEdit="val=>props.row.count=val"></EditTable>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope, props.row.expectResults)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
          <span class="add" @click="addData(props.row.expectResults, 1)">添加</span>
          </template>
        </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row, dialogData.commandList)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>
      <span class="add" @click="addData(dialogData.commandList, 2)">添加</span>
      </div>
    </div>
</template>

<script>
import EditTable from './EditTable';
export default {
  components:{
    EditTable,
  },
  props:['dialogData'],
  data(){
    return{
      form: {
        name:'',
       },
       enumCompareWayOption:[{
         value:'CONTAINS',
         label:'包含判断',
       },{
         value:'EQUAL',
         label:'全等',
       },{
         value:'NOT_CONTANS',
         label:'不包含',
       }]
    }
  },
  mounted(){
    
  },
  methods:{
    addData(val, flag){ // 增加数据
    let obj = {};
    if(flag==1){
      obj = {
        enumCompareWay:'',
        markStr:'',
        count:'',
      }
    } else {
      obj = {
        cmdId: '',
        cmdStr: '',
        expectResults: [],
        retryCount: '',
        timeConsuming: '',
        successExplain: '',
        failureExplain: '',
      }
    }
      val.push(obj);
    },
    handleDelete(index, row, data){ // 删除数据
      data.splice(index, 1);
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

