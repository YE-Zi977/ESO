<template>
	<view class="home" :class="[theme]">
		
		<!-- #ifndef H5 -->
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- #endif -->
		
		<view class="relative container3">
			<search-bar class="search-bar">
				<template #right>
					<view @click="$utils.toPage.call(uni, '/pages/active/sign-in/sign-in')" class="right-box"><text>签到</text></view>
				</template>
			</search-bar>
			<view class="tab-box flex-y-c relative">
				<view class="line" :style="[{left}]"></view>
				<view @click="toggle(idx)" class="item pointer" :class="[index == idx ? 'active' : '']" v-for="(item, idx) in tab" :key="idx">{{item.title}}</view>
			</view>
			<swiper class="swiper" :current="index" :duration="150" :circular="true" @change="handleChange" @transition="handleTransition" @animationfinish="handleAnimationfinish">
				<swiper-item>
					<scroll-box class="tab-item">
						<view class="item1" v-for="item in 5" :key="item">
							<view class="top pointer flex">
								<eso-img class="full" src="../../static/images/banner1.jpg"></eso-img>
								<eso-img class="max-width" src="../../static/images/banner3.jpg" mode="heightFix" v-if="item != 1"></eso-img>
							</view>
							<view class="info flex">
								<text class="title two-line">日更挑战</text>
								<text class="desc" v-if="item !== 1">总奖池：550元</text>
								<text class="desc">活动时间：长期有效</text>
							</view>
						</view>
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item">
						<view class="item2" v-for="item in 5" :key="item">
							<view class="title two-line">宁愿坐公交，也不愿买的4款国产车，毛病多还费油，买车避而远之！</view>
							<view class="i-content flex-y-c">
								<template v-if="item === 2">
									<eso-img class="imgs-box pointer" src="../../static/images/banner2.jpg"></eso-img>
									<eso-img class="imgs-box pointer" src="../../static/images/banner5.jpg"></eso-img>
									<eso-img class="imgs-box pointer" src="../../static/images/banner6.jpg"></eso-img>
								</template>
								<template v-else>
									<view class="desc three-line">
										第一款是猎豹CS10，作为国产车的野性硬派代表车型，一度在中国的表现是非常出色的，加上它的军工血统，大家自然在一出来就非常追捧。可惜的是这种车的毛病是开出来的。原来看上去非常好的也在公里数的不断增加中不断地出现新的问题。而这些大大小小的问题虽然不会影响驾驶，但却非常的影响驾驶的心情。后来有些车主干脆放弃开车，或者就直接当是摩托车来开了。问题不断，车主都懒得修了！
									</view>
									<eso-img class="img-box pointer" v-if="item != 1" src="../../static/images/banner4.jpg"></eso-img>
								</template>
							</view>
							<view class="bottom flex-y-c">
								<view class="left-box flex-y-c">
									<template v-if="item === 2">
										<view class="shop-name overflow">{{'拼夕夕'}}的广告</view>
										<view class="more-btn pointer">查看详情</view>
									</template>
									<template v-else>
										<view class="bi-count flex-y-c">
											<text class="icon iconfont">&#xe624;</text>
											<text class="text overflow">{{23533.45 | showNumber({format: 'thousandth'})}}</text>
										</view>
										<view class="info flex-y-c">
											<text class="author overflow">帅气每一天@</text>
											<text class="watch-count">{{4335344 | showNumber({format: 'scale'})}}&nbsp;阅读</text>
											<text class="talk-count">{{3454 | showNumber({format: 'scale'})}}&nbsp;评论</text>
											<text class="star-count">{{8566 | showNumber({format: 'scale'})}}&nbsp;赞</text>
										</view>
									</template>
								</view>
								<text class="close-btn pointer iconfont">&#xe620;</text>
							</view>
						</view>
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item zti">
						<view class="top-nav flex-y-c">
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/zti_gc.svg" mode="aspectFill"></image>
								<text>搜友广场</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/zti_rm.svg" mode="aspectFill"></image>
								<text>热门专题</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/zti_gf.svg" mode="aspectFill"></image>
								<text>官方专题</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/zti_jy.svg" mode="aspectFill"></image>
								<text>投诉建议</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/zti_zp.svg" mode="aspectFill"></image>
								<text>工作招聘</text>
							</view>
						</view>
						<view class="g-title flex-y-c pointer">
							<image class="icon" src="@/static/icon/zti_mine.svg" mode="aspectFill"></image>
							<text>我关注的专题</text>
						</view>
						<view class="list flex">
							<view class="item zti flex" v-for="item in 11" :key="item">
								<view class="img-box pointer">
									<eso-img class="auto-img" src="../../static/images/banner3.jpg"></eso-img>
									<text class="two-line">230万人关注</text>
								</view>
								<text class="title overflow">原创文学</text>
								<text class="desc two-line">易搜推荐专题</text>
							</view>
						</view>
					</scroll-box>
				</swiper-item>
				<swiper-item>
					<scroll-box class="tab-item zti">
						<view class="top-nav flex-y-c">
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/lzai_fl.svg" mode="aspectFill"></image>
								<text>全部分类</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/lzai_xs.svg" mode="aspectFill"></image>
								<text>对话小说</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/lzai_fm.svg" mode="aspectFill"></image>
								<text>易搜FM</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/lzai_lz.svg" mode="aspectFill"></image>
								<text>开通连载</text>
							</view>
							<view class="item flex-y-c pointer">
								<image class="icon" src="@/static/icon/lzai_sp.svg" mode="aspectFill"></image>
								<text>连载书评</text>
							</view>
						</view>
						<view class="g-title flex-y-c pointer">
							<image class="icon" src="@/static/icon/lzai_gz.svg" mode="aspectFill"></image>
							<text>我关注的连载</text>
						</view>
						<view class="list flex">
							<view class="item lzai flex" v-for="item in 11" :key="item">
								<eso-img class="img-box pointer" src="../../static/images/banner2.jpg"></eso-img>
								<text class="title two-line">原创文学</text>
								<view class="info flex-y-c">
									<eso-img class="avatar pointer" src="../../static/images/banner2.jpg"></eso-img>
									<text class="username overflow">帅气每一天@</text>
									<view class="flex-y-c">
										<text class="icon iconfont pointer">&#xe614;</text>
										<text class="watch-count">{{234 | showNumber({format: 'scale_zh'})}}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-box>
				</swiper-item>
			</swiper>
			<view class="poster-box pointer">
				<eso-img src="../../static/images/newYear.png" mode="aspectFit"></eso-img>
			</view>
			<view class="add-article pointer" @click="$emit('addClick', {module: 'wz'})"></view>
		</view>
		
	</view>
