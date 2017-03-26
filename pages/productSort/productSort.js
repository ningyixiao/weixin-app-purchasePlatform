Page({
    data: {
        customize_position_arr: [],//每一个二级菜单右侧小箭头的样式数组
        firstMenu_openState_arr: [],//一级菜单的打开状态数组
        secondMenu_openState_arr: [],//二级菜单的打开状态数组
        list: [
            {
                id: '1',
                name: '卫衣',
                open: false,
                childList: [
                    {
                        id: '12',
                        name: '200克卫衣',
                        open: false,
                        pages: [
                            '200克方领短款卫衣', '200克圆领短款卫衣', '200克圆领长款卫衣', '200克方领长款卫衣'
                        ]
                    },
                    {
                        id: '11',
                        name: '100克卫衣',
                        open: false,
                        pages: [
                            '100克方领短款卫衣', '100克圆领短款卫衣', '100克圆领长款卫衣', '100克方领长款卫衣'
                        ]
                    },
                    {
                        id: '13',
                        name: '300克卫衣',
                        open: false,
                        pages: [
                            '300克方领短款卫衣', '300克圆领短款卫衣', '300克圆领长款卫衣', '300克方领长款卫衣'
                        ]
                    }
                ]

            },
            {
                id: '2',
                name: '短袖',
                open: false,
                childList: [
                    {
                        id: '22',
                        name: '200克短袖',
                        open: false,
                        pages: [
                            '200克方领短款短袖', '200克圆领短款短袖', '200克圆领长款短袖', '200克方领长款短袖'
                        ]
                    },
                    {
                        id: '21',
                        name: '100克短袖',
                        open: false,
                        pages: [
                            '100克方领短款短袖', '100克圆领短款短袖', '100克圆领长款短袖', '100克方领长款短袖'
                        ]
                    },
                    {
                        id: '23',
                        name: '300克短袖',
                        open: false,
                        pages: [
                            '300克方领短款短袖', '300克圆领短款短袖', '300克圆领长款短袖', '300克方领长款短袖'
                        ]
                    }
                ]

            },
            {
                id: '3',
                name: '长袖',
                open: false,
                childList: [
                    {
                        id: '32',
                        name: '200克长袖',
                        open: false,
                        pages: [
                            '200克方领短款长袖', '200克圆领短款长袖', '200克圆领长款长袖', '200克方领长款长袖'
                        ]
                    },
                    {
                        id: '31',
                        name: '100克长袖',
                        open: false,
                        pages: [
                            '100克方领短款长袖', '100克圆领短款长袖', '100克圆领长款长袖', '100克方领长款长袖'
                        ]
                    },
                    {
                        id: '33',
                        name: '300克长袖',
                        open: false,
                        pages: [
                            '300克方领短款长袖', '300克圆领短款长袖', '300克圆领长款长袖', '300克方领长款长袖'
                        ]
                    }
                ]

            }

        ]
    },
    init_data_arr: function (all_list) {
        //初始化全部的二维数组
        var customize_position_arr = [];
        var firstMenu_openState_arr = [];
        var secondMenu_openState_arr = [];
        var list = all_list;//all_list指api返回的产品列表数据
        var length = list.length;//列表中一级列表的数量
        for (var i = 0; i < length; i++) {
            firstMenu_openState_arr[i] = false;//初始化一级菜单的打开状态数组
            var temp = [];
            var temp1 = [];
            for (var j = 0; j < list[i].childList.length; j++) {
                temp[j] = "no_style";
                temp1[j] = false;
            }
            customize_position_arr[i] = temp;//初始化每一个二级菜单右侧小箭头的样式数组
            secondMenu_openState_arr[i] = temp1;//初始化二级菜单的打开状态数组
        }
        this.setData({
            customize_position_arr: customize_position_arr,
            firstMenu_openState_arr: firstMenu_openState_arr,
            secondMenu_openState_arr: secondMenu_openState_arr
        });
    },
    close_other_firstMenu: function (arr, i) {
        //关闭除了正在打开的其它同级二级菜单
        var length = arr.length;
        for (var k = 0; k < length; k++) {
            k != i && (arr[k] = false);
        }
        return arr;
    },
    close_other_secondMenu: function (arr, i, j) {
        //关闭除了正在打开的其它同级二级菜单并将二级菜单右侧的小箭头样式改成no_style
        var customize_position_arr = this.data.customize_position_arr;
        var length = arr[i].length;
        for (var k = 0; k < length; k++) {
            if (k != j) {
                arr[i][k] == true && (customize_position_arr[i][k] = "no_style");
                arr[i][k] = false;
            }
        }
        this.setData({
            customize_position_arr: customize_position_arr
        });
        return arr;
    },
    kindToggle: function (e) {
        var customize_position_arr = this.data.customize_position_arr;
        var firstMenu_openState_arr = this.data.firstMenu_openState_arr;
        var secondMenu_openState_arr = this.data.secondMenu_openState_arr;
        var list = this.data.list;//api返回的产品列表数据
        var id = e.currentTarget.id;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                firstMenu_openState_arr[i] = !firstMenu_openState_arr[i];
                //判断一级菜单是否为打开状态,若是,则要将同一级的其它关闭
                if (firstMenu_openState_arr[i]) {
                    firstMenu_openState_arr = this.close_other_firstMenu(firstMenu_openState_arr, i);
                }
                break;
            }
            for (var j = 0, len = list[i].childList.length; j < len; ++j) {
                if (list[i].childList[j].id == id) {
                    secondMenu_openState_arr[i][j] = !secondMenu_openState_arr[i][j];
                    //判断二级菜单是否为打开状态,若是,则要将同一级的其它关闭
                    if (secondMenu_openState_arr[i][j]) {
                        secondMenu_openState_arr = this.close_other_secondMenu(secondMenu_openState_arr, i, j);
                    }
                    if (customize_position_arr[i][j] == "no_style") {
                        customize_position_arr[i][j] = "customize_position";
                        console.log(customize_position_arr);
                    } else {
                        customize_position_arr[i][j] = "no_style";
                    }
                    break;
                }
            }
        }
        this.setData({
            customize_position_arr: customize_position_arr,
            firstMenu_openState_arr: firstMenu_openState_arr,
            secondMenu_openState_arr: secondMenu_openState_arr
        });
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.init_data_arr(this.data.list);
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
});
