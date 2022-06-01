$(function () {
    getUserInfo()
    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' },
            function (index) {
                //清空本地存储中的token  
                localStorage.removeItem('token')                
                //重新跳转到登录页面
                location.href = '/login.html'
                //关闭cofirm询问框
            layer.close(index);
          });
    })
})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //请求头配置对象
        headers: {
            Authorization:localStorage.getItem('token')||''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
              // 调用 renderAvatar 渲染用户的头像
              renderAvatar(res.data)
            // console.log(res);
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
    
    })      
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
      // 3.1 渲染图片头像
      $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
      $('.text-avatar').hide()
    } else {
      // 3.2 渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()
      $('.text-avatar')
        .html(first)
        .show()
    }
  }

