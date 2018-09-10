// package/selectAddress/index.js
var app = getApp();
const { city } = require('../../utils/city.data-3.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList1: [],
    addressList2: [],
    addressList3: [],
    show1: true,
    show2: false,
    show3: false,
    choose1: { text:"请选择",  value: "", index: "" },
    choose2: { text: "", value: "", index: "" },
    choose3: { text: "", value: "", index: "" },
    t:"",//从新建包裹页面1，新建寄件信息页面null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------');
    console.log(options);
    let t= options.t?options.t:""; 
    console.log(city);
    let arr = [];
    for(var i=0,len=city.length;i<len;i++){
      arr.push(city[i]);
    }
    this.setData({
      addressList1: arr,
      t:t
    })
    let province = app.globalData.newSendMessage.province;
    if(province.text1){
      let num = 0;
       for(var i=0,len = city.length;i<len;i++){
         if(city[i].text==province.text1){
           this.setData({
             addressList2: city[i].children,
             choose1: { text: province.text1, value: city[i].value,index:i}
           })
           for (var j = 0, l = city[i].children.length;j<l;j++){
             if (city[i].children[j].text == province.text2 ){
               this.setData({
                 addressList3: city[i].children[j].children,
                 choose2: { text: province.text2, value: city[i].children[j].value, index: j }
               })
               for (var m = 0, n = city[i].children[j].children.length;m<n;m++){               
                 if (city[i].children[j].children[m].text == province.text3){
                   this.setData({  
                     show1: false,
                     show2: false,
                     show3: true,           
                     choose3: { text: province.text3, value: city[i].children[j].children[m].value, index: m }
                   })
                   console.log("num:"+num);
                   return
                 }
               }
             }
           }        
         }
       }
    }
  },
  querySeach:function(event){
    console.log(event.target.dataset.province);
    for(var i = 0,len = city.length;i<len;i++){
      if (event.target.dataset.province == city[i].value){
        this.setData({
          addressList2: city[i].children,
          choose1: { text: city[i].text, value: event.target.dataset.province, index: i },
          choose2: { text: "城市", value: "", index: "" },
          choose3: { text: "", value: "", index: "" },
          show1: false,
          show2: true,
          show3: false,
        })
      }
    }
  },

  choose1:function(event){
    console.log(event);
    console.log(event.currentTarget.dataset.index);
    let list = city[event.currentTarget.dataset.index].children;
    this.setData({
      addressList2:list,
      choose1: { text: event.currentTarget.dataset.text, value: event.currentTarget.dataset.value, index: event.currentTarget.dataset.index},
      choose2: { text: "城市", value: "", index: "" },
      choose3: { text: "", value: "", index: "" },
      show1:false,
      show2:true,
      show3:false
    })
  },

  choose2:function(event){
    console.log(event.currentTarget.dataset.index);
    let list = city[this.data.choose1.index].children;
    let list2 = list[event.currentTarget.dataset.index].children;
    console.log(list2);
    this.setData({
      addressList3: list2,
      choose2: { text: event.currentTarget.dataset.text, value: event.currentTarget.dataset.value, index: event.currentTarget.dataset.index},
      choose3: { text: "区县", value: "", index: "" },
      show1: false,
      show2: false,
      show3: true
    })
  },

  choose3: function (event) {
    console.log(event.currentTarget.dataset.index);  
    this.setData({
      choose3: { text: event.currentTarget.dataset.text, value: event.currentTarget.dataset.value, index: event.currentTarget.dataset.index },
      show1: false,
      show2: false,
      show3: true
    })
    app.globalData.newSendMessage.province={
      text1:this.data.choose1.text,
      text2:this.data.choose2.text,
      text3:this.data.choose3.text,
      leaveType:this.data.t
    }
    wx.navigateBack();//返回上一页
  },

  tips:function(event){
    let index = event.currentTarget.dataset.index;
    if (index == 0) {
      this.setData({
        show1: true,
        show2: false,
        show3: false
      })
      return;
    }
    if (index == 1) {
      this.setData({
        show1: false,
        show2: true,
        show3: false
      })
      return;
    }
    if (index == 2) {
      this.setData({
        show1: false,
        show2: false,
        show3: true
      })
      return;
    }    
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