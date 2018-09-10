// packageMy/editPhone/editPhone.js
const { $Toast } = require('../../dist/base/index');
var interval = null; //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    disabled:false,
    time:"发送验证码",
    currentTime:60
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
  
  },
  /**倒计时 */
  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    that.setData({
      time : '('+60+')'
    })
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: '('+currentTime+')'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime:60,
          disabled: false   
        })
      }
    }, 1000)  
  },
  /**
   * 获取验证码
   */
  getVerificationCode(){
    this.getCode();
    var that = this
    that.setData({
      disabled:true
    })
  },
  /**
   * 保存修改
   */
  save(){
    $Toast({
      content: '保存中…',
      type: 'loading',
      duration: 0
    });
    setTimeout(() => {
      //console.log("我是回调");
      $Toast({
        content: '保存成功',
        type: 'success'
      });
      //跳转
      wx.navigateBack({
        delta: 1
      })
    }, 2500);
  }
})