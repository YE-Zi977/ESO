<template>
	<view class="user-login container1" :class="[theme]">
		
		<!-- #ifndef H5 -->
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- #endif -->
		
		<view class="g-close flex"><text @click="$utils.back()" class="iconfont flex-c pointer">&#xe620;</text></view>
		
		<view class="login-box flex-y-c">
			<text class="title">{{loginType == 2 ? '手机验证码登录' : '账号密码登录'}}</text>
			<view class="input-group">
				<template v-if="loginType == 2">
					<view class="flex-y-c relative" :class="[isPhone ? 'success' : showMsg2 ? 'msg1-1 error' : 'error']">
						<input class="input" v-model="phone" placeholder="请输入手机号" type="number" @blur="isFocus = false" @focus="isFocus = true" />
					</view>
					<view class="flex-y-c relative" :class="[isCode ? 'success' : showMsg2 ? 'msg2-2 error' : 'error']">
						<input class="input" v-model="code" placeholder="请输入验证码" type="number" @blur="isFocus = false" @focus="isFocus = true" />
						<text @click="getCode" class="get-code flex-c pointer" :class="[isPhone && codeText === '获取验证码' ? 'active' : '']">{{codeText}}</text>
					</view>
				</template>
				<template v-else>
					<view class="flex-y-c relative" :class="[isUsername ? 'success' : showMsg ? 'msg1 error' : 'error']">
						<input class="input" v-model="username" placeholder="请输入用户名/手机号/邮箱" @blur="isFocus = false" @focus="isFocus = true" />
					</view>
					<view class="flex-y-c relative" :class="[isPassword ? 'success' : showMsg ? 'msg2 error' : 'error']">
						<input class="input" v-model="password" placeholder="请输入密码" :password="true" @blur="isFocus = false" @focus="isFocus = true" />
					</view>
				</template>
			</view>
			<text class="login-btn pointer flex-c" :class="[(loginType != 2 && isUsername && isPassword) || (loginType == 2 && isPhone && isCode) ? 'active' : '']" @click="login">登录</text>
			<view class="other flex-y-c"><text class="pointer" @click="loginToggle">{{loginType == 2 ? '账号密码登录' : '手机验证码登录'}}</text><text class="line"></text><text class="pointer">登录遇到问题</text></view>
		</view>
		
		<view class="other-login flex-y-c" v-show="!isFocus">
			<text class="title flex-c">社交账号直接登录</text>
			<view class="list flex">
				<view class="item wx flex-c" @click="$utils.toPage.call(uni, null)">
					<text class="iconfont">&#xe601;</text>
					<text>微信</text>
				</view>
				<view class="item qq flex-c" @click="$utils.toPage.call(uni, null)">
					<text class="iconfont">&#xe600;</text>
					<text>QQ</text>
				</view>
				<view class="item wb flex-c" @click="$utils.toPage.call(uni, null)">
					<text class="iconfont">&#xe602;</text>
					<text>微博</text>
				</view>
			</view>
			<text class="tip flex-c">{{loginType == 2 ? '未注册的手机号登录时将自动注册，且代表' : '登录代表'}}您已经同意<text class="pointer" @click="$utils.toPage.call(uni, null)">用户协议</text>和<text class="pointer" @click="$utils.toPage.call(uni, null)">隐私协议</text></text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'userLogin',
		data() {
			return {
				uni: uni, // uni实例
				loginType: 1, // 登录方式 1(默认): 用户名密码 2: 手机验证码
				username: null, // 用户名
				password: null, // 密码
				showMsg: false, // 是否显示错误提示
				phone: null, // 手机号
				code: null, // 验证码
				showMsg2: false, // 是否显示错误提示
				codeText: '获取验证码', // 获取验证码按钮文字
				isFocus: false, // 是否获取到焦点
			};
		},
		computed: {
			// 用户名是否正确
			isUsername() {
				let len = (this.username || '').trim().length;
				return len >= 4 && len <= 40
			},
			// 密码是否正确
			isPassword() {
				let len = (this.password || '').trim().length;
				return len >= 6 && len <= 40
			},
			// 手机号是否正确
			isPhone() {
				return this.$utils.testPhone((this.phone || '').trim());
			},
			// 验证码是否正确
			isCode() {
				let len = (this.code || '').trim().length;
				return len >= 4 && len <= 8
			},
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
			
			// 获取验证码
			getCode () {
				
				if (!this.isPhone) this.$utils.toast.call(uni, '请输入正确的手机号~');
				else if (this.codeText !== '获取验证码') this.$utils.toast.call(uni, '请勿频繁操作~');
				else {
					// 获取验证码
					this.timer && clearTimeout(this.timer);
					this.timer = this.$utils.loading.call(uni, '发送中');
					
					this.$utils.request({
						uni,
						url: '/eso/user/sendSms',
						data: {
							phone: (this.phone || '').trim()
						},
						showErrorType: 2,
						success: res => {
							this.$utils.toast.call(uni, res.msg);
							let time = 45;
							
							this.codeText = time + '秒后重新获取';
							this.timer2 && clearInterval(this.timer2);
							this.timer2 = setInterval(() => {
									
								this.codeText = (--time) + '秒后重新获取';
								
								if (time < 0) { this.codeText = '获取验证码'; clearInterval(this.timer2); }
								
							}, 1000);
						},
						callback: () => {
							uni.hideLoading();
							clearTimeout(this.timer);
						}
					})
				}
				
			},
			
			// 登录
			login() {
					
				if ((this.loginType != 2 && this.isUsername && this.isPassword) || (this.loginType == 2 && this.isPhone && this.isCode)) {
					// 登录
					this.timer && clearTimeout(this.timer);
					this.timer = this.$utils.loading.call(uni, '登录中');
					
					this.$utils.request({
						uni,
						url: '/eso/user/login',
						data: this.loginType == 2 ? {
							type: 1,
							key: (this.phone || '').trim(),
							smsCode: (this.code || '').trim()
						} : {
							type: 2,
							key: (this.username || '').trim(),
							password: (this.username || '').trim()
						},
						showErrorType: 2,
						success: res => {
								
							this.$utils.toast.call(uni, res.msg);
							
							// 本地存储
							this.$utils.clearStorage.call(uni); // 先清除
							uni.setStorageSync('id', res.data.memberId);
							uni.setStorageSync('token', res.data.memberToken);
							
							this.$utils.back();
							
						},
						callback: () => {
							uni.hideLoading();
							clearTimeout(this.timer);
						}
					})
					
				}else {
					
					if (this.loginType == 2) {
						this.showMsg2 = true;
						this.$utils.toast.call(uni, !this.isPhone ? '请输入正确的手机号' : !this.isCode ? '请输入正确格式的验证码' : '');
						return;
					}
					
					this.showMsg = true;
					this.$utils.toast.call(uni, !this.isUsername ? '请输入正确的用户名' : !this.isPassword ? '请输入正确格式的密码' : '');
					
				}
				
			},
			
			
			// 登录方式切换
			loginToggle() {
				
				this.loginType = this.loginType == 2 ? 1 : 2;
				
				// #ifdef H5
				this.$utils.toPage.call(uni, '/pages/user-login/user-login?type=' + this.loginType, 'redirectTo');
				// #endif
			}
			
		},
		onLoad(options) {
			
			this.loginType = options.type || 1;
			
		},
		onUnload() {
			
			this.timer && clearTimeout(this.timer);
			this.timer2 && clearTimeout(this.timer2);
			
		}
	}
