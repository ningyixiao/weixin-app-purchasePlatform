// pages/productDetail/productDetail.js
Page({
  data: {
    devWidth: 375,
    imgMode: "widthFix",
    selected_color: "未选择",
    selected_size: "未选择",
    selected_num: 0,
    dec_style: "disable_btn",
    inc_style: "enable_btn",
    productData: {
      productCode: "11",
      imageUrl: "../images/products/1024*1024.jpg",
      productDes: "商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
      color: ["红色", "绿色", "蓝色", "橘黄色", "黄色", "紫色", "白色", "黑色"],
      size: ["S", "M", "L", "XL", "XXL", "XXXL"],
      stock: 10,
      price: "50.00"
    }
  },
  checkIncState: function (pro_num, pro_stock) {
    return (pro_num < pro_stock);
  },
  checkDecState: function (zero, pro_num) {
    return (zero < pro_num);
  },
  bindIncreaseTap: function (e) {
    // 数量按钮加1操作，以及逻辑判断
    var pro_num = this.data.selected_num;
    var pro_stock = this.data.productData.stock;
    var zero = 0;
    var inc_style = "";
    var dec_style = "";
    if (pro_num < pro_stock) {
      pro_num++;
    }
    this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
    this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
    // 将数值与状态写回
    this.setData({
      selected_num: pro_num,
      inc_style: inc_style,
      dec_style: dec_style
    });
  },
  bindDecreaseTap: function (e) {
    // 数量按钮加1操作，以及逻辑判断
    var pro_num = this.data.selected_num;
    var pro_stock = this.data.productData.stock;
    var zero = 0;
    var inc_style = "";
    var dec_style = "";
    if (zero < pro_num) {
      pro_num--;
    }
    this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
    this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
    // 将数值与状态写回
    this.setData({
      selected_num: pro_num,
      inc_style: inc_style,
      dec_style: dec_style
    });
  },
  bindInputBlur: function (e) {
    var pro_num = e.detail.value;
    var pro_stock = this.data.productData.stock;
    var zero = 0;
    pro_num > pro_stock && (pro_num = pro_stock);
    pro_num < zero && (pro_num = zero);
    var inc_style = "";
    var dec_style = "";
    this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
    this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
    // 将数值与状态写回
    this.setData({
      selected_num: pro_num,
      inc_style: inc_style,
      dec_style: dec_style
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          devWidth: res.windowWidth
        });
      }
    })
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