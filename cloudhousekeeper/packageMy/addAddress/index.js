// packageMy/addAddress/index.js
var app = getApp();
const { $Message } = require('../../dist/base/index');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    tel:"",
    company:"",
    province:"",
    address:""
  },
  /** 跳转到选择地区 */
  openSelectAddress:function(){
    wx.navigateTo({
      url: '../../package/selectAddress/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      //key: 'VD4BZ-QH6C3-AFS3U-YRQHF-PEXY5-6PFRT' //这里自己的key秘钥进行填充
      key:'NI7BZ-X6XWU-GUBVE-4POHY-2BU65-BSBIR'//私人
    });
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
    console.log('xxxxxxxxxx');
    console.log(app.globalData.newSendMessage.province);
    if (app.globalData.newSendMessage.name) {
      this.setData({
        name: app.globalData.newSendMessage.name,
        tel: app.globalData.newSendMessage.tel,
        address: app.globalData.newSendMessage.address,
        company: app.globalData.newSendMessage.company
      })
    }
    this.setData({
      province: app.globalData.newSendMessage.province
    })
  },
  openMap:function(){
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.getLocal(res.latitude,res.longitude);
      }
    })
  },
  /**
   * 获取当前地理位置
   */
  getLocal:function(lat,long){
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location:{
        latitude:lat,
        longitude:long
      },
      success:function(res){
        console.log(res)
        let province = {
          text1: res.result.ad_info.province,
          text2: res.result.ad_info.city,
          text3: res.result.ad_info.district
        }
        vm.setData({
          province: province
        })
      },
      fail:function(res){
        console.log(res);
      },
      complete:function(res){

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