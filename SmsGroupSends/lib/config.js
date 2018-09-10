// 开发路径
//export const WX_URL ="http://10.18.51.64:18080/qfdx-api";
//uat 路径
export const WX_URL = "https://apptest.yundasys.com/qfdx-api";

export const POST_URL={
  POST_MONTH: WX_URL+'/api/weChat/select/oneMonth',//电话号码查询
  POST_THREE: WX_URL+'/api/weChat/select/listThreeday',
  POST_TODAY: WX_URL+'/api/weChat/select/listTody',
  POST_WEEKDAY: WX_URL+'/api/weChat/select/listWeekday',
  POST_YESTE: WX_URL+'/api/weChat/select/listYesterday',
  TODAY_MONTH: WX_URL+'/api/weChat/send/num'
}

export const SUCCESS_FAILE={
  POST_MONTH: WX_URL+'/api/weChat/send/successful',//通知成功or失败
  POST_THREE: WX_URL + '/api/weChat/send/successful/threeday',
  POST_TODAY: WX_URL + '/api/weChat/send/successful/tody',
  POST_WEEKDAY: WX_URL + '/api/weChat/send/successful/weekday',
  POST_YESTE: WX_URL + '/api/weChat/send/successful/yesterday',
}

export const USER_REPLY={
  POST_MONTH: WX_URL + '/api/weChat/user/reply',//用户回复
  POST_THREE: WX_URL + '/api/weChat/user/reply/threeday',
  POST_TODAY: WX_URL + '/api/weChat/user/reply/tody',
  POST_WEEKDAY: WX_URL + '/api/weChat/user/reply/weekday',
  POST_YESTE: WX_URL + '/api/weChat/user/reply/yesterday',
}
export const TAKE_CODE = {
  POST_MONTH: WX_URL + '/api/weChat/select/takeCode/oneMonth',//取件码查询
  POST_THREE: WX_URL + '/api/weChat/select/takeCode/threeday',
  POST_TODAY: WX_URL + '/api/weChat/select/takeCode/tody',
  POST_WEEKDAY: WX_URL + '/api/weChat/select/takeCode/weekday',
  POST_YESTE: WX_URL + '/api/weChat/select/takeCode/yesterday',
}