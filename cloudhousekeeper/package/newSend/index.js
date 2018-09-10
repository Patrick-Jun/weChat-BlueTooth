// package/newSend/index.js
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

  handleClick:function(){
    let errorContent = "未填写姓名";
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

    if (this.data.name==""){
      this.showError(errorContent);
      return;
    }
    if (this.data.tel == "" || !myreg.test(this.data.tel)){
      errorContent = "联系电话有错或未填写";
      this.showError(errorContent);
      return;
    }

    if (this.data.province == "") {
      errorContent = "请选择地区";
      this.showError(errorContent);
      return;
    }

    if (this.data.address == ""||this.data.address.length<5) {
      errorContent = "请填写正确的详细地址";
      this.showError(errorContent);
      return;
    }
  
    app.globalData.defaultSendMessage = {
      name:this.data.name,
      tel:this.data.tel,
      company: this.data.company,
      province: this.data.province,
      address: this.data.address
    };
    console.log(app.globalData.defaultSendMessage)
    wx.navigateBack();//返回上一页
  },
  nameValue: function (event){
    console.log(event);
    this.setData({
      name: event.detail.detail.value
    });
  },
  telValue: function (event) {
    console.log(event);
    this.setData({
      tel: event.detail.detail.value
    });
  },
  companyValue:function(event){
    this.setData({
      company: event.detail.detail.value
    });
  },
  provincesValue:function(event){
    this.setData({
      province: event.detail.detail.value
    });
  },
  addressValue: function (event) {
    this.setData({
      address: event.detail.detail.value
    });
  },
  openSelectAddress:function(){
    wx.navigateTo({
      url: '../selectAddress/index'
    })
  },
  showError:function(text){
    $Message({
      content: text,
      type: 'error',
      duration: 3
    });
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