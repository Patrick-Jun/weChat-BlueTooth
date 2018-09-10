import util from './util.js'
import util2 from './util2.js'
import blue from './bluetoothObfuscated.js'

//是否缺纸
var Lack_Paper = new Uint8Array([29, 114, 1]);

var DES_SETKEY = new Uint8Array([31, 31, 0, 8, 0, 1, 1, 1, 1, 1, 1, 1, 1]);
var DES_ENCRYPT = new Uint8Array([31, 31, 1]);
var DES_ENCRYPT2 = new Uint8Array([31, 31, 2]);
var ERROR = new Uint8Array([0]);
//打印机初始化
var ESC_ALT = new Uint8Array([27, 64]);
//打印并走纸 n 点行
var ESC_J_n = new Uint8Array([27, 74, 0]);
//打印并走纸 n 行
var ESC_d_n = new Uint8Array([27, 100, 0]);
//选择页模式
var ESC_L = new Uint8Array([27, 76]);
//
var ESC_CAN = new Uint8Array([24]);
//打印缓冲区的数据并进纸到下一个黑标位置
var FF = new Uint8Array([12]);
//（页模式命令）打印缓冲区的数据并进纸到下一个黑标位置
var ESC_FF = new Uint8Array([27, 12]);
//
var ESC_S = new Uint8Array([27, 83]);
//
var GS_P_x_y = new Uint8Array([29, 80, 0, 0]);
//选择国际字符集 (该指令暂不支持)USA
var ESC_R_n = new Uint8Array([27, 82, 0]);
//选择字符代码页
var ESC_t_n = new Uint8Array([27, 116, 0]);
//打印并换行
var LF = new Uint8Array([10]);
//打印并换行
var CR = new Uint8Array([13]);
//设置行间距为 n 点行
var ESC_3_n = new Uint8Array([27, 51, 0]);
//设置字符间距
var ESC_SP_n = new Uint8Array([27, 32, 0]);
//
var DLE_DC4_n_m_t = new Uint8Array([16, 20, 1, 0, 1]);
//
var GS_V_m = new Uint8Array([29, 86, 0]);
//
var GS_V_m_n = new Uint8Array([29, 86, 66, 0]);
//设置打印区域宽度
var GS_W_nL_nH = new Uint8Array([29, 87, 118, 2]);
//
var ESC_dollors_nL_nH = new Uint8Array([27, 36, 0, 0]);
//设置输出对齐方式 缺省：左对齐 左对齐：n=0,48  居中对齐：n=1,49 右对齐 ：n=2,50
var ESC_a_n = new Uint8Array([27, 97, 0]);
//用于设置打印字符的方式。默认值是 0,位 1：1：字体反白,位 2：1：字体上下倒置,位 3：1：字体加粗,位 4：1：双倍高度,位 5：1：双倍宽度,位 6：1：删除线
//设置打印字符双倍宽度
var GS_exclamationmark_n = new Uint8Array([29, 33, 0]);
//
var ESC_M_n = new Uint8Array([27, 77, 0]);
//设置取消打印字体是否加粗,n 最低位有效,等于 0 时取消字体加粗,非 0 时设置字体加粗
var GS_E_n = new Uint8Array([27, 69, 0]);
//n=0-2,下划线的高度,默认：0
var ESC_line_n = new Uint8Array([27, 45, 0]);
//n=1:设置字符上下倒置,n=0:取消字符上下倒置
var ESC_lbracket_n = new Uint8Array([27, 123, 0]);
//n=1:设置字符反白打印,n=0:取消字符反白打印
var GS_B_n = new Uint8Array([29, 66, 0]);
//
var ESC_V_n = new Uint8Array([27, 86, 0]);
//打印下装点图
var GS_backslash_m = new Uint8Array([29, 47, 0]);
//打印下载到 FLASH  中的位图
var FS_p_n_m = new Uint8Array([28, 112, 1, 0]);

/*************条码打印开始***********************************************************/
//设置字符集
var CODE_A = new Uint8Array([123, 65]);
var CODE_B = new Uint8Array([123, 66]);
var CODE_C = new Uint8Array([123, 67]);
//设定条码对应的字符(HRI)打印方式
//n=0不打印HRI,1HRI在条码上方，2HRI在条码下方，3HRI在条码上方和下方
var GS_H_n = new Uint8Array([29, 72, 2]);
//
var GS_f_n = new Uint8Array([29, 102, 0]);
//设置条形码高度
//1<<n<<255默认值:50
var GS_h_n = new Uint8Array([29, 104, -94]);
//设置条形码左边距0->255
var GS_x_n = new Uint8Array([29, 120, -94]);
// 设置条形码宽度,n=2,3,默认2
var GS_w_n = new Uint8Array([29, 119, 3]);



//
var GS_k_m_v_r_nL_nH = new Uint8Array([29, 107, 4, 0, 2, 0, 0]);

