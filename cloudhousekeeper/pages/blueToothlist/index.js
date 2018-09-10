// pages/blueToothlist/index.js
const {
  connectBluetooth,
  getAllservice
} = require('../../utils/blue.js');
var app = getApp();
var temp = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices: [],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initBlueTooth()
  },

  /**
   * 初始化 - - 搜索蓝牙
   */
  initBlueTooth() {
    var that = this;
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log("-------初始化蓝牙成功----------");
        console.log(res)
        //errmsg:"功能已启用"

        wx.onBluetoothAdapterStateChange(function(res) {
          console.log("蓝牙适配器状态变化", res);
          if (!res.available) {
            that.setData({
              loading: false
            })
            wx.showModal({
              title: '提示',
              content: '连接失败：手机蓝牙未打开',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          if (!res.discovering) {
            //选中某个蓝牙后关闭搜索
            //关闭搜索提示
            that.setData({
              loading: false
            })
          }
        })

        wx.startBluetoothDevicesDiscovery({
          success: function(res) {
            console.log("开始搜索附近蓝牙设备")
            console.log(res)
            that.setData({
              loading: true
            })
          }
        })

        wx.onBluetoothDeviceFound(function(devices) {
          console.log("-----发现新设备--------" + devices.devices[0].name)
          console.log(devices)
          if (devices.devices[0].name) {
            temp.push(devices)
            that.setData({
              devices: temp
            })
          }
        })
      },
      fail: function(res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '连接失败：手机蓝牙未打开',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  /**
   * 点击链接到蓝牙的时候停止搜索
   */
  stopsearch: function() {
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        console.log("停止蓝牙搜索")
        console.log(res)
      }
    })
  },

  toConnect: function(event) {
    this.stopsearch();
    wx.showLoading({
      title: '连接打印机',
    })
    console.log("选中的deviceid:");
    console.log(event)
    connectBluetooth(event.target.dataset.device[0].deviceId, function(data) {
      console.log("回调成功");
      console.log(data);
      //获取设备service和特征值查看是否支持write,支持写入就返回  //deviceId    //serviceId     //characteristicId
      getAllservice(event.target.dataset.device[0].deviceId, function(data) {
        console.log("获取成功============");
        console.log(data);
        if (data) {
          let {
            deviceId,
            serviceId,
            characteristicId
          } = data;
          let meg = {
            name: event.target.dataset.device[0].name,
            remark: "", //备注
            defaultSet: false, //默认打印机
            deviceId: deviceId,
            serviceId: serviceId,
            characteristicId: characteristicId
          }
          var d = wx.getStorageSync("addedBluetooth");
          if (!d) {
            d = []
          };
          let key = true;
          for (var i = 0; i < d.length; i++) {
            if (d[i].name == meg.name) {
              key = false; //重复添加
            }
          }
          if (key) {
            d.unshift(meg);
          }
          wx.setStorageSync("addedBluetooth", d)
          wx.navigateTo({
            url: '/pages/blueTooth/index',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '目标设备可能不是打印机:请确认后重试',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})