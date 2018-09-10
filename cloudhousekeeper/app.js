//app.js
import bluetooth from '/utils/bluetoothObfuscated.js';
import util from '/utils/util.js';
import pos from '/utils/pos.js';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    defaultSendMessage:null,//默认寄件人信息
    newSendMessage: {//新建寄件人信息(编辑回写)
      name:"",
      tel:"",
      company:"",
      province:"",
      address:""
    },
    addedBluetooth:[
      {
        name: "111",
        remark: "beizhi",//备注
        defaultSet: true,//默认打印机
        deviceId: "deviceId",
        serviceId: "serviceId",
        characteristicId: "characteristicId"
      }
    ]
  },
  onShow: function (options) {
    console.log("Path: " + options.path)
    console.log("Path: " + options.query)
    console.log("Path: " + options.scene)
  }
})