/*************条码打印结束******************************************************/

//
var ESC_W_xL_xH_yL_yH_dxL_dxH_dyL_dyH = new Uint8Array([27, 87, 0, 0, 0, 0, 72, 2, -80, 4]);
//
var ESC_T_n = new Uint8Array([27, 84, 0]);
//
var GS_dollors_nL_nH = new Uint8Array([29, 36, 0, 0]);
//
var GS_backslash_nL_nH = new Uint8Array([29, 92, 0, 0]);
//
var FS_line_n = new Uint8Array([28, 45, 0]);

/*************二维码打印开始******************************************************/

//设置二维码尺寸大小
var GS_leftbracket_k_pL_pH_cn_67_n = new Uint8Array([29, 40, 107, 3, 0, 49, 67, 3]);
//设置二维码尺寸大小
var GS_leftbracket_k_pL_pH_cn_69_n = new Uint8Array([29, 40, 107, 3, 0, 49, 69, 48]);
//设置二维码尺寸大小
var GS_leftbracket_k_pL_pH_cn_80_m__d1dk = new Uint8Array([29, 40, 107, 3, 0, 49, 80, 48]);
//打印二维码
var GS_leftbracket_k_pL_pH_cn_fn_m = new Uint8Array([29, 40, 107, 3, 0, 49, 81, 48]);

// var GS_k_pL_pH_cn_fn_n = new Uint8Array([29, 40, 107, 3, 0, 49, 80, 48]);

/*************二维码打印结束******************************************************/

var GS_L_nL_nH = new Uint8Array([29, 76, 0, 0]);

/**    */
//退出汉字
var FS = new Uint8Array([28,46])


