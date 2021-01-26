<template>
	<view class="mine" :class="[theme]">
		
		<!-- #ifdef MP || H5 -->
		<nav-bar :text="'我的'" :isBackground="true" :isBorder="true" class="g-nav-bar" :style="[{opacity}]">
			<template #left>
				<view class="g-left-box pointer"><text class="iconfont">&#xe615;</text></view>
			</template>
			<template #right>
				<view class="g-right-box pointer" @click="addArticle()"><text class="iconfont">&#xe606;</text></view>
			</template>
		</nav-bar>
		<!-- #endif -->
		<scroll-box class="g-cont" @scroll="handleScroll" :styleOptions="{height: 'calc(100vh - 50px)'}" :isFoot="false">
			<view class="bg-box"></view>
			<!-- #ifndef MP || H5 -->
			<nav-bar :text="'我的'" :isBackground="true" :isBorder="true" class="g-nav-bar" :style="[{opacity}]">
				<template #left>
					<view class="g-left-box pointer"><text class="iconfont">&#xe615;</text></view>
				</template>
				<template #right>
					<view class="g-right-box pointer" @click="addArticle()"><text class="iconfont">&#xe606;</text></view>
				</template>
			</nav-bar>
			<!-- #endif -->
			<view class="cont">
				<nav-bar :text="' '">
					<template #left>
						<view class="g-left-box"><text class="iconfont">&#xe615;</text></view>
					</template>
					<template #right>
						<view class="g-right-box"><text class="iconfont">&#xe606;</text></view>
					</template>
				</nav-bar>
				<view class="user-info">
					<view class="top-box flex-y-c">
						<view class="left-box flex-y-c" @click="toLogin">
							<view class="avatar pointer">
								<view class="p-10 auto-img" v-if="!isLogin">
									<image class="auto-img" src="@/static/images/default_nan.png" mode="aspectFill"></image>
								</view>
								<view class="p-10 auto-img" v-else-if="!userInfo.memberLogo">
									<image class="auto-img" :src="true ? require('@/static/images/default_nan.png') : require('@/static/images/default_nv.png')" mode="aspectFill"></image>
								</view>
								<image v-else class="auto-img" :src="userInfo.memberLogo" mode="aspectFill"></image>
							</view>
							<view class="name">
								<text class="overflow">{{isLogin ? userInfo.memberName : '点击登录'}}</text>
								<text class="desc overflow">成就你的写作梦想</text>
							</view>
						</view>
						<view class="right-box pointer"></view>
					</view>
					<view class="bottom-box flex">
						<view class="item flex-y-c pointer" @click="$utils.toPage.call(uni, '/pages/mine/my-article/my-article')">
							<view class="icon"><image class="auto-img" src="@/static/icon/mine_wz.svg" mode="aspectFill"></image></view>
							<text class="title">我的文章</text>
							<text class="desc">0篇私密</text>
						</view>
						<view class="item flex-y-c pointer">
							<view class="icon"><image class="auto-img" src="@/static/icon/mine_tz.svg" mode="aspectFill"></image></view>
							<text class="title">我的帖子</text>
							<text class="desc">0个帖子</text>
						</view>
						<view class="item flex-y-c pointer">
							<view class="icon"><image class="auto-img" src="@/static/icon/mine_sc.svg" mode="aspectFill"></image></view>
							<text class="title">赞和收藏</text>
							<text class="desc"></text>
						</view>
						<view class="item flex-y-c pointer">
							<view class="icon"><image class="auto-img" src="@/static/icon/mine_sj.svg" mode="aspectFill"></image></view>
							<text class="title">我的书架</text>
							<text class="desc">含已购内容</text>
						</view>
					</view>
				</view>
				<view class="assets-box">
					<view class="top-box flex-y-c">
						<view class="left-box">总资产: 0</view>
						<view class="right-box flex-y-c">
							<text>查看</text>
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
					<view class="bottom-box flex">
						<view class="item flex-y-c pointer">
							<text class="icon iconfont">&#xe62d;</text>
							<text class="title">易搜钻</text>
							<text class="desc"></text>
						</view>
						<view class="item flex-y-c pointer">
							<text class="icon iconfont">&#xe60d;</text>
							<text class="title">易搜会员</text>
							<text class="desc">去广告</text>
						</view>
						<view class="item flex-y-c pointer">
							<text class="icon iconfont">&#xe608;</text>
							<text class="title">天天抽奖</text>
							<text class="desc"></text>
						</view>
						<view class="item flex-y-c pointer">
							<text class="icon iconfont">&#xe64b;</text>
							<text class="title">排行榜</text>
							<text class="desc"></text>
						</view>
					</view>
				</view>
				<swiper class="swiper small" :autoplay="true" :interval="3000" :circular="true" :indicator-dots="true" indicator-active-color="#210830" indicator-color="#f8fcf8">
					<swiper-item v-for="(item, index) in 6" :key="item">
						<view class="item"><eso-img class="auto-img" :src="'../../static/images/banner' + (index + 1) + '.jpg'"></eso-img></view>
					</swiper-item>
				</swiper>
				<view class="group">
					<view class="item">
						<view class="left-box">
							<text>我的钱包</text>
						</view>
						<view class="right-box">
							<text class="overflow">0张优惠券</text>
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
					<view class="item">
						<view class="left-box">
							<text>易搜活动</text>
							<text class="tag">日更挑战</text>
						</view>
						<view class="right-box">
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
					<view class="item">
						<view class="left-box">
							<text>每日任务</text>
						</view>
						<view class="right-box">
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
					<view class="item">
						<view class="left-box">
							<text>我的直播/专题/文集</text>
						</view>
						<view class="right-box">
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
					<view class="item">
						<view class="left-box">
							<text>浏览历史</text>
						</view>
						<view class="right-box">
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
				</view>
				<view class="group no-line">
					<view class="item">
						<view class="left-box">
							<text>开启夜间模式</text>
						</view>
						<view class="right-box">
							<text class="check-btn" @click="toggleTheme" :class="[theme === 'dark' ? 'checked' : '']">
								<text class="icon1"></text>
								<text class="icon2"></text>
							</text>
						</view>
					</view>
					<view class="item">
						<view class="left-box">
							<text>设置</text>
						</view>
						<view class="right-box">
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
					<view class="item">
						<view class="left-box">
							<text>帮助与反馈</text>
						</view>
						<view class="right-box">
							<text class="overflow">有问题找这里</text>
							<text class="icon iconfont">&#xe645;</text>
						</view>
					</view>
				</view>
				<view class="foot-blank"></view>
			</view>
		</scroll-box>

	</view>
