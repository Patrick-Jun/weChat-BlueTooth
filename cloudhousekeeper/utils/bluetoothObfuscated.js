var ofs1;
var ecOI2;
var gOE3 = 0;
var YFZWNTj4 = 0;
var XKFsrQG5 = 100;
var jpvtIv6 = 0;
import pos from '\x2e\x2f\x70\x6f\x73\x2e\x6a\x73';
var lq_KEF7 = 'Demid9';
var M8 = '\x34\x36\x31\x36';
var hFfIwp$ci9 = '';
var V10 = '';
var Os11 = '';
var hqMRz12 = '';
var lPGjy13 = '';
var ajtnGPlNu14 = '\x34\x39\x35\x33\x35\x33\x34\x33\x2d\x46\x45\x37\x44\x2d\x34\x41\x45\x35\x2d\x38\x46\x41\x39\x2d\x39\x46\x41\x46\x44\x32\x30\x35\x45\x34\x35\x35';
var StHSt15 = '\x34\x39\x35\x33\x35\x33\x34\x33\x2d\x38\x38\x34\x31\x2d\x34\x33\x46\x34\x2d\x41\x38\x44\x34\x2d\x45\x43\x42\x45\x33\x34\x37\x32\x39\x42\x42\x33';
var WpcMSLi16 = '\x34\x39\x35\x33\x35\x33\x34\x33\x2d\x31\x45\x34\x44\x2d\x34\x42\x44\x39\x2d\x42\x41\x36\x31\x2d\x32\x33\x43\x36\x34\x37\x32\x34\x39\x36\x31\x36';
var dYUsKnVfW17 = false;
var gwIuedY18 = false;
var Ur19 = false;
var jNjOIIw20 = false;
var WFnpAhi21 = 0;
var $UvlvHLvp22 = -1;
var pvV23 = '';
var Z24;
var XweU25;
module["\x65\x78\x70\x6f\x72\x74\x73"] = {
  GetCurLog: GetCurLog,
  GetResLast: GetResLast,
  OpenPrint: OpenPrint,
  ClosePirint: ClosePirint,
  GetAvailable: GetAvailable,
  GetConnected: GetConnected,
  GetCanPrint: GetCanPrint,
  WriteOneQueue:WriteOneQueue
};

function OpenPrint() {
  pvV23 = '\u5f00\u59cb\u521d\u59cb\u5316\u6253\u5370';
  StartInterval()
}

function ClosePirint() {
  StopInterval();
  pos_ClearQueue();
  CloseBluetooth()
}

function GetCanPrint() {
  if ($UvlvHLvp22 == 0) return true;
  else return false
}

function GetAvailable() {
  return gwIuedY18
}

function GetConnected() {
  return Ur19
}

function GetCurLog() {
  return pvV23
}

function GetResLast() {
  return WFnpAhi21
}

function StartInterval() {
  try {
    ofs1 = setTimeout(WriteQueue, XKFsrQG5)
  } catch (err) {
    console["\x6c\x6f\x67"]("\x53\x74\x61\x72\x74\x49\x6e\x74\x65\x72\x76\x61\x6c \x65\x72\x72\x3a" + err)
  }
}

function StopInterval() {
  try {
    clearInterval(ofs1)
  } catch (err) {
    console["\x6c\x6f\x67"]("\x53\x74\x6f\x70\x49\x6e\x74\x65\x72\x76\x61\x6c \x65\x72\x72\x3a" + err)
  }
}

