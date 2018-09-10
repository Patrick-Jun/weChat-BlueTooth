// pages/subOrder/index.js
const { breakLinesForCanvas } = require("../../utils/util");
const { $Toast } = require('../../dist/base/index');
const ctx = wx.createCanvasContext('mycanvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch_a : false,
    switch_b : false,
    visible: false,
    actions: [
      {
        name: '分享微信好友',
        icon: 'share',
        openType: 'share'
      },
      {
        name: '转发到朋友圈'
      },
      {
        name: '打印二维码'
      }
    ],
    showCanvas: false
  },
  /* 绑定验证 */
  bindYzChange(event){
    const detail = event.detail;
    this.setData({
        'switch_a' : detail.value
    }) 
  },
  /** 下单提示 */
  bindTsChange(event){
    const detail = event.detail;
    this.setData({
        'switch_b' : detail.value
    }) 
  },
  /** 设置 */
  openStep(){
    this.setData({
      visible: true
    });
  },
  selectBtn ({ detail }) {
    const index = detail.index + 1;
    switch(index){
      case 2:
        this.Forwarding();
        break;
    }
  },
  /** 转发朋友圈 */
  Forwarding:function(){
    var _this = this;
    _this.setData({
      visible: false //隐藏菜单
    });
    $Toast({
      content: '请稍等',
      type: 'loading'
    });
    //模拟联网请求
    setTimeout(() => {
      $Toast.hide();
      _this.drawImg("http://img2.imgtn.bdimg.com/it/u=4075250394,790748934&fm=27&gp=0.jpg");
      $Toast({
        content: '内容已复制',
        type: 'success',
        duration:1
      });
      _this.setData({
        showCanvas:true //显示画布
      });
    }, 1500);
  },
  /**
   * 画图
   * @param {*} imgUrl  二维码图片
   */
  drawImg(imgUrl){
    var res = wx.getSystemInfoSync(); //手机信息
    var canvasWidth = res.windowWidth; //手机宽度
    // 获取canvas的的宽  自适应宽（设备宽/750) px
    var rpx = (canvasWidth / 375).toFixed(2);
    //创建画布
    ctx.drawImage("http://img2.imgtn.bdimg.com/it/u=4075250394,790748934&fm=27&gp=0.jpg", 70*rpx, 200*rpx, 160*rpx, 160*rpx)
    //标题 。。。。。。
    ctx.setFontSize(20*rpx)
    ctx.setTextAlign('center')
    ctx.fillText('分享至朋友圈',150*rpx, 40*rpx)
    //注释信息
    let content = '图片已下载到您手机，文字已自动复制。前往朋友圈，从手机相册中选择图片，长按粘贴文字信息';
    let titleHeight = this.drawText(ctx, content, 70, 20, (265*rpx),rpx,12,"#666");// 调用行文本换行函数
    //分割线
    ctx.setStrokeStyle('#999')
    ctx.moveTo(20*rpx, titleHeight)
    ctx.lineTo(280*rpx, titleHeight)
    ctx.stroke() //绘制已定义的路径
    //下单给我 
    ctx.setFillStyle("#000");
    this.drawText(ctx,"寄快递下单给我，我来帮你打印快递单",140,30,(265*rpx),rpx,18,"#333")
    ctx.draw()
  },
  /**
   * 绘制字体  多行文本换行
   * @param {*} ctx  画布对象
   * @param {*} str  文字信息
   * @param {*} initHeight  初始化文字 y 起始点
   * @param {*} titleHeight  距离下划线距离
   * @param {*} canvasWidth  文字最大长度（宽度）
   * @param {*} rpx  自适应rpx 计算
   * @param {*} fontSize  字体大小
   * @param {*} fontColor 字体颜色
   */
  drawText (ctx, str, initHeight, titleHeight, canvasWidth,rpx,fontSize,fontColor) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    ctx.setFontSize(fontSize*rpx) //字体大小
    ctx.setFillStyle(fontColor)//字体颜色
    ctx.setTextAlign('left')//字体偏移
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), 20*rpx, initHeight*rpx);//绘制截取部分
        initHeight += 20;//20为字体的高度
        lineWidth = 5;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) {//绘制剩余部分
        console.log(str.substring(lastSubStrIndex, i + 1))
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), 20*rpx, initHeight*rpx);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = (titleHeight+60)*rpx;
    return titleHeight
  },
  /** 关闭分享 */
  hideCanvas(){
    this.setData({
      showCanvas:false
    });
  },
  /** 取消 */
  closeStep () {
    this.setData({
        visible: false
    });
  },
  stop(){
    //阻止事件冒泡
  },
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