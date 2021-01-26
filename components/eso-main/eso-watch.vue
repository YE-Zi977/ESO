<template>
	<view class="watch" :class="[theme]">

		<nav-bar text="关注" :isBackground="true">
			<template #left>
				<view class="g-icon-box unread">
					<text class="icon pointer iconfont">&#xe9f7;</text>
				</view>
			</template>
			<template #right>
				<view class="g-icon-box">
					<text class="icon pointer iconfont">&#xe626;</text>
				</view>
			</template>
		</nav-bar>
		
		<view class="container4 h-1">
			
			<view class="tab-box flex-y-c relative">
				<view class="line" :style="[{left}]"></view>
				<view @click="toggle(idx)" class="item pointer flex-c" :class="[index == idx ? 'active' : '', idx !== 0 ? 'p-8' : '']" v-for="(item, idx) in tab" :key="idx">
					<text>{{item.title}}</text>
					<text class="icon iconfont" v-if="idx === 0">&#xe618;</text>
				</view>
			</view>
			<swiper class="swiper" :current="index" :duration="150" :circular="true" @change="handleChange" @transition="handleTransition" @animationfinish="handleAnimationfinish">
				<swiper-item>
					<scroll-box class="tab-item view1">
						
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item view2">
						
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item view3">
						
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item view4">
						
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item view5">
						
					</scroll-box>
				</swiper-item>
			</swiper>
			
		</view>

	</view>
</template>

<script>
	export default {
		name: 'watch',
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
					{title: '动态', type: 1},
					{title: '直播', type: 2},
					{title: '专题', type: 3},
					{title: '连载', type: 4},
					{title: '文集', type: 5}
				],
				endIndex: 0,
				left: 0
			}
		},
		created() {
			this.endIndex = this.index;
		},
		mounted() {
				
			this.left = 100 / this.tab.length * (this.endIndex + .5) + '%'
			
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
				
			// 获取数据
			getData(idx) {
				
				this.$utils.log('获取数据 watch ', idx);
				
			},
			
			// 处理swiper @change事件
			handleChange({ detail }) {
				
				if (detail.source === 'touch') this.$emit('change', detail.current);
				
			},
				
			// 处理swiper @transition事件
			handleTransition({ detail }) {
				
				this.left = 'calc(' + (100 / this.tab.length * (this.endIndex + .5) + '%') + ' + ' + detail.dx / this.tab.length + 'px)';
				
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
			
		}
	}
</script>

<style lang="less">
	
	.setColor(@color) {
		.watch.@{color} { 
			.g-icon-box {
				color: ~"@{@{color}-rule-bright}";
				&.unread {
					position: relative;
					&::after {
						content: '';
						position: absolute;
						top: 0;
						right: 2px;
						transform: translateX(100%);
						width: 8px;
						height: 8px;
						border-radius: 50%;
						border: 1px solid ~"@{@{color}-fore}";
						background-color: ~"@{@{color}-main}";
					}
				}
				.icon {
					font-size: 18px;
				}
			}
			.tab-box {
				justify-content: space-around;
				height: 45px;
				font-size: 14px;
				border-bottom: 1px solid ~"@{@{color}-sub}";
				color: ~"@{@{color}-rule-bright}";
				background-color: ~"@{@{color}-fore}";
				.item.active {
					font-size: 15px;
					color: ~"@{@{color}-rule-dark}";
				}
				.item.p-8 {
					padding: 0 8px;
				}
				.line {
					position: absolute;
					bottom: 0;
					height: 3px;
					width: 15px;
					border-radius: 3px;
					transform: translateX(-50%);
					background-color: ~"@{@{color}-main}";
				}
			}
			.swiper {
				width: 100%;
				height: calc(100% - 45px);
				.tab-item {
					&.view1 {
						background-color: blue;
					}
					&.view2 {
						background-color: red;
					}
					&.view3 {
						background-color: yellow;
					}
					&.view4 {
						background-color: black;
					}
					&.view5 {
						background-color: green;
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
