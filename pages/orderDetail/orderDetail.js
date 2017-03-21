// pages/orderDetail/orderDetail.js
Page({
  data:{
    orderCode:10001,
    orderState:4,
    orderTime:"2017-03-03 12:00:00",
    totalPrice:"100.00",
    name:"宁一笑",
    address:"浙江省杭州市西湖区留和路288号",
    productList: [
          {
            productCode: "11",
            imageUrl: "../images/products/130*130.jpg",
            productDes: "商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
            price: "50.00",
            amount: 1
          },
          {
            productCode: "22",
            imageUrl: "../images/products/150*150.jpg",
            productDes: "商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
            price: "50.00",
            amount: 1
          }
        ]
  },
  bindApplyRefundTap:function(){
    wx.navigateTo({
      url: '../applyRefund/applyRefund',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bindOrderTraceTap:function(){
    wx.navigateTo({
      url: '../orderTrace/orderTrace',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})