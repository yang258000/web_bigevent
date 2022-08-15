$(function() {

    var form = layui.form;

    var layer = layui.layer
    form.verify({

        //设置用户的昵称限制
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1 ~ 6位之间哦~~'
            }
        }
    })

    initUserInfo()
        //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败 ')
                }
                console.log(res);

                //调用form.val() 函数 给表单赋值
                form.val('formUserInfo', res.data)

            }

        })
    }


    //重置表单的数据
    $('#btnReset').on('click', function(e) {

        //先阻止按钮的默认重置
        e.preventDefault()

        //还原用户初始的信息
        initUserInfo()

    })


    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {

        //阻止表单的默认提交行为
        e.preventDefault()

        //发起ajax请求数据
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                console.log(res);
                layer.msg('更新用户信息成功');

                //调用父页面中的方法，（index里面的getUserInfo）,重新渲染用户的头像和用户信息；
                console.log(res);
                window.parent.getUserInfo()
            }
        })
    })

})