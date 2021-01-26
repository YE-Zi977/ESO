<template>
	<view class="eso-img" :class="[theme]">
		<image class="auto-img" v-if="src" :src="src" :mode="mode"></image>
	</view>
</template>

<script>
	export default {
		name: 'esoImg',
		props: {
			src: {
				type: [String, Object],
				default() {
					return ''
				}
			},
			mode: {
				type: String,
				default() {
					return 'aspectFill'
				}
			}
		},
		data() {
			return {
				
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
	
	.setColor(@color) {
		.eso-img.@{color} { 
			width: 100%;
			height: 100%;
		}
	}

	.loop(@i) when (@i < length(@themeList)+1){
		.setColor(extract(@themeList, @i));
		.loop(@i+1);
	}
	.loop(1);
	
</style>
