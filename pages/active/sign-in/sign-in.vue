<template>
	<view class="sign-in" :class="[theme]">
		
		<nav-bar text="易搜签到" :isBackground="true" :isBorder="true">
			<template #left>
				<view class="g-left-box pointer" @click="$utils.back()"><text class="iconfont">&#xe6ab;</text></view>
			</template>
			<template #right>
				<text class="g-right-box pointer iconfont">&#xe62e;</text>
			</template>
		</nav-bar>
		
		<view class="cont container2">
			<view class="top-box flex-y-c">
				<view class="left-box">
					<view class="big">累计签到<text>99</text>天</view>
					<view>连续签到<text>10</text>天</view>
				</view>
				<view class="right-box">
					
				</view>
			</view>
			<view class="tip">今日已奖励<text>2</text>积分，再签2日即可获得<text>10</text>积分奖励</view>
			<view class="date-box">
				<view class="head flex-y-c">
					<text class="date">{{dateStr}}</text>
					<view class="right flex-y-c">
						<text>签到提醒</text>
						<view class="switch" :class="[{active: isRemind}]" @click="isRemind = !isRemind">
							<text class="bg"></text>
						</view>
					</view>
				</view>
				<view class="title flex-y-c">
					<text>日</text>
					<text>一</text>
					<text>二</text>
					<text>三</text>
					<text>四</text>
					<text>五</text>
					<text>六</text>
				</view>
				<swiper class="swiper" :current="currentIndex" @change="handleChange" >
					<swiper-item v-for="(item, index) in dateList" :key="index">
						<view class="block flex">
							<view class="item" 
							:class="[{'right-border': (idx + 1) % 7 !== 0, 'bottom-border': idx < 5 * 7}]" 
							v-for="(grid, idx) in 42" 
							:key="idx" 
							:style="[{width: `calc((100% - ${6}px) / ${7})`, height: `calc((100% - ${5}px) / ${6})`}]">
								<template v-if="idx >= item.first && item.child[idx - item.first]">
									<text>{{item.child[idx - item.first]}}</text>
								</template>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="rule-box">
				<text class="title">签到规则说明</text>
				<text>1.每日签到可获得不同积分奖励，连续签到越长，则奖励越丰富</text>
				<text>2.每日签到可获得不同积分奖励，连续签到越长，则奖励越丰富</text>
				<text>3.每日签到可获得不同积分奖励，连续签到越长，则奖励越丰富</text>
				<text>4.每日签到可获得不同积分奖励，连续签到越长，则奖励越丰富</text>
			</view>
		</view>
		
		<popup :value="isBullet" @change="value => { isBullet = value; }" :isToggle="false">
			<view class="sign-in-ed">
				<image class="auto-img" src="../../../static/images/sign-in-bg.jpg"></image>
				<view class="content flex-c">
					<text class="title">签到成功</text>
					<text class="tip">已经连续签到</text>
					<view class="step-box flex-y-c">
						<view class="flex-y-c top">
							<view class="item flex-y-c" :class="[{active: index < 4}]" v-for="(item, index) in 7" :key="item">
								<text class="line" v-if="index !== 0"></text>
								<text class="flex-c pointer">{{index + 1}}</text>
							</view>
						</view>
						<view class="flex-y-c">
							<text class="item">第一天</text>
							<text class="item">第二天</text>
							<text class="item">第三天</text>
							<text class="item">第四天</text>
							<text class="item">第五天</text>
							<text class="item">第六天</text>
							<text class="item">第七天</text>
						</view>
					</view>
				</view>
				<text class="close-btn pointer flex-c iconfont" @click="isBullet = false">&#xe620;</text>
			</view>
		</popup>
		
	</view>
</template>