</script>

<style lang="less">
	
	.user-login {
		position: relative;
		/* #ifndef H5 */
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		/* #endif */
		.g-close {
			/* #ifndef MP */
			justify-content: flex-end;
			/* #endif */
			width: 100%;
			padding: 10px 12px;
			.iconfont {
				width: 35px;
				height: 35px;
				font-size: 18px;
				font-weight: 600;
			}
		}
		.login-box {
			flex-direction: column;
			width: 100%;
			padding: 40px 12px 0;
			.title {
				font-size: 22px;
				letter-spacing: 2px;
			}
			.input-group {
				position: relative;
				padding: 30px 0 35px;
				.flex-y-c {
					height: 45px;
					width: 290px;
					&.error {
						border-bottom: 1px solid #ff0000;
					}
					&.msg1::after {
						content: '用户名不正确!';
						position: absolute;
						bottom: -22px;
						right: 0;
						font-size: 12px;
						color: #ff0000;
					}
					&.msg2::after {
						content: '密码格式不正确!';
						position: absolute;
						bottom: -22px;
						right: 0;
						font-size: 12px;
						color: #ff0000;
					}
					&.msg1-1::after {
						content: '手机号不正确!';
						position: absolute;
						top: 0;
						right: 0;
						font-size: 12px;
						color: #ff0000;
					}
					&.msg2-2::after {
						content: '验证码格式不正确!';
						position: absolute;
						bottom: -22px;
						right: 0;
						font-size: 12px;
						color: #ff0000;
					}
					&.success {
						border-bottom: 1px solid #3a74ff;
					}
					.input {
						flex: 1;
						font-size: 14px;
					}
					.get-code {
						height: 100%;
						width: 80px;
						padding: 0 10px;
						font-size: 12px;
					}
				}
			}
			.login-btn {
				width: 290px;
				height: 40px;
				margin-bottom: 30px;
				border-radius: 40px;
				font-size: 15px;
				opacity: .55;
				&.active {
					opacity: 1;
				}
			}
			.other {
				font-size: 14px;
				color: #4e6b9d;
				.line {
					height: 18px;
					width: 1px;
					margin: 0 12px;
				}
			}
		}
		.other-login {
			flex-direction: column;
			position: absolute;
			bottom: 12px;
			left: 0;
			width: 100%;
			padding: 0 12px;
			.title {
				font-size: 12px;
			}
			.list {
				align-items: center;
				padding: 25px 0 45px;
				.item {
					margin-right: 25px;
					font-size: 14px;
					cursor: pointer;
					&:last-child {
						margin-right: 0;
					}
					&.wx> .iconfont {
						margin-right: 5px;
						font-size: 28px;
						color: #9fdf5e;
					}
					&.qq> .iconfont {
						margin-right: 5px;
						font-size: 28px;
						color: #67c6ff;
					}
					&.wb> .iconfont {
						margin-right: 5px;
						font-size: 30px;
						color: #f58671;
					}
				}
			}
			.tip {
				width: 290px;
				font-size: 12px;
				text-align: center;
				.pointer {
					padding: 0 2px;
					color: #109d8f;
					text-decoration: underline;
				}
			}
		}
	}
	
	.setColor(@color) {
		.user-login.@{color} {
			background-color: ~"@{@{color}-fore}";
			/* #ifndef H5 */
			.status_bar {
				background-color: ~"@{@{color}-fore}";
			}
			/* #endif */
			.g-close {
				.iconfont {
					color: ~"@{@{color}-rule-bright}";
				}
			}
			.login-box {
				.title {
					color: ~"@{@{color}-rule-dark}";
				}
				.input-group {
					.flex-y-c {
						.input {
							color: ~"@{@{color}-rule-dark}";
						}
						.input-placeholder {
							color: ~"@{@{color}-rule-bright}";
						}
						.get-code {
							color: ~"@{@{color}-rule-bright}";
							&.active {
								color: ~"@{@{color}-main}";
							}
						}
					}
				}
				.login-btn {
					color: ~"@{@{color}-fore}";
					background-color: ~"@{@{color}-main}";
				}
				.other {
					.line {
						background-color: ~"@{@{color}-rule-bright}";
					}
				}
			}
			.other-login {
				.title {
					color: ~"@{@{color}-rule-bright}";
					&::before {
						content: '';
						width: 32px;
						height: 1px;
						margin-right: 10px;
						background-color: ~"@{@{color}-rule-bright}";
						opacity: .65;
					}
					&::after {
						content: '';
						width: 32px;
						height: 1px;
						margin-left: 10px;
						background-color: ~"@{@{color}-rule-bright}";
						opacity: .65;
					}
				}
				.list {
					.item {
						color: ~"@{@{color}-rule-dark}";
					}
				}
				.tip {
					color: ~"@{@{color}-rule-bright}";
				}
			}
		}
	}
	

	.loop(@i) when (@i < length(@themeList)+1){
		.setColor(extract(@themeList, @i));
		.loop(@i+1);
	}
	.loop(1);

</style>
