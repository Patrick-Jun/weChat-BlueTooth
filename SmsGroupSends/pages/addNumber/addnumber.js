// pages/addNumber/addnumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 记录输入内容 
   */
  record:function(event){
    console.log(event.detail.value);
    let str = this.Xreplace(event.detail.value);
    console.log(str);
     this.setData({
       value:str
     })
  },
  Xreplace:function(str){
    let re = new RegExp("\\d{1,"+11+"}","g");
    let ma = str.match(re);
    return ma.join(',');
  },
  sumbit:function(event){
    console.log(this.data.value);
    let arr = this.data.value.split(',');
    console.log(arr);
    let arr2=[];
    for(let i=0;i<arr.length;i++){
      let s = arr[i].split(' ');
      console.log(s);
      arr2.push.apply(arr2,s);
      console.log(arr2);
    }
    wx.setStorageSync('notice_index', 2);//更改标识返回
    wx.setStorageSync('morePhoneNumber', arr2);
    wx.navigateBack({
      delta: 1
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