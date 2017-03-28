// pages/addressManage/addressManage.js
Page({
  data: {
    current_address: "",//用户当前默认地址,需要初始化
    addressList: [{ state: 1, address: "阿科技护肤就是浪费卢卡斯飞机洛克菲勒卡解放了卡解放了卡积分西湖区留和路288号" }, { state: 0, address: "西湖区留和路289号" }, { state: 0, address: "西湖区留和路290号" }]
  },
  init_data:function(addrList){
    var current_address = this.data.current_address;
    var count = 0;
    for(var i =0;i<addrList.length;i++){
      if(addrList[i].state==1){
        current_address = addrList[i].address;
        count++;
      }
    }
    if(count==1){
      this.setData({
        current_address:current_address
      });
    }else{
      console.log("默认地址不唯一");
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.init_data(this.data.addressList);
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