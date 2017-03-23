// pages/cart/cart.js
// circle_state 0-no_selected 1-selected
Page({
	data: {
		totalPrice: "0.00",
		circle_type_arr: [],
		circle_state_arr: [],
		pro_price_arr: [],
		pro_num_arr: [],
		pro_stock_arr: [],
		inc_style_arr: [],
		dec_style_arr: [],
		cart: [
			{
				id: "11",
				imageUrl: "../images/products/130*130.jpg",
				productDes: "商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
				price: "50.22",
				color: "黑色",
				size: "M",
				amount: "2",
				stock: "5",
				selected: false
			},
			{
				id: "22",
				imageUrl: "../images/products/150*150.jpg",
				productDes: "商品全称：［京东超市］雀巢咖啡醇品袋装1.8*20包",
				price: "50.33",
				color: "黑色",
				size: "M",
				amount: "2",
				stock: "5",
				selected: false
			}
		]
	},
	init_data_arr: function (pro_list_obj) {
		var circle_type_arr = [];
		var circle_state_arr = [];
		var pro_price_arr = [];
		var pro_num_arr = [];
		var pro_stock_arr = [];
		var inc_style_arr = [];
		var dec_style_arr = [];
		for (var i = 0; i < pro_list_obj.length; i++) {
			circle_type_arr[i] = "circle";
			circle_state_arr[i] = 0;
			// 取出产品单价，用户选择的数量和库存赋值给全局变量
			pro_price_arr[i] = pro_list_obj[i].price;
			pro_num_arr[i] = pro_list_obj[i].amount;
			pro_stock_arr[i] = pro_list_obj[i].stock;
			//判断并设置加减样式(灰色或者黑色)
			inc_style_arr[i] = "disable_btn";
			pro_num_arr[i] < pro_stock_arr[i] && (inc_style_arr[i] = "enable_btn");
			dec_style_arr[i] = "disable_btn";
			pro_num_arr[i] > 0 && (dec_style_arr[i] = "enable_btn");
		}
		this.setData({
			circle_type_arr: circle_type_arr,
			circle_state_arr: circle_state_arr,
			pro_price_arr: pro_price_arr,
			pro_num_arr: pro_num_arr,
			pro_stock_arr: pro_stock_arr,
			inc_style_arr: inc_style_arr,
			dec_style_arr: dec_style_arr
		});
	},
	checkIncState: function (pro_num, pro_stock) {
		return (parseInt(pro_num) < parseInt(pro_stock));
	},
	checkDecState: function (zero, pro_num) {
		return (parseInt(zero) < parseInt(pro_num));
	},
	bindIncreaseTap: function (e) {
		var dataset = e.currentTarget.dataset;
		var index = dataset.index;
		var pro_num_arr = this.data.pro_num_arr;
		var pro_stock_arr = this.data.pro_stock_arr;
		var zero = 1;
		var inc_style_arr = this.data.inc_style_arr;
		var dec_style_arr = this.data.dec_style_arr;
		var pro_num = pro_num_arr[index];
		var pro_stock = pro_stock_arr[index];
		var inc_style = inc_style_arr[index];
		var dec_style = dec_style_arr[index];
		if (parseInt(pro_num) < parseInt(pro_stock)) {
			pro_num++;
		}
		this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
		this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
		// 将数值与状态写回
		pro_num_arr[index] = pro_num;
		inc_style_arr[index] = inc_style;
		dec_style_arr[index] = dec_style;
		this.setData({
			pro_num_arr: pro_num_arr,
			inc_style_arr: inc_style_arr,
			dec_style_arr: dec_style_arr
		});
	},
	bindDecreaseTap: function (e) {
		var dataset = e.currentTarget.dataset;
		var index = dataset.index;
		var pro_num_arr = this.data.pro_num_arr;
		var pro_stock_arr = this.data.pro_stock_arr;
		var zero = 1;
		var inc_style_arr = this.data.inc_style_arr;
		var dec_style_arr = this.data.dec_style_arr;
		var pro_num = pro_num_arr[index];
		var pro_stock = pro_stock_arr[index];
		var inc_style = inc_style_arr[index];
		var dec_style = dec_style_arr[index];
		if (parseInt(zero) < parseInt(pro_num)) {
			pro_num--;
		}
		this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
		this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
		// 将数值与状态写回
		pro_num_arr[index] = pro_num;
		inc_style_arr[index] = inc_style;
		dec_style_arr[index] = dec_style;
		this.setData({
			pro_num_arr: pro_num_arr,
			inc_style_arr: inc_style_arr,
			dec_style_arr: dec_style_arr
		});
	},
	bindInputBlur: function (e) {
		var dataset = e.currentTarget.dataset;
		var index = dataset.index;
		var pro_num_arr = this.data.pro_num_arr;
		var pro_stock_arr = this.data.pro_stock_arr;
		var inc_style_arr = this.data.inc_style_arr;
		var dec_style_arr = this.data.dec_style_arr;
		var pro_num = e.detail.value;
		var pro_stock = pro_stock_arr[index];
		var zero = 1;
		parseInt(pro_num) > parseInt(pro_stock) && (pro_num = pro_stock);
		parseInt(pro_num) < parseInt(zero) && (pro_num = zero);
		var inc_style = inc_style_arr[index];
		var dec_style = dec_style_arr[index];
		this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
		this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
		// 将数值与状态写回
		pro_num_arr[index] = pro_num;
		inc_style_arr[index] = inc_style;
		dec_style_arr[index] = dec_style;
		this.setData({
			pro_num_arr: pro_num_arr,
			inc_style_arr: inc_style_arr,
			dec_style_arr: dec_style_arr
		});
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数
		this.init_data_arr(this.data.cart);
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