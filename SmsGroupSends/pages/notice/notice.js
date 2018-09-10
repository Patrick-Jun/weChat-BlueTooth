// pages/notice/notice.js
import { WX_URL } from '../../lib/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: '0',//开启1，关闭0
    prefix: 'A',//前缀
    sorting: '0',//0正序，1倒序
    initialValue: '200',//初始值
    value: '',//当前值
    receiveTelephone: '',
    componentName:'请选择模板',
    list: [
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove:false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false },
      // { receiveTelephone: '12345679812', takeCode: 'A110', right: true, isTouchMove: false }
    ],
    templet:null
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      list: that.data.list
    })
  },
  /**
 * 计算滑动角度
 * @param {Object} start 起点坐标
 * @param {Object} end 终点坐标
 */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.list.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      list: this.data.list
    })
  },
  /**
   * 前往验证码设置页面
   */
  toSeting: function () {
    wx.navigateTo({
      url: "/pages/setting/setnum"　// 页面 B
    })
  },
  toComponent:function(){
    //a用来标识是从群发通知进入的，要存一个notice_index，否则不存
    wx.navigateTo({
      url:"/pages/component/component?a=1"
    })
  },
  /**
   * 检测是否为手机号，并追加到页面
   */
  isPhoneNum: function (e) {
    console.log(e.detail.value);
    if (e.detail.value.length == 11) {
      let code = this.changePrefix();
      console.log(code);
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(e.detail.value)) {
        console.log('%c请输入正确手机号', 'color:red');
        let arr = this.data.list;
        arr.unshift({
          receiveTelephone: e.detail.value,
          takeCode: code,
          right: false,
          isTouchMove: false
        })
        this.setData({
          list: arr
        })
      } else {
        console.log('手机号码正确');
        let arr = this.data.list;
        arr.unshift({
          receiveTelephone: e.detail.value,
          takeCode: code,
          right: true,
          isTouchMove: false
        })
        this.setData({
          list: arr
        })
      }
      this.setData({
        receiveTelephone: ''
      })
    }
  },

  /**
   * 自动变更规则验证
   */
  changePrefix: function () {
    if (this.data.open == '0') {
      return;//关闭code
    }
    console.log(this.data.value);
    if (!this.data.value) {//第一次生成code
      console.log('第一次生成');
      let code = this.data.prefix + this.data.initialValue;
      let n = Number(this.data.initialValue);
      this.updateValue(n);
      return code;
    }
    if (this.data.value) {//第n次生成code
      console.log('第n次生成');
      let code = this.data.prefix + this.data.value;
      let n = Number(this.data.value);
      this.updateValue(n);
      return code;
    }
  },
  /**
   * 变更value码
   */
  updateValue: function (n) {
    if (this.data.sorting == '0') {//正序 
      let m = n + 1;
      if (m > 999999) {
        m = this.data.initialValue;//到最大值的时候变成初始值
      }
      this.setData({
        value: m
      })
    } else {//倒序
      let m = n - 1;
      if (m < 0) {
        m = this.data.initialValue;//到0的时候变成初始值
      }
      this.setData({
        value: m
      })
    }
  },

  /**
   * 导入电话号码
   */
  toadd: function () {
    wx.navigateTo({
      url: '/pages/addNumber/addnumber'　　// 页面 A
    })
  },

  /**
   *  发送通知
   */
  send:function(){
    debugger
    if(this.data.templet==null){
      wx.showToast({
        title: '请选择模板',
        image: '/images/error.png',
        duration: 2000
      })
      return;
    }
    if (this.data.list.length==0){
      wx.showToast({
        title: '请添加号码',
        image: '/images/error.png',
        duration: 2000
      })
      return;
    }
    let _this = this;
    let vo = new Array();
    let userInfo = wx.getStorageSync('userInfo');
    let telephone = wx.getStorageSync('telephone');
    for (var i = 0; i < this.data.list.length; i++) {
      let informContent = this.data.templet.templateContent.replace(/{取件码}/g, this.data.list[i].takeCode);
      vo.push({
        "informContent": informContent || '',//no
        "nickname": userInfo.nickName || '',//ok
        "noticeTitle": this.data.templet.templateName || '',//ok
        "notificationType": "message",//默认短信
        "receiveTelephone": this.data.list[i].receiveTelephone || '',//ok
        "signature": this.data.templet.signature || '',//ok
        "takeCode": this.data.list[i].takeCode || '',//ok
        "telephone": telephone || '',//ok
      })
    }

    console.log(vo);

    wx.request({
      url: WX_URL + '/api/weChat/send/message/to/people',
      method: "POST",
      data: {
        "vo": vo
        //[
        // {
        //   "informContent": "快递",//通知内容,ok
        //   "nickname": "完成",//用户昵称 ok
        //   "noticeTitle": "前门",//通知标题 no
        //   "notificationType": "message",//通知类型 ok 
        //   "receiveTelephone": "13761408513",//接受通知手机号码 ok 
        //   "signature": "韵达快递",//公司签名 no
        //   "takeCode": "A200",//取件码 ok 
        //   "telephone": "17621969696"//用户手机号码 ok 
        // }
        // }, {
        //   "informContent": "string",
        //   "nickname": "string",
        //   "noticeTitle": "string",
        //   "notificationType": "string",
        //   "receiveTelephone": "string",
        //   "signature": "string",
        //   "takeCode": "string",
        //   "telephone": "string"
        // }
        //]
      },
      success: function (body) {
        console.log(body);
        if (body.data.data == 'success') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
        }

        _this.setData({
          list: []
        })
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(3);
    let _this = this;
    let telephone = wx.getStorageSync('telephone');
    wx.request({
      url: WX_URL + '/api/weChat/our/select?telephone=' + telephone,
      method: 'POST',
      success: function (data) {
        if (data.data.data) {
          _this.setData({
            prefix: data.data.data.prefix||"A",
            sorting: data.data.data.sorting||'0',
            open: data.data.data.open||'0',
            initialValue: Number(data.data.data.initialValue)||200,
          })
        }
      }
    })

    //查看 type值，2 导入电话号码后返回，3 选择模板后返回
    //每次进入都判断并执行对应方法
    let notice_index = wx.getStorageSync('notice_index');
    wx.setStorageSync('notice_index', null);//获取标识后置空
    console.log(notice_index);

    if (notice_index == 2) {
      console.log('导入电话后返回');
      let morePhoneNumber = wx.getStorageSync('morePhoneNumber');
      wx.setStorageSync('morePhoneNumber', null);//获取导入电话后置空
      console.log(morePhoneNumber);
      for (let i = 0; i < morePhoneNumber.length; i++) {
        let b = {
          detail: {
            value: morePhoneNumber[i]
          }
        };//e.detail.value
        this.isPhoneNum(b);
      }
      return;
    }
    if (notice_index == 3) {
      console.log('选择模板');
      let templet = wx.getStorageSync('templet');
      wx.setStorageSync('templet', null);//获取模板后置空
      console.log(templet);
      this.setData({
        templet: templet,
        componentName:templet.templateName
      })
      return
    }
  }
})