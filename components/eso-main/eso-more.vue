<template>
	<view class="more" :class="[theme]">
		
		<view class="g-top-box">
			
			<!-- #ifndef H5 -->
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<!-- #endif -->
			
			<view class="bottom-box">
				<!-- #ifdef MP -->
				<view class="flex-y-c" :style="[{width: 'calc(100% - ' + (uni.getMenuButtonBoundingClientRect().width + 5) + 'px)'}]">
				<!-- #endif -->
				<!-- #ifndef MP -->
				<view class="flex-y-c" :style="[{width: '100%'}]">
				<!-- #endif -->
					<text class="icon iconfont pointer">&#xe61a;</text>
					<view class="nav flex-y-c">
						<view class="line" :style="[{left}]"></view>
						<view @click="toggle(idx)" class="item pointer" :class="[index === idx ? 'active' : '']" v-for="(item, idx) in tab" :key="idx">{{item.title}}</view>
					</view>
					<text class="icon iconfont pointer">&#xe626;</text>
				</view>
			</view>
			
		</view>
		
		<swiper class="swiper" :current="index" @change="handleChange" @transition="handleTransition" @animationfinish="handleAnimationfinish">
			
			<swiper-item v-for="item in tabList" :key="item.id">
				<swiper class="v-swiper" :current="item.idx" vertical circular :duration="150" @change="toggleVedio()">
					<swiper-item class="c1 relative">
						<view class="g-right-box flex-y-c">
							<view class="avatar pointer" @click="$emit('openHome', {module: 'zy', parmas: {id: 1}})">
								<text class="tag flex-c">+</text>
							</view>
							<view class="icon-box flex-y-c pointer">
								<text class="icon iconfont">&#xe61b;</text>
								<text>122.3w</text>
							</view>
							<view class="icon-box flex-y-c pointer" @click="$emit('openTalk', {module: 'pl', parmas: {id: 1}})">
								<text class="icon iconfont">&#xe619;</text>
								<text>12.4w</text>
							</view>
							<view class="icon-box flex-y-c pointer">
								<text class="icon iconfont">&#xe61c;</text>
								<text>4.5k</text>
							</view>
						</view>
						
						<view class="g-bottom-box">
							<view class="info flex">
								<view class="left-box flex">
									<text class="name overflow">@帅气每一天@</text>
									<text class="desc two-line">没有比这更网易云的文案……</text>
									<view class="music flex-y-c">
										<text class="icon iconfont flex-c">12</text>
										<view class="play"><text>sdfdsfffffffffff广东股份个梵蒂冈</text></view>
									</view>
								</view>
								<view class="right-box">
									<view class="in-box">
										
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="c2 relative">
						<view class="g-right-box flex-y-c">
							<view class="avatar pointer" @click="$emit('openHome', {module: 'zy', parmas: {id: 1}})">
								<text class="tag flex-c">+</text>
							</view>
							<view class="icon-box flex-y-c pointer">
								<text class="icon iconfont">&#xe61b;</text>
								<text>122.3w</text>
							</view>
							<view class="icon-box flex-y-c pointer" @click="$emit('openTalk', {module: 'pl', parmas: {id: 1}})">
								<text class="icon iconfont">&#xe619;</text>
								<text>12.4w</text>
							</view>
							<view class="icon-box flex-y-c pointer">
								<text class="icon iconfont">&#xe61c;</text>
								<text>4.5k</text>
							</view>
						</view>
						
						<view class="g-bottom-box">
							<view class="info flex">
								<view class="left-box flex">
									<text class="name overflow">@帅气每一天@</text>
									<text class="desc two-line">没有比这更网易云的文案……</text>
									<view class="music flex-y-c">
										<text class="icon iconfont flex-c">12</text>
										<view class="play"><text>sdfdsfffffffffff广东股份个梵蒂冈</text></view>
									</view>
								</view>
								<view class="right-box">
									<view class="in-box">
										
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</swiper-item>
			
		</swiper>

	</view>
</template>

<script>
	export default {
		name: 'more',
		model: {
			prop: 'index',
			event: 'change'
		},
		props: {
			index: {
				type: [Number, String],
				default() {
					return 0
				}
			}
		},
		data() {
			return {
				uni, // uni实例
				tab: [
					{title: '同城', type: 1},
					{title: '关注', type: 2},
					{title: '推荐', type: 3}
				],
				endIndex: 0,
				left: 0,
				pro: 1,
				tabList: [
					{id: 1, idx: 0, vID: 0},
					{id: 2, idx: 0, vID: 0},
					{id: 3, idx: 0, vID: 0}
				]
			}
		},
		created() {
			this.endIndex = this.index;
		},
		mounted() {
				
			this.left = 100 / this.tab.length * (this.endIndex + .5) + '%';
			
			try {
			    const systemInfo = uni.getSystemInfoSync();
				this.pro = 210 / systemInfo.windowWidth;
			} catch (e) {
			    // error
			}
			
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
			
			// 获取数据
			getData(idx) {
					
				this.$utils.log('获取数据 more ', idx);
				
			},
			
			// 处理v-swiper @change事件
			toggleVedio() {},
			
			// 处理swiper @change事件
			handleChange({ detail }) {
				
				if (detail.source === 'touch') this.$emit('change', detail.current);
				
			},
				
			// 处理swiper @transition事件
			handleTransition({ detail }) {
				
				if (this.endIndex === 2 && detail.dx > 0) return this.$emit('openHome', {module: 'zy', parmas: {id: 1}})
				if (this.endIndex === 0 && detail.dx < 0) return
				this.left = 'calc(' + (100 / this.tab.length * (this.endIndex + .5) + '%') + ' + ' + detail.dx / this.tab.length * this.pro + 'px)';
				
			},
			// 处理swiper @animationfinish事件
			handleAnimationfinish({ detail }) {
				
				this.endIndex = detail.current;
				this.left = 100 / this.tab.length * (this.endIndex + .5) + '%';
				
			},
			
			// tab切换
			toggle(index) {
					
				if (index == this.index) return 
				
				this.$emit('change', index);
				
			}
		},
		beforeDestroy() {
			
			this.timer && clearTimeout(this.timer);
			
		}
	}
