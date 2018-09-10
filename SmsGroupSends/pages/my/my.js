// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tips:[
       { icon: '../../images/message_set.png', title: '短信模板设置', url: '/pages/component/component',line:'' },
       { icon: '../../images/verification_set.png', title: '取件码设置', url: '/pages/setting/setnum', line: 'line2' },
       { icon: '../../images/about_our.png', title: '关于我们', url: '/pages/about/about', line: 'line' },
       { icon: '../../images/use_help_my.png', title: '使用帮助', url: '/pages/help/help', line: 'line2' }
     ],
     userInfo:'',
     telephone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    let telephone = wx.getStorageSync('telephone');
    this.setData({
      userInfo:userInfo,
      telephone: telephone
    })
  },

  link:function(item){
    console.log(item);
    wx.navigateTo ({
      url: item.currentTarget.dataset.item.url
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