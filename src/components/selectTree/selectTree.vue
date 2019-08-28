<!--
组件官方地址vue-treeselect
https://vue-treeselect.js.org/ 
-->
<template>
   <div class="selectTree">
        <!-- multiple是否多选 -->
        <treeselect v-model="value" search-nested :multiple="selectData.multiple" :normalizer="selectData.normalizer" :options="selectData.options" />
   </div>
</template>
 
<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    name: 'selectTree',
    components: { Treeselect },
    model: {    // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
        prop: 'value',
        event: 'cc'
    },
    props:{
        data:{
            type: Object,
            default:function () {
                return {
                    options: [],
                    multiple:false,//是否多选
                    normalizer(node) {//如果拿回来的值不是这几个键，就自定义绑定一下键
                        return {
                            id: 'id',//需要v-model接收的
                            label: 'label',//需要显示的
                            children: 'children'//子节点
                        }
                    } 
                }
            }
        },
        placeholder:{
            type: String,
            default:""
        }
    },
    data () {
        return {
            // define default value
            value: null
            // define options
            
            
        }
    },
    watch: {
        value(val){
            this.$emit('cc', val)
        }
    },
    computed:{
        selectData(){
            return this.data
        }
    },
    created(){
       
    },
    mounted(){
      
    },
    methods:{

    }
}
</script>
 
<style scoped lang = "less">
 
</style>