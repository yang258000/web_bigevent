$(function() {

    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login_box').hide()

        $('.reg_box').show()
    })

    $('#link_login').on('click', function() {
        $('.login_box').show()

        $('.reg_box').hide()
    })


    // 从layui 中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数，自定义校验规则

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位,不能有空格哦~'
        ],
        // 校验两次密码是否一致
        repass: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框的内容
            // 然后进行判断
            // 如果判断失败，则return一个提示消息
            var pass = $('.reg_box [name=password]').val()
            if (pass !== value) {
                return '两次密码不一致，请再次确认密码'
            }
        }
    })

    // 给注册表单添加监听事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            //获取用户名和密码的值
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()

        }
        $.post('/api/reguser', data, function(res) {
            //判断请求状态
            if (res.status !== 0) {
                return layer.msg(res.message);

            }
            // console.log(res.message);
            layer.msg('注册成功，请登录')

            $('#link_login').click()
        })
    })

    //给登录表单监听提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
                layer.msg('登陆成功')
            }
        })
    })
})