// pages/setting/setnum.js
import { WX_URL} from '../../lib/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefixNum:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1-','2-','3-','4-','5-','6-','7-','8-','9-','10-','11-','12-','13-','14-','15-','16-','17-','18-','19-','20-','21-','22-','23-','24-','25-','26-','27-','28-','29-','30-','31-'],
    indexPrefix:'A',
    sorting:0,//0递增，1递减,
    setNum:false,//是否设置取件码
    initialValue:200,
    show:false,
    show2:false,
    id:''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初次进入都重新获取code值
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    wx.request({
      url: WX_URL + '/api/weChat/our/select?telephone='+telephone,
      method: 'POST',
      success: function (data) {
         if(data.data.data){
            _this.setData({
              indexPrefix: data.data.data.prefix,
              sorting: Number(data.data.data.sorting),
              setNum: data.data.data.open=='1'?true:false,
              initialValue: Number(data.data.data.initialValue),
              id: data.data.data.id
            })
         }
      }
    })
  },

  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    this.setData({
      setNum: e.detail.value
    });
    this.submit();
    
  },

  /**
   * 设置选中前缀表格
   */
  setPrefix:function(event){
    console.log(event.currentTarget.dataset.status);
    this.setData({
      indexPrefix:event.currentTarget.dataset.status,
      show: false
    });
  },

  /**
   * 设置排序 
   */
  select:function(event){
    console.log(event.currentTarget.dataset.s);
    this.setData({
      sorting: Number(event.currentTarget.dataset.s),
      show2: false
    });
  },

  /**
   *  展示前缀表格 
   */
  showPre:function(){
    this.setData({
      show:true
    })
  },
  /**
  *  展示排序 
  */
  showFix: function () {
    this.setData({
      show2: true
    })
  },

  /**
   * 设置初始值
   */
  setInit:function(e){
    
    this.setData({
      initialValue:e.detail.value
    })
  },

  /**
   * 提交设置 
   */
  submit:function(){
     let _this = this;
     let telephone = wx.getStorageSync('telephone');
      wx.request({
        url: WX_URL+'/api/weChat/our/set',
        method:"POST",
        data:{
          "initialValue": _this.data.initialValue,
          "open": _this.data.setNum?"1":"0",
          "prefix": _this.data.indexPrefix,
          "sorting": _this.data.sorting,
          "telephone": telephone,
          "id":_this.data.id
        },
        success:function(data){
            if(data.data.message=='success'){
              wx.showToast({
                title: '保存成功',               
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '设置失败',
                duration: 2000
              })
            }
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