<script>
	import popup from '@/components/eso-popup/eso-popup.vue'
	
	export default {
		name: 'signIn',
		components: {
			popup
		},
		data() {
			return {
				uni, // uni实例
				bulletAnimationData: {}, // 弹窗动画
				isBullet: false, // 是否显示弹框
				isSignIn: false, // 是否签到
				isRemind: false, // 是否签到提醒
				dateList: [],
				currentIndex: 0,
			};
		},
		onLoad() {
			
			this.getDateList();
			
		},
		onShow() {
			
			this.init();
			
		},
		computed: {
			theme() {
				return this.$store.state.theme
			},
			dateStr() {
				
				if (this.dateList[this.currentIndex]) {
					let {year, month, day} = this.dateList[this.currentIndex];
					return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
				}
				
				return '';
			}
		},
		methods: {
			
			// 初始化
			async init() {
				
				this.timer && clearTimeout(this.timer);
				this.timer = this.$utils.loading.call(uni, '加载中...');
				
				let res1 = await this.signIn();
				if (!res1) return;
				
				this.isSignIn = true;
				this.isBullet = !!res1.data;
				clearTimeout(this.timer);
				uni.hideLoading();
				
			},
			
			getDateList() {
				
				let date = new Date();
				let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
				let temp = [
					{year: month === 1 ? year - 1 : year, month: month === 1 ? 12 : month - 1},
					{year, month},
					{year: month === 12 ? year + 1 : year, month: month === 12 ? 1 : month + 1}
				]
				
				temp.forEach(val => {
					
					let count = this.getDayCount(val.year, val.month);
					
					this.dateList.push({
						first: this.getDay(val.year, val.month),
						year: val.year,
						month: val.month,
						day: val.month === month ? day : count,
						child: this.getDayArray(count)
					})
					
				})
				
				this.getCurrentIndex(year, month);
				
			},
			
			// 获取swiper当前指引
			getCurrentIndex(year, month) {
				
				for (let idx in this.dateList) {
					
					if (this.dateList[idx].year === year && this.dateList[idx].month === month) {
						this.currentIndex = idx;
						break;
					}
					
				}
				
			},
			
			// 返回月中1号是星期几
			getDay(year, month) {
				
				return new Date(`${year}/${month}/1 0:0:0`).getDay();
				
			},
			
			// 返回月中的天数
			getDayCount(year, month) {
				
				let isLeap = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
				if (month == 2) return isLeap ? 29 : 28;
				if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) return 31;
				return 30;
				
			},
			
			// 返回天数数组
			getDayArray(count) {
				
				let temp = [];
				
				for (let i = 1; i <= count; i++) {
					temp.push(i);
				}
				
				return temp;
				
			},
			
			// 处理swiper change事件
			handleChange({ detail }) {
				
				this.currentIndex = detail.current;
				
			},
			
			// 签到
			signIn() {
				
				return new Promise(resolve => {
					
					this.$utils.request({
						uni,
						url: '/eso/integral/sign',
						data: {},
						showErrorType: 1,
						callback: (res) => {
							if (res.code === 200) resolve({data: res.data});
							else {
								clearTimeout(this.timer);
								uni.hideLoading();
								resolve(false);
							};
						}
					})
					
				})
				
			}
			
		},
		onBackPress(e) {
			
			if (e.from === 'backbutton' && this.isBullet) {
				
				this.isBullet = false;
				return true 
				
			}
			
		}
	}
</script>

