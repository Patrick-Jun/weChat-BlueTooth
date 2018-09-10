// pages/pend.js
const { formatTime } = require("../../utils/util");
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    up:false,//滚动加载
    windowHeight: 0,//获取屏幕高度
    allChecked: false,//全选
    batch:"批量打包",//
    showBatch:true,//批量操作
    listData:[],//列表数据
    now_time:formatTime(new Date),
    star_time:"开始时间",
    end_time:"结束时间",
    thisTab:0,//当前选中条件
    screen:true,//筛选 默认隐藏
    visible: false,
    content:true,//数据是否为空
    actions: [
      {
        name: '默认打印机已断开，选择其他打印机',
        color:"#999999"
      },
      {
        name: '蓝牙打印机1',
      },
      {
        name: '蓝牙打印机2'
      },
      {
        name: '蓝牙打印机3'
      }
    ], 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(_this.data.content){
      _this.init();
    }
  },
  /** 初始化数据 */
  init(){
    console.log(1);
    var _this = this;
    //获取屏幕高度
    var query = wx.createSelectorQuery();
    query.select('.header').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        windowHeight: res[0].height
      })
    })
    query.select('.content').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        windowHeight: res[0].height + _this.windowHeight
      })
    })
    _this.setData({
      listData:[
        {
          id:1,
          name:"玛丽莲·梦露",
          tel:"18122341111",
          city:"上海 上海市 静安区",
          address:"黄浦区人民大道201号(近武胜路)",
          date:"2018-08-14",
          wp_name:"衣服",
          size:"XL",
          color:"黑色"
        },
        {
          id:2,
          name:"王菲",
          tel:"18122341121",
          city:"上海 上海市 静安区",
          address:"黄浦区人民大道201号(近武胜路)",
          date:"2018-08-14",
          wp_name:"裤子",
          size:"XL",
          color:"黑色"
        },
        {
          id:2,
          name:"土鳖",
          tel:"18122341124",
          city:"上海 上海市 静安区",
          address:"黄浦区人民大道201号(近武胜路)",
          date:"2018-08-14",
          wp_name:"围巾",
          size:"XXXL",
          color:"白色"
        },
      ]
    });
  },
  /**
   * 批量打包
   */
  batch(){
    let batch_flag = this.data.showBatch;
    this.setData({
      showBatch: !batch_flag,
      batch: this.data.showBatch === true ? "取消" : "批量打包"
    });
  },
  /**
   * 全选
   * @param {*} param0  当前对象
   */
  allSelect({ detail = {} },e) {
    this.setData({
      allChecked: detail.current
    });
  },
  /**
   * 时间选择器  开始时间
   */
  selectStarTime({ detail = {} }){
    console.log(detail);
    this.setData({
      star_time:detail.value,
      thisTab:4
    });
  },
  /**
   * 时间选择器  结束时间
   */
  selectEndTime({ detail = {} }){
    console.log(detail)
    this.setData({
      end_time:detail.value,
      thisTab:5
    });
  },
  /**
   * 选中筛选条件
   */
  activeTab(e){
    let key = e.target.dataset.key;
    this.setData({
      thisTab:key
    });
  },
  /**
   * 情况筛选条件
   */
  clearCondition(){
    this.setData({
      thisTab:0
    });
  },
  /**
   * 筛选按钮  显示/隐藏
   */
  showScreen(){
    let screen_flag = this.data.screen;
    this.setData({
      screen:!screen_flag
    });
  },
  /**完成 */
  complete(){
    this.setData({
      screen:true
    });
  },
  /** 批量打印 */
  BatchPrinting(){
    this.setData({
      visible: true
    });
  },
  /** 点击选项 */
  clickItem ({ detail }) {
    const index = detail.index + 1;
    console.log(detail);
    this.cancel();
    $Toast({
      content: '打印中',
      type: 'loading'
    });
  },
  /** 取消打印 */
  cancel(){
    this.setData({
      visible: false
    });
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
    setTimeout(() => {
      wx.stopPullDownRefresh();//回弹
    }, 2000);
    console.log("下拉刷新。。。。");
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