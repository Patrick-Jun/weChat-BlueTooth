// pages/state/state.js
import { SUCCESS_FAILE, USER_REPLY, POST_URL } from '../../lib/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    array: ['近一个月', '近一周', '近三天', '昨天', '今天'],
    list: [],//已发送列表

    all: false,
    items: [
      // { sendTime: '123456798', receiveTelephone: 'tel1', takeCode: 'A2001', informContent: 'a1', notifyState: '0' },
      // { sendTime: '123456797', receiveTelephone: 'tel2', takeCode: 'A2002', informContent: 'a2', notifyState: '0' },
      // { sendTime: '123456796', receiveTelephone: 'tel3', takeCode: 'A2003', informContent: 'a3', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' }
    ],//发送失败列表
    postData1: [],//被选中的即将发送的
    all2: false,
    items2: [
      // { sendTime: '123456798', receiveTelephone: 'tel1', takeCode: 'A2001', informContent: 'a1', notifyState: '0' },
      // { sendTime: '123456797', receiveTelephone: 'tel2', takeCode: 'A2002', informContent: 'a2', notifyState: '0' },
      // { sendTime: '123456796', receiveTelephone: 'tel3', takeCode: 'A2003', informContent: 'a3', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' },
      // { sendTime: '123456795', receiveTelephone: 'tel4', takeCode: 'A2004', informContent: 'a4', notifyState: '0' }
    ],//发送失败列表
    postData2: [],//被选中的即将发送的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        currentTab: Number(options.status)
      })
    }
    this.getData();
    this.getListData('POST_MONTH');
    this.getListData2('POST_MONTH');
  },
  /**
     * 滑动切换 
     */
  swiperTab: function (e) {
    let that = this;
    that.setData({
      currentTab: e.detail.current
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
   * 已发送获取列表
   */
  getData: function () {
    console.log(POST_URL.TODAY_MONTH);
    let telephone = wx.getStorageSync('telephone');
    //let telephone = '13761408513';
    let _this = this;
    wx.request({
      url: POST_URL.TODAY_MONTH + '?telephone=' + telephone,
      method: "POST",
      success: function (data) {
        console.log(data);
        _this.setData({
          list: data.data.data
        })
      }
    })
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
    this.setData({
      all:false
    })
    this.getListData(str);
  },
  /**
  * 获取发送成功列表信息
  */
  getListData: function (n) {
    console.log(SUCCESS_FAILE[n]);
   
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    console.log('%c 发送成功请求路径' + SUCCESS_FAILE[n] + '?telephone=' + telephone + '&notifyState=1', 'color:red');
    //telephone ='13761408513';
    wx.request({
      url: SUCCESS_FAILE[n] + '?telephone	=' + telephone + '&notifyState=1',
      method: "POST",
      success: function (data) {
        console.log(data);
        _this.setData({
          items: data.data.data
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 发送成功全选
   */
  selectAll: function () {
    console.log(1);
    this.setData({
      all: !this.data.all
    });
    let item = this.data.items;
    for (let i = 0; i < item.length; i++) {
      item[i].checked = this.data.all;
    }
    if (this.data.all) {
      this.setData({
        items: item,
        postData1: this.data.items
      })
    } else {
      this.setData({
        items: item,
        postData: ""
      })
    }
    console.log(this.data.postData1);
  },
  /**
 * 发送成功单选
 */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    //过滤选中的
    let arr = [];
    for (let i = 0; i < e.detail.value.length; i++) {
      arr.push(this.data.items[Number(e.detail.value[i])]);
    };
    console.log(arr);
    //设置选中的到请求参数
    this.setData({
      postData1: arr
    });
    if (e.detail.value.length == this.data.items.length) {
      this.setData({
        all: true
      })
    } else {
      this.setData({
        all: false
      })
    }
  },
  /**
 * 成功重新发送（群发）
 * 
 */
  send: function () {
    if(this.data.postData1.length<1){
      return;
    }
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
      //url: WX_URL + '/api/weChat/send/message/to/people',
      method: "POST",
      data: {
        "vo": vo
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
            image: '/images/error.png',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '失败',
          image: '/images/error.png',
          duration: 2000
        })
      }
    })
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
    this.setData({
      all2: false
    })
    console.log(str);
    this.getListData2(str);
  },
  /**
   * 获取发送失败列表信息
   */
  getListData2: function (n) {
    console.log(SUCCESS_FAILE[n]);
    
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    console.log('%c 发送成功请求路径' + SUCCESS_FAILE[n] + '?telephone=' + telephone + '&notifyState=0', 'color:red');
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
      }
    })
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
        items2: item,
        postData2: ""
      })
    }
    console.log(this.data.postData2);
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
   * 失败重新发送（群发）
   * 
   */
  send2: function () {
    if(this.data.postData2.length<1){
      return;
    }
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
      //url: WX_URL + '/api/weChat/send/message/to/people',
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
            image: '/images/error.png',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '失败',
          image: '/images/error.png',
          duration: 2000
        })
      }
    })
  },
})