// pages/about/about.js
import { WX_URL } from '../../lib/config.js'
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
   
  },
  onLoad: function (options) {
     let that = this;
      wx.request({
        url: WX_URL +'/api/weChat/our/about',
        method:"POST",
        success:(data)=>{
          console.log(data);     
          console.log(data.data.data.aboutOurManagement);
          if(data.data.data!=null){
            WxParse.wxParse('article', 'html', data.data.data.aboutOurManagement, that, 5);
          }         
        }
      })
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