
Page({
  data: {
    tabs: ["全部订单", "待付款", "待发货", "已发货"],
    sliderWidth: 80,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    orderList: [
      {
        orderCode: "10001",
        totalPrice: "100.00",
        orderState: 1,
        expressOrderCode: "11111",
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
      {
        orderCode: "10002",
        totalPrice: "50.00",
        orderState: 2,
        expressOrderCode: "11112",
        productList: [
          {
            productCode: "11",
            imageUrl: "../images/products/130*130.jpg",
            productDes: "商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
            price: "50.00",
            amount: 1
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth /
            that.data.tabs.length - that.data.sliderWidth) / 2,
          sliderOffset: res.windowWidth /
          that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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