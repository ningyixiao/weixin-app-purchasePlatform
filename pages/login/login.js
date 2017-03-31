// pages/login/login.js
Page({
  data: {

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
  },
  formSubmit: function (e) {
    var Tel = e.detail.value.Tel;
    var Pwd = e.detail.value.Pwd;
    var Loadtype = "2";
    if (!Tel.length || !Pwd.length) {
      this.alertMsg("手机号或密码不能为空");
    } else {
      wx.request({
        url: 'http://112.124.35.60:10000/QunYuOutLineServices.asmx/Login',
        data: {
          "Tel": Tel,
          "Pwd": Pwd,
          "Loadtype": Loadtype
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          // success
          console.log(res);
          wx.switchTab({
            url: '../index',
            success: function(res){
              // success
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
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
  }
})