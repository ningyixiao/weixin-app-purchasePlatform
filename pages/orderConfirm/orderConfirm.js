// pages/orderConfirm/orderConfirm.js
Page({
  data:{
    basic:{address_icon:"../images/icon_address.png"},
        productList:[
      {
        id:"11",
        imageUrl:"../images/products/130*130.jpg",
        productDes:"商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
        price:"50.00",
        color:"黑色",
        size:"M",
        amount:"2"
      },
      {
        id:"22",
        imageUrl:"../images/products/150*150.jpg",
        productDes:"商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
        price:"50.00",
        color:"黑色",
        size:"M",
        amount:"2"
      }
    ],
    totalPrice:"200.00",
    address:"留和路288号"
  },
  goBuy:function(){

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