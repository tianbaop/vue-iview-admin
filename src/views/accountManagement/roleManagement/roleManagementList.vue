<template>
   <div class="roleManagementList">
       <Row class="buttomtop">
            <Col span="16">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick="btnClick"></buttonGroup>
            </Col>
            <Col span="8">
                <Input placeholder="输入菜单名称" v-model="searchData.content" style="width: auto" @on-enter="btnSearch">
                    <Icon type="ios-search" slot="suffix" @click="btnSearch" />
                </Input>
            </Col>
        </Row>
        <Table   ref="selection" @on-selection-change="selectchange" border :columns="columns2" :data="tableData" :loading="loading" size="small" :max-height="tableHeight"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pages.totalCont" :current="pages.current" :page-size-opts='[10, 20, 30, 40]' :page-size="pages.pageSize" @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer></Page>
            </div>
        </div>
   </div>
</template>
 
<script>
import buttonGroup from "@/components/buttonGroup/buttonGroup.vue";
import { formatDate } from "@/common/common.js";
export default {
    name: 'roleManagementList',
    components:{
        buttonGroup
    },
    data () {
        return {
            // 分页数据
            pages:{
                totalCont:0,//总页数
                current:1,//当前页
                currepageSizent:10//每页条数
            },
            // table表格用到的数据
            // 表格下拉数据
            volumeTypes:[//性别
                {
                    id:1,
                    name:'男'
                },
                {
                    id:2,
                    name:'女'
                },
                {
                    id:3,
                    name:'未知'
                }
            ],
            lockeds:[//状态
                {
                    id:1,
                    name:'启用'
                },
                {
                    id:0,
                    name:'停用'
                }
            ],
            // 表格下拉数据
            loading:false,
            tableHeight:200,
            columns2: [ 
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'username',
                    minWidth: 100,
                    tooltip:true,
                    sortable:true
                },
                {
                    title: '账号',
                    key: 'usercode',
                    minWidth: 100,
                    tooltip:true
                },
                {
                    title: '性别',
                    key: 'sex',
                    minWidth: 100,
                    tooltip:true,
                    render: (h, params) => {
                        return h('Select', { 
                            props: {
                                disabled:true,
                                value: params.row.sex, // 获取选择的下拉框的值
                                size: 'small'
                            },
                            on: {
                                'on-change': e => {
                                    params.row.sex = e // 改变下拉框赋值
                                }
                            }
                        },
                        this.volumeTypes.map(function(type){//这个数组需要在data中定义,里面是一个个对象,每个对象里面应当包含value属性(因为要用到)
                            return h('Option', {
                                props:{
                                    value: type.id,
                                    label: type.name
                                }
                            }, type);
                        })
                        )
                    }
                },
                {
                    title: '状态',
                    key: 'locked',
                    minWidth: 100,
                    tooltip:true,
                    render: (h, params) => {
                        return h('Select', { 
                            props: {
                                disabled:true,
                                value: params.row.locked, // 获取选择的下拉框的值
                                size: 'small'
                            },
                            style: {
                                color: '#fff'
                            },
                            on: {
                                'on-change': e => {
                                    params.row.locked = e // 改变下拉框赋值
                                }
                            }
                        },
                        this.lockeds.map(function(type){//这个数组需要在data中定义,里面是一个个对象,每个对象里面应当包含value属性(因为要用到)
                            return h('Option', {
                                props:{
                                    value: type.id,
                                    label: type.name
                                }
                            }, type);
                        })
                        )
                    }
                },
                {
                    title: '最新登陆时间',
                    key: 'datetime',
                    minWidth: 100,
                    tooltip:true,
                    render: (h, params) => {
                        return h('div', formatDate(new Date(params.row.datetime),"yyyy-MM-dd HH:mm:ss"));
                    }
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
                content:'',
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
    },
    mounted(){
      
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
            this.$axios.posts("/users/list",this.searchData)
                .then((res)=>{
                    this.tableData=res.result.item
                    this.loading=false
                })
                ["catch"](()=>{

                })
        },
        // 获取table数据
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
        },
        // 查看数据
        // 分页
        changePage () {//页码改变的回调，返回改变后的页码

        },
        pageSizeChange () {//切换每页条数时的回调，返回切换后的每页条数

        }
        // 分页
    }
}
</script>
 
<style scoped lang = "less">
    /deep/ .ivu-select-disabled , /deep/.ivu-select-disabled .ivu-select-selection{
            background-color: transparent!important;
            opacity: 1;
            cursor: context-menu;
            color: rgb(0, 0, 0);
            border: none;
    }
</style>