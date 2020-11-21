$(function(){
    //调用getUserInfo函数获取用户信息
    getUserInfo()

    var layer = layui.layer
    //退出
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录？',{icon:3,title:'提示'},function(index){
            //清楚token缓存
            localStorage.removeItem('token')
            //跳转到登录页
            location.href='/login.html'
            //关闭confirm询问框
            layer.close(index)
        })
    })
})
//获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'my/userinfo',
        //请求头
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar函数渲染用户头像
            renderAvatar(res.data)
        }
    })
}
//渲染用户头像
function renderAvatar(user){
    //获取用户名称
    var name =user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_piv).show()
        $('.text-avatar').hide()
    }else{
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
    }

}