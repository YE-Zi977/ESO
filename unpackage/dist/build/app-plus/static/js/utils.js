class Utils {
	
	constructor() {
			
		this.Test  = true,                                                 // 是否测试环境
		this.debug = false,                                                // 是否开启本地调试模式
		this.config = {
			debugToken: '',                                                // 调试模式token
			debugId: '',                                                   // 调试模式id 
			baseUrl: this.Test ? 'motosheep.xyz' : 'motosheep.xyz',                     // 域名
			appid: '',                                                     // 微信appid
			LoginCallBackUrl: '',                                          // 微信授权回调登录页
		}
		
	}
	
	// 验证手机号
	testPhone(phone) {
		let reg = /^1[3456789]\d{9}$/;
		return reg.test(phone);
	}
	
	// 消息提示 this -> uni
	toast(title, icon = 'none') {
		this.showToast({
		    title,
			icon,
		    position: 'center'
		});
	}
	
	// 加载动画 this -> uni
	loading(title, outTime = 6000) {
		
		this.showLoading({ title, mask: true })

		return setTimeout(() => {
			this.hideLoading();
			this.showToast({title: '糟糕，请求超时了~', icon: 'none', position: 'center'});
		}, outTime); // 请求超时时间
	}
	
	// 路由跳转 this -> uni
	toPage(url, key = 'navigateTo', callback) {
		
		if (!url) return this.showToast({title: '功能还未开通~', icon: 'none', position: 'center'});
		
		this[key]({
			url,
			success: callback
		})
		
	}
	
	// 发起请求
	request(options) {
		
		options.uni.request({
			url: 'https://' + this.config.baseUrl + options.url,
			method: options.methods ? 'GET' : 'POST',
			data: options.data,
			header: {
				token: options.uni.getStorageSync('token') || '',
				id: options.uni.getStorageSync('id') || '',
				ref: 'nocheck'
			},
			success: (res) => {
				
				let data = res.data;
				this.log('========= ' + options.url +  ' =========');
				this.log('data => ', data);
				this.log('========= ' + data.code + ' end =========');
				
				options.callback && options.callback(data); // 不管成功失败执行的回调
				switch(data.code * 1) {
					case 200: // 成功
						options.success && options.success(data); // 成功的回调
						break;
					case 401: // 非法访问
					case 403: // 没有权限
					case 404: // 请求资源不存在
					case 500: // 操作失败
					case 5000: // 系统异常
					case 5106: // 没有访问权限
					case 5006: // 路径不存在，请检查路径是否正确
						if (options[data.code]) {
							options[data.code](data);
						}else if (this.Test) {
							this.toast.call(options.uni, '错误码：' + data.code + ' => ' + data.msg);
						}else {
							if (options.showErrorType === 2) this.toast.call(options.uni, data.msg);
							else this.toPage.call(options.uni, '/pages/error/error?code=' + data.code + '&msg=' + data.msg, 'redirectTo');
						}
						break;
					case 4000: // 登录失败
					case 5009: // 超过最大上传数量
					case 5103: // 验证码校验异常
					case 5104: // 登录授权异常
					case 5105: // 登录授权异常
					case 5200: // 用户不存在
					case 5007: // 数据重复，请检查后提交
						if (this.Test) this.toast.call(options.uni, '错误码：' + data.code + ' => ' + data.msg);
						else this.toast.call(options.uni, data.msg);
						break;
					case 5001: // 请求参数校验异常
					case 5002: // 请求参数解析异常
					case 5003: // 请求参数校验异常
					case 5004: // 请求参数校验异常
					case 5005: // HTTP Media 类型异常
					case 5008: // 数据绑定异常
					case 5100: // 系统处理异常
					case 5101: // 业务处理异常
					case 5102: // 数据库处理异常
						if (this.Test) {
							this.toast.call(options.uni, '错误码：' + data.code + ' => ' + data.msg);
						}else {
							if (options.showErrorType === 2) this.toast.call(options.uni, '系统异常');
							else this.toPage.call(options.uni, '/pages/error/error?code=' + data.code + '&msg=系统异常', 'redirectTo');
						}
						break;
					case 5201: // 用户需要登录
					case 5202: // TOKEN错误--失效
					case 5203: // TOKEN错误--数据错误
					case 5204: // 用户被禁用
						options.uni.showModal({
							title: data.code === 5201 ? '还未登录' : data.code === 5204 ? '账号不可用' : '登录信息不可用',
							content: data.code === 5201 ? '登录后可进行更多操作，快去登录吧~' : data.code === 5204 ? '当前账号不可用，请切换账号~' : '登录信息过期或不可用，请重新登录~',
							confirmText: data.code === 5201 ? '去登录' : data.code === 5204 ? '切换账号' : '重新登录',
							success: res => {
								if (res.confirm) this.toPage.call(options.uni, '/pages/user-login/user-login');
								else if (options.showErrorType === 1) this.back();
							}
						});
						break;
					default:
						if (this.Test) this.toast.call(options.uni, '错误码：' + data.code + ' => ' + data.msg);
						else this.toast.call(options.uni, data.msg);
						break;	
				}
				
				if (data.code != 200) options.fail && options.fail(data); // 失败的回调
				
			},
			fail: (res) => {
				options.callback && options.callback(res); // 不管成功失败执行的回调
				options.fail && options.fail(res); // 失败的回调
			}
		});
			
	}
	
	// 控制台输出
	log() {
		if (this.Test) console.log(...arguments);
	}
	
	// 获取用户信息
	getUserInfo(uni, type = 1) {
		return new Promise((resolve, reject) => {
			
			let memberId = uni.getStorageSync('id') || '';
			if (memberId) {
				this.request({
					uni, 
					url: '/eso/user/info',
					data: {
						memberId
					},
					showErrorType: type,
					success: res => {
						resolve(res);
					},
					fail: () => {
						resolve(false);
					}
				})
			}else {
				resolve(false);
			}
			
		})
	}
	
	// 清除本地存储 this -> uni
	clearStorage() {
					
		let whiteList = [];
		// #ifndef H5
		whiteList = ['once_time'];
		// #endif
		// #ifdef H5
		whiteList = [];
		// #endif
		let keys = this.getStorageInfoSync().keys;
		
		keys.forEach((key) => {
				
			if (whiteList.indexOf(key) <= -1) this.removeStorageSync(key);
			
		})
		
	}
	
}

export const utils = new Utils()