<template>
	<view class="fast-login container1" :class="[theme]">
		
		<!-- #ifndef H5 -->
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- #endif -->
		
		<view class="back-arrow pointer flex-c" @click="$utils.back()"><text class="iconfont">&#xe6ab;</text></view>
		
		<view class="head-logo flex-c">
			<view class="logo flex-c">
				<image style="width: 35px; height: 35px;" src="../../static/images/logo.svg" mode="aspectFill"></image>
				<view class="text"><image style="width: 75px; height: 38px; margin-top: -2px; margin-left: -8px;" src="../../static/images/logo_text2.svg" mode="aspectFill"></image></view>
			</view>
			<view class="right-box flex">
				<text>一个优质的交流社区</text>
				<text>易搜已支持<text class="tag">IPv6</text></text>
			</view>
		</view>
			
		<view class="login-box flex-y-c">
			<text class="phone">157****1249</text>
			<text class="toggle pointer">切换账号</text>
			<view class="login-btn pointer flex-c" :class="[isAgree ? 'active' : '']">一键登录</view>
			<text class="tip">中国移动提供验证服务</text>
		</view>
			
		<view class="agreement flex-x-c">
			<text class="icon flex-c pointer" :class="[isAgree ? 'check' : '']" @click="isAgree = !isAgree"><text class="iconfont" v-show="isAgree">&#xe631;</text></text>
			<text class="text">登录即同意<text class="bright pointer">用户协议</text>和<text class="bright pointer">中国移动认证服务条款</text>、<text class="bright pointer">隐私政策</text>并使用本机号码登录</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'fastLogin',
		data() {
			return {
				uni: uni, // uni实例
				isAgree: true,
				msg: 'fast-login'	
			};
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
			
			
			
		}
	}
</script>

<style lang="less">
	
	.fast-login{
		position: relative;
		/* #ifndef H5 */
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		/*  #endif  */
		.back-arrow {
			width: 30px;
			height: 30px;
			margin-top: 10px;
			margin-left: 12px;
			.iconfont {
				font-size: 20px;
			}
		}
		.head-logo {
			width: 100%;
			margin-top: 75px;
			.logo {
				width: 87px;
				height: 50px;
				padding-right: 7px;
				border-radius: 8px;
				.text {
					height: 22px;
					width: 42px;
					overflow: hidden;
				}
			}
			.right-box {
				flex-direction: column;
				margin-left: 15px;
				font-size: 14px;
				line-height: 22px;
				.tag {
					margin-left: 3px;
					padding: 0 4px;
					border-radius: 25px;
					font-size: 12px;
				}
			}
		}
		.login-box {
			flex-direction: column;
			position: absolute;
			top: 50%;
			transform: translateY(-30%);
			left: 0;
			width: 100%;
			padding: 15px 12px;
			.phone {
				font-size: 22px;
				font-weight: 500;
			}
			.toggle {
				padding: 15px 0 55px;
				font-size: 14px;
			}
			.login-btn {
				width: 290px;
				height: 40px;
				border-radius: 40px;
				font-size: 15px;
				opacity: .55;
				&.active {
					opacity: 1;
				}
			}
			.tip {
				padding-top: 25px;
				font-size: 12px;
			}
		}
		.agreement {
			position: absolute;
			left: 0;
			bottom: 25px;
			width: 100%;
			font-size: 12px;
			.text {
				width: 310px;
				line-height: 20px;
			}
			.icon {
				width: 18px;
				height: 18px;
				margin-top: 2px;
				margin-right: 6px;
				border-radius: 2px;
				font-size: 12px;
				color: #ffffff;
				&.check {
					border-color: #4076ff;
					background-color: #4076ff;
				}
			}
		}
	}
	
	.setColor(@color) {
		.fast-login.@{color} {
			background-color: ~"@{@{color}-fore}";
			/* #ifndef H5 */
			.status_bar {
				background-color: ~"@{@{color}-fore}";
			}
			/*  #endif  */
			.back-arrow {
				color: ~"@{@{color}-rule-bright}";
			}
			.head-logo {
				.logo {
					border: 1px solid ~"@{@{color}-sub}";
				}
				.right-box {
					color: ~"@{@{color}-rule-bright}";
					.tag {
						border: 1px solid ~"@{@{color}-sub}";
					}
				}
			}
			.login-box {
				.phone {
					color: ~"@{@{color}-rule-dark}";
				}
				.toggle {
					color: ~"@{@{color}-main}";
				}
				.login-btn {
					color: ~"@{@{color}-fore}";
					background-color: ~"@{@{color}-main}";
				}
				.tip {
					color: ~"@{@{color}-rule-bright}";
				}
			}
			.agreement {
				color: ~"@{@{color}-rule-dark}";
				.text {
					.bright {
						color: ~"@{@{color}-rule-bright}";
					}
				}
				.icon {
					border: 1px solid ~"@{@{color}-sub}";
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
