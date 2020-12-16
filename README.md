# 使用方式

```javascript
import WutaoWxShare from 'wutao-wx-share';

WutaoWxShare({
  baseUrl: 'https://wutao.com',
  authUrl: window.location.href,
  isDebug: false,
  jsApiList: ['hideOptionMenu']
},(wx)=>{
  wx.hideOptionMenu();
});

或者
WutaoWxShare({
  type: (process.env.NUXT_ENV_APP != 'prod') ? 15 : '',
  authUrl: window.location.href
},(wx)=>{
  wx.hideOptionMenu();
})

```

### [options] 第一个参数对象以下属性

|  属性  | 说明   |  类型    |
| ------ | ------ | ------ |
|  baseUrl  | 域名 |   string    |
|  authUrl  | 授权url |   [string]  |
|  isDebug  | 是否开启调试模式 |   boolean    |
|  jsApiList  | 需要的jsApi |   [array]  |
|  type  | 需要给接口的type参数 |   number  |
|  isEncode  | 是否需要encode转码 |   boolean    |


### [callback] 第二个参数

|  回调函数             | 说明                     | 回调参数                   |
| ------ | ------ | ------ |
|  callback           | 微信授权成功wx.ready成功之后执行的callback函数             |   wx对象                  |