function WriteQueue() {
  try {
    if (!ecOI2) {
      ecOI2 = xcx_platform()
    }
    if (!gwIuedY18 || $UvlvHLvp22 == 1) {
      CloseBluetooth();
      gwIuedY18 = false;
      Ur19 = false;
      $UvlvHLvp22 = -1;
      jNjOIIw20 = false;
      console["\x6c\x6f\x67"]("\x21\x61\x76\x61\x69\x6c\x61\x62\x6c\x65");
      gOE3++;
      if (gOE3 > 3) {
        XKFsrQG5 = 3000
      } else {
        XKFsrQG5 = 1000
      }
      startOpenBluetooth()
    } else if (jNjOIIw20 && !Ur19) {
      console["\x6c\x6f\x67"]("\x21\x63\x6f\x6e\x6e\x65\x63\x74\x65\x64\x3a");
      gOE3 = 0;
      YFZWNTj4++;
      if (YFZWNTj4 > 3) {
        XKFsrQG5 = 3000
      } else {
        XKFsrQG5 = 1000
      }
      console["\x6c\x6f\x67"]("\x70\x72\x69\x6e\x74\x65\x72\x44\x65\x76\x69\x63\x65\x49\x64\x3a" + V10);
      if (V10) {
        createBLEConnection(V10)
      } else {
        getBluetoothDevices()
      }
    } else if (gwIuedY18 && Ur19) {
      YFZWNTj4 = 0;
      if (pos_QueueWriteLength() > 0) {
        WriteOneQueue()
      } else {
        XKFsrQG5 = 1000
      }
    }
  } catch (err) {
    console["\x6c\x6f\x67"]("\x57\x72\x69\x74\x65\x51\x75\x65\x75\x65 \x65\x72\x72\x3a" + err)
  }
  ofs1 = setTimeout(WriteQueue, XKFsrQG5)
}

function WriteOneQueue() {
  if (gwIuedY18 && Ur19) {
    YFZWNTj4 = 0;
    if (pos_QueueWriteLength() > 0) {
      XKFsrQG5 = 10;
      console["\x6c\x6f\x67"]("\x57\x72\x69\x74\x65\x51\x75\x65\x75\x65");
      var $npECOS26 = pos_QueueWriteShift();
      while (ecOI2 == "\x69\x6f\x73" && pos_QueueWriteLength() > 0) {
        $npECOS26 = Arry2Arry($npECOS26, pos_QueueWriteShift())
      }
      console["\x6c\x6f\x67"]("\u5411\u6253\u5370\u673a\u53d1\u9001\u6570\u636e\uff1a" + $npECOS26);
      if (ecOI2 == "\x69\x6f\x73") {
        write($npECOS26)
      } else {
        var nI27 = 20;
        var c_heIVqQ28 = pos_Mathceil($npECOS26["\x6c\x65\x6e\x67\x74\x68"], nI27);
        console["\x6c\x6f\x67"]("\x63\x6f\x75\x6e\x74\x3a" + c_heIVqQ28);
        for (var sPzPNWJkN29 = 0; sPzPNWJkN29 < c_heIVqQ28; sPzPNWJkN29++) {
          var VsC30 = sPzPNWJkN29 * nI27;
          var abjG31 = VsC30 + nI27;
          if (VsC30 >= $npECOS26["\x6c\x65\x6e\x67\x74\x68"]) {
            break
          }
          if (abjG31 > $npECOS26["\x6c\x65\x6e\x67\x74\x68"]) {
            abjG31 = $npECOS26["\x6c\x65\x6e\x67\x74\x68"]
          }
          var ECcZKZM32 = pos_BufferSlice($npECOS26, VsC30, abjG31);
          console["\x6c\x6f\x67"]("\x74\x65\x6d\x70\x42\x66\x3a" + ECcZKZM32);
          write(ECcZKZM32)
        }
      }
    }
  }
}

function openBluetoothAdapterSuccess(bW35) {
  WFnpAhi21 = 1000;
  pvV23 = '\u521d\u59cb\u5316\u84dd\u7259\u9002\u914d\u5668\u6210\u529f';
  console["\x6c\x6f\x67"]("\u521d\u59cb\u5316\u84dd\u7259\u9002\u914d\u5668\x2d\x2d\x2d\x2d\x2d\x73\x75\x63\x63\x65\x73\x73\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d");
  console["\x6c\x6f\x67"](bW35);
  getBluetoothAdapterState()
}

function openBluetoothAdapterFail(_36) {
  WFnpAhi21 = 1001;
  pvV23 = '\u8bf7\u5148\u6253\u5f00\u624b\u673a\u84dd\u7259\u5f00\u5173';
  console["\x6c\x6f\x67"]('\x2d\x2d\x6f\x70\x65\x6e\x42\x6c\x75\x65\x74\x6f\x6f\x74\x68\x41\x64\x61\x70\x74\x65\x72\x2d\x2d\x2d\x66\x61\x69\x6c\x2d\x2d\x2d');
  $UvlvHLvp22 = 1
}

