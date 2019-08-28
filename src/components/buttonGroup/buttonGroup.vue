<template>
  <div class="newButton">
      <!-- 
        {
            text:'新增',//显示文字
            value:'新增',标识
            type:'icon',//类型icon或者buttom
            icon:'el-icon-plus',//如果类型为icon 传入element的图标class得值
            disabled:false,//是否禁用
         },
       -->
    <span v-for="(item,index) in _buttonGroup" :key="index">
      <Tooltip :content="item.text" placement="bottom">
          <button :disabled="item.disabled" :class="item.disabled ? 'yellow' : ''" class="button" @click="btnClick(item)">
            <Icon :type="item.icon" />
          </button>
      </Tooltip>
      <!-- <el-tooltip popper-class="tooltipStyle" v-if="item.type == 'button'" effect="dark" :content="item.text" placement="bottom"> -->
        <!-- <button :disabled="item.disabled" :class="item.disabled ? 'yellow' : ''" class="button" @click="btnClick(item)">
          <Icon :type="item.icon" />
        </button> -->
      <!-- </el-tooltip> -->

      
    </span>


  </div>
</template>
<script>
export default {
    props: ["buttonGroup"],
    data(){
        return{

        }
    },
    computed:{
        _buttonGroup(){
            return this.buttonGroup
        }
    },
    methods: {
        btnClick(val){
            if (val.disabled===false) {
                this.$emit('btnClick',val.value);
            }
        }
    }
}
</script>
<style scoped lang = "less">
.newButton{    
    /* margin-bottom: 20px; */
    height: 42px;
    line-height: 42px;    
    text-align: left;
    /* border-bottom: 1px solid #cac2c2; */
}
.newButton >span{    
    display: inline-block;
    height: 40px;
}
.button{
      height: 36px;
      padding: 0 10px;
      border: none;
      position: relative;
      cursor: pointer;
      float: left;    
      outline: none;
      background-color: transparent;
      margin-right: 2px;
      /deep/ .ivu-icon{
        position: relative;
        font-size: 24px;
        top: -4px;
      }
}
.yellow{
  color: #c7c2c2;
  cursor: not-allowed;
}
.button:hover{
      background-color: rgb(0, 255, 234);
}
</style>