// pages/login/login.js
import { WX_URL } from '../../lib/config.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    telPhone: '17621969165',
    cluntDown: {
      str: '获取验证码',
      num: 60,
      type: 0   //0可点击、灰色、可修改手机号，1可点击、白色、可修改手机号，2不可点击、白色、不可修改手机号
    },
    code: '258043',
    btnType: false
  },
  /**
   * 实时设置手机号
   */
  setTelphone: function (event) {
    this.setData({
      telPhone: event.detail.value
    });
    console.log(event.detail.value);
    console.log(this.data.telPhone);
    if (this.isPhoneAvailable(this.data.telPhone)) {
      // 验证通过可点击白色
      this.setData({
        cluntDown: {
          str: '验证码',
          type: 1
        }
      })
    } else {
      // 验证不通过通过可点击灰色
      this.setData({
        cluntDown: {
          str: '验证码',
          type: 0
        }
      })
    }
  },
  /**
   * 实时设置验证码并判断是否可以登录
   */
  setCode: function (event) {
    this.setData({
      code: event.detail.value
    })
    if (this.isCodeAvailable(event.detail.value) && this.isPhoneAvailable(this.data.telPhone)) {
      //login 按钮亮起来
      this.setData({
        btnType: true
      })
      console.log('验证通过');
      console.log(this.data.btnType);
    } else {

      this.setData({
        btnType: false
      })
      console.log('验证b通过');
      console.log(this.data.btnType);
    }
  },
  /**
   * 点击获取验证码，并校验手机号
   */
  getCode: function () {
    if (this.data.cluntDown.type==0){
       return
    }
    console.log('检验手机号格式......=>>' + this.data.telPhone);
    if (this.isPhoneAvailable(this.data.telPhone)) {
      console.log('验证通过获取验证码......');
      //↓调用接口成功后执行
      let n = 60;
      var _this = this;
      let t = setInterval(function () {
        if (n > 0) {
          n--;
          _this.setData({
            cluntDown: {
              str: n + 's',
              type: 2
            }
          })
        } else {
          _this.setData({
            cluntDown: {
              str: '验证码',
              type: 1
            }
          })
          clearTimeout(t);
        }

      }, 1000);
      //↑调用接口成功后执行
      wx.request({
        url: WX_URL + '/api/weChat/message/send/code?telephone=' + this.data.telPhone,
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
        }
      })
      console.log('获取验证码成功...');
    }
  },
  /**
   * 手机号验证
   */
  isPhoneAvailable: function (str) {
    if (str == '') {
      console.log('%c请输入手机号', 'color:red');
      return false;
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
      console.log('%c请输入正确手机号', 'color:red');
      return false;
    } else {
      return true;
    }
  },
  /**
   * 验证码格式验证
   * 
   */
  isCodeAvailable: function (str) {
    var reg = /^\d{6}\b/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 验证码登录
   * 成功后判断新老用户
   */
  userLogin: function () {

    console.log(this.data.telPhone);
    console.log(this.data.code);
    if (this.data.btnType) {
      let _this = this;
      //验证通过
      wx.request({
        url: WX_URL + '/api/weChat/message/user/login?telephone=' + this.data.telPhone + '&code=' + this.data.code,
        //url: WX_URL + '/api/weChat/message/user/login?telephone='+this.data.telPhone+'&code=618088',
        method: "POST",
        success: function (res) {

          console.log('↓后台登录接口反馈.....')
          console.log(res.data);
          if (res.data.data.loginState == 1) {
            console.log('登录成功.....')
            //此处需要验证是否有过账号，如果没有需要重新注册，有的话就不需要了
            _this.getUser(_this.isNewUser);
          } else {
            console.log('登录失败.....');
            console.log(res.data.message);
            wx.showToast({
              title: '登录失败',
              image: '/images/error.png',
              duration: 2000
            })
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '登录失败',
            image: '/images/error.png',
            duration: 2000
          })
          console.log('登录失败.....123');
          // wx.showToast({
          //   title: '成功',
          //   icon: 'success',
          //   duration: 2000
          // })     
        }
      })

    } else {
      console.log('请输入完整信息.....');
    }
  },

  /**
   * 判断是否是新用户 并跳转到首页
   * code 200 新用户  201 老用户   500 接口异常
   */
  isNewUser: function (code) {
    console.log('code:' + code);
    if (code == 200) {
      //不是新用户 -成功跳转
      // 关闭当前页面，跳转到应用内的某个页面。
      console.log('老用户跳转');
      wx.switchTab({
        url: '/pages/home/home'
      })
      return;
    }
    if (code == 201) {
      //是新用户 ->前往注册 
      console.log('新用户注册');
      this.addUser();
    }
    if (code == 500) {
      console.log('信息异常');
      //信息异常
      wx.showToast({
        title: '信息异常',
        image: '/images/error.png',
        duration: 2000
      })
      return;
    }
  },

  /**
   * 获取后台用户信息
   * return 200 老用户  
   * return 201 新用户
   * return 500 服务异常
   */
  getUser: function (callback) {
    let str = '';
    let _this = this;
    wx.request({
      url: WX_URL + '/api/weChat/user/inform?telephone=' + this.data.telPhone,
      method: "POST",
      header: {
        // 'content-type': 'application/json'
      },
      success: function (res) {
        console.log('获取后台用户信息');
        console.log(res.data);
        console.log('存储用户手机号');
        //设置user信息到本地
        wx.setStorage({
          key: 'telephone',
          data: _this.data.telPhone
        })
        if (res.data.data.telephone != null) {
          //已注册用户
          str = 200;
        } else {
          //未注册用户
          str = 201;
        }
        callback(str);
      },
      fail: function (err) {
        str = 500;
        callback(str);
      }
    });
  },

  /**
   * 给新用户注册 
   */
  addUser: function () {
    console.log('↓openid');
    console.log(getApp().globalData.openid);
    try {
      console.log('开始调用注册接口');
      let userInfo = wx.getStorageSync('userInfo');
      wx.request({
        url: WX_URL + '/api/weChat/user/add/inform',
        method: "POST",
        data: {
          "city": userInfo.city,
          "country": userInfo.country,
          "nickname": userInfo.nickName,
          "openid": getApp().globalData.openid,
          "province": userInfo.province,
          "telephone": this.data.telPhone
        },
        success: function (data) {
          console.log('注册接口返回成功');
          console.log(data);
          if (data.data.data.loginState == '1') {
            //注册成功->设置信息 -> 成功跳转
            console.log('注册接口返回success');
            wx.switchTab({
              url: '/pages/home/home'
            })
            return;
          } else {
            console.log('注册接口接口返回error');
            //注册失败
            wx.showToast({
              title: '登录失败',
              image: '/images/error.png',
              duration: 2000
            })
            return;
          }
        },
        fail: function (err) {
          console.log('注册接口接口返回error222');
          //注册失败
          wx.showToast({
            title: '登录失败',
            image: '/images/error.png',
            duration: 2000
          })
        }
      })
    } catch (e) {
      console.log('注册接口接口返回error333333');
      console.log(e);
    }



  },













  // showok: function () {
  //   wx.showToast({
  //     title: '成功',
  //     icon: 'success',
  //     duration: 2000
  //   })
  // },

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