<template>
    <div class="index">
    <div class="content clear">
    <Sidebar v-show="iswidth" class="Sidebar" :class="isShowMenu?'SidebarShow':'SidebarHeid'"></Sidebar>
    <div @click="heidmenu" v-show="iswidth==false" class="minwidth" :class="isShowMenu?'minwidthShow':'minwidthHeid'">
        <Sidebar class="Sidebar" :class="isShowMenu?'SidebarShow':'SidebarHeid'"></Sidebar>
    </div>
    <div class="indexhome" :class="iswidth?isShowMenu?'HomeShow':'HomeHeid':'HomeHeid'">
        <Header class="Header" :iswidth="iswidth" @clickitems="clickitems"></Header>
        <LabelPage class="LabelPage"></LabelPage>
        <router-view class="ivewindex"></router-view>
        <!-- <Home class="Home"></Home> -->
    </div>
    </div>
    
    </div>
</template>
<script>
import LabelPage from "@/views/home/LabelPage";
import Header from "@/views/home/Header";
import Sidebar from "@/views/home/Sidebar";
import Home from "@/views/home/Home";
export default {
    name: 'index',
    components:{
        LabelPage,
        Header,
        Sidebar
        // Home
    },
    data () {
        return {
            isShowMenu:true,//是否显示菜单，true：显示
            iswidth:true,//false:小屏幕，truepc大屏幕
            screenHeight:window.innerHeight,
            screenWidth: document.body.clientWidth
        }
    },
    watch: {
        // 监听屏幕宽高改变
        screenHeight : {
            handler(val,oldval){
                this.screenHeight = val
            },
            deep:true
        },
        screenWidth:{
            handler(val,oldval){
                this.screenWidth = val
            },
            deep:true
        }
        // 监听屏幕宽高改变
    },
    created(){
        this.$store.dispatch('settings/changeSetting', {
            key: 'theme',
            value: "#1890ff"
        })
        this.menuData()
    },
    mounted(){
        //监听屏幕宽高
        this.resize()
        window.addEventListener("resize" , this.resize)
        //监听屏幕宽高
    },
    methods:{
        //头部icon的事件，控制菜单收起展开
        clickitems(){
            console.log(111)
            this.isShowMenu=!this.isShowMenu
        },
        //头部icon的事件，控制菜单收起展开
        // 监听屏幕高度执行的方法
        resize(){
            window.screenHeight = window.innerHeight
            this.screenHeight = window.screenHeight;
            this.screenWidth= document.body.clientWidth;
            if (this.screenWidth<500) {
                this.iswidth=false
                this.isShowMenu=false
            }
        },
        // 监听屏幕高度执行的方法
        // 小于500的屏幕隐藏菜单
        heidmenu (el) {
            console.log(typeof(el.target.className))
            // 这里判断点击的元素是否是本身及子元素，是则返回
            if (el.target.className.indexOf("minwidth")===0) {
                this.isShowMenu=false
            }
        },
        // 小于500的屏幕
        // 获取菜单数据
        menuData(){
            this.$axios.posts("/menuManagement/GetTree",{moduleParentId: 1,skipCount: 0,   maxResultCount: 10})
                .then((res)=>{
                    console.log(res)
                })
        }
        // 获取菜单数据
    }
}
</script>
 
<style scoped lang = "less">
.index{
    height: 100%;
    width: 100%;
    .content{
        height: 100%;
        width: 100%;
        .Sidebar{
            float: left;
        }
        .SidebarShow{
            transition: all 1s;
            width: 190px;
        }
        .SidebarHeid{
            transition: all 1s;
            width: 0px;
        }
        .indexhome{
            float: left;
            height: 100%;
            background-color: rgb(255, 255, 255);
            .LabelPage{
                background-color: rgb(255, 255, 255);
                height: 30px;
                width:100%;
            }
            /deep/ .ivewindex{
                width: calc(~"100% - 40px");
                margin: 20px;
                box-sizing: border-box;
                /* border: 1px solid #eee; */
                height: calc(~"100% - 130px");
                 >div{
                    position: relative;
                }
            }
            .Header{
                background-color: @herderColor;
            }
            .Home{
                width: 100%;
                padding: 10px;
                height:  calc(~ "100% - 90px");
            }
        }   
        .HomeShow{
            transition: all 1s;
             width:  calc(~ "100% - 190px");
        }
        .HomeHeid{
            transition: all 1s;
             width: 100%;
        }
        
    }
    .minwidth{    
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(99, 98, 98, 0.562);
        transition: opacity 0.2s;
        opacity: 1;
    }
    .minwidthShow{
        transition: opacity 1s;
        width: 100%;
        height: 100%;
        background-color: rgba(99, 98, 98, 0.562);
        z-index: 1000000;
        opacity: 1;
    }
    .minwidthHeid{
        animation-fill-mode:forwards;
        animation-name:mymove;
        animation-duration:1.5s;
        animation-iteration-count:1;
        -webkit-backface-visibility: hidden; 
        -webkit-transform-style: preserve-3d;
        @keyframes mymove {
            from {
                opacity: 1;
                background-color: rgba(99, 98, 98, 0.562);
            }
            to {
                opacity: 0;
                background-color: rgba(240, 238, 238, 0.562);
                z-index: -1000;
            }
        }
    }
}
</style>