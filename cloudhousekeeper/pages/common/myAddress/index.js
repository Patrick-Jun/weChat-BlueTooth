// packageMy/myAddress/index.js
// const { cities } = require("./city")
import { cities } from './city';
const { $Message } = require('../../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cities : [],
    visible: false,
    actions: [
      {
        name: '设为默认',
      },
      {
        name: '编辑'
      },
      {
        name: '复制'
      },
      {
        name: '删除',
        color:'#FB2430'
      }
    ],
    spinShow:true,//加载动画
    showBatch:true,//radio 显示/隐藏
  },
  /**
   * 打开选项
   */
  openSelect(){
    this.setData({
      visible: true
    });
  },
  /**
   * 选择了哪个
   */
  selectBtn({ detail }){
    const index = detail.index + 1;
    switch(index){
      case 1:
        $Message({
          content: '设为默认'
        });
        break;
      case 2:
        $Message({
          content: '编辑'
        });
        break;
      case 3:
        $Message({
          content: '复制'
        });
        break;
      case 4:
        $Message({
          content: '删除'
        });
        break;
    }
    
  },
  /**
   * 取消
   */
  cancel(){
    this.setData({
      visible: false
    });
  },
  /**
   * 点击菜单 索引
   * @param {*} event 
   */
  onChange(event){
    console.log(event.detail,'click right menu callback data')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    this.init();
  }, 
  /** 页面初始化 */
  init(){
    let storeCity = new Array(26);
    const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    words.forEach((item,index)=>{
        storeCity[index] = {
            key : item,
            list : []
        }
    })
    console.log(storeCity);
    cities.forEach((item)=>{
        let firstName = item.pinyin.substring(0,1);
        let index = words.indexOf( firstName );
        storeCity[index].list.push({
          name : item.name,
          key : firstName
        });
    })
    this.data.cities = storeCity;
    this.setData({
        cities : this.data.cities
    });
    setTimeout(() => {
      this.setData({
        spinShow: false
      });
    }, 1500);
  },
  /** 添加我的地址 */
  add(){
    wx.navigateTo({
      url: "../../../package/newSend/index"
    });
  },
  /** 搜索 */
  toSearch(){
    wx.navigateTo({
      url:"../../../packageMy/search/index"
    });
  },
  /** 选中我的地址 */
  selectMyAddr(e){
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.pre)
    //console.log(options.add)
    if(options.add){
      this.setData({
        showBatch: false
      });
    }
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