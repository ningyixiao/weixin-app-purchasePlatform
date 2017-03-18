//order.js
Page({
  data: {
    userInfo:{
        phone:"18868832059"},
    orderType:[
      {
        typeName:"全部订单",    typeIcon:"../images/fill_image/rectangle.png"},
      {
        typeName:"待付款",    typeIcon:"../images/fill_image/rectangle.png"},
        {
        typeName:"待发货",    typeIcon:"../images/fill_image/rectangle.png"},
        {
        typeName:"已发货",    typeIcon:"../images/fill_image/rectangle.png"}]
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    console.log('order page');
  }
})