</template>

<script>
	import searchBar from '@/components/eso-searchBar/eso-searchBar.vue'
	
	export default {
		name: 'home',
		components: {
			searchBar
		},
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
					{title: '活动', type: 1},
					{title: '推荐', type: 2},
					{title: '专题', type: 3},
					{title: '连载', type: 4}
				],
				endIndex: 0,
				left: 0,
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
					
				this.$utils.log('获取数据 home ', idx);
				
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
		},
		beforeDestroy() {
			
			this.timer && clearTimeout(this.timer);
			
		}
	}
</script>

<style lang="less">
	
	.home { 
		.container3 {
			overflow-x: hidden;
		}
		/* #ifndef H5 */
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		/*  #endif  */
		.search-bar {
			.right-box {
				position: relative;
				height: 40px;
				width: 94px;
				margin-left: 10px;
				padding-right: 20px;
				font-size: 12px;
				line-height: 40px;
				text-align: right;
				color: #ffcf71;
				background: url(../../static/images/sign_in.png) no-repeat center center;
				background-size: 100% 100%;
			}
		}
		.tab-box {
			justify-content: space-around;
			height: 45px;
			font-size: 14px;
			.item.active {
				font-size: 15px;
			}
			.line {
				position: absolute;
				bottom: 0;
				height: 3px;
				width: 15px;
				border-radius: 3px;
				transform: translateX(-50%);
			}
		}
		.swiper {
			width: 100%;
			height: calc(100% - 89px);
			.tab-item {
				.item2 {
					margin-top: 10px;
					padding: 15px 12px;
					&:first-child {
						margin-top: 0;
					}
					.title {
						font-size: 15px;
						line-height: 22px;
					}
					.i-content {
						padding: 10px 0;
						.desc {
							flex: 1;
							font-size: 12px;
							line-height: 20px;
							opacity: .85;
						}
						.img-box {
							width: 100px;
							height: 70px;
							margin-left: 15px;
							border-radius: 5px;
						}
						.imgs-box {
							flex: 1;
							height: 70px;
							margin-right: 8px;
							border-radius: 5px;
							&:last-child {
								margin-right: 0;
							}
						}
					}
					.bottom {
						justify-content: space-between;
						.left-box {
							font-size: 12px;
							.shop-name {
								max-width: 100px;
								font-size: 12px;
							}
							.more-btn {
								padding: 3px 12px;
								border-radius: 4px;
								transform: scale(.75);
								font-size: 12px;
								opacity: .85;
							}
							.bi-count {
								margin-left: -9px;
								transform: scale(.75);
								font-size: 12px;
								.icon {
									margin-right: 4px;
									font-size: 16px;
								}
								.text {
									max-width: 60px;
								}
							}
							.info {
								margin-left: -32px;
								transform: scale(.75);
								font-size: 12px;
								.author {
									max-width: 60px;
								}
								>text {
									margin-right: 4px;
									&:last-child {
										margin-right: 0;
									}
								}
							}
						}
						.close-btn {
							font-size: 14px;
						}
					}
				}
			}
		}
		.poster-box {
			position: absolute;
			bottom: 75px;
			right: 0;
			width: 90px;
			height: 90px;
			animation: heartbeat .8s linear infinite alternate;
			@keyframes heartbeat {
				0% { transform: translateX(0) scale(1); }
				100% { transform: translateX(0) scale(1.2); }
			}
		}
		.add-article {
			position: absolute;
			bottom: 10px;
			right: 20px;
			height: 55px;
			width: 55px;
			border-radius: 50%;
		}
	}
	
	.setColor(@color) {
	    .home.@{color} { 
			/* #ifndef H5 */
			.status_bar {
				background-color: ~"@{@{color}-fore}";
			}
			/*  #endif  */
			.search-bar {
				background-color: ~"@{@{color}-fore}";
			}
			.tab-box {
				border-bottom: 1px solid ~"@{@{color}-sub}";
				color: ~"@{@{color}-rule-bright}";
				background-color: ~"@{@{color}-fore}";
				.line {
					background-color: ~"@{@{color}-main}";
				}
				.item.active {
					color: ~"@{@{color}-rule-dark}";
				}
			}
			.swiper {
				.tab-item {
					.item1 {
						margin: 15px 12px 0;
						border-radius: 6px;
						box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .1);
						background-color: ~"@{@{color}-fore}";
						overflow: hidden;
						.top {
							height: 115px;
							width: 100%;
							eso-img {
								height: 100%;
							}
							.full {
								flex: 1;
							}
							.max-width {
								width: auto;
								max-width: 45%;
							}
						}
						.info {
							flex-direction: column;
							padding: 15px;
							.title {
								font-size: 15px;
								color: ~"@{@{color}-rule-dark}";
							}
							.desc {
								font-size: 12px;
								line-height: 22px;
								word-break: break-all;
								color: ~"@{@{color}-rule-bright}";
							}
						}
					}
					.item2 {
						background-color: ~"@{@{color}-fore}";
						.title {
							color: ~"@{@{color}-rule-dark}";
						}
						.i-content {
							.desc {
								color: ~"@{@{color}-rule-dark}";
							}
						}
						.bottom {
							.left-box {
								color: ~"@{@{color}-rule-bright}";
								.more-btn {
									border: calc(1px / .75) solid ~"@{@{color}-sub}";
								}
								.bi-count {
									color: ~"@{@{color}-main}";
									.icon {
										color: ~"@{@{color}-main}";
									}
								}
							}
							.close-btn {
								color: ~"@{@{color}-rule-bright}";
							}
						}
					}
					&.zti {
						.top-nav {
							height: 105px;
							padding-top: 10px;
							background-color: ~"@{@{color}-fore}";
							.item {
								flex: 1;
								flex-direction: column;
								font-size: 12px;
								color: ~"@{@{color}-rule-dark}";
								.icon {
									width: 30px;
									height: 30px;
									margin-bottom: 15px;
								}
							}
						}
						.g-title {
							height: 55px;
							margin: 12px 0;
							padding: 0 12px;
							font-size: 15px;
							color: ~"@{@{color}-rule-dark}";
							background-color: ~"@{@{color}-fore}";
							.icon {
								width: 35px;
								height: 35px;
								margin-right: 10px;
							}
						}
						.list {
							flex-wrap: wrap;
							padding: 12px 12px 0;
							background-color: ~"@{@{color}-fore}";
							.item {
								flex-direction: column;
								width: calc((100vw - 48px) / 3);
								margin-right: 12px;
								margin-bottom: 12px;
								&:nth-child(3n) {
									margin-right: 0;
								}
								&.zti {
									.img-box {
										position: relative;
										width: 100%;
										height: calc((100vw - 48px) / 3);
										border-radius: 6px;
										overflow: hidden;
										text {
											position: absolute;
											bottom: 0;
											left: 0;
											width: 100%;
											padding: 4.5px 5px;
											font-size: 12px;
											color: #ffffff;
										}
									}
									.title {
										padding: 10px 0;
										font-size: 15px;
										color: ~"@{@{color}-rule-dark}";
									}
									.desc {
										font-size: 12px;
										color: ~"@{@{color}-rule-bright}";
									}
								}
								&.lzai {
									.img-box {
										width: 100%;
										height: calc((100vw - 48px) * .45);
										border-radius: 6px;
										overflow: hidden;
									}
									.title {
										min-height: 42px;
										margin: 10px 0;
										font-size: 15px;
										line-height: 21px;
										color: ~"@{@{color}-rule-dark}";
									}
									.info {
										font-size: 12px;
										color: ~"@{@{color}-rule-bright}";
										.avatar {
											width: 15px;
											height: 15px;
											border-radius: 50%;
											overflow: hidden;
										}
										.username {
											flex: 1;
											transform: scale(10 / 12);
										}
										.icon {
											font-size: 12px;
										}
										.watch-count {
											transform: scale(10 / 12);
										}
									}
								}
							}
						}
					}
				}
			}
			.add-article {
				@rgb: ~"@{@{color}-main-rgb}";
				box-shadow: 0 0 8px 2px  rgba(@rgb, .35);
				@left-color: ~"@{@{color}-main-bright}";
				@right-color: ~"@{@{color}-main}";
				background-image: linear-gradient(135deg, @left-color, @right-color);
				&::before {
					content: '';
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					width: 25px;
					height: 3px;
					border-radius: 3px;
					background-color: ~"@{@{color}-fore}";
				}
				&::after {
					content: '';
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					height: 25px;
					width: 3px;
					border-radius: 3px;
					background-color: ~"@{@{color}-fore}";
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
