$(function() {

    //调用getUserInfo函数 获取用户信息
    getUserInfo()
    var layer = layui.layer

    $('#a_alcik_log').on('click', function() {

        //提示用户是否确认退出
        layer.confirm('确定要退出登录吗？', { icon: 3, title: '提示' }, function(index) {
            // alert('再见')
            //1.清空本地存储中的token
            localStorage.removeItem('token')
                //2.跳转到登录页面
            location.href = '/login.html'


            //这是关闭询问框
            layer.close(index);
        });

    })
})

//获取用户的信息
function getUserInfo() {

    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        //headers 请求头的配置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            //调用这个函数渲染用户的头像
            renderAvatar(res.data)
        }

        //不论请求成功还是失败，都会调用这个complete回调函数
        // complete: function(res) {
        //     // console.log('执行了complete');
        //     // console.log(res);

        //     //在complete回调函数中，使用res.responseJSON 响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}


//渲染用户的头像
function renderAvatar(user) {

    //获取用户的名称
    var uname = user.nickname || user.username

    //设置欢迎的文本
    $('#welcome').html('欢迎' + '\t' + uname)

    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('str', user_pic).show();
        $('.text_avat').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()

        //获取用户名的第一个字符串
        var first = uname[0].toUpperCase();
        //渲染到页面
        $('.text_avat').html(first).show()
    }
}