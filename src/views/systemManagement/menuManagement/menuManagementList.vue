<template>
    <div class="menuManagementList clear">
        <div class="leftTree fl">
            <Tree :data="menuTree" :render="renderContent"></Tree>
        </div>
        <div class="rightTable fl" id="rightTable">
            <Row class="buttomtop">
                <Col span="16">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick="btnClick"></buttonGroup>
                </Col>
                <Col span="8">
                    <Input placeholder="输入菜单名称" v-model="searchData.moduleName" style="width: auto" @on-enter="btnSearch">
                        <Icon type="ios-search" slot="suffix" @click="btnSearch" />
                    </Input>
                </Col>
            </Row>
            
            <Table   ref="selection" @on-selection-change="selectchange" width="550" border :columns="columns2" :data="tableData" :loading="loading" size="small" :max-height="tableHeight"></Table>
        </div>
    </div>
</template>
 
<script>
import buttonGroup from "@/components/buttonGroup/buttonGroup.vue";
export default {
    name: 'menuManagementList',
    components:{
        buttonGroup
    },
    data () { 
        return {
            // tree组件用到的数据
            menuTree: [],
            // tree组件用到的数据
            // table表格用到的数据
            tableHeight:200,
            columns2: [ 
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '模块编码',
                    key: 'modularCoding',
                    minWidth: 100,
                    tooltip:true,
                    sortable:true
                },
                {
                    title: '菜单名称',
                    key: 'moduleName',
                    minWidth: 100,
                    tooltip:true
                },
                {
                    title: '上级菜单',
                    key: 'superiorMenuName',
                    minWidth: 100,
                    tooltip:true
                },
                {
                    title: '状态',
                    key: 'statusName',
                    minWidth: 100,
                    tooltip:true
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => { this.edit(params) }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => { this.deleteData(params) }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData: [],
            selection:[],
            // table表格用到的数据
            // 查询条件
            searchData:{
                moduleName:'',
                moduleId: 0,
                skipCount: 0,   
                maxResultCount: 10
            },
            // 查询条件
            // 按钮组件数据
            buttonGroup:[
                {
                    text:'新增',
                    class:'bt_add',
                    value:'新增',
                    type:'button',
                    icon:'md-add',
                    disabled:false
                },
                {
                    text:'删除',
                    class:'bt_del',
                    value:'删除',
                    icon:'md-trash',
                    disabled:false,
                    type:'button'
                },
                {
                    text:'启用',
                    class:'bt_del',
                    value:'启用',
                    icon:'md-skip-forward',
                    disabled:false,
                    type:'button'
                },
                {
                    text:'停用',
                    class:'bt_del',
                    value:'停用',
                    icon:'md-warning',
                    disabled:false,
                    type:'button'
                }
            ]
            // 按钮组件数据
        }
    },
    watch: {
      
    },
    created(){
        this.menuData()
        this.treeData()
    },
    mounted(){
        // 设置表格高度 
        console.log(document.getElementById("rightTable").offsetHeight)
        this.tableHeight = document.getElementById("rightTable").offsetHeight-60
    },
    methods:{
        // 按钮事件
        btnClick(val){
            if (val==="新增") {
                this.$router.push("/menuManagement/menuManagementDetail/default")
            }else if (val==="启用") {
                let datas=[]
                for (const item of this.selection) {
                    datas.push({
                        id:item.id,
                        status:1
                    })
                }
                this.$axios.posts("/menuManagement/updateStatus",{moduleList:datas})
                    .then((res)=>{
                        this.menuData()
                    })
            }else if (val==="停用") {
                let datas=[]
                for (const item of this.selection) {
                    datas.push({
                        id:item.id,
                        status:0
                    })
                }
                this.$axios.posts("/menuManagement/updateStatus",{moduleList:datas})
                    .then((res)=>{
                        this.menuData()
                    })
            }
        },
        btnSearch(val){
            this.searchData.moduleId=0
            this.menuData()
        },
        // 按钮事件
        // 表格选中项
        selectchange(selection){
            this.selection=selection
        },
        // 表格选中项
        // 获取table数据
        menuData(){
            this.loading=true
            this.$axios.posts("/menuManagement/GetAll",this.searchData)
                .then((res)=>{
                    this.tableData=res.result.item
                    this.loading=false
                })
                ["catch"](()=>{

                })
        },
        // 获取table数据
        // 获取tree数据
        treeData(){
            this.$axios.posts("/menuManagement/GetTree")
                .then((res)=>{
                    this.menuTree=res.result.item
                })
        },
        // 获取tree数据
        // 树组件的render函数渲染
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    cursor: 'pointer',
                    display: 'inline-block',
                    width: '100%'
                }, 
                on: {
                    click: () => { this.clickTree(data) }
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        } 
                    }),
                    h('span', data.moduleName)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                })
            ]);
        },
        // 树组件的render函数渲染
        // 树组件的点击事件
        clickTree (data) {
            this.searchData.moduleId=data.id
            this.searchData.moduleName=""
            this.menuData()
        },
        // 树组件的点击事件
        // 删除数据
        deleteData(data){
            this.$axios.posts("/menuManagement/delete",{ids:[data.row.id]})
                .then((res)=>{
                    this.menuData()
                })
        },
        // 删除数据
        // 查看数据
        edit(data){
            this.$router.push('/menuManagement/menuManagementModify/'+data.row.id)
        }
        // 查看数据
    }
}
</script>
 
<style scoped lang = "less">
 .menuManagementList{
     text-align: left;
     height: 100%;
     .leftTree{
         border: 1px solid #eee;
         height: 100%;
         margin-right: 20px;
         width: 170px;
     }
     .rightTable{
         width: calc(~'100% - 190px');
         height: 100%;
         /deep/  .ivu-table-wrapper{
             width: 100%!important;
         }
         .buttomtop{
             height: 40px;
             border-bottom: 1px solid #cac2c2;
             margin-bottom: 20px;
         }
     }
 }
</style>