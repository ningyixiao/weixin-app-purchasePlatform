//获取三级地址文件对象
var areas_js = require('../../utils/areas.js')

Page({
  data: {
    name: "",
    phone: "",
    select_state_arr: [true, true, true],//防止用户跳级选择
    selectedProvice: "",//选择的省份
    selectedCity: "",//选择的市
    selectedCounty: "",//选择的县或者区
    address: "",
    provice_arr: [],//全部省份名数组
    city_arr: [],//对应的省份包含的市名数组
    county_arr: [],//对应的市包含的县名数组
    areas: {}, //从areas.js获取到的全国省市县三级联动对象
    setDefaultAddress: false, //是否设为默认地址
    receive: {
      receiver_province: "浙江省",
      receiver_city: "杭州市",
      receiver_state: "西湖区",
      receiver_address: "留和路288号",
      receiver_mobile: "18868832059",
      receiver_name: "宁一笑",
      isdefault: 1
    } //api返回的数据
  },
  init_data: function (data) {
    //将api获取的数据赋值到local变量中
    var selectedProvice = data.receiver_province;
    var selectedCity = data.receiver_city;
    var selectedCounty = data.receiver_state;
    var address = data.receiver_address;
    var name = data.receiver_name;
    var phone = data.receiver_mobile;
    if (parseInt(data.isdefault) == 1) {
      var setDefaultAddress = true;
    } else {
      var setDefaultAddress = false;
    }
    //初始化全国三级联动对象以及省,市,县级地址名数组
    var areas = areas_js.areas;
    var provice_arr = areas_js.getProvinceNameArr(areas);
    var city_arr = areas_js.getCityNameArr(areas, selectedProvice);
    var county_arr = areas_js.getCountyNameArr(areas, selectedProvice, selectedCity);
    this.setData({
      name: name,
      phone: phone,
      selectedProvice: selectedProvice,
      selectedCity: selectedCity,
      selectedCounty: selectedCounty,
      address: address,
      provice_arr: provice_arr,
      city_arr: city_arr,
      county_arr: county_arr,
      areas: areas,
      setDefaultAddress: setDefaultAddress
    });
    console.log(this.data.areas)
  },
  bindProviceChange: function (e) {
    var areas = this.data.areas;
    var provice_arr = this.data.provice_arr;
    var index = e.detail.value;
    var selectedProvice = provice_arr[index];
    var city_arr = [];
    this.setData({
      selectedProvice: selectedProvice,
      selectedCity: "",
      selectedCounty: ""
    });
    if (this.data.selectedProvice !== "") {
      //设置省份是否点击过的状态，防止用户一进来直接点击市级或者县级
      var select_state_arr = [true, false, false];

      //初始化市级地址名数组
      city_arr = areas_js.getCityNameArr(areas, this.data.selectedProvice);
      this.setData({
        city_arr: city_arr,
        select_state_arr: select_state_arr
      });
      console.log(this.data.city_arr, this.data.select_state_arr);
    } else {
      console.log("省份未设置");
    }
  },
  bindCityChange: function (e) {
    var areas = this.data.areas;
    var city_arr = this.data.city_arr;
    var index = e.detail.value;
    var selectedCity = city_arr[index];
    var county_arr = [];
    this.setData({
      selectedCity: selectedCity,
      selectedCounty: ""
    });
    if (this.data.selectedCity !== "") {
      // 设置市是否点击过的状态，防止用户一进来直接点击县级
      var select_state_arr = this.data.select_state_arr;
      if (!select_state_arr[1]) {
        select_state_arr[1] = true;
        this.setData({
          select_state_arr: select_state_arr
        });
      }
      //初始化县级地址名数组
      county_arr = areas_js.getCountyNameArr(areas, this.data.selectedProvice, this.data.selectedCity);
      this.setData({
        county_arr: county_arr
      });
      console.log(this.data.county_arr, this.data.select_state_arr);
    } else {
      console.log("市未设置");
    }
  },
  bindCountyChange: function (e) {
    var areas = this.data.areas;
    var county_arr = this.data.county_arr;
    var index = e.detail.value;
    var selectedCounty = county_arr[index];
    this.setData({
      selectedCounty: selectedCounty
    });
  },
  bindSetDefaultAddrChange: function (e) {
    var setDefaultAddress = e.detail.value;
    this.setData({
      setDefaultAddress: setDefaultAddress
    });
  },
  bindFormSubmit: function (e) {
    var address = e.detail.value.textarea;
    wx.navigateTo({
      url: '../addressManage/addressManage',
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
    this.init_data(this.data.receive);
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