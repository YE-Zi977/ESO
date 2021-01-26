<template>
	<view class="main container1" :class="[theme]">
		
		<swiper class="g-swiper" :current="index1" :duration="duration" @change="handleChange" @transition="handleTransition">
			<swiper-item>
				<main-home ref="menu0" :index="index2" @change="idx => index2 = idx" @addClick="(e) => {isBullet = true; isModule = e.module;}"></main-home>
			</swiper-item>
			<swiper-item>
				<main-watch ref="menu1" :index="index3" @change="idx => index3 = idx"></main-watch>
			</swiper-item>
			<swiper-item>
				<main-more ref="menu2" :index="index4" @change="idx => index4 = idx" @openHome="(e) => {isBullet2 = true; isModule2 = e.module;}" @openTalk="(e) => {isBullet = true; isModule = e.module;}"></main-more>
			</swiper-item>
			<swiper-item>
				<main-info ref="menu3"></main-info>
			</swiper-item>
			<swiper-item>
				<main-mine ref="menu4"></main-mine>
			</swiper-item>
		</swiper>
		
		<popup :value="isBullet" @change="value => { isBullet = value; }" @close="isModule = null" type="bottom">
			<view class="to-release flex-c" v-show="isModule === 'wz'">
				<view class="item flex-y-c pointer" @click="isBullet = false; addArticle();">
					<view class="wz flex-c">
						<text class="iconfont icon">&#xe729;</text>
					</view>
					<text>发文章</text>
				</view>
				<view class="item flex-y-c pointer" @click="$utils.toPage.call(uni)">
					<view class="tz flex-c">
						<text class="iconfont icon">&#xe661;</text>
					</view>
					<text>发帖子</text>
				</view>
				<text class="close iconfont pointer" @click="isBullet = false;">&#xe620;</text>
			</view>
			<view class="user-talk" v-show="isModule === 'pl'">
				123213
			</view>
		</popup>
		
		<popup :value="isBullet2" @change="value => { isBullet2 = value; }" @close="isModule2 = null" type="right">
			<view class="user-home" v-show="isModule2 === 'zy'">
				adgfdasfdas
			</view>
			<view class="my-home" v-show="isModule2 === 'wd'">
				afdsfdf
			</view>
		</popup>
		
		<menu-bar :index="index1" @change="handleMenuChange"></menu-bar>
		
	</view>
</template>