function startOpenBluetooth() {
  if (!xcx_EnableBlue()) {
    $UvlvHLvp22 = 1;
    pvV23 = '\u7248\u672c\u8fc7\u4f4e\x2c\u8bf7\u5148\u5347\u7ea7';
    return
  }
  $UvlvHLvp22 = 2;
  if (WFnpAhi21 == 1002 || WFnpAhi21 == 2002) {
    return
  }
  WFnpAhi21 = 1002;
  pvV23 = '\u5f00\u59cb\u521d\u59cb\u5316\u84dd\u7259\u9002\u914d\u5668';
  console["\x6c\x6f\x67"](pvV23);
  xcx_OpenBluetoothAdapter()
}

function CloseBluetooth() {
  try {
    pvV23 = '\u5f00\u59cb\u65ad\u5f00\u6253\u5370\u673a';
    closeBLEConnection(V10);
    CloseBluetoothAdapter()
  } catch (err) { }
}

function closeBluetoothAdapterSuccess(tVd37) {
  WFnpAhi21 = 1100;
  pvV23 = '\u65ad\u5f00\u6253\u5370\u673a\u6210\u529f';
  console["\x6c\x6f\x67"]("\x73\x75\x63\x63\x65\x73\x73\x3a" + tVd37);
  dYUsKnVfW17 = false;
  gwIuedY18 = false;
  Ur19 = false
}

function closeBluetoothAdapterFail(res) {
  WFnpAhi21 = 1101;
  console["\x6c\x6f\x67"](pvV23)
}

function CloseBluetoothAdapter() {
  if (WFnpAhi21 == 1102) {
    return
  }
  WFnpAhi21 = 1102;
  console["\x6c\x6f\x67"]("\x53\x74\x61\x72\x74\x5f\x43\x6c\x6f\x73\x65\x42\x6c\x75\x65\x74\x6f\x6f\x74\x68\x41\x64\x61\x70\x74\x65\x72");
  try {
    xcx_closeBluetoothAdapter()
  } catch (err) {
    console["\x6c\x6f\x67"]('\x2d\x2d\x63\x6c\x6f\x73\x65\x42\x6c\x75\x65\x74\x6f\x6f\x74\x68\x2d\x2d\x2d\x65\x72\x72\x2d\x2d\x2d\x3a' + err)
  }
}

function getBluetoothAdapterStateSuccess(csda38, oI39, QsvB40) {
  WFnpAhi21 = 2000;
  console["\x6c\x6f\x67"](csda38);
  console["\x6c\x6f\x67"](csda38["\x65\x72\x72\x4d\x73\x67"]);
  dYUsKnVfW17 = oI39;
  gwIuedY18 = QsvB40;
  console["\x6c\x6f\x67"]('\x64\x69\x73\x63\x6f\x76\x65\x72\x69\x6e\x67\x3a' + dYUsKnVfW17);
  console["\x6c\x6f\x67"]('\x61\x76\x61\x69\x6c\x61\x62\x6c\x65\x3a' + gwIuedY18);
  if (QsvB40) {
    onBluetoothAdapterStateChange();
    if (!oI39) {
      startBluetoothDevicesDiscovery()
    }
  } else {
    pvV23 = '\u84dd\u7259\u672a\u6253\u5f00';
    $UvlvHLvp22 = 1
  }
}

function getBluetoothAdapterStateFail(res) {
  WFnpAhi21 = 2001;
  $UvlvHLvp22 = 1
}

function getBluetoothAdapterState() {
  if (WFnpAhi21 == 2002) {
    return
  }
  WFnpAhi21 = 2002;
  console["\x6c\x6f\x67"](pvV23);
  xcx_getBluetoothAdapterState()
}

function onBluetoothAdapterStateChangeResult(m$KLGTY41, mwega$V42) {
  if (!m$KLGTY41) {
    gwIuedY18 = m$KLGTY41;
    $UvlvHLvp22 = 1
  }
  dYUsKnVfW17 = mwega$V42
}