</template>

<script>
	export default {
		name: 'mine',
		data() {
			return {
				uni: uni, // uni实例
				opacity: 0, // 透明度
				isLogin: false, // 是否登录
				userInfo: {
					memberLogo: null,
					memberName: null
				},
				timer: null
			}
		},
		computed: {
			theme() {
				return this.$store.state.theme;
			}
		},
		methods: {
				
			// 获取数据
			async getData() {
				
				// 加载动画
				this.timer && clearTimeout(this.timer);
				this.timer = this.$utils.loading.call(uni, '加载中');
				
				let userInfo = await this.$utils.getUserInfo(uni);
				clearTimeout(this.timer);
				uni.hideLoading();
				
				if (!userInfo) {
						
					this.isLogin = false;
					
				}else {
					this.isLogin = true;
					for (let key in this.userInfo) {
						
						this.userInfo[key] = userInfo.data[key];
						
					}
				}
				
			},
			
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
			
			// 去登录
			toLogin() {
					
				if (this.isLogin) {
					// 个人主页
					
				}else {
					this.$utils.toPage.call(uni, '/pages/user-login/user-login');
				}
				
			},
			
			// 切换主题
			toggleTheme() {
				
				this.$store.commit('setValue', {key: 'theme', value: this.theme === 'dark' ? 'default' : 'dark'});
				uni.setStorageSync('$theme', this.theme);
				
			},
			
			// 监听滚动条
			handleScroll(e) {
				
				let top = e.detail.scrollTop;
				
				//  #ifndef H5
				this.opacity = top > 69 ? 1 : top < 8 ? 0 : top / 69;
				//  #endif
				//  #ifdef H5
				this.opacity = top > 44 ? 1 : top < 5 ? 0 : top / 44;
				//  #endif
				
			}
			
		},
		beforeDestroy() {
			
			this.timer && clearTimeout(this.timer);
			
		}
	}