<script>
	import mainHome from '@/components/eso-main/eso-home.vue'
	import mainWatch from '@/components/eso-main/eso-watch.vue'
	import mainMore from '@/components/eso-main/eso-more.vue'
	import mainInfo from '@/components/eso-main/eso-info.vue'
	import mainMine from '@/components/eso-main/eso-mine.vue'
	
	import menuBar from '@/components/eso-menuBar/eso-menuBar.vue'
	import popup from '@/components/eso-popup/eso-popup.vue'
	
	export default {
		name: 'Main',
		components: {
			mainHome,
			mainWatch,
			mainMore,
			mainInfo,
			mainMine,
			menuBar,
			popup
		},
		watch: {
			index1(idx) {
				// #ifdef H5
				this.$utils.toPage.call(uni, '/pages/main/main?menu=' + idx + '&tab=' + this.index2 + '&w_tab=' + this.index3 + '&l_tab=' + this.index4, 'navigateTo');
				// #endif
				// #ifndef H5
				this.$nextTick(() => {
					this.$refs['menu' + this.index1].getData(this.index1 === 0 ? this.index2 : this.index1 === 1 ? this.index3 : this.index1 === 2 ? this.index4 : null);
				});
				// #endif
			},
			index2(idx, old) {
				// #ifdef H5
				this.$utils.toPage.call(uni, '/pages/main/main?menu=' + this.index1 + '&tab=' + idx + '&w_tab=' + this.index3 + '&l_tab=' + this.index4, 'navigateTo');
				// #endif
				// #ifndef H5
				if (old != -1 && this.index1 === 0) this.$nextTick(() => {
					this.$refs.menu0.getData(idx);
				})
				// #endif
			},
			index3(idx, old) {
				// #ifdef H5
				this.$utils.toPage.call(uni, '/pages/main/main?menu=' + this.index1 + '&tab=' + this.index2 + '&w_tab=' + idx + '&l_tab=' + this.index4, 'navigateTo');
				// #endif
				// #ifndef H5
				if (old != -1 && this.index1 === 1) this.$nextTick(() => {
					this.$refs.menu1.getData(idx);
				})
				// #endif
			},
			index4(idx, old) {
				// #ifdef H5
				this.$utils.toPage.call(uni, '/pages/main/main?menu=' + this.index1 + '&tab=' + this.index2 + '&w_tab=' + this.index3 + '&l_tab=' + idx, 'navigateTo');
				// #endif
				// #ifndef H5
				if (old != -1 && this.index1 === 2) this.$nextTick(() => {
					this.$refs.menu2.getData(idx);
				})
				// #endif
			}
		},
		computed: {
			theme() {
				return this.$store.state.theme;
			}
		},
		data() {
			return {
				uni: uni, // uni实例
				index1: 0,
				index2: 1,
				index3: 0,
				index4: 2,
				isBullet: false,
				isModule: null,
				isBullet2: false,
				isModule2: null,
				duration: 150
			};
		},
		onLoad(options) {
			
			this.index1 = !isNaN((options.menu || 0) * 1) ? (options.menu || 0) * 1 : 0;
			this.index2 = !isNaN((options.tab || 1) * 1) ? (options.tab || 1) * 1 : 1;
			this.index3 = !isNaN((options.w_tab || 0) * 1) ? (options.w_tab || 0) * 1 : 0;
			this.index4 = !isNaN((options.l_tab || 2) * 1) ? (options.l_tab || 2) * 1 : 2;
				
		},
		onShow() {
			
			this.$nextTick(() => {
				this.$refs['menu' + this.index1].getData(this.index1 === 0 ? this.index2 : this.index1 === 1 ? this.index3 : this.index1 === 2 ? this.index4 : null);
			});
			
		},
		methods: {
			
			// 添加文章
			addArticle() {
				
				// #ifndef H5
				this.$utils.toPage.call(uni, '/pages/mine/create-article/create-article');
				// #endif
				
				// #ifdef H5
				uni.navigateTo({
					url: '/pages/mine/my-article/my-article',
					success: () => {
						
						uni.navigateTo({
							url: '/pages/mine/create-article/create-article'
						})
							
					}
				})
				// #endif
				
			},
			
			// 处理swiper @change事件
			handleChange({ detail }) {
				
				if (this.duration <= 0) this.duration = 150;
				this.index1 = detail.current;
					
			},
			
			// 处理swiper @transition事件
			handleTransition({ detail }) {
				
				if (this.index1 == 4 && detail.dx > 0) {
					this.isBullet2 = true;
					this.isModule2 = 'wd';
				}
				
			},
			
			// 处理menuBar @change事件
			handleMenuChange(index) {
				
				this.duration = 0;	
				this.index1 = index;
				
			}
		},
		onBackPress(e) {
			
			if (e.from === 'backbutton' && (this.isBullet || this.isBullet2)) {
				
				if (this.isBullet) this.isBullet = false;
				else this.isBullet2 = false;
				
				return false;
			}
			
		}
	}
</script>

<style lang="less">

	.main { 
		width: 100%;
		.g-swiper {
			width: 100%;
			height: calc(100vh - 50px);
		}
		
	}
	
	.setColor(@color) {
	    .main.@{color} { 
			background-color: ~"@{@{color}-bg}";
			.to-release {
				position: relative;
				padding: 60px 10px 95px;
				border-radius: 10px 10px 0 0;
				background-color: ~"@{@{color}-fore}";
				overflow: hidden;
				.item {
					flex-direction: column;
					margin: 0 35px;
					font-size: 12px;
					color: ~"@{@{color}-rule-dark}";
					.wz, .tz {
						width: 60px;
						height: 60px;
						margin-bottom: 12px;
						border-radius: 50%;
						.icon {
							font-size: 24px;
							color: #ffffff;
						}
					}
					.wz {
						background-color: #6978ed;
						box-shadow: 0 0 8px 2px rgba(107, 120, 241, .35);
					}
					.tz {
						background-color: #fdb255;
						box-shadow: 0 0 8px 2px rgba(253, 178, 85, .35);
					}
				}
				.close {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 30px;
					padding: 8px;
					font-size: 16px;
					font-weight: 600;
					color: ~"@{@{color}-rule-bright}";
				}
			}
			.user-talk {
				min-height: 35vh;
				max-height: 75vh;
				border-radius: 10px 10px 0 0;
				background-color: ~"@{@{color}-fore}";
				overflow: hidden;
			}
			.user-home, .my-home {
				width: 100vw;
				height: 100%;
				background-color: ~"@{@{color}-fore}";
			}
		}
	}
	
	.loop(@i) when (@i < length(@themeList)+1){
	    .setColor(extract(@themeList, @i));
	    .loop(@i+1);
	}
	.loop(1);
	
</style>
