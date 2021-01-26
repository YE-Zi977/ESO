<template>
	<view class="search-bar" :class="[theme, isBorder ? 'border' : '']">
		<!-- #ifdef MP -->
		<view class="in-box flex-c" :style="[{width: 'calc(100% - ' + (uni.getMenuButtonBoundingClientRect().width + 5) + 'px)'}]">
			<slot name="left"></slot>
			<view class="input-btn flex-c pointer">
				<text class="icon iconfont">&#xe626;</text>
				<text>搜索感兴趣的内容</text>
			</view>
			<slot name="right"></slot>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP -->
		<view class="in-box flex-c" :style="[{width: '100%'}]">
			<slot name="left"></slot>
			<view class="input-btn flex-c pointer">
				<text class="icon iconfont">&#xe626;</text>
				<text>搜索感兴趣的内容</text>
			</view>
			<slot name="right"></slot>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'searchBar',
		props: {
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
				$theme: null,
				$utils: null,
			};
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		}
	}
</script>

<style lang="less">
	
	.search-bar { 
		padding: 0 12px;
		.in-box {
			height: 44px;
			.input-btn {
				flex: 1;
				height: 30px;
				padding: 0 10px;
				border-radius: 30px;
				/* #ifndef MP */
				font-size: 14px;
				/*  #endif  */
				/* #ifdef MP */
				font-size: 12px;
				/*  #endif  */
				.icon {
					margin-right: 4px;
					padding-top: 4px;
					font-size: 15px;
				}
			}
		}
	}
	
	.setColor(@color) {
	    .search-bar.@{color} { 
			background-color: ~"@{@{color}-fore}";
			&.border {
				border-bottom: 1px solid ~"@{@{color}-sub}";
			}
			.in-box {
				.input-btn {
					color: ~"@{@{color}-rule-bright}";
					background-color: ~"@{@{color}-bg}";
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
