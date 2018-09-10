//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权");
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // wx.getUserInfo({
          //   success: function (res) {
          //     debugger
          //     console.log(res.userInfo);
          //     wx.setStorage({
          //       key: 'userInfo',
          //       data: res.userInfo,
          //     })
          //     // wx.redirectTo({
          //     //   url: '/pages/login/login'
          //     // })
          //   }
          // })
          // 关闭所有页面，打开到应用内的某个页面。
          // wx.switchTab({
          //   url: '/pages/home/home'
          // })
        } else {
          console.log('未授权');
          
        }
      }
    })
    // 登录
    wx.login({
      success: loginCode => {
       // console.log('loginCode');
       // console.log(loginCode);
        //调用request请求api转换登录凭证 获取 openid 
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7417e50d0f926939&secret=88d3cc129647ddc2786d25bce952fd1d&grant_type=authorization_code&js_code=' + loginCode.code,  
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            //console.log(res);
           // console.log(res.data.openid) //获取openid
            this.globalData.openid = res.data.openid;  
          },
          fail: err => {
            //console.log('login-err');
            //console.log(err);
          }
        })
      }
    }) 
          
  },
  globalData: {
    userInfo: null,
    openid:null
  }
})