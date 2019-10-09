<template>
  <div>
    <span class='textEdit' @mousemove="show" @mouseout="hide" v-show="!isEdit">{{text}}<i class="el-icon-edit" v-show="isShow" @click="showInput"></i></span>
    <el-input v-show="isEdit" v-model="textEdit" @blur="saveText"></el-input>
  </div>
</template>

<script>
export default {
 props:['text'],
 data(){
   return{
     isShow:false,
     isEdit:false,
     textEdit:'',
   }
 },
 created(){
  this.textEdit = this.text;
 },
 methods:{
   show(){
     this.isShow = true;
   },
   hide(){
     this.isShow = false;
   },
   showInput(){
     this.isEdit = true;
   },
   saveText(e){
     this.$emit('saveEdit',e.target.value);
     this.isEdit = false;
   }
 }
}
</script>

<style scoped>
 .text{
   display: inline-block;
   min-width:100px;
   min-height:20px;
   cursor: pointer;
 }
</style>
