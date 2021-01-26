<template>
	<view class="error" :class="[theme]">
		
		<nav-bar text="出错啦~" :isBackground="true" :isBorder="true">
			<template #left>
				<view class="g-left-box pointer" @click="$utils.back()"><text class="iconfont">&#xe6ab;</text></view>
			</template>
		</nav-bar>
		
		<view class="box container2 flex-y-c">
			<text class="img-box"></text>
			<text class="tip two-line">error: {{msg}}~</text>
			<text class="back-btn flex-c" @click="$utils.back()">返回</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'error',
		data() {
			return {
				uni: uni, // uni实例
				error: {
					'401': '非法访问',
					'403': '没有权限',
					'404': '请求资源不存在',
					'500': '操作失败',
					'4000': '登录失败',
					'5000': '系统异常',
					'5001': '请求参数校验异常',
					'5002': '请求参数解析异常',
					'5003': '请求参数校验异常',
					'5004': '请求参数校验异常',
					'5005': 'HTTP Media 类型异常',
					'5006': '路径不存在，请检查路径是否正确',
					'5007': '数据重复，请检查后提交',
					'5008': '数据绑定异常',
					'5009': '超过最大上传数量',
					'5100': '系统处理异常',
					'5101': '业务处理异常',
					'5102': '数据库处理异常',
					'5103': '验证码校验异常',
					'5104': '登录授权异常',
					'5105': '登录授权异常',
					'5106': '没有访问权限',
					'5200': '用户不存在',
					'5201': '用户需要登录',
					'5202': 'TOKEN错误--失效',
					'5203': 'TOKEN错误--数据错误',
					'5204': '用户被禁用',
					'default': '糟糕，出错啦'
				},
				code: null,
				msg: null
			};
		},
		onLoad(options) {
			
			this.code = options.code || 'default';
			this.msg = options.msg || '糟糕，出错啦';
			
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

	.error {
		.g-left-box {
			margin-right: 15px;
		}
		.box {
			flex-direction: column;
			padding: 80px 0;
			.img-box {
				height: 275px;
				width: 340px;
			}
			.tip {
				margin: 30px 12px 65px;
				font-size: 16px;
				font-weight: 600;
				letter-spacing: 2px;
				word-break: break-all;
			}
			.back-btn {
				height: 45px;
				width: 172px;
				border-radius: 45px;
				font-size: 15px;
			}
		}
	}
	
	.setColor(@color) {
		.error.@{color} {
			.g-left-box {
				color: ~"@{@{color}-rule-bright}";
			}
			.box {
				.img-box {
					background-color: ~"@{@{color}-main}";
				}
				.tip {
					color: ~"@{@{color}-main}";
				}
				.back-btn {
					color: ~"@{@{color}-fore}";
					background-color: ~"@{@{color}-main}";
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
