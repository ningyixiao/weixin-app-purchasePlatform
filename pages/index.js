//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    description: {
      appName: "小程序名",
      content: "WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。"
    },
    funcType: [
      {
        typeId: "Buy",
        typeName: "产品购买",
        typeIcon: "images/icon_nav_cart.png",
        linkIcon: "images/icon_chevron_black.png"
      },
      {
        typeId: "Order",
        typeName: "订单查询",
        typeIcon: "images/icon_nav_search.png",
        linkIcon: "images/icon_chevron_black.png"
      },
      {
        typeId: "Stock",
        typeName: "库存查询",
        typeIcon: "images/icon_stock_search.png",
        linkIcon: "images/icon_chevron_black.png"
      }
    ]
  },
  //事件处理函数
  bindBuyTap: function (e) {
    wx.navigateTo({
      url: "productSort/productSort"
    })
  },
  bindOrderTap: function (e) {
    wx.switchTab({
      url: "order/order"
    })
  },
  bindStockTap:function(e){
    wx.navigateTo({
      url: 'stockSort/stockSort'
    })
  },
  onLoad: function () {

  }
})
