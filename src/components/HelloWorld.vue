<template>
  <div class="hello">
    <el-form ref="form" :model="form" label-width="80px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:20px;">
              <el-button v-model="form.name" type="primary">搜索</el-button>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6" style="margin-left:15px;">
              <el-button v-model="form.name" type="primary" icon="el-icon-plus" @click="centerDialogVisible = true">新增</el-button>
          </el-col>
        </el-row>
    </el-form>
     <el-row>
      <el-col style="padding:15px 15px;">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">安装</el-button>
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">状态查询</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
         </el-table-column>
        </el-table>
      </el-col>
     </el-row>
     <el-dialog
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <DialogContent />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DialogContent from '../common/dialog';
export default {
  name: 'HelloWorld',
  components:{ DialogContent},
  data(){
    return{
      form: {
        name:'',
      },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      centerDialogVisible: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
