import wx from 'weixin-js-sdk';
import request from './api';

/**
 * 处理微信分享参数：wx_code，没有 => 添加，有 => 替换；
 * 值：当前页面的 pseudo_session
 * @param {string} url 
 */
const doWithWxCode = (url) => {
	const pseudoSession = window && window.localStorage.getItem('PSEUDO_SESSION');

	if (url.indexOf('wx_code') !== -1) {
		url = url.replace(/(wx_code=).*?(&|$)/, `$1${pseudoSession}$2`);
	} else {
		const hasParams = url.indexOf('?') !== -1;

		url = hasParams ? `${url}&wx_code=${pseudoSession}` : `${url}?wx_code=${pseudoSession}`;
	}
	return encodeURIComponent(url);
}

const WutaoWxShare = (options, callback) => {
	// options可以接收的参数，可以扩展
	let {
		baseUrl = 'https://wutao.com',
		authUrl = window.location.href,
		isEncode = true, // 是否需要转码
		isDebug = false,
		jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage'],
		type = ''
	} = options;
	// authUrl = doWithWxCode(authUrl);
	authUrl = isEncode ? encodeURIComponent(authUrl) : authUrl;

	let url = '';
	if(type){
		url = `${baseUrl}/wechats/signs?url=${authUrl}&type=${type}`;
	}else{
		url = `https://wutao.com/wechats/signs?url=${authUrl}`;
	}

	request({ url }).then(res => {
		try{
			const signMap = res.data.signMap;
			const {
				appId,
				timestamp,
				nonceStr,
				signature
			} = signMap;
			wx.config({
				debug: isDebug, // 开启调试模式。
				appId: appId, // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: signature, // 必填，签名
				jsApiList: jsApiList
			});
			wx.ready(() => {
				if(callback) callback(wx);
			});
			wx.error(res => {
				console.log('error====>>>>', res);
			});
		}catch(err){
			console.log('网络异常',err);
		}
	});

}

export default WutaoWxShare;