function onBluetoothAdapterStateChange() {
  console["\x6c\x6f\x67"]('\u76d1\u542c\u84dd\u7259\u9002\u914d\u5668\u72b6\u6001\u53d8\u5316\u4e8b\u4ef6');
  try {
    xcx_onBluetoothAdapterStateChange()
  } catch (err) {
    console["\x6c\x6f\x67"](`onBluetoothAdapterStateChange--err:` + err)
  }
}

function startBluetoothDevicesDiscoverySuccess(fLJMlBr43) {
  jNjOIIw20 = true;
  WFnpAhi21 = 3000;
  console["\x6c\x6f\x67"](fLJMlBr43)
}

function startBluetoothDevicesDiscoveryFail(fo44) {
  WFnpAhi21 = 3001;
  pvV23 = '\u67e5\u627e\u5468\u8fb9\u8bbe\u5907\u5931\u8d25';
  $UvlvHLvp22 = 1;
  console["\x6c\x6f\x67"](pvV23)
}

function startBluetoothDevicesDiscovery() {
  if (WFnpAhi21 == 3002) {
    return
  }
  WFnpAhi21 = 3002;
  pvV23 = '\u67e5\u627e\u53ef\u8fde\u63a5\u6253\u5370\u673a';
  console["\x6c\x6f\x67"](pvV23);
  xcx_startBluetoothDevicesDiscovery()
}

function getBluetoothDevicesComplete() {
  WFnpAhi21 = 9003
}

function getBluetoothDevicesSuccess(_deviceName, vw45) {
  WFnpAhi21 = 9000;
  console["\x6c\x6f\x67"]('\u65b0\u8bbe\u5907\x3a' + _deviceName + "\x2c" + vw45);
  if (_deviceName == lq_KEF7) {
    V10 = vw45;
    pvV23 = '\u627e\u5230\u53ef\u8fde\u63a5\u6253\u5370\u673a';
    console["\x6c\x6f\x67"]('\u53d1\u73b0\u65b0\u8bbe\u5907\x3a' + _deviceName);
    xcx_stopBluetoothDevicesDiscovery();
    return true
  }
  return false
}

function getBluetoothDevicesFail(o$HHioqk46) {
  console["\x6c\x6f\x67"]('\u83b7\u53d6\u6240\u6709\u5df2\u53d1\u73b0\u7684\u84dd\u7259\u8bbe\u5907\u5931\u8d25\x3a' + o$HHioqk46);
  WFnpAhi21 = 9001;
  pvV23 = '\u83b7\u53d6\u6240\u6709\u84dd\u7259\u8bbe\u5907\u5931\u8d25';
  $UvlvHLvp22 = 1
}

function getBluetoothDevices() {
  if (WFnpAhi21 == 9002) {
    return
  }
  WFnpAhi21 = 9002;
  console["\x6c\x6f\x67"](pvV23);
  xcx_getBluetoothDevices()
}

function onBluetoothDeviceFoundResult(Dss47, KsFM48, cIfnPz$49, Oo50) {
  try {
    WFnpAhi21 = 4000;
    if (cIfnPz$49 == lq_KEF7) {
      V10 = KsFM48;
      xcx_stopBluetoothDevicesDiscovery();
      pvV23 = '\u627e\u5230\u53ef\u8fde\u63a5\u6253\u5370\u673a';
      console["\x6c\x6f\x67"](pvV23);
      console["\x6c\x6f\x67"](Dss47);
      console["\x6c\x6f\x67"]('\u65b0\u8bbe\u5907', cIfnPz$49 + "\x2c" + KsFM48 + "\x2c" + Oo50);
      return true
    }
  } catch (err) { }
  return false
}

function bluetoothDeviceFound() {
  if (WFnpAhi21 == 4002) {
    return
  }
  WFnpAhi21 = 4002;
  console["\x6c\x6f\x67"]('\u5f00\u59cb\u6ce8\u518c\u53d1\u73b0\u65b0\u8bbe\u5907\u4e8b\u4ef6');
  xcx_onBluetoothDeviceFound()
}

