// package/intelligentCopy/index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name:"",
     tel:"",
     province:"- -",
     address:"",
     searchKey:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      //key: 'VD4BZ-QH6C3-AFS3U-YRQHF-PEXY5-6PFRT' //这里自己的key秘钥进行填充
      key: 'NI7BZ-X6XWU-GUBVE-4POHY-2BU65-BSBIR'//私人
    });
  },

  /**
   * 自动识别
   */
  interlligent(event){
    console.log(event)
    var str = event.detail.value;
    //获取手机号
    var tel = str.replace(/[^0-9]/ig, " ");
    var arr = tel.split(" ");
    for(var i=0;i<arr.length;i++){
      if(parseInt(arr[i])!="NaN"){//是个数字
        if(arr[i].length>6){//大于6位数的
          if (arr[i].charAt(0) == "1") {//首位是1的
             this.setData({
               tel:arr[i].substring(0,11)
             })
             break;
          }
        }    
      }
    }
    if(this.data.tel){
      var s = str.split(this.data.tel);
      console.log("-------------");
      console.log(s);
      for(var i=0;i<s.length;i++){
        if(s[i]){//排除掉空字符串
          if (s[i].indexOf("省")!=-1 || s[i].indexOf("市")!=-1 || s[i].indexOf("区")!=-1 || s[i].indexOf("县")!=-1){
            this.setData({
              address:s[i]
            })
            this.getProvince(s[i]);
          } else {
            this.setData({
              name: s[i]
            })
          }
        }
      }
    }else{
      this.setData({
        address:str
      })
    }


    // var arr = str.split(",");
    // console.log(arr);
    // for(var i=0;i<arr.length;i++){
    //   if(arr[i]==""){
    //     return
    //   }
    //   console.log(parseInt(arr[i]))
    //   if(Number(parseInt(arr[i]))){
    //     console.log("tel")
    //     console.log(arr[i]);
    //     this.setData({
    //       tel:arr[i]
    //     })
    //   } else if (arr[i].indexOf("省") != -1 || arr[i].indexOf("市") != -1 || arr[i].indexOf("区") != -1){
    //     console.log("address")
    //     this.setData({
    //       address:arr[i]
    //     })
    //     this.getProvince(arr[i])
    //   }else{
    //     console.log("name")
    //     this.setData({
    //       name:arr[i]
    //     })
    //   }
    // }

  },
  

  getProvince(str){
    if(!this.data.searchKey){
      return
    }
    var that = this;
    qqmapsdk.getSuggestion({
      keyword:str,
      success:function(res){
        console.log(res);
        that.setData({
          searchKey:false,
          province: res.data[0].province + '-' + res.data[0].city + '-' + res.data[0].district
        })
       var t = setTimeout(function(){
          that.setData({
            searchKey:true
          })
          clearTimeout(t)
        },1000)
      },
      fail:function(res){
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
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