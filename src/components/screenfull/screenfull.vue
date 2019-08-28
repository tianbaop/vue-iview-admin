<!--
全屏功能
-->
<template>
<div>
   <Icon class="icon" type="md-expand" @click="buttoncli" />
</div>
   
</template>
 
<script>
import screenfull from 'screenfull'
// 全屏功能使用:
//          1.安装,npm install --save screenfull
//          2.引入
//          3.点击时判断浏览器是否可全屏,不可全屏给提示,可全屏执行screenfull.toggle()
export default{
    data(){
        return{
            isFullscreen: false
        }
    },
    methods:{
        buttoncli(){
            if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
		        this.$message({
		          message: '不支持全屏',
		          type: 'warning'
		        })
		        return false
		     }
		      screenfull.toggle()
        }
    }
}
</script>
 
<style scoped lang = "less">
   .icon{
      font-size: 26px;
      margin-left: 10px;
      position: relative;
      top: -2px;
   }
</style>