function createBLEConnectionSuccess(lyoJes51, WfC52, XAsh53) {
  console["\x6c\x6f\x67"]('\x63\x72\x65\x61\x74\x65\x42\x4c\x45\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e\x3a' + lyoJes51);
  WFnpAhi21 = 5000;
  pvV23 = '\u8fde\u63a5\u6253\u5370\u673a\u6210\u529f';
  Ur19 = true;
  xcx_onBLEConnectionStateChanged();
  getBLEDeviceServices(XAsh53)
}

function createBLEConnectionFail(bXGvetQD54) {
  WFnpAhi21 = 5001;
  pvV23 = '\u8fde\u63a5\u6253\u5370\u673a\u5931\u8d25';
  $UvlvHLvp22 = 1
}

function createBLEConnection(_deviceId) {
  if (WFnpAhi21 == 5002) {
    return
  }
  WFnpAhi21 = 5002;
  pvV23 = '\u5f00\u59cb\u8fde\u63a5\u6253\u5370\u673a';
  console["\x6c\x6f\x67"](pvV23);
  xcx_createBLEConnection(_deviceId)
}

function closeBLEConnectionSccess(alXmvGANI55) {
  WFnpAhi21 = 5100;
  console["\x6c\x6f\x67"]('\u5173\u95ed\u84dd\u7259\u8fde\u63a5\u6210\u529f\x3a' + alXmvGANI55)
}

function closeBLEConnectionFail(upZWEqkAW56) {
  WFnpAhi21 = 5101;
  pvV23 = '\u5173\u95ed\u84dd\u7259\u8fde\u63a5\u5931\u8d25'
}

function closeBLEConnection(_deviceId) {
  if (!_deviceId) {
    return
  }
  if (WFnpAhi21 == 5102) {
    return
  }
  WFnpAhi21 = 5102;
  try {
    xcx_closeBLEConnection(_deviceId)
  } catch (err) { }
}

function onBLEConnectionStateChangedResult(OT57, dmUnB58, DnelLlY59) {
  console["\x6c\x6f\x67"](`device state has changed:` + OT57);
  if (dmUnB58 == V10) {
    Ur19 = DnelLlY59;
    if (!DnelLlY59) {
      $UvlvHLvp22 = 1
    }
  }
}