<style lang="less">
	
	.setColor(@color) {
		.sign-in.@{color} { 
			.g-left-box {
				color: ~"@{@{color}-rule-bright}";
			}
			.g-right-box {
				font-size: 20px;
				color: ~"@{@{color}-rule-bright}";
			}
			.cont {
				padding: 25px;
				@left-color: ~"@{@{color}-main-bright}";
				@right-color: ~"@{@{color}-main}";
				background-image: linear-gradient(135deg, @left-color, @right-color);
				.top-box {
					.left-box {
						flex: 1;
						font-size: 16px;
						color: ~"@{@{color}-fore}";
						text-shadow: ~"@{@{color}-rule-dark}" 2px 2px 4px;
						vertical-align: bottom;
						.big {
							padding-bottom: 5px;
							font-size: 20px;
							text{
								font-size: 32px;
							}
						}
						text{
							padding: 0 5px;
							font-size: 20px;
							font-weight: 600;
						}
					}
					.right-box {
						width: 100px;
						height: 70px;
						background-color: ~"@{@{color}-fore}";
					}
				}
				.tip {
					padding: 35px 0 15px;
					text-shadow: ~"@{@{color}-rule-dark}" 2px 2px 4px;
					font-size: 14px;
					color: ~"@{@{color}-fore}";
					text {
						padding: 0 5px;
						font-size: 16px;
						font-weight: 600;
					}
				}
				.date-box {
					height: 360px;
					margin-bottom: 25px;
					border-radius: 20px;
					box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
					background-color: ~"@{@{color}-fore}";
					overflow: hidden;
					.head {
						justify-content: space-between;
						height: 45px;
						padding: 0 12px;
						font-size: 14px;
						color: #a17830;
						font-weight: 600;
						background-color: #ffe6ae;
						.right .switch {
							position: relative;
							width: 40px;
							height: 18px;
							margin-left: 25px;
							border-radius: 20px;
							border: 1px solid #f4dead;
							background-color: #fbda7e;
							.bg {
								position: absolute;
								left: 0;
								top: 0;
								width: 10px;
								height: 18px;
								border-radius: 18px;
								background-color: #a17830;
								transition: width .23s linear;
								&::after {
									content: '';
									position: absolute;
									right: -10px;
									top: -2px;
									width: 20px;
									height: 20px;
									border-radius: 50%;
									box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, .15);
									border: 1px solid #f4dead;
									background-color: #ffffff;
								}
							}
							&.active {
								.bg {
									width: 30px;
								}
							}
						}
					}
					.title {
						justify-content: space-around;
						height: 45px;
						font-size: 16px;
						color: ~"@{@{color}-main}";
					}
					.swiper {
						width: 100%;
						height: 270px;
						padding: 0 10px 10px;
						.block {
							flex-wrap: wrap;
							width: calc(100% - 20px);
							height: 260px;
							border: 1px solid ~"@{@{color}-sub}";
							.item {
								box-sizing: content-box;
								&.right-border {
									border-right: 1px solid ~"@{@{color}-sub}";
								}
								&.bottom-border {
									border-bottom: 1px solid ~"@{@{color}-sub}";
								}
								text {
									padding: 5px;
									font-size: 14px;
									color: ~"@{@{color}-rule-bright}";
								}
							}
						}
					}
				}
				.rule-box {
					display: flex;
					flex-direction: column;
					text-shadow: ~"@{@{color}-rule-dark}" 2px 2px 4px;
					font-size: 14px;
					color: ~"@{@{color}-fore}";
					.title {
						font-size: 16px;
						margin-bottom: 10px;
					}
					text {
						padding-bottom: 8px;
					}
				}
			}
			.sign-in-ed {
				width: 290px;
				height: 180px;
				border-radius: 10px;
				overflow: hidden;
				.content {
					flex-direction: column;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					.title {
						font-weight: 600;
						font-size: 22px;
						color: ~"@{@{color}-rule-dark}";
					}
					.tip {
						padding: 10px 0 15px;
						font-size: 12px;
						color: ~"@{@{color}-rule-bright}";
					}
					.step-box {
						flex-direction: column;
						.top {
							margin-bottom: 6px;
						}
						view.item {
							.flex-c {
								width: 15px;
								height: 15px;
								border-radius: 2px;
								font-size: 12px;
								color: ~"@{@{color}-fore}";
								background-color: #c9c2b8;
							}
							.line {
								width: 20px;
								height: 2px;
								background-color: #c9c2b8;
							}
							&.active {
								.flex-c {
									background-color: ~"@{@{color}-main}";
								}
								.line {
									background-color: ~"@{@{color}-main}";
								}
							}
						}
						text.item {
							transform: scale(9 / 12);
							font-size: 12px;
							color: ~"@{@{color}-rule-dark}";
						}
					}
				}
				.close-btn {
					position: absolute;
					right: 8px;
					top: 8px;
					width: 25px;
					height: 25px;
					border-radius: 50%;
					border: 1px solid #ffffff;
					color: #FFFFFF;
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
