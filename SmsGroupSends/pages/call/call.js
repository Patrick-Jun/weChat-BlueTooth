// pages/call/call.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:''
  },


  /**
   * 模拟输入 
   */
  keyInput:function(event){
    let code = event.currentTarget.dataset.key
    console.log(code);
    if(code!='del'){
      let str = this.data.tel + code;
      this.setData({
         tel:str
      })
    }
    if(code =='del'){
      let length = this.data.tel.length;
       console.log(length);
       let str = this.data.tel.substring(0,length-1);
       this.setData({
         tel:str
       })
    }
  },


 /**
  * 打电话
  */
  callPhone:function(){
      wx.makePhoneCall({
        phoneNumber:this.data.tel
      })
  },
  onblur:function(){
    console.log(0);
    wx.hideKeyboard();
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
  
  }
})