// 连接蓝牙设备
const connectBluetooth = (deviceid, fun) => {
  console.log("连接设备：" + deviceid);
  wx.createBLEConnection({
    deviceId: deviceid,
    success: function (res) {
      console.log("连接设备成功，获取deviceId");
      console.log(res);
      fun(res);
      return;
    },
    fail: function (res) {
      console.log("连接设备失败")
      wx.hideLoading();
      console.log(res)
      var str = "连接失败:蓝牙未打开";
      if (res.errCode == 10006) {
        str = "连接失败:当前连接已断开";
      }
      wx.showModal({
        title: '提示',
        content: '连接失败',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
  })
};
//获取蓝牙设备service信息
const getAllservice = (deviceId, fun) => {
  var that = this
  wx.getBLEDeviceServices({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
    deviceId: deviceId,
    success: function (res) {
      console.log('serviceId获取成功：')
      console.log('device services:', res.services)
      console.log(res);
      let num = res.services.length - 1;
      getCharacteristic(deviceId, res.services, num, fun)
    }
  })
};

//通过uuid获取特征值并返回支持写入的
const getCharacteristic = (deviceId, services, num, fun) => {
  if (num < 0) {
    fun(false)
  }
  wx.getBLEDeviceCharacteristics({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: deviceId,
    // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
    serviceId: services[num].uuid,
    success: function (res) {
      console.log('device getBLEDeviceCharacteristics:', res.characteristics);
      for (var j = 0, leng = res.characteristics.length; j < leng; j++) {
        console.log(res.characteristics[j].properties.write);
        if (res.characteristics[j].properties.write) { //支持写入的特征值
          //deviceId    //serviceId     //characteristicId
          fun({
            deviceId: deviceId,
            serviceId: services[num].uuid,
            characteristicId: res.characteristics[j].uuid
          })
          return
        }
      }
      num -= 1;
      getCharacteristic(deviceId, services, num, fun);
    },
    fail: function () {
      num -= 1;
      getCharacteristic(deviceId, services, num, fun);
    }
  })

}


const printTemplate = (deviceId, serviceId, characteristicId) => {
  function Hex2Arry(str) {
    var sa = str.split("%");
    var b = new Uint8Array(sa.length - 1);
    for (var i = 1; i < sa.length; i++) {
      b[i - 1] = parseInt(sa[i], 16);
    }
    return b;
  }

  function Arry2Arry(arry1, arry2) {
    var b = new Uint8Array(arry1.length + arry2.length);
    b.set(arry1, 0);
    b.set(arry2, arry1.length);
    return b
  }

  function AddLongBuffer(writeBf) {
    var maxlen = 20;
    var count = Math.ceil(writeBf.length / maxlen);
    console.log("count", count);
    for (var i = 0; i < count; i++) {
      var _lenStart = i * maxlen;
      var _lenEnd = _lenStart + maxlen;
      if (_lenStart >= writeBf.length) {
        break;
      }
      if (_lenEnd > writeBf.length) {
        _lenEnd = writeBf.length;
      }
      var tempBf = writeBf.slice(i * maxlen, _lenEnd);
      console.log("tempBf", tempBf);
      //QueueWrite.push(tempBf);
      return tempBf
    }
  }

  // function pos_QueueWriteShift() {
  //   return pos.QueueWrite.shift()
  // }

  //二维码
  /*************二维码打印开始***********************************************************/
  // var GS_k_pL_pH_cn_fn_n = new Uint8Array([29, 107, 97, 20, 4, 0, 1]);

  // var QRcode = Hex2Arry(util.encodeToGb2312("http://www.baidu.com"));
  // GS_k_pL_pH_cn_fn_n[5] = parseInt((QRcode.length + 3)/10);
  // GS_k_pL_pH_cn_fn_n[6] = parseInt((QRcode.length + 3) % 10);

  // var $npECOS26 = GS_k_pL_pH_cn_fn_n;

  // $npECOS26 = Arry2Arry($npECOS26, QRcode)
  // ESC_d_n[2] =1;
  // $npECOS26 = Arry2Arry($npECOS26, ESC_d_n);

  /*************条码打印开始***********************************************************/
  //打印条形码类型code11，长度12
  // var GS_k_m_n = new Uint8Array([29, 107, 73, 0]);
  // // GS_k_m_n[2] = 74;
  // var hexstr = util.encodeToGb2312("NO.123456");
  // var _tempbuf = Hex2Arry(hexstr);
  // // var strt = AddLongBuffer(_tempbuf);
  // //设置条形码宽度,n=2,3,默认2
  // GS_w_n[2] = 2;
  // //条码长度

  // console.log("_tempbuf:")
  // console.log(_tempbuf)
  // console.log(_tempbuf.length);
  // //GS_k_m_n[3] = _tempbuf.length;
  // GS_k_m_n[3] = _tempbuf.length + 2;
  // //高度
  // GS_h_n[2] = 50;
  // var $npECOS26 = GS_w_n; //设置打印区域
  // $npECOS26 = util.Arry2Arry($npECOS26, GS_H_n); //设置hri字符打印位置
  // $npECOS26 = util.Arry2Arry($npECOS26, GS_h_n);
  // $npECOS26 = util.Arry2Arry($npECOS26, GS_k_m_n);

  // $npECOS26 = util.Arry2Arry($npECOS26, CODE_B); //设置字符集
  // $npECOS26 = util.Arry2Arry($npECOS26, _tempbuf); //设置条码
  // //打印缓冲区内数据

  // $npECOS26 = Arry2Arry($npECOS26, LF);



  //  ESC_d_n[2] = 5;//跳5行               
  //  var $npECOS26 = ESC_d_n.slice(0);

  //字体加粗
  GS_E_n[2] =1;
  var $npECOS26 = GS_E_n.slice(0);
  // //字号变大
  GS_exclamationmark_n[2] = 1 * 4 + 1;
  var big = GS_exclamationmark_n.slice(0); 
  // //字体剧中
  ESC_a_n[2] = 1;
  var center =  ESC_a_n.slice(0).slice(0);
  // //下划线+文本
  // ESC_line_n[2] = 2;
  // var under_line = ESC_line_n.slice(0);
  var hexstr = util.encodeToGb2312("猪精");
  var _tempbuf = util.Arry2Arry(Hex2Arry(hexstr), LF);
  var strt= AddLongBuffer(_tempbuf);
  $npECOS26 = Arry2Arry($npECOS26, big)
  $npECOS26 = Arry2Arry($npECOS26, center)
  // $npECOS26 = Arry2Arry($npECOS26, under_line)
  $npECOS26 = Arry2Arry($npECOS26, strt)
  //线条，由下划线
  // ESC_line_n[2] = 2;
  // var $npECOS26 = ESC_line_n.slice(0);
  // var hexstr = util.encodeToGb2312("          12                  ");
  // var _tempbuf = util.Arry2Arry(Hex2Arry(hexstr), LF);
  // var strt= AddLongBuffer(_tempbuf);
  // $npECOS26 = Arry2Arry($npECOS26, strt)

  console.log($npECOS26);
  var s = $npECOS26["\x62\x75\x66\x66\x65\x72"];
  console.log(s);

  // 这里的回调可以获取到 write 导致的特征值改变
  wx.onBLECharacteristicValueChange(function (characteristic) {
    console.log('characteristic value changed:1', characteristic)
  })

  wx.writeBLECharacteristicValue({
    deviceId: deviceId,
    serviceId: serviceId,
    characteristicId: characteristicId,
    value: s,
    success: function (res) {
      console.log(res)
      console.log('writeBLECharacteristicValue success', res.errMsg)
    },
    fail: function (e) {
      console.log(e)
    }
  })
}

function string2buffer(str) {
  // 首先将字符串转为16进制
  let val = ""
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16)
    } else {
      val += ',' + str.charCodeAt(i).toString(16)
    }
  }
  // 将16进制转化为ArrayBuffer
  return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  })).buffer
}



module.exports = {
  connectBluetooth: connectBluetooth,
  getAllservice: getAllservice,
  printTemplate: printTemplate
}