<template>
	<scroll-view class="scroll-box" :class="theme" scroll-y @scroll="handleScroll" :style="[styleOptions]">
		<slot></slot>
		<view class="foot" v-if="isFoot"></view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'scrollBox',
		props: {
			// 样式
			styleOptions: {
				type: Object,
				default() {
					return {}
				}
			},
			// foot
			isFoot: {
				type: Boolean,
				default() {
					return true
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
		methods: {
			
			// 处理scroll事件
			handleScroll(e) {
				
				this.$utils.log('滚动了 => components scrollBox');
				this.$emit('scroll', e);
				
			}
			
		}
	}
</script>

<style lang="less">
		
	.scroll-box {
		width: 100%;
		height: 100%;
		background-color: inherit;
		overflow-y: auto;
		.foot {
			height: 20px;
		}
	}
	
</style>