</script>

<style lang="less">

	.mine {
		.g-left-box, .g-right-box {
			.iconfont {
				font-size: 20px;
			}
		}
		.g-left-box {
			margin-right: 10px;
		}
		.g-right-box {
			margin-left: 10px;
		}
		.bg-box {
			margin-left: 50%;
			/* #ifndef H5 */
			transform: translate(-50%, calc(-48% + var(--status-bar-height)));
			/*  #endif  */
			/* #ifdef H5 */
			transform: translate(-50%, -48%);
			/*  #endif  */
			width: 133.3333%;
			height: 85.3333vw;
			border-radius: 100%;
		}
		.g-nav-bar {
			/* #ifndef MP || H5 */
			position: sticky;
			margin-top: -85.3333vw;
			/*  #endif  */
			/* #ifdef MP || H5 */
			position: absolute;
			/*  #endif  */
			top: 0;
			left: 0;
			width: 100%;
			z-index: 2;
		}
		.cont {
			position: relative;
			z-index: 1;
			/* #ifndef MP || H5 */
			top: calc(-44px - var(--status-bar-height));
			/*  #endif  */
			/* #ifdef MP || H5 */
			margin-top: -85.3333vw;
			/*  #endif  */
			.user-info {
				margin: 25px 15px 15px;
				padding: 20px 12px;
				border-radius: 8px;
				box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
				.top-box {
					padding-bottom: 12px;
					.left-box {
						flex: 1;
						.avatar {
							height: 60px;
							width: 60px;
							margin-left: 5px;
							margin-right: 10px;
							border-radius: 50%;
						}
						.name {
							flex: 1;
							display: flex;
							flex-direction: column;
							font-size: 16px;
							.desc {
								padding-top: 10px;
								font-size: 12px;
							}
						}
					}
					.right-box {
						width: 60px;
						height: 60px;
						margin-left: 10px;
					}
				}
				.bottom-box {
					margin-top: 15px;
					.item {
						flex: 1;
						flex-direction: column;
						.icon {
							width: 32px;
							height: 32px;
							overflow:hidden;
						}
						.title {
							padding: 10px 0 3px;
							font-size: 14px;
						}
						.desc {
							transform: scale(10 / 12);
							font-size: 12px;
						}
					}
				}
			}
			.assets-box {
				margin: 0 15px 15px;
				padding: 0 12px 20px;
				border-radius: 8px;
				box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
				.top-box {
					height: 40px;
					.left-box {
						flex: 1;
						font-size: 14px;
					}
					.right-box {
						margin-left: 10px;
						font-size: 12px;
						.icon {
							margin-top: 2px;
							font-size: 18px;
						}
					}
				}
				.bottom-box {
					margin-top: 15px;
					.item {
						flex: 1;
						flex-direction: column;
						.icon {
							font-size: 26px;
						}
						.title {
							padding: 10px 0 3px;
							font-size: 12px;
						}
						.desc {
							transform: scale(10 / 12);
							font-size: 12px;
						}
					}
				}
			}
			.swiper {
				height: 65px;
				margin: 0 15px 5px;
				border-radius: 8px;
				overflow: hidden;
				.item {
					height: 65px;
					width: 100%;
					border-radius: 8px;
					overflow: hidden;
				}
			}
			.group {
				padding-left: 15px;
				&.no-line .item {
					border-bottom: none !important;
				}
				.item {
					display: flex;
					align-items: center;
					height: 40px;
					padding-right: 15px;
					cursor: pointer;
					.left-box {
						display: flex;
						align-items: center;
						flex: 1;
						font-size: 14px;
						.tag {
							height: 24px;
							padding: 0 6px;
							border-radius: 24px;
							transform: scale(10 / 12);
							font-size: 12px;
							line-height: 24px;
						}
					}
					.right-box {
						display: flex;
						align-items: center;
						margin-left: 10px;
						.overflow {
							flex: 1;
							font-size: 12px;
						}
						.icon {
							margin-top: 2px;
							margin-left: 5px;
							font-size: 18px;
						}
						.check-btn {
							position: relative;
							width: 36px;
							height: 15px;
							border-radius: 15px;
							.icon1 {
								position: absolute;
								left: 0;
								top: 50%;
								transform: translate(-50%, -50%);
								width: 22px;
								height: 22px;
								border-radius: 50%;
								box-shadow: 0 0 4px 1px rgba(0, 0, 0, .15);
								transition: left .2s linear;
								z-index: 1;
							}
							.icon2 {
								position: absolute;
								left: 0;
								top: 0;
								width: 0;
								height: 15px;
								border-radius: 15px;
								transition: width .2s linear;
							}
							&.checked {
								.icon1 {
									left: 100%;
								}
								.icon2 {
									width: 100%;
								}
							}
						}
					}
				}
			}
			.foot-blank {
				height: 70px;
			}
		}
	}

	.setColor(@color) {
		.mine.@{color} { 
			background-color: ~"@{@{color}-fore}";
			.g-left-box, .g-right-box {
				color: ~"@{@{color}-rule-dark}";
			}
			.bg-box {
				@left-color: ~"@{@{color}-main-bright}";
				@right-color: ~"@{@{color}-main}";
				background-image: linear-gradient(to right, @left-color, @right-color);
			}
			.cont {
				.g-left-box, .g-right-box {
					color: ~"@{@{color}-fore}";
				}
				.user-info {
					background-color: ~"@{@{color}-fore}";
					.top-box {
						border-bottom: 1px solid ~"@{@{color}-sub}";
						.left-box {
							.avatar {
								background-color: ~"@{@{color}-bg}";
							}
							.name {
								color: ~"@{@{color}-rule-dark}";
								.desc {
									color: ~"@{@{color}-rule-bright}";
								}
							}
						}
						.right-box {
							background-color: ~"@{@{color}-main}";
						}
					}
					.bottom-box {
						.item {
							.title {
								color: ~"@{@{color}-rule-dark}";
							}
							.desc {
								color: ~"@{@{color}-rule-bright}";
							}
						}
					}
				}
				.assets-box {
					background-color: ~"@{@{color}-fore}";
					.top-box {
						border-bottom: 1px solid ~"@{@{color}-sub}";
						.left-box {
							color: ~"@{@{color}-rule-dark}";
						}
						.right-box {
							color: ~"@{@{color}-rule-bright}";
						}
					}
					.bottom-box {
						.item {
							.icon {
								color: ~"@{@{color}-rule-dark}";
							}
							.title {
								color: ~"@{@{color}-rule-dark}";
							}
							.desc {
								color: ~"@{@{color}-rule-bright}";
							}
						}
					}
				}
				.swiper {
					background-color: ~"@{@{color}-fore}";
				}
				.group {
					.item {
						&:last-child {
							border-bottom: 1px solid ~"@{@{color}-sub}";
						}
						.left-box {
							color: ~"@{@{color}-rule-dark}";
							.tag {
								color: ~"@{@{color}-main}"; 
								@rgb: ~"@{@{color}-main-rgb}";
								background-color: rgba(@rgb, .15);
							}
						}
						.right-box {
							.overflow {
								color: ~"@{@{color}-rule-bright}";
							}
							.icon {
								color: ~"@{@{color}-rule-bright}";
							}
							.check-btn {
								background-color: ~"@{@{color}-rule-bright}";
								.icon1 {
									background-color: ~"@{@{color}-sub}";
								}
								.icon2 {
									@rgb: ~"@{@{color}-main-rgb}";
									background-color: rgba(@rgb, .35);
								}
								&.checked {
									.icon1 {
										background-color: ~"@{@{color}-main-bright}";
									}
								}
							}
						}
					}
				}
				.foot-blank {
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
