<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px">
        <!-- <el-row type="flex">
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
        </el-row> -->
        <el-row type="flex">
          <el-col :span="6" style="margin-left:15px;">
              <el-button v-model="form.name" type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
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
            prop="name"
            label="安装程序名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="explain"
            label="详细说明"
            width="180">
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者">
          </el-table-column>
           <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
           <el-table-column
            prop="installWay"
            label="安装方式">
            <template slot-scope="props">
                <span>{{props.row.installWay==1 ? "单步安装" : '连续安装' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="continueWhenError"
            label="错误是否继续安装">
            <template slot-scope="props">
                <span>{{props.row.continueWhenErrors ? "是" : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width='340'>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                @click="handleInstall(scope.$index, scope.row)">安装</el-button>
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
      width="80%"
      center>
      <DialogContent :dialogData="dialogData"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      :visible.sync="socketDialogVisible"
      width="80%"
      center>
      <DialogSocket :row="row"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="socketDialogVisible = false">关闭</el-button>
        <!-- <el-button type="primary" @click="save">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DialogContent from '../common/Dialog';
import DialogSocket from '../components/Socket';
export default {
  name: 'HelloWorld',
  components:{ DialogContent, DialogSocket},
  data(){
    return{
      form: {
        name:'',
      },
      tableData: [],
      status:'',
      dialogData:{
        name:'',
        explain:'',
        author:'',
        installWay:'',
        continueWhenError: '',
        commandList:[],
        },
      centerDialogVisible: false,
      socketDialogVisible: false,
      row:{},
    }
  },
  mounted(){
   this.init();
  },
  methods:{
    init(){ // 初始化表格数据
       this.$htp.get('installprogram/list').then((res)=>{
        if(res.code===200){
          this.tableData = res.list;
        } else {
          this.tableData = [];
          this.$message.error(res.msg);
        }
      });
    },
    addData(){ // 新增数据
      this.centerDialogVisible = true;
      this.status=0;
    },

    handleDelete(index, row){ // 删除
       this.$htp.delete(`installprogram/${row.name}`).then((res)=>{
        if(res.code===200){
          this.$message.success('删除成功');
          this.centerDialogVisible = false
          this.init();
        } else {
           this.$message.error(res.msg);
        }
      });
    },
    
    save(){ // 保存数据
    if(this.status==0){
      this.$htp.post('installprogram/save', this.dialogData).then((res)=>{
        if(res.code===200){
          this.$message.success('保存成功');
          this.centerDialogVisible = false
          this.init();
        } else {
           this.$message.error(res.msg);
        }
      });
    } else {
         this.$htp.put('installprogram/save', this.dialogData).then((res)=>{
        if(res.code===200){
          this.$message.success('更新成功');
          this.centerDialogVisible = false
          this.init();
        } else {
           this.$message.error(res.msg);
        }
      });
    }
      
    },
    handleEdit(index, row ){ // 编辑
      this.getDetail(row.name);
      this.status=1;
    },

    getDetail(name){ // 获取详情
       this.$htp.get(`installprogram/${name}`).then((res)=>{
        if(res.code===200){
          this.centerDialogVisible = true;
          this.dialogData = res.list[0];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleInstall(index, row){ // 安装
        this.row = row;
        this.socketDialogVisible = true;
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

