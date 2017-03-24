//order.js
Page({
  data: {
    userInfo:{
        phone:"18868832059"},
    orderType:[
      {
        typeCode:1,
        typeName:"全部订单",    typeIcon:"../images/fill_image/rectangle.png"},
      {
        typeCode:2,
        typeName:"待付款",    typeIcon:"../images/fill_image/rectangle.png"},
        {
        typeCode:3,
        typeName:"待发货",    typeIcon:"../images/fill_image/rectangle.png"},
        {
        typeCode:4,
        typeName:"已发货",    typeIcon:"../images/fill_image/rectangle.png"}]
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {

  }
})
