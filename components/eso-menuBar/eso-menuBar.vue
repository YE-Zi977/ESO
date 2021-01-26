<template>
	<view class="menu-bar flex" :class="[theme]">
		<view  
		@click="handleClick(idx)"
		class="item flex-c pointer" 
		:class="[idx === index ? 'active' : '']" 
		v-for="(item, idx) in menu" 
		:key="item.name">
			<template v-if="idx === 0">
				<text class="icon iconfont" v-show="idx === index">&#xe607;</text>
				<text class="icon iconfont" v-show="idx !== index">&#xe665;</text>
			</template>
			<template v-if="idx === 1">
				<text class="icon iconfont" v-show="idx === index">&#xe60b;</text>
				<text class="icon iconfont" v-show="idx !== index">&#xe61f;</text>
			</template>
			<template v-if="idx === 2">
				<view class="live flex-c">
					<view class="top-border"></view>
					<view class="live-icon">
						<view class="i-1">
							<view class="i-2"></view>
						</view>
					</view>
				</view>
			</template>
			<template v-if="idx === 3">
				<text class="icon iconfont" v-show="idx === index">&#xe6d7;</text>
				<text class="icon iconfont" v-show="idx !== index">&#xe609;</text>
				<text class="unread flex-c" v-if="3 > 0">{{3}}</text>
			</template>
			<template v-if="idx === 4">
				<text class="icon iconfont" v-show="idx === index">&#xe60a;</text>
				<text class="icon iconfont" v-show="idx !== index">&#xe613;</text>
			</template>
			<text class="title" v-if="idx !== 2">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'menuBar',
		model: {
			prop: 'index',
			event: 'change'
		},
		props: {
			// 当前激活
			index: {
				type: [String, Number],
				default() {
					return 0
				}
			},
			// 是否可重复点击
			isRepeat: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				uni: uni, // uni实例
				menu: [
					{title: '首页'},
					{title: '关注'},
					{title: 'temp'},
					{title: '消息'},
					{title: '我的'}
				]
			};
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
				
			// 处理点击事件
			handleClick(index) {
					
				if (this.index !== index) this.$emit('change', index);
				if (this.index !== index || this.isRepeat) this.$emit('my-click', index);
					
			}
			
		}
	}
</script>

<style lang="less">
	
	.menu-bar { 
		height: 50px;
		.item {
			flex-direction: column;
			flex: 1;
			position: relative;
			height: 100%;
			.live {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 60px;
				height: 60px;
				border-radius: 50%;
				.top-border {
					position: absolute;
					top: 0;
					left: 0;
					width: 60px;
					height: 11px;
					overflow: hidden;
				}
				.live-icon {
					position: relative;
					z-index: 1;
					width: 45px;
					height: 45px;
					padding: 2px;
				    border-radius:50%;
					overflow: hidden;
					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 50%;
						height: 100%;
						background-image: linear-gradient(#ef5c69, #f4bd33, #36e0f0);
					}
					&::after {
						content: '';
						position: absolute;
						top: 0;
						right: 0;
						width: 50%;
						height: 100%;
						background-image: linear-gradient(#ef5c69, #6469f4, #36e0f0);
					}
					.i-1 {
						position: relative;
						z-index: 2;
						width: 100%;
						height: 100%;
						padding: 3px;
						border-radius: 50%;
						.i-2 {
							position: relative;
							width: 100%;
							height: 100%;
							border-radius: 50%;
							background-color: #fadb40;
							&::before {
								content: '';
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								width: calc(100% - 12px);
								height: calc(100% - 12px);
								border-radius: 50%;
								background-color: #2f3030;
							}
							&::after {
								content: '';
								position: absolute;
								top: 10px;
								right: 10px;
								width: 8px;
								height: 8px;
								border-radius: 50%;
								background-color: #fadb40;
								animation: move-eye-skew 5s ease-out infinite;
							}
						}
					}
					@keyframes move-eye-skew {
					    0% {
					        transform: none;
					    }
					    25%, 35% {
					        transform: translateX(-5px) translateY(5px) skewX(15deg) skewY(-10deg) scale(1.05);
					    }
					    60%, 70% {
					        transform: translateX(-5px) translateY(-2px) skewX(5deg) skewY(2deg) scaleX(0.95);
					    }
					    100% {
					        transform: none;
					    }
					}
				}
			}
			.title {
				transform: scale(10 / 12);
				font-size: 12px;
			}
			.icon {
				font-size: 20px;
			}
			.unread {
				position: absolute;
				top: -1px;
				transform: translateX(12px) scale(10 / 12);
				width: 18px;
				height: 18px;
				border-radius: 50%;
				font-size: 12px;
			}
		}
	}
	
	.setColor(@color) {
		.menu-bar.@{color} { 
			border-top: 1px solid ~"@{@{color}-sub}";
			background-color: ~"@{@{color}-fore}";
			.item {
				color: ~"@{@{color}-rule-dark}";
				.live {
					.top-border::after {
						content: '';
						position: absolute;
						top: 0;
						left: -1px;
						width: 60px;
						height: 60px;
						border-radius: 50%;
						border: 1px solid ~"@{@{color}-sub}";
						background-color: ~"@{@{color}-fore}";
					}
					.live-icon {
						.i-1 {
							background-color: ~"@{@{color}-fore}";
						}
					}
				}
				&.active {
					color: ~"@{@{color}-main}";
				}
				.unread {
					border: 1px solid ~"@{@{color}-fore}";
					background-color: ~"@{@{color}-main}";
					color: ~"@{@{color}-fore}";
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
