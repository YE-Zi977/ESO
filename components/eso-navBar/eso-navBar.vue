<template>
	<view class="nav-bar" :class="[theme, isBorder ? 'border' : '', isBackground ? 'bg-1' : '']">
		
		<template v-if="isTopView">
			<!-- #ifndef H5 -->
			<view class="status_bar" :class="[isBackground ? 'bg-1' : '']">
				<!-- 这里是状态栏 -->
			</view>
			<!-- #endif -->
		</template>
		
		<!-- #ifdef MP -->
		<view class="in-box flex-c" :style="[{width: 'calc(100% - ' + (uni.getMenuButtonBoundingClientRect().width + 5) + 'px)'}]">
			<slot name="left"></slot>
			<view class="title" :style="[{textAlign}]" :class="[{center: textAlign === 'center'}]">
				<text>{{text}}</text>
			</view>
			<slot name="right"></slot>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP -->
		<view class="in-box flex-c" :style="[{width: '100%'}]">
			<slot name="left"></slot>
			<view class="title" :style="[{textAlign}]" :class="[{center: textAlign === 'center'}]">
				<text>{{text}}</text>
			</view>
			<slot name="right"></slot>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		name: 'navBar',
		props: {
			text: {
				type: String,
				default() {
					return '标题'
				}
			},
			isBackground: {
				type: Boolean,
				default() {
					return false
				}
			},
			textAlign: {
				type: String,
				default() {
					return 'center'
				}
			},
			isTopView: {
				type: Boolean,
				default() {
					return true
				}
			},
			// 是否有底边框
			isBorder: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				uni: uni, // uni实例
			};
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
	}
</script>

<style lang="less">
	
	.nav-bar { 
		padding: 0 12px;
		background-color: transparent;
		.in-box {
			position: relative;
			height: 44px;
			.title {
				flex: 1;
				font-size: 16px;
				&.center text {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
		/* #ifndef H5 */
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
			background-color: transparent;
		}
		/*  #endif  */
	}
	
	.setColor(@color) {
	    .nav-bar.@{color} { 
			&.bg-1 {
				background-color: ~"@{@{color}-fore}";
			}
			&.border {
				border-bottom: 1px solid ~"@{@{color}-sub}";
			}
			.in-box {
				.title {
					color: ~"@{@{color}-rule-dark}";
				}
			}
			/* #ifndef H5 */
			.status_bar {
				&.bg-1 {
					background-color: ~"@{@{color}-fore}";
				}
			}
			/*  #endif  */
	    }
	}
	
	.loop(@i) when (@i < length(@themeList)+1){
	    .setColor(extract(@themeList, @i));
	    .loop(@i+1);
	}
	.loop(1);

</style>
