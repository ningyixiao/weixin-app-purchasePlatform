// pages/addressManage/addressManage.js
Page({
  data: {
    current_address: "",//用户当前默认地址,需要初始化
    check_state_arr: [],//选中圈状态数组,需要初始化
    check_style_arr: [],//选中圈样式数组,需要初始化
    addr_arr_length: 0,//地址数组长度,需要初始化
    addressList: [{ state: 1, address: "阿科技护肤就是浪费卢卡斯飞机洛克菲勒卡解放了卡解放了卡积分西湖区留和路288号" }, { state: 0, address: "西湖区留和路289号" }, { state: 0, address: "西湖区留和路290号" }]
  },
  init_data: function (addrList) {
    var current_address = this.data.current_address;
    var check_state_arr = this.data.check_state_arr;
    var check_style_arr = this.data.check_style_arr;
    var addr_arr_length = addrList.length;
    var count = 0;
    for (var i = 0; i < addrList.length; i++) {
      //判断是否为默认地址
      if (addrList[i].state == 1) {
        current_address = addrList[i].address;
        check_state_arr[i] = true;
        check_style_arr[i] = "success";
        count++;
      } else {
        check_state_arr[i] = false;
        check_style_arr[i] = "circle";
      }
    }
    //默认地址状态个数为1,则回写数据
    if (count == 1) {
      this.setData({
        current_address: current_address,
        check_state_arr: check_state_arr,
        check_style_arr: check_style_arr,
        addr_arr_length: addr_arr_length
      });
    } else {
      console.log("默认地址不唯一");
    }
  },
  bindCheckBoxTap: function (e) {
    var dataset = e.currentTarget.dataset;
    var idx = dataset.idx;
    var addressList = this.data.addressList;
    var current_address = this.data.current_address;
    var check_state_arr = this.data.check_state_arr;
    var check_style_arr = this.data.check_style_arr;
    var addr_arr_length = this.data.addr_arr_length;
    for (var i = 0; i < addr_arr_length; i++) {
      check_state_arr[i] = false;
      check_style_arr[i] = "circle";
      addressList[i].state = 0;
      if (i == idx) {
        current_address = addressList[i].address;
        check_state_arr[i] = true;
        check_style_arr[i] = "success";
        addressList[i].state = 1;
      }
    }
    this.setData({
      current_address: current_address,
      check_state_arr: check_state_arr,
      check_style_arr: check_style_arr,
      addressList: addressList
    });
  },
  bindModifyTap: function (e) {
    var that = this;
    var dataset = e.currentTarget.dataset;
    var idx = dataset.idx;
    var check_state_arr = that.data.check_state_arr;
    var addressList = that.data.addressList;
    if (!check_state_arr[idx]) {
      wx.navigateTo({
        url: '../addressModify/addressModify',
        success: function(res){
          // success
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    }
  },
  bindDeleteTap: function (e) {
    var that = this;
    var dataset = e.currentTarget.dataset;
    var idx = dataset.idx;
    var check_state_arr = that.data.check_state_arr;
    var addressList = that.data.addressList;
    if (!check_state_arr[idx]) {
      wx.showModal({
        title: '删除地址',
        content: '确认要删除这一条地址吗?',
        success: function (res) {
          if (res.confirm) {
            addressList.splice(idx, 1);
            that.setData({
              addressList: addressList
            });
            that.init_data(that.data.addressList);
          }
        }
      })
    }
  },
  bindAddAddressTap:function(e){
    wx.navigateTo({
      url: '../addAddress/addAddress',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.init_data(this.data.addressList);
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