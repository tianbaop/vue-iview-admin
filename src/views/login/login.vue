<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
             <Form ref="ruleForm" :model="ruleForm" :rules="rules">
                <FormItem prop="userCode">
                    <Input type="text" v-model="ruleForm.userCode" placeholder="账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="submitForm('ruleForm')">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submitForm('ruleForm')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ruleForm: {
                userCode:'',
                password: ''
            },
            rules: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                userCode: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.ruleForm.userCode=localStorage.getItem('ms_userCode');
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.logins("/login",this.ruleForm)
                        .then((res)=>{
                            this.$store.commit("setData",{key:"ms_users",value:res.result})
                            window.localStorage.removeItem("tagsList")
                            window.sessionStorage.removeItem("token")
                            var a=JSON.stringify([{"title":"系统首页","path":"/home","name":"home"}])
                            window.localStorage.setItem("tagsList",a)
                            window.sessionStorage.setItem("token",res.result.token)
                            this.$router.push('/home');
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url("../../assets/login-bg.jpg") no-repeat #fff;
        background-size: cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:24px;
        color: rgb(34, 31, 31);
        font-weight: 800;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        padding: 0 46px;
        position: absolute;
        left:50%;
        top: calc(50% + 62px);
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(157, 157, 157, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>