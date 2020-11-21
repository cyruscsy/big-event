$(function () {
  //去登录
  $("#link_login").on("click", function () {
    $("#form_reg [name=username]").val("");
    $("#form_reg [name=password]").val("");
    $("#form_reg [name=repassword]").val("");
    $(".reg-box").hide();
    $(".login-box").show();
  });
  //去注册
  $("#link_reg").on("click", function () {
    $("#form_login [name=username]").val("");
    $("#form_login [name=password]").val("");
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify()自定义校验规则
  form.verify({
    //校验密码6-12位
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //校验密码是否一致
    repwd: function (value) {
      //通过形参拿到上面密码框的值
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });

  //表单提交事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    //发起Ajax的POST请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录！");
      $("#form_reg [name=username]").val("");
      $("#form_reg [name=password]").val("");
      $("#form_reg [name=repassword]").val("");
      // 模拟人的点击行为
      $("#link_login").click();
    });
  });

  //表单登录事件
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    //发起Ajax的POST请求
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("登录成功！");
        $("#form_login [name=username]").val("");
        $("#form_login [name=password]").val("");
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem("token", res.token);
        // 跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
});
