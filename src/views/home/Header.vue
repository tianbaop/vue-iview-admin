<template>
   <div class="Header clear">
      <!-- 控制菜单的icon -->
      <Icon type="md-apps"  class="menu" @click="clickitems"/>
      <div class="rightherder">
          <Icon type="md-search" v-if="iswidth"  class="menu" style="float:left" @click="showSearch"/>
          <input type="text" v-if="iswidth"  id="menu" style="float:left" :class="isShowSearch?'showSearch':'heidSearch'">
         <Screenfull  v-if="iswidth"  style="float:left"></Screenfull >
         <div style="float:left">
            <Dropdown style="margin-left: 20px" @on-click="changeLanguage">
               <a href="javascript:void(0)">
                  {{ $t('Language.switchLanguage')}}
                  <Icon style="font-size: 20px;color: #000;" type="ios-arrow-down"></Icon>
               </a>
               <DropdownMenu slot="list" >
                     <DropdownItem name="en">{{$t('Language.english')}}</DropdownItem>
                     <DropdownItem name="zh">{{$t('Language.chinese')}}</DropdownItem>
                     <DropdownItem name="ja">{{$t('Language.Japanese')}}</DropdownItem>
               </DropdownMenu>
            </Dropdown>
         </div>
         <div style="float:left">
            <Dropdown style="margin-left: 20px">
               <a href="javascript:void(0)">
                  <div style="float:left;width: 50px;margin-top: 5px;height: 50px;overflow: hidden;border-radius: 30px;">
                     <img src="../../assets/img/title.gif" alt="logo.png">
                  </div>
                  <Icon style="font-size: 20px;position: relative;top: 12px;color: #000;margin-right: 20px;" type="ios-arrow-down"></Icon>
               </a>
               <DropdownMenu slot="list" >
                     <DropdownItem name="ja">设置</DropdownItem>
                     <!-- <DropdownItem name="en">个人中心</DropdownItem> -->
                     <DropdownItem name="zh">
                        <router-link
                        to="/home"
                        >
                        首页
                        </router-link>
                     </DropdownItem>
                     <DropdownItem name="ja">
                        <router-link
                        to="/login"
                        replace
                        >
                        退出
                        </router-link>
                     </DropdownItem>
               </DropdownMenu>
            </Dropdown>
         </div>
      </div>
   </div>
</template>
 
<script>
import { mapState,mapMutations,mapActions } from 'vuex'
import Screenfull from "@/components/screenfull/screenfull";
export default {
    name: 'Header',
    components:{
        Screenfull
    },
    props:{
        iswidth:{
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            isShowSearch:false
        }
    },
    computed:{
        ...mapState({//多语言
   
        })
    },
    watch: {
      
    },
    created(){
       
    },
    mounted(){
      
    },
    methods:{
        // 控制菜单的收起展开事件
        clickitems(){
            this.$emit("clickitems")
        },
        // 控制菜单的收起展开事件
        showSearch(e){
            this.isShowSearch=!this.isShowSearch
            document.getElementById("menu").focus()
        },
        changeLanguage (name) {
            this.$i18n.locale=name
            // if (this.$i18n.locale == 'en-us') {
            //    this.$i18n.locale = 'zh-cn'
            // } else {
            //    this.$i18n.locale = 'en-us'
            // }
        }
    }
}
</script>
 
<style scoped lang = "less">
 .Header{
     width: 100%;
     height: 60px;
     /* background-color: @primaryColor; */
      background: linear-gradient(to left,@herderColor, @SidebarColor) !important;
     border-bottom: 1px solid ;
     text-align: left;
     line-height: 60px;
     .menu{
        float: left;
        line-height: 60px;
        font-size: 30px;
     }
     .rightherder{
        float: right;
        height: 60px;
        line-height: 60px;
     }
      img{
         max-width: 100%;
      }
     /deep/ .showSearch{
            transition: all 0.2s;
            width: 100px;    
            height: 30px;
            margin-top: 10px;
            outline: none;
            font-size: 16px; 
            line-height: 30px;
            border-bottom: 1px solid #5a5a5a;
            border-right: none;
            border-top: none;
            border-left: none;
        
     }
     /deep/ .heidSearch{
            margin-top: 10px;
            transition: all 0.2s;
            width: 0px;
            height: 30px;
            line-height: 30px;
            outline: none;
            border-bottom: 1px solid #5a5a5a;
            border-right: none;
            border-top: none;
            border-left: none;
     }
 }
</style>