// pages/blueTooth/index.js
var app = getApp();
const { printTemplate } = require('../../utils/blue.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    visible2: false,
    actions2: [{
      name: '设为默认打印机',
    },
    {
      name: '测试打印',
    },
    {
      name: '设置备注'
    }, {
      name: "模板自动选择"
    },
    {
      name: '删除',
      color: '#ed3f14'
    }
    ],
    hasBlueTooth: false,
    list: [],

    //当前设置蓝牙信息
    setNowIndex: "",
    remark: "", //暂时设置标题保存，确认后即可更改

  },


  toSearch() {
    wx.navigateTo({
      url: "../blueToothlist/index",
    })
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleClose1(e) {
    console.log(e)
    this.setData({
      visible1: false
    });
  },
  //设置备注
  handleOk(e) {
    console.log(e)
    this.setData({
      visible1: false
    });
    //设置备注
    // let jsonData = app.globalData.addedBluetooth;
    if (wx.getStorageSync('addedBluetooth')){
      let jsonData = wx.getStorageSync('addedBluetooth');
      console.log("即将设置备注的打印机信息:");
      console.log(jsonData[this.data.setNowIndex]);
      jsonData[this.data.setNowIndex].remark = this.data.remark;
      wx.setStorageSync("addedBluetooth", jsonData);
      this.setData({
        list: jsonData,
        remark: ""
      })
    }  
  },
  handleOpen2(e) {
    console.log(e);
    this.setData({
      setNowIndex: e.target.dataset.index,
      visible2: true
    });
  },
  handleCancel2() {
    this.setData({
      visible2: false
    });
  },
  handleClickItem2(e) {
    console.log(e);
    const action = [...this.data.actions2];
    action[e.detail.index].loading = true;

    this.setData({
      actions2: action
    });

    switch (e.detail.index) {
      case 0:
        this.setDefault(action, e);
        break; //设置成默认打印机
      case 1:
        this.testPrint(action, e);
        break; //测试打印
      case 2:
        this.setRemark(action, e);
        break; //设置备注
      case 3:
        this.moduleDefault(action, e);
        break; //模板自动选择
      case 4:
        this.delBlueTooth(action, e);
        break; //删除蓝牙
    }
  },
  //实时存储输入的备注
  setName: function (e) {
    console.log(e);
    this.setData({
      remark: e.detail.value
    })
  },


  /**
   * 设置默认打印机
   */
  setDefault: function (action, e) {
    let jsonData = [];
    if (wx.getStorageSync('addedBluetooth')) {
       jsonData = wx.getStorageSync('addedBluetooth');    
    }
   
    console.log(jsonData);
    console.log("即将设置成默认打印机的信息:");
    console.log(jsonData[this.data.setNowIndex]);
    for (var i = 0; i < jsonData.length; i++) {
      jsonData[i].defaultSet = false;
    }
    jsonData[this.data.setNowIndex].defaultSet = true;
    // app.globalData.addedBluetooth = jsonData;
    wx.setStorageSync("addedBluetooth", jsonData);
    this.setData({
      list: jsonData
    })

   
    console.log(jsonData);
    action[e.detail.index].loading = false;
    this.setData({
      visible2: false,
      actions2: action
    });
  },
  /**
   * 测试打印
   */
  testPrint: function (action, e) {
    // let jsonData = app.globalData.addedBluetooth;
    let jsonData = [];

    if(wx.getStorageSync("addedBluetooth")){
      jsonData = wx.getStorageSync("addedBluetooth");
    }
    action[e.detail.index].loading = false;
    console.log("即将测试的打印机的信息:");
    console.log(jsonData[this.data.setNowIndex]);
    let deviceId = jsonData[this.data.setNowIndex].deviceId,
      serviceId = jsonData[this.data.setNowIndex].serviceId,
      characteristicId = jsonData[this.data.setNowIndex].characteristicId;
    printTemplate(deviceId, serviceId, characteristicId);
    setTimeout(() => {
      this.setData({
        visible2: false,
        actions2: action
      });
    }, 2000);
  },

  /**
   * 设置备注
   */
  setRemark: function (action, e) {
    let that = this;

    // jsonData[this.data.setNowIndex].remark;
    action[e.detail.index].loading = false;
    this.setData({
      visible2: false,
      actions2: action
    });
    setTimeout(() => {
      that.handleOpen1();
    }, 500);


  },
  /**
   * 模板自动选择
   */
  moduleDefault: function (action, e) {
    action[e.detail.index].loading = false;
    setTimeout(() => {
      this.setData({
        visible2: false,
        actions2: action
      });
    }, 2000);
  },
  /**
   * 删除
   */
  delBlueTooth: function (action, e) {
    let key = true;
   
    if (wx.getStorageSync("addedBluetooth")){
      let jsonData = wx.getStorageSync("addedBluetooth");
      console.log(jsonData);
      action[e.detail.index].loading = false;
      console.log("即将删除的打印机的信息:");
      console.log(jsonData[this.data.setNowIndex]);
      jsonData.splice(this.data.setNowIndex, 1);
      if (jsonData.length < 1) {
        key = false;
      }
      // app.globalData.addedBluetooth = jsonData;
      wx.setStorageSync("addedBluetooth", jsonData)

      this.setData({
        hasBlueTooth: key,
        list: jsonData,
        visible2: false,
        actions2: action
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // console.log(app.globalData.addedBluetooth);
    // let jsonData = app.globalData.addedBluetooth;
    let jsonData = wx.getStorageSync("addedBluetooth");
    if (jsonData.length > 0) {
      console.log('----')
      this.setData({
        hasBlueTooth: true,
        list: jsonData
      })
    }
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