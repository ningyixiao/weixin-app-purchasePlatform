//order.js
Page({
  data: {
    userInfo:{
        phone:"18868832059"},
    orderType:[
      {
        typeCode:1,
        typeName:"全部订单",    typeIcon:"../images/order_icons/icon_all_orders.png"},
      {
        typeCode:2,
        typeName:"待付款",    typeIcon:"../images/order_icons/icon_pending_payment.png"},
        {
        typeCode:3,
        typeName:"待发货",    typeIcon:"../images/order_icons/icon_tobe_delivered.png"},
        {
        typeCode:4,
        typeName:"已发货",    typeIcon:"../images/order_icons/icon_shipped.png"}]
  },
  //事件处理函数
  bindGoAddrManageTap:function(e){
    wx.navigateTo({
      url: '../addressManage/addressManage',
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
  onLoad: function () {

  }
})
