//index.js
//获取应用实例
const {
  $Message
} = require('../../dist/base/index');
const {
  printTemplate
} = require('../../utils/blue.js');
const app = getApp()

Page({
  data: {
    haveBlueTooth: true,
    visible1: false,
    visible2: false,
    actions2: [{
        name: '测试打印',
      },
      {
        name: '设置备注',
      },
      {
        name: '模板设置（韵达76*160）'
      },
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    blueList: [],
    setNowIndex:'',
    remark: "", //暂时设置标题保存，确认后即可更改
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  handleOpen2(e) {
    console.log(e);
    this.setData({
      setNowIndex: e.target.dataset.index,
      visible2: true
    });
  },
  handleCancel1() {
    this.setData({
      visible1: false
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
        this.testPrint(action, e);
        break; //测试打印
      case 1:
        this.setRemark(action, e);
        break; //设置备注
      case 2:
        this.moduleDefault(action, e);
        break; //模板自动选择
      case 3:
        this.delBlueTooth(action, e);
        break; //删除蓝牙  
    }

  },

  /**
   * 测试打印
   */
  testPrint: function(action, e) {
    // let jsonData = app.globalData.addedBluetooth;
    let jsonData =[];
    if (wx.getStorageSync("addedBluetooth")) {
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
  setRemark: function(action, e) {
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
  //设置备注
  handleOk(e) {
    console.log(e)
    this.setData({
      visible1: false
    });
    //设置备注
    // let jsonData = app.globalData.addedBluetooth;
    if (wx.getStorageSync('addedBluetooth')) {
      let jsonData = wx.getStorageSync('addedBluetooth');
      console.log("即将设置备注的打印机信息:");
      console.log(jsonData[this.data.setNowIndex]);
      jsonData[this.data.setNowIndex].remark = this.data.remark;
      wx.setStorageSync("addedBluetooth", jsonData);
      this.setData({
        blueList: jsonData,
        remark: ""
      })
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
   * 模板自动选择
   */
  moduleDefault: function(action, e) {
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
  delBlueTooth: function(action, e) {
    let key = true;

    if (wx.getStorageSync("addedBluetooth")) {
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
        blueList: jsonData,
        visible2: false,
        actions2: action
      });
    }
  },

  //前往新建包裹
  newPack: function() {
    wx.navigateTo({
      url: '../new/index'
    })
  },
  /**
   * 跳转到下单给我
   */
  toSubmitOrder: function() {
    wx.navigateTo({
      url: '../subOrder/index'
    })
  },
  //前往电子面单
  toFaceBill: function() {
    wx.navigateTo({
      url: '/package/faceBill/index'
    })
  },
  //前往电子面单
  toAddressee:function(){
    wx.navigateTo({
      url: '../common/Addressee/index'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //智能黏贴
  toCopy() {
    wx.navigateTo({
      url: '/package/intelligentCopy/index',
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },
  onShow: function() {
    console.log(wx.getStorageSync("addedBluetooth"));
    this.setData({
      blueList: wx.getStorageSync("addedBluetooth")
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})