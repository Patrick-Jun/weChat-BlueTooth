// pages/home/home.js
import { WX_URL } from '../../lib/config.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    notifyFailure:0,
    notifySuccessful:0,
    todaySend:0,
    userResponse:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 输入跳转
   */
  search:function(event){
    console.log(event.detail.value);
    wx.navigateTo({
      url: '/pages/search/index?iphone='+event.detail.value
    })
  },

  /**
     * 点击跳转到短信模板
     */
  toTemplate: function () {
    wx.navigateTo({
      url: '/pages/component/component'
    })
  },

  /**
   * 点击跳转到状态页
   */
  toStatus:function(event){
    console.log(event.currentTarget.dataset.status);
    wx.navigateTo({
      url: '/pages/state/state?status=' + event.currentTarget.dataset.status
    }) 
  },

  /**
   * 打电话
   */
  call:function(){
    // wx.makePhoneCall({
    //   phoneNumber: '18366879991' //仅为示例，并非真实的电话号码
    // })
    wx.navigateTo({
      url: '/pages/call/call'
    })
  },

  /**
   * 点击跳转到群发通知
   */
  toNotice:function(){
    wx.navigateTo({
      url:"/pages/notice/notice"
    })
  },

  /**
   * 点击跳转到使用帮助
   */
  toHelpMe:function(){
   wx.navigateTo({
     url: '/pages/help/help'
   })
    console.log('前往使用帮助');
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
    console.log(2);
    let _this = this;
    try {
      let telephone = wx.getStorageSync('telephone');
      console.log(telephone);
      //查询发送状态
      wx.request({
        url: WX_URL + '/api/weChat/send?telephone=' + telephone,
        method: "POST",
        success: function (data) {
          console.log(data);
          _this.setData({
            notifyFailure: data.data.data[0].notifyFailure,
            notifySuccessful: data.data.data[0].notifySuccessful,
            todaySend: data.data.data[0].todaySend,
            userResponse: data.data.data[0].userResponse
          })
        }
      })
    } catch (e) {
      console.log(e);
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