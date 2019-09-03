<template>
   <div class="menuManagementDetail">
       <div class="fixed_btn buttomtop">
            <buttonGroup :buttonGroup="buttonGroup" @btnClick="btnClick"></buttonGroup>
       </div>
        <div class="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="max-width: 450px;">
                <FormItem label="模块编码" prop="modularCoding">
                    <Input disabled v-model="formValidate.modularCoding" placeholder=""></Input>
                </FormItem>
                <FormItem label="模块名称" prop="moduleName">
                    <Input v-model="formValidate.moduleName" placeholder=""></Input>
                </FormItem>
                <FormItem label="多语言Key" prop="multilingualKey">
                    <Input v-model="formValidate.multilingualKey" placeholder=""></Input>
                </FormItem>
                <FormItem label="上级菜单" prop="superiorMenuId">
                    <selectTree v-model="formValidate.superiorMenuId" :data="menudatas"  placeholder=""></selectTree>
                </FormItem>
                <FormItem label="状态" prop="status">
                    <Select v-model="formValidate.status" style="width:100%">
                        <Option v-for="item in statusData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="图标" prop="icon">
                    <Input v-model="formValidate.icon" placeholder=""></Input>
                </FormItem>
                <FormItem label="地址" prop="routeAddress" :required="formValidate.superiorMenuId>0?true:false">
                    <Input v-model="formValidate.routeAddress" placeholder=""></Input>
                </FormItem>
                <FormItem label="排序" prop="sort">
                    <Input v-model="formValidate.sort" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="remarks">
                    <Input v-model="formValidate.remarks" placeholder="" type="textarea" :autosize="{minRows: 4,maxRows: 8}"></Input>
                </FormItem>
            </Form>
        </div>
   </div>
</template>
 
<script>
import buttonGroup from "@/components/buttonGroup/buttonGroup.vue";
import  selectTree  from "@/components/selectTree/selectTree.vue";
export default {
    name: 'menuManagementDetail',
    components:{
        buttonGroup,
        selectTree
    },
    data () {
        const validatePass = (rule, value, callback) => {
            if (this.formValidate.superiorMenuId !=="") {
                if (value!=="") {
                    callback();
                }else{
                    console.log(this.formValidate.superiorMenuId !=="")
                    callback(new Error("请输入路由地址"));
                }
            } else {
                callback();
            }
        };
        return {
            // 按钮组件数据
            buttonGroup:[
                {
                    text:'返回',
                    class:'bt_del',
                    value:'返回',
                    icon:'md-undo',
                    disabled:false,
                    type:'button'
                },
                {
                    text:'保存',
                    class:'bt_del',
                    value:'保存',
                    icon:'md-document',
                    disabled:false,
                    type:'button'
                },
                {
                    text:'取消',
                    class:'bt_del',
                    value:'取消',
                    icon:'md-swap',
                    disabled:false,
                    type:'button'
                }
            ],
            // 按钮组件数据
            // 下拉数据
            menudatas:{
                options: [],
                multipl:false,
                normalizer(node) {//如果拿回来的值不是这几个键，就自定义绑定一下键
                    return {
                        id: node.id,//需要v-model接收的
                        label:node.moduleName,//需要显示的
                        children: node.children//子节点
                    }
                } 
            },
            statusData:[
                {
                    value: 0,
                    label: '停用'
                },
                {
                    value:1,
                    label: '启用'
                }
            ],
            // 下拉数据
            // 表单数据及验证
            formValidate: {
                modularCoding: '',//模块编码
                moduleName: '',//模块名称
                multilingualKey: '',//多语言Key
                superiorMenuId: '',//上级菜单
                status: 1,//启用状态
                icon: '',//图标
                routeAddress: '',//地址
                sort: '',//排序
                remarks: '1111'//备注
            },
            ruleValidate: {
                modularCoding: [
                    { required: true, message: '模块编码必填', trigger: 'blur' }
                ],
                moduleName: [
                    { required: true, message: '模块名称必填', trigger: 'blur' }
                ],
                routeAddress: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
            // 表单数据及验证
        }
    },
    watch: {
      
    },
    created(){
        this.menuData()
        this.search()
    },
    mounted(){
      
    },
    methods:{
        // 按钮事件
        btnClick(val){
            if (val==='保存') {
                this.handleSubmit()
            }else if(val==="返回"){
                this.$router.push("/menuManagement/menuManagementList/default")
            }else if(val==="取消"){
                this.formValidate={
                    modularCoding: '',//模块编码
                    moduleName: '',//模块名称
                    multilingualKey: '',//多语言Key
                    superiorMenuId: '',//上级菜单
                    status: 1,//启用状态
                    icon: '',//图标
                    routeAddress: '',//地址
                    sort: '',//排序
                    remarks: ''//备注
                }
                this.handleReset()
            }
        },
        // 按钮事件
        // 表单
        handleSubmit (name) {//提交表单
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.$axios.posts("/menuManagement/update",this.formValidate)
                        .then((res)=>{
                            this.open("保存成功")
                        })
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {//重置验证
            this.$refs.formValidate.resetFields();
        }, 
        // 获取菜单数据
        menuData(){
            this.$axios.posts("/menuManagement/GetTree",{moduleParentId: 1,skipCount: 0,   maxResultCount: 10})
                .then((res)=>{
                    this.menudatas.options=res.result.item
                })
        },
        // 获取菜单数据
        // 获取数据
        search(){
            this.$axios.gets("/menuManagement/Getitem",{id: this.$route.params.id})
                .then((res)=>{
                    this.formValidate=res.result.item
                })
        },
        // 获取数据
        open (data) {
            this.$Notice.open({
                title: data
            });
        }
    }
}
</script>
 
<style scoped lang = "less">
 .menuManagementDetail{
    height: 100%;
    overflow: auto;
    padding-top: 60px;
    box-sizing: border-box;
    .content{
        
        /* margin-top: 40px; */
    }
 }
</style>