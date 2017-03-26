// pages/regiseter/register.js
Page({
  data: {
    verifyName: "获取验证码",
    verifyPending: false,
    input_title_arr: ["手机号", "验证码", "设置密码"],
    input_placeholder_arr: ["请输入手机号", "请输入验证码", "请设置新密码(至少6位)"]
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
  getVerifyNo: function () {
    //如果已经在获取验证码等待倒计时,那么直接返回
    if (this.data.verifyPending) return;
    // console.log("1");
    //在定时器外回写veverifyPending,为了防止用户多次点击,导致生成多个定时器
    var _this = this;
    _this.setData({
      verifyPending: true
    })
    var timer = setInterval(function () {
      var verifyName = _this.data.verifyName;
      //由于保存的获取验证码的框中的是string类型,故需要转成数字 
      if (isNaN(parseInt(verifyName))) {
        verifyName = 60;
      } else {//is number
        verifyName = parseInt(verifyName);
      }
      if (verifyName <= 0) {
        clearInterval(timer);
        _this.setData({
          verifyName: "获取验证码",
          verifyPending: false
        })
      } else {
        _this.setData({
          verifyName: --verifyName + 's',
        })
      }
    }, 1000);
    //请求api
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