// pages/login/login.js
Page({
  data: {
    
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
  formSubmit: function (e) {
    if (!e.detail.value.phoneNo.length || !e.detail.value.psw.length) {
      alterMsg("手机号或密码不能为空");
    }
  },
  alertMsg: function (str) {
    wx.showModal({
      content: str,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  }
})