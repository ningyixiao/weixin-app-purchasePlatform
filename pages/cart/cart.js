// pages/cart/cart.js
// circle_state 0-no_selected 1-selected
Page({
	data: {
		totalPrice: 0,//购物车总价格
		select_all_state: false,//全选状态
		select_all_type: "circle",//全选圆圈样式
		exist_select: false,//用户是否勾选状态
		select_count: 0,//用户勾选的数量
		cart_length: 0,//购物车列表长度
		circle_type_arr: [],//产品的勾选圆圈样式数组(不包括全选圆圈)
		circle_state_arr: [],//产品的勾选状态数组
		pro_price_arr: [],//产品的价格数组
		pro_num_arr: [],//产品的数量数组
		pro_stock_arr: [],//产品的库存数组
		inc_style_arr: [],//产品数量加按钮样式数组
		dec_style_arr: [],//产品数量减按钮样式数组
		delete_proIdx_arr: [],//勾选的产品下标数组,用于用户删除购物车中的产品(-1表示未勾选,其它数字表示下标)
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
	set_total_price: function () {
		//计算购物车中选中产品的总价格
		var pro_num_arr = this.data.pro_num_arr;
		var circle_state_arr = this.data.circle_state_arr;
		var pro_price_arr = this.data.pro_price_arr;
		var total_price = 0;
		var length = pro_num_arr.length;
		for (var i = 0; i < length; i++) {
			//判断产品是否为选中,如果是,则累加入总价
			if (circle_state_arr[i]) {
				total_price += Math.round(parseInt(pro_num_arr[i]) * parseFloat(pro_price_arr[i]) * 100) / 100;
			}
		}
		this.setData({
			totalPrice: Math.round(total_price * 100) / 100
		});
	},
	init_data_arr: function (pro_list_obj) {
		//pro_list_obj参数来自api返回的数据对象 
		//用于页面加载时候的本地数据初始化,要在api获取的数据初始化之后调用
		//初始化这些全局变量的原因,避免对后台请求的数据对象直接操作
		var totalPrice = 0;//初始化购物车总价格
		var select_all_state = false;//初始化全选状态
		var select_all_type = "circle";//初始化全选圆圈的样式
		var exist_select = false;//初始化用户是否有勾选的状态
		var select_count = 0;//初始化用户勾选的数量
		var cart_length = pro_list_obj.length;//初始化购物车列表长度
		//以下数组需要进入for循环初始化
		var circle_type_arr = [];
		var circle_state_arr = [];
		var pro_price_arr = [];
		var pro_num_arr = [];
		var pro_stock_arr = [];
		var inc_style_arr = [];
		var dec_style_arr = [];
		var delete_proIdx_arr = [];
		for (var i = 0; i < cart_length; i++) {
			circle_type_arr[i] = "circle";
			circle_state_arr[i] = false;
			delete_proIdx_arr[i] = -1;
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
			totalPrice: totalPrice,
			select_all_state: select_all_state,
			select_all_type: select_all_type,
			exist_select: exist_select,
			select_count: select_count,
			cart_length: cart_length,
			circle_type_arr: circle_type_arr,
			circle_state_arr: circle_state_arr,
			pro_price_arr: pro_price_arr,
			pro_num_arr: pro_num_arr,
			pro_stock_arr: pro_stock_arr,
			inc_style_arr: inc_style_arr,
			dec_style_arr: dec_style_arr,
			delete_proIdx_arr: delete_proIdx_arr
		});
	},
	checkIncState: function (pro_num, pro_stock) {
		//判断产品是否超库存,返回true表示未超出,返回false表示以达到
		return (parseInt(pro_num) < parseInt(pro_stock));
	},
	checkDecState: function (zero, pro_num) {
		//判断产品是否超最低临界,返回true表示未低于,返回false表示以达到
		return (parseInt(zero) < parseInt(pro_num));
	},
	deal_delete_product: function (circle_state_arr) {
		//1.设置勾选的产品下标数组,每个产品皆对应一个数字,未勾选对应-1,其它的则对应产品的下标
		//2.设置用户是否有勾选的状态,用来控制删除产品按钮的显示
		//3.该方法在触发勾选以及全选事件处理函数中调用
		var count = 0;
		var delete_proIdx_arr = this.data.delete_proIdx_arr;
		var exist_select = this.data.exist_select;
		for (var i = 0; i < circle_state_arr.length; i++) {
			if (circle_state_arr[i]) {
				delete_proIdx_arr[i] = i;
				count++;
			} else {
				delete_proIdx_arr[i] = -1;
			}
		}
		if (count > 0) {
			exist_select = true;
		} else {
			exist_select = false;
		}
		this.setData({
			delete_proIdx_arr: delete_proIdx_arr,
			exist_select: exist_select
		});
	},
	bindIncreaseTap: function (e) {
		//产品数量加按钮点击事件处理函数
		//获取当前对应的产品下标
		var dataset = e.currentTarget.dataset;
		var index = dataset.index;
		//产品的数量数组
		var pro_num_arr = this.data.pro_num_arr;
		//产品的库存数组
		var pro_stock_arr = this.data.pro_stock_arr;
		//产品数量的最低临界
		var zero = 1;
		var inc_style_arr = this.data.inc_style_arr;
		var dec_style_arr = this.data.dec_style_arr;
		var pro_num = pro_num_arr[index];
		var pro_stock = pro_stock_arr[index];
		var inc_style = inc_style_arr[index];
		var dec_style = dec_style_arr[index];
		//如果产品数量小于产品库存,产品数量自增1
		if (parseInt(pro_num) < parseInt(pro_stock)) {
			pro_num++;
		}
		//产品数量自增操作结束后,分别对产品数量的加减操作的样式进行判断设置
		this.checkIncState(pro_num, pro_stock) ? inc_style = "enable_btn" : inc_style = "disable_btn";
		this.checkDecState(zero, pro_num) ? dec_style = "enable_btn" : dec_style = "disable_btn";
		// 将数值与状态写回
		//由于每次点击是一个产品，但是全局赋值是数组，因此得先写回局部变量数组，再通过setData写回全局变量数组
		pro_num_arr[index] = pro_num;
		inc_style_arr[index] = inc_style;
		dec_style_arr[index] = dec_style;
		this.setData({
			pro_num_arr: pro_num_arr,
			inc_style_arr: inc_style_arr,
			dec_style_arr: dec_style_arr
		});
		this.set_total_price();
	},
	bindDecreaseTap: function (e) {
		//产品数量减按钮点击事件处理函数
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
		this.set_total_price();
	},
	bindInputBlur: function (e) {
		//产品数量输入框失去焦点事件处理函数
		var dataset = e.currentTarget.dataset;
		var index = dataset.index;
		var pro_num_arr = this.data.pro_num_arr;
		var pro_stock_arr = this.data.pro_stock_arr;
		var inc_style_arr = this.data.inc_style_arr;
		var dec_style_arr = this.data.dec_style_arr;
		var pro_num = e.detail.value;
		var pro_stock = pro_stock_arr[index];
		var zero = 1;
		//如果产品数量超过库存,则将其设置为库存的量
		parseInt(pro_num) > parseInt(pro_stock) && (pro_num = pro_stock);
		//如果数量低于最小值,则将其设置为最小值
		parseInt(pro_num) < parseInt(zero) && (pro_num = zero);
		//设置产品加减按钮的样式
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
		this.set_total_price();
	},
	bindSelectTap: function (e) {
		//产品前选中圈点击事件处理函数
		var dataset = e.currentTarget.dataset;
		var index = dataset.index;
		var circle_state_arr = this.data.circle_state_arr;
		var circle_type_arr = this.data.circle_type_arr;
		var circle_state = circle_state_arr[index];
		var circle_type = circle_type_arr[index];
		var select_all_state = this.data.select_all_state;
		var select_all_type = this.data.select_all_type;
		var select_count = this.data.select_count;//用于记录选中的条数
		var cart_length = this.data.cart_length;//表示产品的总数
		// 一旦点击,state值取反
		circle_state = !circle_state;
		//判断是否选中，如果是，则设置选择圈的样式为success
		if (circle_state) {
			circle_type = "success";
			select_count++;
			if (select_count == cart_length) {
				select_all_state = true;
				select_all_type = "success";
			}
		} else {
			// 如果选择圈未被选中，则将全选状态设置为false
			circle_type = "circle";
			select_all_state = false;
			select_all_type = "circle";
			select_count--;
		}
		// 将数值与状态写回
		circle_state_arr[index] = circle_state;
		circle_type_arr[index] = circle_type;
		this.setData({
			circle_state_arr: circle_state_arr,
			circle_type_arr: circle_type_arr,
			select_all_state: select_all_state,
			select_all_type: select_all_type,
			select_count: select_count
		});
		this.set_total_price();
		this.deal_delete_product(circle_state_arr);
	},
	bindSelectAllTap: function (e) {
		//全选按钮点击事件处理函数
		var circle_state_arr = this.data.circle_state_arr;
		var circle_type_arr = this.data.circle_type_arr;
		var select_all_state = this.data.select_all_state;
		var select_all_type = this.data.select_all_type;
		var cart_length = circle_state_arr.length;//表示产品总数
		var select_count = this.data.select_count;
		// 一旦点击,全选状态取反
		select_all_state = !select_all_state;
		for (var i = 0; i < cart_length; i++) {
			circle_state_arr[i] = select_all_state;
			if (select_all_state) {
				circle_type_arr[i] = "success";
				select_all_type = "success";
				select_count = cart_length;
			} else {
				circle_type_arr[i] = "circle";
				select_all_type = "circle";
				select_count = 0;
			}
		}
		// 将数值与状态写回
		this.setData({
			select_all_state: select_all_state,
			select_all_type: select_all_type,
			circle_state_arr: circle_state_arr,
			circle_type_arr: circle_type_arr,
			select_count: select_count
		});
		this.set_total_price();
		this.deal_delete_product(circle_state_arr);
	},
	bindGoBuyTap: function () {
		wx.navigateTo({
			url: '../orderConfirm/orderConfirm',
			success: function (res) {
				// success
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
	},
	bindDeleteProTap: function (e) {
		var that = this;
		//删除购物车中的产品
		wx.showModal({
			title: "确认删除",
			content: "确认将选中的产品移出购物车",
			success: function (res) {
				if (res.confirm) {
					var pro_list_obj = that.data.cart;//获取全局的购物车中产品列表
					var delete_proIdx_arr = that.data.delete_proIdx_arr;//获取全局的删除产品的下标数组
					var cart_length = that.data.cart_length;//获取全局的购物车列表长度
					var fix_length = cart_length;//由于cart_length在之后会变化,使得下面的循环若用cart_length作为循环次数，那么次数也是会变的，这里使用fix_length作为固定的循环次数
					var offset = 0;//用于记录删除产品的个数,使得每一次得以准确删除
					for (var i = 0; i < fix_length; i++) {
						if (parseInt(delete_proIdx_arr[i]) > -1) {
							//因为每删一次,pro_list_obj[i]后面的元素下标会减少1,故使用offset
							//delete_proIdx_arr[i]存放的是需要删除的产品下标
							pro_list_obj.splice(delete_proIdx_arr[i] - offset, 1);
							cart_length--;
							console.log(delete_proIdx_arr[i] - offset);
							offset++;
						}
					}
					//由于删除结束，所有选中相关的操作都要初始化
					delete_proIdx_arr = [];
					that.setData({
						cart: pro_list_obj,
						delete_proIdx_arr: delete_proIdx_arr,
						cart_length: cart_length
					});
					//重新初始化各个数据
					that.init_data_arr(that.data.cart);
				}
			}
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