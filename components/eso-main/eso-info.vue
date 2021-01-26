<template>
	<view class="info" :class="[theme]">
		
		<nav-bar text="消息" :isBackground="true" :isBorder="true">
			<template #right>
				<view class="g-icon-box flex-y-c">
					<text class="icon pointer iconfont">&#xe621;</text>
					<text class="icon pointer iconfont">&#xe626;</text>
				</view>
			</template>
		</nav-bar>
		
		<view class="container4">
			
			<view class="head-box flex-y-c">
				<view class="item flex-y-c pointer unread">
					<image src="@/static/icon/info_hd.svg" mode="aspectFill"></image>
					<text>互动消息</text>
				</view>
				<view class="item flex-y-c pointer">
					<image src="@/static/icon/info_zs.svg" mode="aspectFill"></image>
					<text>易搜钻</text>
				</view>
				<view class="item flex-y-c pointer unread">
					<image src="@/static/icon/info_tx.svg" mode="aspectFill"></image>
					<text>其他提醒</text>
				</view>
			</view>
			
			<scroll-box class="cont" :styleOptions="{height: 'calc(100% - 120px)'}">
				<view class="g-title flex-y-c">
					<text>易信</text>
					<text class="active">新消息</text>
				</view>
				<view>
					<view class="item flex-y-c pointer" v-for="item in 10" :key="item">
						<view class="avatar">
							<eso-img class="auto-img" src="../../static/images/banner5.jpg"></eso-img>
							<text class="count flex-c">99</text>
						</view>
						<view class="right-box">
							<view class="flex-y-c">
								<view class="left-box flex-y-c">
									<text class="name overflow">帅气每一天@</text>
									<image class="tag" src="@/static/icon/info_tag_gf.svg" mode="aspectFill"></image>
									<image class="tag" src="@/static/icon/info_tag_gf.svg" mode="aspectFill"></image>
									<image class="tag" src="@/static/icon/info_tag_gf.svg" mode="aspectFill"></image>
								</view>
								<text class="time">11-20 12:02</text>
							</view>
							<view class="desc overflow">第三方发送第三方发送第三方发送第三方发送第三方发送第三方发送第三方发送第三方发送第三方发送第三方发送</view>
						</view>
					</view>
				</view>
			</scroll-box>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'info',
		data() {
			return {
				uni: uni, // uni实例
			}
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
				
			// 获取数据
			getData() {
				
				this.$utils.log('获取数据 info');
				
			},
			
		}
	}
</script>

<style lang="less">

	.setColor(@color) {
		.info.@{color} { 
			.g-icon-box {
				justify-content: space-between;
				width: 60px;
				color: ~"@{@{color}-rule-bright}";
				.icon {
					font-size: 18px;
				}
			}
			.head-box {
				justify-content: space-around;
				height: 110px;
				margin-bottom: 10px;
				background-color: ~"@{@{color}-fore}";
				.item {
					flex-direction: column;
					font-size: 14px;
					color: ~"@{@{color}-rule-dark}";
					image {
						width: 35px;
						height: 35px;
						margin-bottom: 10px;
					}
					&.unread text {
						position: relative;
						&::after {
							content: '';
							position: absolute;
							top: 0;
							right: -2px;
							transform: translateX(100%);
							width: 8px;
							height: 8px;
							border-radius: 50%;
							border: 1px solid ~"@{@{color}-fore}";
							background-color: ~"@{@{color}-main}";
						}
					}
				}
			}
			.cont {
				.g-title {
					justify-content: space-between;
					height: 50px;
					padding: 0 12px;
					font-size: 15px;
					color: ~"@{@{color}-rule-dark}";
					background-color: ~"@{@{color}-fore}";
					.active {
						color: ~"@{@{color}-main-bright}";
					}
				}
				.item {
					padding: 0 12px;
					background-color: ~"@{@{color}-fore}";
					.avatar {
						position: relative;
						width: 40px;
						height: 40px;
						margin-right: 6px;
						.auto-img {
							border-radius: 50%;
							overflow: hidden;
						}
						.count {
							position: absolute;
							top: -6px;
							right: -6px;
							transform: scale(10 / 12);
							width: 18px;
							height: 18px;
							border-radius: 50%;
							border: 1px solid ~"@{@{color}-fore}";
							font-size: 12px;
							color: ~"@{@{color}-fore}";
							background-color: ~"@{@{color}-main}";
						}
					}
					.right-box {
						width: calc(100% - 46px);
						padding: 15px 6px;
						padding-right: 0;
						border-bottom: 1px solid ~"@{@{color}-sub}";
						.left-box {
							flex: 1;
							.name {
								max-width: 150px;
								font-size: 14px;
								color: ~"@{@{color}-rule-dark}";
							}
							.tag {
								width: 15px;
								height: 15px;
								margin-left: 5px;
							}
						}
						.time {
							transform: scale(10 / 12);
							font-size: 12px;
							color: ~"@{@{color}-rule-bright}";
						}
						.desc {
							padding-top: 5px;
							font-size: 12px;
							color: ~"@{@{color}-rule-bright}";
						}
					}
					&:last-child .right-box {
						border-bottom: none;
					}
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
