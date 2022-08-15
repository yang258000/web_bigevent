$(function() {


    var form = layui.form;

    var layer = layui.layer
    form.verify({

        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        samePwd: function(value) {

            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能和原密码一样哦~~'

            }

        },
        resPwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '请再次确认一下密码哦~'
            }
        }
    })


    //绑定提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')

                //更新密码后，重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})