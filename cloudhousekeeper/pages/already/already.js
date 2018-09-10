// pages/already/already.js
const { formatTime } = require("../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    threeMonthAgo:formatTime(new Date(new Date()-1000*60*60*24*90)),//90天之前
    toDay: formatTime(new Date),//今天日期
    current: 'tab1',
    second_height: 0,
    filterShow:false,
    //打印时间
    time_index:"-1",
    beginTime:"开始时间",
    endTime:"结束时间",
    //筛选平台
    printPlatform_index:"-1",
    type_index:"-1",
    list:[112,2],//已打包裹列表
    listShow:-1,//点击展示已打包裹详情
    list2Show: -1,//点击展示打印记录详情
    list2: [{a:1},{b:2}, {c:3}, {d:4}, {e:5}, {f:6}],//打印记录列表
    printAgain:[],//重新打印勾选列表
    chiose:false,//批量操作开关
    selectAll:false,//全选
  },
  handleChange({ detail }) {
    this.hideFilter();
    this.setData({
      current: detail.key
    });
  },
  //打印时间选择
  chooseTime:function(event){
    console.log(event.target.dataset.time);   
    if(event.target.dataset.time==5){
      this.setData({
        beginTime: event.detail.value,
        time_index: event.target.dataset.time
      })
    }else if (event.target.dataset.time == 6) {
      this.setData({
        endTime: event.detail.value,
        time_index: event.target.dataset.time
      })
    }else{
      if (event.target.dataset.time == this.data.time_index) {
        this.setData({
          time_index: '-1'
        })
      } else {
        this.setData({
          time_index: event.target.dataset.time
        })
      }
    }
  },
  choosePlatform: function (event) {
    console.log(event.target.dataset.platform);
    if (event.target.dataset.platform == this.data.printPlatform_index) {
      this.setData({
        printPlatform_index: '-1'
      })
    } else {
      this.setData({
        printPlatform_index: event.target.dataset.platform
      })
    }
  },
  chooseType: function (event) {
    console.log(event.target.dataset.type);
    if (event.target.dataset.type == this.data.type_index) {
      this.setData({
        type_index: '-1'
      })
    } else {
      this.setData({
        type_index: event.target.dataset.type
      })
    }
  },
  //清空筛选条件
  cleanFilter(){
     this.setData({
       time_index: "-1",//重置打印时间      
       printPlatform_index: "-1", //重置筛选平台
       type_index: "-1", //重置打印方式   
       beginTime: "开始时间",
       endTime: "结束时间",
     })
    this.hideFilter();
  },
  // 筛选栏
  filter:function(){
    if(!this.data.filterShow){
      this.setData({
        filterShow:true
      })
    }
  },
  hideFilter:function(){
    this.setData({
      filterShow: false
    })
  },
  //完成
  done:function(){
    this.hideFilter();
  },
  //list1点击查看详情
  showDetailOne:function(e){
    console.log(e.currentTarget.dataset.index);
      if (this.data.listShow == e.currentTarget.dataset.index) {
        this.setData({
          listShow: -1
        })
      } else {
        this.setData({
          listShow: e.currentTarget.dataset.index
        })
      } 
  },
  //list2点击查看详情
  showDetailTwo: function (e) {
    console.log(e.currentTarget.dataset.index);
    if (this.data.list2Show == e.currentTarget.dataset.index) {
      this.setData({
        list2Show: -1
      })
    } else {
      this.setData({
        list2Show: e.currentTarget.dataset.index
      })
    }
  },
  //查看物流
  checkLogistics:function(){
    wx.navigateTo({
      url: './logistics',
    })
  },
  //批量操作开关
  batchChiose:function(){
    if(this.data.chiose){
      this.setData({
        chiose: false
      })
    }else{
      this.setData({
        chiose: true
      })
    }   
  },
  //列表groun-check
  checkboxChange:function(e){
      console.log(e);
      this.setData({
        printAgain:e.detail.value
      })
      //全选中了
      if(e.detail.value.length==this.data.list2.length){
        console.log(this.data.selectAll)
        this.setData({
          selectAll: true
        });
      }else{
        this.setData({
          selectAll: false
        });
      }
  },
  //全选
  handleAnimalChange() {
    let selectAll = this.data.selectAll;
    let list = this.data.list2;
    for(let i =0;i<list.length;i++){
      list[i].checked = !selectAll;
    }
    this.setData({
      selectAll: !selectAll,
      list2:list
    });
  },
  /**
   * 
   * 打印 
   */
  printer(){
    if(this.data.selectAll){
      //全部打印 this.data.tab2
      console.log("打印所有");
      return
    }
    let arr = new Array();
    let dataArray = this.data.list2;
    let printArray = this.data.printAgain;
    console.log(dataArray)
    console.log(printArray)
    for (var i = 0, len = printArray.length; i < len;){
      arr.push(dataArray[parseInt(printArray[i++])]);
    }
    console.log(arr);
  },

  /**
   * 搜索已打包裹
   */
  search(){
    wx.navigateTo({
      url: '/pages/already/search',
    })
  },

  /**
   * 日期选择插件
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginTime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height);
      var height = res[0].height;
      // var oHight = docu
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.windowHeight)
          that.setData({
            // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
           // second_height: res.windowHeight - res.windowWidth / 750 * height
            second_height: res.windowHeight - height-10
          })
        }
      })
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
    //wx.showNavigationBarLoading(); //在标题栏中显示加载图标


    //wx.hideNavigationBarLoading();                   //完成停止加载
    // wx.stopPullDownRefresh();                       //停止下拉刷新

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