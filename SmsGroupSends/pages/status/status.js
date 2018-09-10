// pages/status/status.js
import { SUCCESS_FAILE, USER_REPLY } from '../../lib/config.js'
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    //发送成功的参数
    array: ['近一个月', '近一周', '近三天', '昨天', '今天'],
    all1: false,
    items1: [
      // { sendTime: '123456798', receiveTelephone: 'tel1', takeCode: 'A2001', informContent: 'a1', notifyState: '10' },
      // { sendTime: '123456797', receiveTelephone: 'tel2', takeCode: 'A2002', informContent: 'a2', notifyState: '10' },
      // { sendTime: '123456796', receiveTelephone: 'tel3', takeCode: 'A2003', informContent: 'a3', notifyState: '20' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '30' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '30' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '30' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '30' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '30' }
    ],
    postData1: [],//被选中的即将发送的
    //发送成功的参数
    //发送失败的参数
    array2: ['近一个月', '近一周', '近三天', '昨天', '今天'],
    all2:false,
    items2:[
      // { sendTime: '123456798', receiveTelephone: 'tel1', takeCode: 'A2001', informContent: 'a1', notifyState: '0' },
      // { sendTime: '123456797', receiveTelephone: 'tel2', takeCode: 'A2002', informContent: 'a2', notifyState: '0' },
      // { sendTime: '123456796', receiveTelephone: 'tel3', takeCode: 'A2003', informContent: 'a3', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' }
    ],
    postData2: [],//被选中的即将发送的
    //发送失败的参数
    //用户回复的参数
    array3: ['近一个月', '近一周', '近三天', '昨天', '今天'],
    items3: [
      // { sendTime: '123456798', receiveTelephone: 'tel1', takeCode: 'A2002', informContent: 'a1', notifyState: '0' },
      // { sendTime: '123456797', receiveTelephone: 'tel2', takeCode: 'A2002', informContent: 'a2', notifyState: '0' },
      // { sendTime: '123456796', receiveTelephone: 'tel3', takeCode: 'A2003', informContent: 'a3', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options){
      this.setData({
        currentTab: Number(options.status)
      })
    }

   // this.getListData('POST_MONTH');
    //this.getListData2('POST_MONTH');
    //this.getListData3('POST_MONTH');
  },

  /**
   * 滑动切换 
   */
  swiperTab:function(e){
    let that = this;
    that.setData({
      currentTab:e.detail.current
    })
  },

  /**
   * 点击切换 
   */
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });      
    }
  },


  /**
   *  发送成功筛选条件选择
   */
  bindPickerChange: function (e) {
    console.log(e.detail.value);
    let str = null;
    switch (e.detail.value) {
      case '0': str = 'POST_MONTH'; break;
      case '1': str = 'POST_WEEKDAY'; break;
      case '2': str = 'POST_THREE'; break;
      case '3': str = 'POST_YESTE'; break;
      default: str = 'POST_TODAY'; break;
    }
    console.log(str);
    this.getListData(str);
  },
  /**
  *  发送失败筛选条件选择
  */
  bindPickerChange2: function (e) {
    console.log(e.detail.value);
    let str = null;
    switch (e.detail.value) {
      case '0': str = 'POST_MONTH'; break;
      case '1': str = 'POST_WEEKDAY'; break;
      case '2': str = 'POST_THREE'; break;
      case '3': str = 'POST_YESTE'; break;
      default: str = 'POST_TODAY'; break;
    }
    console.log(str);
    this.getListData2(str);
  },
  /**
   *  用户回复筛选条件选择
   */
  bindPickerChange3: function (e) {
    console.log(e.detail.value);
    let str = null;
    switch (e.detail.value) {
      case '0': str = 'POST_MONTH'; break;
      case '1': str = 'POST_WEEKDAY'; break;
      case '2': str = 'POST_THREE'; break;
      case '3': str = 'POST_YESTE'; break;
      default: str = 'POST_TODAY'; break;
    }
    console.log(str);
    this.getListData3(str);
  },
  /**
    * 获取发送成功列表信息
    */
  getListData: function (n) {
    console.log(SUCCESS_FAILE[n]);
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    //telephone ='13761408513';
    wx.request({
      url: SUCCESS_FAILE[n] + '?telephone	=' + telephone +'&notifyState=1',
      method: "POST",
      success: function (data) {
        console.log(data);
        _this.setData({
          items1: data.data.data
        })
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: data.data.message,
          icon:'error'
        })
      }
    })
  },
  /**
   * 获取发送失败列表信息
   */
  getListData2: function (n) {
    console.log(SUCCESS_FAILE[n]);
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    //telephone = '13761408513';
    wx.request({
      url: SUCCESS_FAILE[n] + '?telephone	=' + telephone + '&notifyState=0',
      method: "POST",
      success: function (data) {
        console.log(data);
        _this.setData({
          items2: data.data.data
        })
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: data.data.message,
          icon: 'error'
        })
      }
    })
  },
  /**
   * 获取用户回复列表信息
   */
  getListData3:function(n){
    console.log(USER_REPLY[n]);
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    //telephone = '13761408513';
    wx.request({
      url: USER_REPLY[n] + '?telephone	=' + telephone,
      method: "POST",
      success: function (data) {
        console.log(data);
        _this.setData({
          items3: data.data.data
        })
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: data.data.message,
          icon: 'error'
        })
      }
    })
  },

  /**
     * 发送成功全选
     */
  selectAll1: function () {
    console.log(1);
    this.setData({
      all1: !this.data.all1
    });
    let item = this.data.items1;
    for (let i = 0; i < item.length; i++) {
      item[i].checked = this.data.all1;
    }
    if (this.data.all1) {
      this.setData({
        items1: item,
        postData1: this.data.items1
      })
    } else {
      this.setData({
        items1: item,
        postData: ""
      })
    }
    console.log(this.data.postData1);
  },
  /**
    * 发送失败全选
    */
  selectAll2: function () {
    console.log(1);
    this.setData({
      all2: !this.data.all2
    });
    let item = this.data.items2;
    for (let i = 0; i < item.length; i++) {
      item[i].checked = this.data.all2;
    }
    if (this.data.all2) {
      this.setData({
        items2: item,
        postData2: this.data.items2
      })
    } else {
      this.setData({
        items: item,
        postData2: ""
      })
    }
    console.log(this.data.postData2);
  },

  /**
   * 发送成功单选
   */
  checkboxChange1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    //过滤选中的
    let arr = [];
    for (let i = 0; i < e.detail.value.length; i++) {
      arr.push(this.data.items1[Number(e.detail.value[i])]);
    };
    console.log(arr);
    //设置选中的到请求参数
    this.setData({
      postData1: arr
    });
    if (e.detail.value.length == this.data.items1.length) {
      this.setData({
        all1: true
      })
    } else {
      this.setData({
        all1: false
      })
    }
  },
  /**
   * 发送失败单选
   */
  checkboxChange2: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    //过滤选中的
    let arr = [];
    for (let i = 0; i < e.detail.value.length; i++) {
      arr.push(this.data.items2[Number(e.detail.value[i])]);
    };
    console.log(arr);
    //设置选中的到请求参数
    this.setData({
      postData2: arr
    });
    if (e.detail.value.length == this.data.items2.length) {
      this.setData({
        all2: true
      })
    } else {
      this.setData({
        all2: false
      })
    }
  },

  /**
   * 成功重新发送（群发）
   * 
   */
  send1: function () {
    let vo = new Array();
    let userInfo = wx.getStorageSync('userInfo');
    for (var i = 0; i < this.data.postData1.length; i++) {
      vo.push({
        "informContent": this.data.postData1[i].informContent || '',
        "nickname": userInfo.nickName || '',
        "noticeTitle": this.data.postData1[i].noticeTitle || '',
        "notificationType": "message",//默认短信
        "receiveTelephone": this.data.postData1[i].receiveTelephone || '',
        "signature": this.data.postData1[i].signature || '',
        "takeCode": this.data.postData1[i].takeCode || '',
        "telephone": this.data.postData1[i].telephone || '',
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
        if (body.data.data == 'success') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          _this.getListDate('POST_MONTH');//重新请求刷新页面
        } else {
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
   * 失败重新发送（群发）
   * 
   */
  send2: function () {
    let vo = new Array();
    let userInfo = wx.getStorageSync('userInfo');
    for (var i = 0; i < this.data.postData2.length; i++) {
      vo.push({
        "informContent": this.data.postData2[i].informContent || '',
        "nickname": userInfo.nickName || '',
        "noticeTitle": this.data.postData2[i].noticeTitle || '',
        "notificationType": "message",//默认短信
        "receiveTelephone": this.data.postData2[i].receiveTelephone || '',
        "signature": this.data.postData2[i].signature || '',
        "takeCode": this.data.postData2[i].takeCode || '',
        "telephone": this.data.postData2[i].telephone || '',
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
        if (body.data.data == 'success') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          _this.getListDate2('POST_MONTH');//重新请求刷新页面
        } else {
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