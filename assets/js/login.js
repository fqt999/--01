$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
        //拿到密码框和确认密码框中的数值
        var pwd = $('.reg-box [name=password').val()
        if (pwd !== value) {
            return '两次密码不一致'
            }
    }
    })

    // //监听注册表单的时间
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var layer = layui.layer
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                  return layer.msg(res.message);
                }  
                // console.log('注册成功');
                layer.msg('注册成功')
                // console.log(res.token);

                $('#link_login').click()
            })
    })
    
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
  })