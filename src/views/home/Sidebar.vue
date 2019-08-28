<template>
   <div class="Sidebar">
      <div class="title">
         <img src="../../assets/img/logo.png" alt="logo.png">
         <span class="titleText">vue-iview-admin</span> 
      </div>
      <Menu theme="dark" style="width: 100%;overflow-y: auto;height: calc(100% - 60px);text-align: left;" :accordion="true" >
               <Submenu v-for="(item,i) in menudatas" :key="i" :name="item.id">
                  <template slot="title">
                     <Icon type="ios-paper" />
                     {{item.moduleName}}
                  </template>
                  <MenuItem v-for="(minitem,x) in item.children" :key="x"  :name="minitem.id" :to="minitem.routeAddress">{{minitem.moduleName}}</MenuItem>
               </Submenu>
            </Menu>
   </div>
</template>
 
<script>
export default {
    name: 'Sidebar',
    data () {
        return {
            menudatas:[]
        }
    },
    watch: {
      
    },
    created(){
        this.menuData()
    },
    mounted(){
      
    },
    methods:{
        // 获取菜单数据
        menuData(){
            this.$axios.posts("/menuManagement/GetTree",{status: 1})
                .then((res)=>{
                    this.menudatas=res.result.item
                })
        }
        // 获取菜单数据
    }
}
</script>
 
<style scoped lang = "less">
 .Sidebar{
    position: relative;
     height: 100%;
     overflow: hidden;
     background-color: @SidebarColor;
     .title{
         margin:10px;
         width: 100%;
         height: 40px;
         text-align: left;
         overflow: hidden;
         img{
            height: 82%;
         }
         .titleText{
            overflow: hidden;
            font-size: 18px;
            color: @headingColor;
            position: absolute;
            display: block;
            height: 32px;
            white-space: nowrap;
            top: 12px;
            left: 50px;
         }
     }
     /deep/.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, /deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
            color: rgba(255, 255, 255, 0.7);
            overflow: hidden;
            white-space: nowrap;
     }
 }
</style>