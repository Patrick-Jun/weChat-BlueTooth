Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.setData({
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    });
  
    let _this = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          console.log(1);        
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo); 
              wx.redirectTo({
                url: '/pages/login/login'
              })  
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })      
            
            }
          })
        }else{                    
          console.log(2);
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    // console.log(e.detail.userInfo);
    if(e.detail.userInfo){
      try {
        wx.setStorageSync('userInfo', e.detail.userInfo);
        wx.redirectTo({
          url: '/pages/login/login'
        })
      } catch (e) {
        console.log(e);
      }     
  
    }else{
      //用户拒绝了
      // _this.setData({
      //   canIUse: true
      // }); 
    }
  }
})