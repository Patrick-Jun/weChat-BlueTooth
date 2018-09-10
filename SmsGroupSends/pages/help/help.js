// pages/about/about.js
import { WX_URL } from '../../lib/config.js'
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {

  },
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
    let that = this;
    // wx.showToast({
    //   title: 'gh'
    // })
    console.log(WX_URL + '/api/weChat/our/help');
    wx.request({
      url: WX_URL + '/api/weChat/our/help',
      method: "POST",
      success:function(data) {
        // wx.showToast({
        //   title: 1234
        // })
        console.log(data);
        console.log(data.data.data);
        // if (data.data.data != null) {
          WxParse.wxParse('article', 'html', data.data.data.useHelpManagement, that, 5);      
        // }

      },
      fail:function(e) {
        wx.showToast({
          title: 'error'
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