// pages/addcomponent/addcomponent.js
import { WX_URL } from '../../lib/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    numberWords:0,
    signature:'',
    templateContent:'',
    templateName:'',
    key:false,
    olditem:''//原始模板
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      if(options.item){       
        let item = JSON.parse(options.item);

        console.log(item);
        this.setData({
          olditem:item,
          key:true,
          id:item.id,
          signature: item.signature,
          templateName: item.templateName,
          templateContent: item.templateContent
        })
      }     
  },
  /**
   * 设置标题
   */
  setTitle: function(e){
    console.log(e.detail.value);
    this.setData({
      templateName: e.detail.value
    })
  },
  /**
  * 设置签名
  */
  setSign: function (e) {
    console.log(e.detail.value);
    this.setData({
      signature: e.detail.value
    })
  },
  /**
   * 插入取件码
   */
  adp:function(){
    let str = this.data.templateContent;
    str += '取件码{取件码},';
    this.setData({
      templateContent:str
    })
  },
  /**
   * 统计字数，并存储模板
   */
  count:function(e){
    console.log(e);
    let str = e.detail.value;
    let length = e.detail.value.length;
    this.setData({
      templateContent:str,
      numberWords:length
    })
  },
  /**
   * 保存模板
   */
  save:function(){
    let that = this;
    let templateContent = this.data.templateContent;
    let templateName = this.data.templateName;
    let signature = this.data.signature;
    let telephone = wx.getStorageSync("telephone");
    if(!templateContent||!templateName||!signature){
      wx.showToast({
        title: '请填写完整信息',
        // icon: 'success',
        icon:"",
        duration: 2000
      })
      return;
    }
    if (!this.data.key){
      wx.request({
        url: WX_URL + '/api/weChat/template/add',
        method: "POST",
        data: {
          id: '',
          signature: that.data.signature,
          telephone: telephone,
          templateContent: that.data.templateContent,
          templateName: that.data.templateName,
        },
        success: function (data) {
          if (data.data.data == '添加成功') {
            wx.showToast({
              title: '保存成功',
              // icon: 'success',
              icon: "",
              duration: 2000
            });

            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2100);
            return;
          } else {
            wx.showToast({
              title: '保存失败',
              // icon: 'success',
              icon: "",
              duration: 2000
            })
            return;
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '保存失败',
            // icon: 'success',
            icon: "",
            duration: 2000
          })
          return;
        }
      })
    }else{
      if (that.data.signature != that.data.olditem.signature || that.data.templateContent != that.data.olditem.templateContent || that.data.templateName != that.data.olditem.templateName){
        //修改过了
        wx.request({
          url: WX_URL + '/api/weChat/template/update?id=' + that.data.id,
          method: "POST",
          data: {
            signature: that.data.signature,
            telephone: telephone,
            templateContent: that.data.templateContent,
            templateName: that.data.templateName,
          },
          success: function (data) {
            if (data.data.data == '修改成功') {
              wx.showToast({
                title: '修改成功',
                // icon: 'success',
                icon: "",
                duration: 2000
              });

              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2100);
              return;
            } else {
              wx.showToast({
                title: '修改失败',
                // icon: 'success',
                icon: "",
                duration: 2000
              })
              return;
            }
          },
          fail: function (err) {
            wx.showToast({
              title: '修改失败',
              // icon: 'success',
              icon: "",
              duration: 2000
            })
            return;
          }
        })
      }else{
        wx.showToast({
          title: '未修改',
          // icon: 'success',
          icon: "",
          duration: 2000
        })
      }
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