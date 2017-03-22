// pages/cart/cart.js
Page({
  data:{
        carts:[
      {
        id:"11",
        imageUrl:"../images/products/130*130.jpg",
        productDes:"商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
        price:"50.22",
        color:"黑色",
        size:"M",
        amount:"2",
				stock:"5",
				selected:false
      },
      {
        id:"22",
        imageUrl:"../images/products/150*150.jpg",
        productDes:"商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
        price:"50.33",
        color:"黑色",
        size:"M",
        amount:"2",
				stock:"5",
				selected:false
      }
    ],
    totalPrice:"",
		minusStatuses:[],
		plusStatuses:[],
		selectedAllStatus: false,
  },
  goBuy:function(){

  },
	checkMinusStatus:function(statuses,index,num){
			// 只有大于一件的时候，才能normal状态，否则disable状态
		var status = num <= 1 ? 'disabled' : 'normal';
		statuses[index] = status;
	},
	checkPlusStatus:function(statuses,index,num){
			// 只有小与库存数的时候，才能normal状态，否则disable状态
		var status = num >= this.data.carts[index].stock ? 'disabled' : 'normal';
		statuses[index] = status;
	},
  bindMinus: function(e) {
		var minusStatuses = this.data.minusStatuses;
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].amount;
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
	
		// 购物车数据
		var carts = this.data.carts;
		carts[index].amount=num;
		// 按钮可用状态
		this.checkMinusStatus(minusStatuses,index,num);

		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		// update database
		// carts[index].save();
		this.sum();
	},
	bindPlus: function(e) {
		var plusStatuses = this.data.plusStatuses;
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].amount;
		// 自增
		if(num < this.data.carts[index].stock){
			num ++;
		}
		

		// 购物车数据
		var carts = this.data.carts;
		carts[index].amount=num;
		// 按钮可用状态
		this.checkPlusStatus(plusStatuses,index,num);
		// 将数值与状态写回
		this.setData({
			carts: carts,
			plusStatuses: plusStatuses
		});
		// update database
		// carts[index].save();
		this.sum();
	},
	bindManual: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var carts = this.data.carts;
		var num = e.detail.value;
		carts[index].amount=num;
		// 将数值与状态写回
		this.setData({
			carts: carts
		});
		// cart[index].save();
		console.log(this.data.carts);
	},
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
		//拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var selected = this.data.carts[index].selected;
		var carts = this.data.carts;
		// 对勾选状态取反
		carts[index].selected=!selected;
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
		});
		// update database
		// carts[index].save();
		this.sum();
	},
	bindSelectAll: function() {
		// 环境中目前已选状态
		var selectedAllStatus = this.data.selectedAllStatus;
		// 取反操作
		selectedAllStatus = !selectedAllStatus;
		// 购物车数据，关键是处理selected值
		var carts = this.data.carts;
		// 遍历
		for (var i = 0; i < carts.length; i++) {
			carts[i].selected=selectedAllStatus;
			// update selected status to db
			// carts[i].save();
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			carts: carts,
		});
		this.sum();

	},
	sum: function() {
		
		var carts = this.data.carts;
		// 计算总金额
		var totalPrice = 0.00;
		for (var i = 0; i < carts.length; i++) {
			if (carts[i].selected) {
				totalPrice += carts[i].amount * carts[i].price;
			}
		}
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
			totalPrice: totalPrice
		});
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