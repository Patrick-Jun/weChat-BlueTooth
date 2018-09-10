// pages/component/component.js
import { WX_URL } from '../../lib/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      // { templateName: "橡树湾南门代收点", telephone: "11111111111", templateContent: " 您的快递到了，在橡树湾南门韵达快递，请及时 来取，取件码{取件码}，电话：18930135252 ", reviewStatus: "1", id: "3903015981288448" },
      // { templateName: "橡树湾南门代收点", telephone: "11111111111", templateContent: " 您的快递到了，在橡树湾南门韵达快递，请及时 来取，取件码{取件码}，电话：18930135252 ", reviewStatus: "0", id: "3903015981288448" }
    ],
    a: false//点击模板是否需要返回
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.a);
      if(options.a){
        this.setData({
          a:true
        })
      }else{
        this.setData({
          a:false
        })
      }
  },

  /**
   * 删除模板
   */
  del: function (e) {
    let that = this;
    let item = e.target.dataset.item;
    let index = e.target.dataset.index;
    console.log(index);
    wx.request({
      url: WX_URL + '/api/weChat/template/delect?id='+item.id,
      method: "POST",
      success: function (data) {
        if(data.data.data=='删除成功'){
          that.data.items.splice(index, 1);
          that.setData({
            items: that.data.items
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '删除失败',
            icon: 'success',
            duration: 2000
          })
        }
       
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '删除失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
 
  /**
   * 添加模板
   */
  add:function(){
    wx.navigateTo({
      url: '/pages/addcomponent/addcomponent'
    })
  },

  /**
    * 编辑模板
    */
  edit: function (e) {
   console.log(e.target.dataset.item);
    wx.navigateTo({
      url: '/pages/addcomponent/addcomponent?item=' +JSON.stringify(e.target.dataset.item)
    })
  },

  /**
   * 选择模板
   */
  choose:function(e){
    let item = e.currentTarget.dataset.item;
    console.log(item);
    console.log(this.data.a);
    if(this.data.a){
      if (item.reviewStatus==1){//审核通过才可以用
        wx.setStorageSync('notice_index', 3);//更改标识返回
        wx.setStorageSync('templet', item);
        wx.navigateBack({
          delta: 1
        })
      } else if (item.reviewStatus == 0){
        wx.showToast({
          title: '模板审核中',
          image: '/images/error.png',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '模板不可用',
          image: '/images/error.png',
          duration: 2000
        })
      }
    }

  },


  onShow: function () {
    let telephone = wx.getStorageSync('telephone');
    //telephone = '11111111111';
    let that = this;
    wx.request({
      url: WX_URL + '/api/weChat/template/select?telephone=' + telephone,
      method: "POST",
      success: function (data) {
        that.setData({
          items: data.data.data
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }

})