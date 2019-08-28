


// window.g = { //测试环境
//     AXIOS_TIMEOUT: 15000000, //请求超时时间（过了设定的时间及为请求失败）
//     img_href:"http://testboke.tianbp.com",//图片保存的服务器域名
//     article_img_href:"http://testboke.tianbp.com/api/article_img_file.php",//文章图片上传的路径
//     baseURL : "http://testboke.tianbp.com/",//axios请求路径
//     ueditorURL:"http://testboke.tianbp.com",//富文本编辑器上传路径
// }


let globalConfig = { //测试环境
    AXIOS_TIMEOUT: 15000000, //请求超时时间（过了设定的时间及为请求失败）
    img_href:"http://testboke.tianbp.com",//图片保存的服务器域名
    article_img_href:"http://testboke.tianbp.com/api/article_img_file.php",//文章图片上传的路径
    baseURL : "http://localhost:12005/",//axios请求路径
    ueditorURL:"http://testboke.tianbp.com"//富文本编辑器上传路径
}
module.exports={
    globalConfig
}