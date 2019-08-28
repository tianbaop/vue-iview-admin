<template>
   <div class="home">
      <div class="messageList">
        {{$t("homePage.welcomeAdministrators")}}： <span class="colorred">admin</span> ！{{$t("homePage.currentTime")}}: {{date}}
      </div>
      <div class="messageList">
       <span class="colorred">{{$t("homePage.reminder")}}：</span>  首次使用请配置发信邮箱 \extend\PHPMailer\SendEmail.php
      </div>
      <div class="messageList">
        <span class="colorred">{{$t("homePage.reminder")}}：</span> 当前版本LoveWall2.0.190707,持续更新,遇到bug或有什么建议可点此提交
      </div>
      <div class="messageList">
        <span class="colorred"> {{$t("homePage.reminder")}}：</span>最新版本本站为保障站点安全暂不做在线更新！新版本请关注 LoveWall
      </div>
   </div>
</template>
 
<script>
import { formatDate } from "@/common/index.js";
export default {
    name: 'home',
    data () {
        return {
            date:""
        } 
    },
    watch: {
      
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    created(){
        this.timer=setInterval(() => {
            this.date=formatDate(new Date(),"yyyy-MM-dd HH:mm:ss")
        }, 1000);
    },
    mounted(){
      
    },
    methods:{

    }
}
</script>
 
<style scoped lang = "less">
  .home{
    text-align: left;
    padding: 20px;
    .messageList{
      line-height: 28px;
      font-size: 14px;
      text-indent: 2em;
      height: auto;
      padding: 20px 10px;
      word-break:break-all;
      width: 100%;
      border-left: 2px solid @primaryColor;
      background-color: #f2f2f2;
      margin-bottom: 10px;
    }
    .colorred{
      color: red;
    }
  }
</style>