</script>

<style lang="less">

	.setColor(@color) {
		.more.@{color} { 
			position: relative;
			background-color: ~"@{@{color}-live-main}";
			overflow: hidden;
			.g-top-box {
				position: absolute;
				top: 0;
				width: 100%;
				z-index: 99;
				/* #ifndef H5 */
				.status_bar {
					height: var(--status-bar-height);
					width: 100%;
					background-color: transparent;
				}
				/*  #endif  */
				.bottom-box {
					position: relative;
					height: 50px;
					/* #ifndef MP */
					padding: 0 10px 4px;
					/*  #endif  */
					/* #ifdef MP */
					padding: 0 20px 4px;
					/*  #endif  */
					border-bottom: 1px solid ~"@{@{color}-live-rule-bright}";
					font-size: 16px;
					text-shadow: rgba(0, 0, 0, .5) 2px 2px 4px;
					color: ~"@{@{color}-live-rule-bright}";
					.flex-y-c {
						justify-content: space-between;
						.nav {
							justify-content: space-around;
							position: relative;
							height: 45px;
							width: 210px;
							font-weight: 600;
							.line {
								position: absolute;
								bottom: 0;
								left: 0;
								transform: translateX(-50%);
								width: 25px;
								height: 2px;
								border-radius: 2px;
								background-color: ~"@{@{color}-live-rule-dark}";
							}
							.item.active {
								color: ~"@{@{color}-live-rule-dark}";
							}
						}
						.icon {
							margin-top: 2px;
							font-size: 20px;
						}
					}
				}
			}
			.g-right-box {
				flex-direction: column;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
				padding-right: 5px;
				.avatar {
					position: relative;
					width: 55px;
					height: 55px;
					margin-bottom: 10px;
					border-radius: 50%;
					border: 1px solid ~"@{@{color}-live-rule-dark}";
					.tag {
						position: absolute;
						left: 50%;
						transform: translate(-50%, 50%);
						bottom: 0;
						width: 20px;
						height: 20px;
						border-radius: 50%;
						font-size: 16px;
						color: ~"@{@{color}-live-rule-dark}";
						background-color: ~"@{@{color}-live-active}";
					}
				}
				.icon-box {
					flex-direction: column;
					margin-top: 25px;
					font-size: 12px;
					color: ~"@{@{color}-live-rule-dark}";
					.icon {
						font-size: 35px;
					}
				}
			}
			.g-bottom-box {
				position: absolute;
				bottom: 0;
				width: 100%;
				.info {
					align-items: flex-end;
					padding: 0 12px 15px;
					.left-box {
						flex: 1;
						flex-direction: column;
						.name {
							max-width: 400rpx;
							font-size: 15px;
							font-weight: 600;
							color: ~"@{@{color}-live-rule-dark}";
						}
						.desc {
							margin: 10px 0 15px;
							font-size: 15px;
							color: ~"@{@{color}-live-rule-dark}";
							opacity: .7;
						}
						.music {
							height: 20px;
							opacity: .7;
							.icon {
								margin-right: 10px;
								font-size: 16px;
								color: ~"@{@{color}-live-rule-dark}";
							}
							.play {
								position: relative;
								height: 100%;
								width: 380rpx;
								overflow: hidden;
								text {
									position: absolute;
									right: 0;
									top: 0;
									font-size: 14px;
									color: ~"@{@{color}-live-rule-dark}";
									line-height: 20px;
									word-break: keep-all;
									transform: translateX(100%);
									animation: text-swiper 12s linear infinite;
									@keyframes text-swiper {
										0% { transform: translateX(100%) }
										100% { transform: translateX(calc(-380rpx - 100%)) }
									}
								}
							}
						}
					}
					.right-box {
						width: 120rpx;
						height: 120rpx;
						padding: 22rpx;
						margin-left: 100rpx;
						border-radius: 50%;
						background: url('@/static/images/disc_light.png'), url('@/static/images/disc.png') no-repeat center center;
						background-size: 120rpx 120rpx;
						.in-box{
							width: 100%;
							height: 100%;
							border-radius: 50%;
							overflow: hidden;
							background-color: ~"@{@{color}-main}";
						}
						animation: music-player 12s linear infinite;
						@keyframes music-player {
							0% { transform: rotate(0deg) }
							100% { transform: rotate(360deg) }
						}
					}
				}
			}
			.swiper {
				height: calc(100vh - 50px);
				.v-swiper {
					width: 100%;
					height: 100%;
					.c1 {
						background-color: #77c2fa;
					}
					.c2 {
						background-color: #ddd59e;
					}
				}
				.author-info-box {
					width: 100%;
					height: 100%;
					background-color: pink;
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
