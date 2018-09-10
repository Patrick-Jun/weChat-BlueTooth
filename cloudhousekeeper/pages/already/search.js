// packageMy/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: false,//地区搜索
    result: true,//搜索结果
    loading: false,//搜索加载
    no_result: false,//未搜索到结果
    addrList: [],//地区搜索 列表
    addrMap: "",//搜索框内容
    clear: true,//清除按钮 隐藏
    history:[]//历史纪录
  },
  /** 搜索  监听输入框事件 */
  search(e) {
    let res = e.detail;
    console.log(res);
    if(res.value==""){
      return
    }
    //保存历史纪录
    let history = this.data.history;
    history.push(res.value);
    wx.setStorage({
      key: "alreadyHistory",
      data: history
    })

    this.setData({
      address: true,
      loading: true
    });
    setTimeout(() => {
      if (res.value == "蔡娟") {
        this.setData({
          result: false,
          loading: false,
          no_result: false
        });
      } else if (res.value == "") {
        debugger
        this.setData({
          address: false,
          result: true,
          loading: false,
          no_result: false,
          clear: true
        });
      } else {
        this.setData({
          result: true,
          loading: false,
          no_result: true
        });
      }
    }, 500);
  },
  init() {
    let _this = this;
    _this.setData({
      addrList: [
        {
          id: 1,
          className: "华东",
          children: ["山东", "江苏", "安徽", "浙江", "福建", "江西", "上海"]
        },
        {
          id: 2,
          className: "华南",
          children: ["广东", "广西", "海南"]
        },
        {
          id: 3,
          className: "华中",
          children: ["湖北", "湖南", "河南"]
        },
        {
          id: 4,
          className: "华北",
          children: ["北京", "天津", "河北", "山西", "内蒙古"]
        },
        {
          id: 5,
          className: "西北",
          children: ["宁夏", "新疆", "青海", "陕西", "甘肃"]
        },
        {
          id: 6,
          className: "西南",
          children: ["四川", "云南", "贵州", "西藏", "重庆"]
        },
        {
          id: 7,
          className: "东北",
          children: ["辽宁", "吉林", "黑龙江"]
        },
        {
          id: 8,
          className: "港澳",
          children: ["台湾", "香港", "澳门"]
        },
      ]
    });
  },
  /** 选择地区搜索 */
  selectAddr(e) {
    let cityName = e.currentTarget.dataset.name;
    this.setData({
      address: true,
      loading: true
    });
    setTimeout(() => {
      if (cityName == "上海") {
        this.setData({
          result: false,
          loading: false,
          no_result: false
        });
      } else {
        this.setData({
          result: true,
          loading: false,
          no_result: true
        });
      }
      this.setData({
        addrMap: cityName
      });
    }, 500);
  },
  /** 清除搜索框 */
  clear() {
    this.setData({
      addrMap: "",
      address: false,
      result: true,
      loading: false,
      no_result: false
    });
  },
  showClear() {
    this.setData({
      clear: false
    });
  },
  hideClear() {
    this.setData({
      clear: true
    });
  },
  /**
   * 清除历史纪录
   */
  clearHistory(){
    this.setData({
      history:[]
    });
    wx.setStorage({
      key: "alreadyHistory",
      data: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //加载历史纪录
    let that = this;
    wx.getStorage({
      key: 'alreadyHistory',
      success: function (res) {
        console.log(res.data);
        that.setData({
          history:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})