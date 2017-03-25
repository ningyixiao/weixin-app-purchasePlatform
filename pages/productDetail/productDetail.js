// pages/productDetail/productDetail.js
Page({
  data: {
    devWidth: 375,//用户设备的宽度
    color_item_style_arr: [],//产品颜色单项的样式数组
    size_item_style_arr: [],//产品尺寸单项的样式数组
    imgMode: "widthFix",//图片的mode即裁剪缩放的模式,widthFix指宽度不变,高度自动变化,保持原图高宽比不变
    selected_color: "未选择",//选中的颜色文本,直接显示,方便用户知道
    selected_size: "未选择",//选中的尺寸文本,直接显示,方便用户知道
    selected_num: 0,//选中的产品数量,直接显示,方便用户知道
    dec_style: "disable_btn",//产品数量减按钮样式
    inc_style: "enable_btn",//产品数量加按钮样式
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
  init_style_arr: function (pro_obj) {
    //pro_obj是从api获取的产品对象
    //初始化全局样式数组,在获取api的数据之后调用
    var color_arr = [];
    var size_arr = [];
    //将颜色样式数组初始化为未选择
    for (var i = 0; i < pro_obj.color.length; i++) {
      color_arr[i] = "no_selected";
    }
    //将尺寸样式数组初始化为未选择
    for (var j = 0; j < pro_obj.size.length; j++) {
      size_arr[j] = "no_selected";
    }
    this.setData({
      color_item_style_arr: color_arr,
      size_item_style_arr: size_arr
    });
  },
  set_style_arr: function (arr, idx) {
    //设置颜色和尺寸的样式数组
    //该方法在颜色和尺寸点击事件处理函数中调用
    //循环先将数组全部置为未选择样式,再将选中的下标对应的数组元素设置为选中样式
    for (var i = 0; i < arr.length; i++) {
      arr[i] = "no_selected";
      i == idx && (arr[i] = "selected_style");
    }
    return arr;
  },
  checkIncState: function (pro_num, pro_stock) {
    return (pro_num < pro_stock);
  },
  checkDecState: function (zero, pro_num) {
    return (zero < pro_num);
  },
  bindColorTap: function (e) {
    var dataset = e.currentTarget.dataset;
    var idx = dataset.idx;
    var color = dataset.color;
    var color_style_arr = this.data.color_item_style_arr;
    //调用set_style_arr方法设置颜色样式数组
    color_style_arr = this.set_style_arr(color_style_arr, idx);
    //数据回写,更新视图
    this.setData({
      color_item_style_arr: color_style_arr,
      selected_color: color
    });
  },
  bindSizeTap: function (e) {
    var dataset = e.currentTarget.dataset;
    var idx = dataset.idx;
    var size = dataset.size;
    var size_style_arr = this.data.size_item_style_arr;
    //调用set_style_arr方法设置尺寸样式数组
    size_style_arr = this.set_style_arr(size_style_arr, idx);
    //数据回写,更新视图
    this.setData({
      size_item_style_arr: size_style_arr,
      selected_size: size
    });
  },
  bindIncreaseTap: function (e) {
    // 数量按钮加1操作，以及逻辑判断
    var pro_num = this.data.selected_num;
    var pro_stock = this.data.productData.stock;
    //产品最小值
    var zero = 1;
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
    //产品最小值
    var zero = 1;
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
    //获取input框用户的输入值
    var pro_num = e.detail.value;
    var pro_stock = this.data.productData.stock;
    var zero = 1;
    //如果输入的产品数量超过了产品库存,则设置为库存值
    pro_num > pro_stock && (pro_num = pro_stock);
    //如果低于最小值,则设置为最小值
    pro_num < zero && (pro_num = zero);
    //判断并设置产品数量加减按钮的样式
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
  bindGoCartTap:function(){
    wx.switchTab({
      url: '../cart/cart',
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
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          devWidth: res.windowWidth
        });
      }
    });
    that.init_style_arr(that.data.productData);
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