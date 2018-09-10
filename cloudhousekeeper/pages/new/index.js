// pages/index/newPackage/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1: false,//批量寄件开关
    isMe:true,//底部按钮
    haveSend:false, //是否有寄件人信息
    isImport:false,//收件信息导入
    value2: 0,//默认包裹数量
    sendPerson:"",//默认发件人
    recipients:{},//收件人信息
    itemType:false,//物品信息
    itemTypeContext:"鞋靴"
  },
  onChange(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })

  },
  /**
   * 设置包裹数量
   */
  handleChange2({ detail }) {
    console.log(detail)
    this.setData({
      value2: detail.value
    })
  },

  handleItemtype(){
    console.log(this.data.itemType);
    if(this.data.itemType){
      this.setData({
        itemType:false
      })
    }else{
      this.setData({
        itemType:true
      })
    }
  },
  setType:function({target}){
    console.log(target.dataset.type);
    this.setData({
      itemTypeContext: target.dataset.type,
      itemType: false
    })

  },
  /**
   * 前往新建寄件人页面
   */
  toNewSend(){
    wx.navigateTo({
      url: '/package/newSend/index'
    })
  },

  /**
   * 前往收件人列表
   */
  toUser(){
    wx.navigateTo({
      url: '/package/selectUser/index'
    })
  },

  /**
   * 前往地区选择
   */
  toSelect(){
    wx.navigateTo({
      url: '/package/selectAddress/index?t=1'
    })
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
  onShow: function (data) {
    console.log(data);
    this.checkDefaultSendMessage();
    this.checkSelectAddress();
    app.globalData.newSendMessage.province = { text1: "点击选择", text2: "", text3: "", leaveType:""};//重置新建页面的省市区缓存
  },

  /**
   * 检查默认寄件人是否存在
   */
  checkDefaultSendMessage:function(){
    var defaultSendMessage = app.globalData.defaultSendMessage;
    console.log(defaultSendMessage)
    if(defaultSendMessage){
      this.setData({
        haveSend:true,
        sendPerson: defaultSendMessage
      })
    }
  },
  /**
   * 回写地址
   */
  checkSelectAddress(){
    let province = app.globalData.newSendMessage.province;
    if(province.leaveType=="1"){
      //选择地址回来
      console.log(province);
     
      let recipients = this.data.recipients;
      recipients.province = province;
      this.setData({
        recipients: recipients
      })
      console.log(this.data.recipients);
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