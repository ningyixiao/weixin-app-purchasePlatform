// pages/regiseter/register.js
Page({
  data: {
    verifyName: "获取验证码",
    verifyPending: false,
    input_title_arr: ["手机号","原密码", "新密码"],
    input_placeholder_arr: ["请输入手机号", "请输入原密码", "请输入新密码(至少6位)"]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  userInputVerify: function (input_arr) {
    //传入用户输入数据数组
  },
  formSubmit: function (e) {
    if (e.detail.value.phoneNo.length != 11) {
      alterMsg("手机号码长度必须为11位！");
    }
    else if (e.detail.value.psw.length < 6) {
      alterMsg("密码长度必须大于5位！");
    }
    else if (e.detail.value.psw != e.detail.value.pswConfirm) {
      alterMsg("两次输入的密码不同！");
    } else {

    }
  }

});
function alterMsg(str) {
  wx.showModal({
    content: str,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        
      }
    }
  });
};