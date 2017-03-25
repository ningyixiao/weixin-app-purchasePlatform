Page({
    data: {
        customize_position_arr: [],
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
    init_data_arr: function () {
        var customize_position_arr = [];
        var temp = [];
        var list = this.data.list;
        var length = list.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < list[i].childList.length; j++) {
                temp[j] = "no_style"
            }
            customize_position_arr[i] = temp;
        }
        this.setData({
            customize_position_arr: customize_position_arr
        });
    },
    kindToggle: function (e) {
        var customize_position_arr = this.data.customize_position_arr;
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                for (var j = 0, len = list[i].childList.length; j < len; ++j) {
                    if (list[i].childList[j].id == id) {
                        list[i].childList[j].open = !list[i].childList[j].open;
                        customize_position_arr[i][j] = "customize_position";
                    } else {
                        list[i].childList[j].open = false;
                        customize_position_arr[i][j] = "no_style";
                    }
                }
                // list[i].open = false
            }
        }
        this.setData({
            list: list,
            customize_position_arr: customize_position_arr
        });
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.init_data_arr();
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