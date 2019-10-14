<template>
  <div>
    <el-form label-position="right" label-width="80px">
      <el-form-item label="配置名称">
        <el-select v-model="programconfigValue" placeholder="请选择">
          <el-option
            v-for="item in connectioninfoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="连接名称">
        <el-select v-model="connectioninfoValue" placeholder="请选择">
          <el-option
            v-for="item in programconfigOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage">执行</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card" v-if="activities.length>0">
       <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          >
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  props:['row'],
  data(){
    return{
      activities: [],
       connectioninfoOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        programconfigOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
      websocket: null,
      programconfigValue:'',
      connectioninfoValue:'',
    }
  },
  mounted(){
    this.getData();
    this.init();
  },
  methods:{
    getData(){ // 获取数据
        this.$htp.get('connectioninfo/list').then((res)=>{
          this.connectioninfoOptions = res.list;
        });
        this.$htp.get('programconfig/list').then((res)=>{
          this.programconfigOptions = res.list;
        });
    },
    init(){
      //判断当前浏览器是否支持WebSocket
      this.activities = [];
      if('WebSocket' in window){
          this.websocket = new WebSocket("ws://172.16.24.142:9999/websocket/123");
      }
      else{
          alert('Not support websocket')
      }
      this.websocket.onopen=(res)=>{
        console.log("连接成功:" + res);
      };
      this.websocket.onerror=(res)=>{
        console.log("连接失败:" + res);
      };
       //接收到消息的回调方法
      this.websocket.onmessage = (event)=>{
          console.log(event.data);
          this.activities.push({content:event.data})
      }
    },
    sendMessage(){
      //发送消息
      console.log(3333);
      this.websocket.send("test");
      // `${this.connectioninfoValue}&&${this.programconfigValue}&&${this.row.name}`
    }
  },
  beforeDestroy(){
    //主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      this.websocket.close();
  },
}
</script>

<style scoped>
.box-card{
  margin-top:20px;
}
.el-form{
  display: flex;

}
</style>
