<template>
	<view class="my-article" :class="[theme]">
		
		<nav-bar text="我的文章" :isBackground="true" textAlign="left" :isBorder="true">
			<template #left>
				<view class="g-left-box pointer" @click="$utils.back()"><text class="iconfont">&#xe6ab;</text></view>
			</template>
			<template #right>
				<text class="g-right-box pointer iconfont">&#xe626;</text>
			</template>
		</nav-bar>
		
		<view class="container2">
			<view class="tab-bar flex">
				<view class="line" :style="[{left: (index1 + .5) * (100 / tab.length) + '%'}]"></view>
				<view class="item flex-c" :class="[{active: index === index1}]" @click="index1 = index" v-for="(tab, index) in tab" :key="tab.title">{{tab.title}}</view>
			</view>
			
			<scroll-box class="cont" :styleOptions="{height: 'calc(100% - 55px)'}">
				<view class="head flex-y-c">
					<view class="count">0篇文章</view>
					<view class="type flex">
						<text :class="[{active: index2 === 0}]" @click="index2 = 0">{{index1 === 1 ? '草稿' : '公开'}}</text>
						<text :class="[{active: index2 === 1}]" @click="index2 = 1">付费</text>
					</view>
				</view>
				<view class="list">
					<view class="item" v-for="article in articleList" :key="article.id">
						<view class="info flex-y-c">
							<text class="status">未公开</text>
							<text>最后更新&nbsp;&nbsp;昨天&nbsp;12:12</text>
						</view>
						<view class="title overflow">放大很多事开发建设路附近两三个</view>
						<view class="desc two-line">打扫房间爱福家阿里阿达吉利丁粉卡机放大解放啦发冷风机阿里法分开来家里开饭店阿凡达法警队啦法拉克附近额额欧诶UR哦iafjdkfjdklfaffjalfadfjaldfjalfd 大家老地方课教案里看风景大姐夫绿扩军奥扩付啦军付扩啦军付啦奥奥奥奥奥奥奥奥奥奥奥绿军发绿付</view>
					</view>
					<view class="no-data" v-if="articleList.length <= 0">
						<image src="@/static/images/no-data.svg" mode="aspectFit"></image>
						<text class="tip">你的文章空空的哦~</text>
						<text class="create-btn flex-y-c pointer" @click="$utils.toPage.call(uni, '/pages/mine/create-article/create-article')">打开编辑器开始写作吧</text>
					</view>
				</view>
			</scroll-box>
		</view>
		
		<view class="g-create-btn flex-c pointer" @click="$utils.toPage.call(uni, '/pages/mine/create-article/create-article')"><text class="icon iconfont">&#xe625;</text></view>
		
	</view>
</template>

<script>
	export default {
		name: 'myArticle',
		data() {
			return {
				uni: uni,
				tab: [
					{title: '发布文章', type: 0},
					{title: '草稿文章', type: 1}
				],
				index1: 0,
				index2: 0,
				articleList: [], // 文章列表
			};
		},
		computed: {
			theme() {
				return this.$store.state.theme
			}
		},
		methods: {
			
			// 获取文章列表
			getArticleList() {
				
				this.timer && clearTimeout(this.timer);
				this.timer = this.$utils.loading.call(uni, '加载中');
				
				this.$utils.request({
					uni,
					url: '/eso/user/login',
					data: {},
					showErrorType: 1,
					success: res => {
							
						
						
					},
					callback: () => {
						uni.hideLoading();
						clearTimeout(this.timer);
					}
				})
				
			}
			
		}
	}
</script>

<style lang="less">
	
	.setColor(@color) {
		.my-article.@{color} { 
			position: relative;
			.g-left-box {
				margin-right: 15px;
				color: ~"@{@{color}-rule-bright}";
			}
			.g-right-box {
				font-size: 18px;
				color: ~"@{@{color}-rule-bright}";
			}
			.tab-bar {
				position: relative;
				height: 55px;
				width: 100%;
				border-bottom: 1px solid ~"@{@{color}-sub}";
				background-color: ~"@{@{color}-fore}";
				.line {
					position: absolute;
					bottom: -1px;
					width: 25%;
					transform: translateX(-50%);
					height: 2px;
					background-color: ~"@{@{color}-main}";
					transition: left .23s linear;
				}
				.item {
					flex: 1;
					height: 100%;
					font-size: 14px;
					color: ~"@{@{color}-rule-bright}";
					&.active {
						color: ~"@{@{color}-main}";
					}
				}
			}
			.cont {
				background-color: ~"@{@{color}-fore}";
				.head {
					justify-content: space-between;
					padding: 15px 12px;
					.count {
						font-size: 14px;
						font-weight: 600;
						color: ~"@{@{color}-rule-dark}";
					}
					.type {
						height: 30px;
						width: 90px;
						border-radius: 30rpx;
						background-color: ~"@{@{color}-bg}";
						text {
							flex: 1;
							height: 100%;
							border-radius: 30px;
							border: 1px solid transparent;
							font-size: 12px;
							text-align: center;
							line-height: 28px;
							color: ~"@{@{color}-rule-bright}";
							&.active {
								border-color: ~"@{@{color}-sub}";
								color: ~"@{@{color}-rule-dark}";
								background-color: ~"@{@{color}-fore}";
							}
						}
					}
				}
				.list {
					padding: 0 12px 15px;
					.item {
						margin-top: 15px;
						border-bottom: 1px solid ~"@{@{color}-sub}";
						.info {
							font-size: 12px;
							color: ~"@{@{color}-rule-bright}";
							.status {
								margin-right: 5px;
								color: ~"@{@{color}-rule-dark}";
							}
						}
						.title {
							padding-top: 5px;
							font-size: 18px;
							color: ~"@{@{color}-rule-dark}";
						}
						.desc {
							min-height: 40px;
							margin: 10px 0;
							font-size: 14px;
							line-height: 20px;
							color: ~"@{@{color}-rule-bright}";
						}
					}
				}
			}
			.no-data {
				display: flex;
				align-items: center;
				flex-direction: column;
				image {
					max-width: 100%;
				}
				.tip {
					padding-bottom: 10px;
					font-size: 13px;
					color: ~"@{@{color}-rule-bright}";
				}
				.create-btn {
					height: 40px;
					padding: 0 10px;
					border-radius: 40px;
					font-size: 14px;
					color: ~"@{@{color}-fore}";
					background-color: ~"@{@{color}-main}";
				}
			}
			.g-create-btn {
				position: absolute;
				bottom: 100px;
				right: 20px;
				height: 55px;
				width: 55px;
				border-radius: 50%;
				@rgb: ~"@{@{color}-main-rgb}";
				box-shadow: 0 0 8px 2px  rgba(@rgb, .35);
				@left-color: ~"@{@{color}-main-bright}";
				@right-color: ~"@{@{color}-main}";
				background-image: linear-gradient(135deg, @left-color, @right-color);
				.icon {
					font-size: 26px;
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
