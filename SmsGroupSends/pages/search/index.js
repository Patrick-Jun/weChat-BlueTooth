// pages/search/index.js
import { POST_URL, WX_URL, TAKE_CODE} from '../../lib/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['近一个月', '近一周', '近三天', '昨天', '今天'],
    





    all:false,
    items:[
      // { sendTime: '123456798', receiveTelephone: 'tel1', takeCode: 'A2001', informContent: 'a1', notifyState: '10' },
      // { sendTime: '123456797', receiveTelephone: 'tel2', takeCode: 'A2002', informContent: 'a2', notifyState: '10' },
      // { sendTime: '123456796', receiveTelephone: 'tel3', takeCode: 'A2003', informContent: 'a3', notifyState: '20' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '30' }
      // { num: '123456798' },
      // { num: '123456798' },
      // { num: '123456798' },
      // { num: '123456798' },
      // { num: '123456798' }
    ],
    iphone:'',
    takeCode:'',
    postData:[],//被选中的即将发送的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.iphone.length>10){
      this.setData({
        iphone: options.iphone
      })
      this.getListDate('POST_MONTH');
    }else{
      this.setData({
        takeCode: options.iphone
      })
      this.getListDateByCode('POST_MONTH');
    }
   
    
  },

  /**
   *  筛选条件选择
   */
  bindPickerChange:function(e){
    console.log(e.detail.value);
    let str = null;
    switch (e.detail.value){
      case '0': str = 'POST_MONTH';break;
      case '1': str = 'POST_WEEKDAY';break;
      case '2': str = 'POST_THREE';break;
      case '3': str = 'POST_YESTE';break;
      default: str = 'POST_TODAY';break;
    }
    console.log(str);
    this.setData({
      all:false
    })
    this.getListDate(str)
  },

 /**
  * 通过手机号获取列表信息
  */
  getListDate:function(n){
    console.log(POST_URL[n]);
    let iphone = wx.getStorageSync('telephone');
    let _this = this;
    wx.request({
      url: POST_URL[n] + '?receiveTelephone=' + this.data.iphone + '&telephone=' + iphone,
      method:"POST",
      success:function(data){
        console.log(data);
        if(data.data.data){
          _this.setData({
            items: data.data.data
          })
        }else{
          _this.setData({
            items: []
          })
        }
       
      },
      fail:function(err){
        console.log(err);
      }
    })
  },

  /**
   * 通过取件码获取列表信息
   */
  getListDateByCode: function (n) {
    console.log(TAKE_CODE[n]);
    let iphone = wx.getStorageSync('telephone');
    let _this = this;
    wx.request({
      url: TAKE_CODE[n] + '?telephone=' + iphone+'&takeCode='+this.data.takeCode,
      method: "POST",
      success: function (data) {
        console.log(data);
        if(data.data.data){
          _this.setData({
            items: data.data.data
          })
        } else {
          _this.setData({
            items: []
          })
        }
        
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  /**
   * 全选
   */
  selectAll:function(){
    console.log(1);
    this.setData({
      all:!this.data.all
    });
    let item = this.data.items;  
    for(let i =0;i< item.length;i++){
      item[i].checked = this.data.all;
    }
    if(this.data.all){
      this.setData({
        items: item,
        postData: this.data.items
      })
    }else{
      this.setData({
        items: item,
        postData:""
      })
    }
    console.log(this.data.postData);
  },

  /**
   * 单选
   */
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    //过滤选中的
    let arr =[];
    for(let i= 0;i<e.detail.value.length;i++){    
      arr.push(this.data.items[Number(e.detail.value[i])]);
    };
    console.log(arr);
    //设置选中的到请求参数
    this.setData({
      postData:arr
    });
    if (e.detail.value.length == this.data.items.length){
      this.setData({
        all:true
      })
    }else{
      this.setData({
        all:false
      })
    }
  },

  /**
   * 重新发送（群发）
   * 
   */
  send:function(){
    let vo = new Array();
    let userInfo = wx.getStorageSync('userInfo');
    for(var i=0;i<this.data.postData.length;i++){
      vo.push({
        "informContent": this.data.postData[i].informContent || '',
        "nickname": userInfo.nickName || '',
        "noticeTitle": this.data.postData[i].noticeTitle || '',
        "notificationType":"message",//默认短信
        "receiveTelephone": this.data.postData[i].receiveTelephone || '',
        "signature": this.data.postData[i].signature || '',
        "takeCode": this.data.postData[i].takeCode || '',
        "telephone": this.data.postData[i].telephone || '',
      })
    }

    console.log(vo);

    let _this = this;

    wx.request({
      url: WX_URL + '/api/weChat/send/message/to/people',
      method: "POST",
      data: {
        "vo": vo
          //[
          // {
          //   "informContent": "快递",//通知内容,ok
          //   "nickname": "完成",//用户昵称 ok
          //   "noticeTitle": "前门",//通知标题 no
          //   "notificationType": "message",//通知类型 ok 
          //   "receiveTelephone": "13761408513",//接受通知手机号码 ok 
          //   "signature": "韵达快递",//公司签名 no
          //   "takeCode": "A200",//取件码 ok 
          //   "telephone": "17621969696"//用户手机号码 ok 
          // }
          // }, {
          //   "informContent": "string",
          //   "nickname": "string",
          //   "noticeTitle": "string",
          //   "notificationType": "string",
          //   "receiveTelephone": "string",
          //   "signature": "string",
          //   "takeCode": "string",
          //   "telephone": "string"
          // }
         //]
      },
      success: function (body) {
        console.log(body);
        if (body.data.data == 'success'){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          _this.getListDate('POST_MONTH');//重新请求刷新页面
        }else{
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
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