function getBLEDeviceServicesSuccess(_deviceId, mejYD60) {
  try {
    WFnpAhi21 = 6001;
    console["\x6c\x6f\x67"]('\u670d\u52a1\x3a' + mejYD60);
    if (mejYD60["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]() == ajtnGPlNu14) {
      Os11 = mejYD60;
      getBLEDeviceCharacteristics(_deviceId, mejYD60);
      return true
    }
  } catch (err) {
    console["\x6c\x6f\x67"]('\x67\x65\x74\x42\x4c\x45\x44\x65\x76\x69\x63\x65\x53\x65\x72\x76\x69\x63\x65\x73\x53\x75\x63\x63\x65\x73\x73\x3a' + err)
  }
  return false
}

function getBLEDeviceServicesFail() {
  WFnpAhi21 = 6001;
  pvV23 = '\u83b7\u53d6\u6253\u5370\u670d\u52a1\u5931\u8d25';
  $UvlvHLvp22 = 1
}

function getBLEDeviceServices(_deviceId) {
  if (WFnpAhi21 == 6002) {
    return
  }
  WFnpAhi21 = 6002;
  xcx_getBLEDeviceServices(_deviceId)
}

function getBLEDeviceCharacteristicsSuccess(EtcE61) {
  WFnpAhi21 = 7000;
  console["\x6c\x6f\x67"]('\u7279\u5f81\u7801\x3a' + EtcE61);
  if (EtcE61["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]() == StHSt15) {
    hqMRz12 = EtcE61;
    $UvlvHLvp22 = 0
  }
  if (EtcE61["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]() == WpcMSLi16) {
    lPGjy13 = EtcE61
  }
}

function getBLEDeviceCharacteristicsFail(res) {
  WFnpAhi21 = 7001;
  $UvlvHLvp22 = 1;
  console["\x6c\x6f\x67"]('\x67\x65\x74\x42\x4c\x45\x44\x65\x76\x69\x63\x65\x43\x68\x61\x72\x61\x63\x74\x65\x72\x69\x73\x74\x69\x63\x73  \x66\x61\x69\x6c')
}

function getBLEDeviceCharacteristics(a62, _IrFQmN63) {
  if (WFnpAhi21 == 7002) {
    return
  }
  WFnpAhi21 = 7002;
  console["\x6c\x6f\x67"]('\x5f\x64\x65\x76\x69\x63\x65\x49\x64\x3a' + a62);
  console["\x6c\x6f\x67"]('\x5f\x73\x65\x72\x76\x69\x63\x65\x49\x64\x3a' + _IrFQmN63);
  xcx_getBLEDeviceCharacteristics(a62, _IrFQmN63)
}

function notifyBLECharacteristicValueChange(cdnEh64, iGMsM65, vybuaT66) {
  if (WFnpAhi21 == 8002) {
    return
  }
  WFnpAhi21 = 8002;
  xcx_notifyBLECharacteristicValueChange(cdnEh64, iGMsM65, vybuaT66)
}

function writeBLECharacteristicValueSuccess(S$Lg67) {
  try {
    WFnpAhi21 = 8100;
    jpvtIv6 = 0;
    console["\x6c\x6f\x67"]('\x77\x72\x69\x74\x65\x42\x4c\x45\x43\x68\x61\x72\x61\x63\x74\x65\x72\x69\x73\x74\x69\x63\x56\x61\x6c\x75\x65 \x73\x75\x63\x63\x65\x73\x73' + res);
    S$Lg67
  } catch (err) { }
}

function writeBLECharacteristicValueFail(t68) {
  try {
    WFnpAhi21 = 8101;
    jpvtIv6 = 1;
    console["\x6c\x6f\x67"]('\x77\x72\x69\x74\x65\x42\x4c\x45\x43\x68\x61\x72\x61\x63\x74\x65\x72\x69\x73\x74\x69\x63\x56\x61\x6c\x75\x65  \x66\x61\x69\x6c' + res);
    t68
  } catch (err) { }
}

function writeBLECharacteristicValue(rldHLki69, SkjHH_70, ehspvq71, SjT_sczBj72, eHdwNsrG73, fNEtcXzrs74) {
  WFnpAhi21 = 8102;
  jpvtIv6 = 2;
  xcx_writeBLECharacteristicValue(rldHLki69, SkjHH_70, ehspvq71, SjT_sczBj72["\x62\x75\x66\x66\x65\x72"], eHdwNsrG73, fNEtcXzrs74)
}

function write($75) {
  return $75;
  // if (!gwIuedY18) {
  //   console["\x6c\x6f\x67"]("\x61\x76\x61\x69\x6c\x61\x62\x6c\x65 \x69\x73 \x66\x61\x6c\x73\x65");
  //   return "\x61\x76\x61\x69\x6c\x61\x62\x6c\x65 \x69\x73 \x66\x61\x6c\x73\x65"
  // }
  // if (!V10) {
  //   console["\x6c\x6f\x67"]("\x70\x72\x69\x6e\x74\x65\x72\x44\x65\x76\x69\x63\x65\x49\x64 \x69\x73 \x6e\x75\x6c\x6c");
  //   return "\x70\x72\x69\x6e\x74\x65\x72\x44\x65\x76\x69\x63\x65\x49\x64 \x69\x73 \x6e\x75\x6c\x6c"
  // }
  // if (!Ur19) {
  //   console["\x6c\x6f\x67"]("\x63\x6f\x6e\x6e\x65\x63\x74\x65\x64 \x69\x73 \x66\x61\x6c\x73\x65");
  //   return "\x63\x6f\x6e\x6e\x65\x63\x74\x65\x64 \x69\x73 \x66\x61\x6c\x73\x65"
  // }
  // writeBLECharacteristicValue(V10, Os11, hqMRz12, $75, null, null)
}

function getPrintStorage() {
  try { } catch (e) { }
}

function clearPrinter() {
  hFfIwp$ci9 = '';
  V10 = '';
  Os11 = '';
  hqMRz12 = '';
  lPGjy13 = ''
}


function xcx_EnableBlue() {
  return wx.openBluetoothAdapter
}

function xcx_OpenBluetoothAdapter() {
  wx.openBluetoothAdapter({
    success: function (res) {
      openBluetoothAdapterSuccess(res)
    },
    fail: function (res) {
      openBluetoothAdapterFail(res)
    },
    complete: function (res) {
      console.log('--openBluetoothAdapter---complete---')
    }
  })
}

function xcx_closeBluetoothAdapter() {
  wx.closeBluetoothAdapter({
    success: function (res) {
      closeBluetoothAdapterSuccess(res)
    },
    fail: function (res) {
      closeBluetoothAdapterFail(res)
    },
    complete: function (res) {
      console.log('--openBluetoothAdapter---complete---')
    }
  })
}

function xcx_getBluetoothAdapterState() {
  wx.getBluetoothAdapterState({
    success: function (res) {
      getBluetoothAdapterStateSuccess(res, res.discovering, res.available)
    },
    fail: function (res) {
      getBluetoothAdapterStateFail(res)
    },
    complete: function (res) { }
  })
}

function xcx_onBluetoothAdapterStateChange() {
  wx.onBluetoothAdapterStateChange(function (res) {
    console.log(`adapterState changed,now is:` + res);
    onBluetoothAdapterStateChangeResult(res.available, res.discovering)
  })
}

function xcx_startBluetoothDevicesDiscovery() {
  wx.startBluetoothDevicesDiscovery({
    success: function (res) {
      startBluetoothDevicesDiscoverySuccess(res)
    },
    fail: function (res) {
      startBluetoothDevicesDiscoveryFail(res)
    },
    complete: function (res) { }
  })
}

function xcx_stopBluetoothDevicesDiscovery() {
  console.log('停止搜索周边设备');
  wx.stopBluetoothDevicesDiscovery({
    success: function (res) {
      console.log(res)
    }
  })
}

function xcx_getBluetoothDevices() {
  wx.getBluetoothDevices({
    success: function (res) {
      console.log(res);
      for (var p in res.devices) {
        if (getBluetoothDevicesSuccess(res.devices[p].name, res.devices[p].deviceId)) {
          break
        }
      }
    },
    fail: function (res) {
      getBluetoothDevicesFail(res)
    },
    complete: function (res) {
      getBluetoothDevicesComplete();
      console.log('获取所有已发现的蓝牙设备complete:' + res)
    }
  })
}

function xcx_onBluetoothDeviceFound() {
  wx.onBluetoothDeviceFound(function (res) {
    try {
      if (onBluetoothDeviceFoundResult(res, res.deviceId, res.name, res.RSSI)) {
        return
      }
    } catch (err) { }
    try {
      for (var p in res.devices) {
        if (onBluetoothDeviceFoundResult(res, res.devices[p].deviceId, res.devices[p].name, res.devices[p].RSSI)) {
          return
        }
      }
    } catch (err) { }
  })
}

function xcx_getConnectedBluetoothDevices() {
  console.log(curLog);
  wx.getConnectedBluetoothDevices({
    success: function (res) {
      console.log('获取处于已连接状态的设备:' + res)
    },
    fail: function (res) {
      console.log('获取处于已连接状态的设备失败:' + res)
    },
    complete: function (res) {
      console.log('获取处于已连接状态的设备complete:' + res)
    }
  })
}

function xcx_createBLEConnection(_deviceId) {
  wx.createBLEConnection({
    deviceId: _deviceId,
    success: function (res) {
      createBLEConnectionSuccess(res, res.errMsg, _deviceId)
    },
    fail: function (res) {
      createBLEConnectionFail(res)
    },
    complete: function (res) {
      console.log('连接低功耗蓝牙设备complete:' + res)
    }
  })
}

function xcx_onBLECharacteristicValueChange() {
  wx.onBLECharacteristicValueChange(function (res) {
    console.log('监听低功耗蓝牙设备的特征值变化:' + res)
  })
}

function xcx_closeBLEConnection(_deviceId) {
  console.log('开始关闭蓝牙连接');
  wx.closeBLEConnection({
    deviceId: _deviceId,
    success: function (res) {
      closeBLEConnectionSccess(res)
    },
    fail: function (res) {
      closeBLEConnectionFail(res)
    },
    complete: function (res) {
      console.log('连接低功耗蓝牙设备complete:' + res)
    }
  })
}

function xcx_onBLEConnectionStateChanged() {
  console.log('注册监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等');
  wx.onBLEConnectionStateChanged(function (res) {
    onBLEConnectionStateChangedResult(res, res.deviceId, res.connected)
  })
}

function xcx_getBLEDeviceServices(_deviceId) {
  wx.getBLEDeviceServices({
    deviceId: _deviceId,
    success: function (res) {
      console.log('getBLEDeviceServices  success');
      for (var p in res.services) {
        {
          if (getBLEDeviceServicesSuccess(_deviceId, res.services[p].uuid)) {
            return
          }
        }
      }
    },
    fail: function (res) {
      getBLEDeviceServicesFail()
    },
    complete: function (res) {
      console.log('getBLEDeviceServices  complete')
    }
  })
}

function xcx_getBLEDeviceCharacteristics(_deviceId, _serviceId) {
  wx.getBLEDeviceCharacteristics({
    deviceId: _deviceId,
    serviceId: _serviceId,
    success: function (res) {
      for (var p in res.characteristics) {
        getBLEDeviceCharacteristicsSuccess(res.characteristics[p].uuid)
      }
    },
    fail: function (res) {
      getBLEDeviceCharacteristicsFail(res)
    },
    complete: function (res) {
      console.log('getBLEDeviceCharacteristics  complete')
    }
  })
}

function xcx_readBLECharacteristicValue(_deviceId, _serviceId, _characteristicId) {
  wx.readBLECharacteristicValue({
    deviceId: _deviceId,
    serviceId: _serviceId,
    characteristicId: _characteristicId,
    success: function (res) {
      console.log('readBLECharacteristicValue:' + res)
    },
    fail: function (res) {
      console.log('readBLECharacteristicValue  fail' + res)
    },
    complete: function (res) {
      console.log('readBLECharacteristicValue  complete')
    }
  })
}

function xcx_notifyBLECharacteristicValueChange(_deviceId, _serviceId, _characteristicId) {
  wx.notifyBLECharacteristicValueChange({
    state: true,
    deviceId: _deviceId,
    serviceId: _serviceId,
    characteristicId: _characteristicId,
    success: function (res) {
      console.log('notifyBLECharacteristicValueChange success:' + res.errMsg)
    },
    fail: function (res) {
      console.log('notifyBLECharacteristicValueChange  fail:' + res)
    },
    complete: function (res) {
      console.log('notifyBLECharacteristicValueChange  complete')
    }
  })
}

function xcx_writeBLECharacteristicValue(_deviceId, _serviceId, _characteristicId, _buffervalue, _success, _fail) {
  wx.writeBLECharacteristicValue({
    deviceId: _deviceId,
    serviceId: _serviceId,
    characteristicId: _characteristicId,
    value: _buffervalue,
    success: function (res) {
      writeBLECharacteristicValueSuccess(_success)
    },
    fail: function (res) {
      console.log('writeBLECharacteristicValue  fail:' + res);
      writeBLECharacteristicValueFail(_fail)
    },
    complete: function (res) {
      console.log('writeBLECharacteristicValue  complete')
    }
  })
}

function xcx_setStorage(key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
}

function xcx_printFail() {
  wx.showToast({
    title: "打印失败",
    duration: 5000
  })
}

function xcx_printOk() {
  wx.showToast({
    title: "打印成功",
    duration: 5000
  })
}

function xcx_platform() {
  var res = wx.getSystemInfoSync();
  return res.platform
}

function pos_ClearQueue() {
  try {
    pos.ClearQueue()
  } catch (err) { }
}

function pos_QueueWriteLength() {
  return pos.QueueWrite.length
}

function pos_QueueWriteShift() {
  return pos.QueueWrite.shift()
}

function pos_Mathceil(_len1, _len2) {
  return Math.ceil(_len1 / _len2)
}

function pos_BufferSlice(_buffer, _start, _end) {
  return _buffer.slice(_start, _end)
}

function Arry2Arry(arry1, arry2) {
  var b = new Uint8Array(arry1.length + arry2.length);
  b.set(arry1, 0);
  b.set(arry2, arry1.length);
  return b
}