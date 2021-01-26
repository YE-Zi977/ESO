<template>
	<view class="create-article" :class="[theme]">
		
		<nav-bar :text="fontCount + '字' + saveTip" :isBackground="true" textAlign="left" :isBorder="true">
			<template #left>
				<view class="g-left-box pointer" @click="$utils.back()"><text class="iconfont">&#xe6ab;</text></view>
			</template>
			<template #right>
				<text class="g-right-box pointer" @click="release()">发布</text>
			</template>
		</nav-bar>
		
		<view class="container2">
			<view class="cont">
				<view class="title-input">
					<view class="flex-y-c">
						<input v-model="articleTitle" class="input" placeholder="请输入标题" />
					</view>
				</view>
				<view class="content-box">
					<view 
					class="item flex" 
					:style="[{
						justifyContent: item.alignStyle == 1 ? 'flex-start' : item.alignStyle == 2 ? 'center' : 'flex-end'
					}]"
					v-for="(item, index) in articleContent" 
					:key="index">
						<template v-if="item.type == 1">
							<textarea 
							:placeholder-style="'color: ' + (item.color.indexOf('#') > -1 ? item.color : '#' + item.color) + '; opacity: .45;'"
							:style="[{
								flex: 1,
								lineHeight: '21px',
								textAlign: item.alignStyle == 1 ? 'left' : item.alignStyle == 2 ? 'center' : 'right',
								color: item.color.indexOf('#') > -1 ? item.color : '#' + item.color,
								fontSize: isNaN(item.txSize * 1) ? item.txSize : item.txSize + 'px'
							}]"
							@blur="handleBlur($event, index)"
							v-model="item.content" 
							:placeholder="index === 0 && articleContent.length === 1 ? '请输入正文' : ''" 
							auto-height />
						</template>
						<template v-if="item.type == 2">
							
						</template>
						<template v-if="item.type == 3">
							
						</template>
						<template v-if="item.type == 4">
							
						</template>
						<template v-if="item.type == 5">
							
						</template>
					</view>
				</view>
			</view>
			
			<view class="tool-bar flex-y-c">
				<text class="icon iconfont pointer">&#xe605;</text>
				<text class="icon iconfont pointer">&#xe623;</text>
				<text class="icon iconfont pointer">&#xe61d;</text>
				<text class="icon iconfont pointer" @click="isRecord = false; currentStep > 0 && currentStep --;">&#xe667;</text>
				<text class="icon iconfont pointer" @click="isRecord = false; currentStep < history.length && currentStep ++;">&#xe669;</text>
				<text class="icon iconfont pointer">&#xe621;</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'createArticle',
		data() {
			return {
				uni: uni,
				isNaN,
				articleId: null, // 文章id
				publishType: 1, // 文章发布状态
				articleTitle: null, // 文章标题
				articleContent: [
					{
						alignStyle: 1,
						color: '#000000',
						content: null,
						txSize: '16px',
						type: 1
					}
				], // 文章正文
				position: [0, 0], // 用于保存最后编辑的光标位置
				time: 2000, // 多长时间执行一次
				history: [], // 历史栈
				maxLength: 500, // 历史栈最大长度
				currentStep: 0, // 当前步数
				isRecord: true,
				saveTip: '',
			};
		},
		watch: {
			saveTip(value) {
				if (value && value != '（保存中...）') {
					this.timer2 && clearTimeout(this.timer2);
					this.timer2 = setTimeout(() => {
						this.saveTip = '';
					}, this.time / 2);
				}
			},
			articleTitle() {
				this.handleChange();
				
				this.timer3 && clearTimeout(this.timer3);
				this.timer3 = setTimeout(() => {
					this.save();
				}, this.time * 2)
				
			},
			articleContent: {
				handler() {
					this.handleChange();
					
					this.timer3 && clearTimeout(this.timer3);
					this.timer3 = setTimeout(() => {
						this.save();
					}, this.time * 2)
				},
				deep: true
			},
			currentStep(value, oldValue) {
				
				if (this.isRecord) return
				
				if (this.history.length !== value) {
					if (value > oldValue) {
						
						let keys = ['articleContent', 'articleTitle'];
						keys.forEach(key => {
							
							let count = value, flag = true;
							while (this.history[count]) {
								
								let temp = this.history[count].filter(val => val[0] === key)[0];
								if (temp) {
									flag = false;
									if (key === 'articleContent') this[key] = JSON.parse(temp[1]);
									else this[key] = temp[1];
									break;
								}
								
								count ++;
								
							}
							
							if (flag) {
								if (key === 'articleContent') this[key] = JSON.parse(this.oldArticleContent);
								else this[key] = this.oldArticleTitle;
							}
								
						})
					}else {
						this.history[value].forEach(val => {
							if (val[0] === 'articleContent') this[val[0]] = JSON.parse(val[1]);
							else this[val[0]] = val[1];
						})
					}
				}else {
					this.articleContent = JSON.parse(this.oldArticleContent);
					this.articleTitle = this.oldArticleTitle;
				}
				
			}
		},
		computed: {
			theme() {
				return this.$store.state.theme
			},
			// 文章封面
			articleCover() {
				return this.articleContent.filter(item => item.type == 2)[0] && this.articleContent.filter(item => item.type == 2)[0].content || null;
			},
			// 文章字数
			fontCount() {
				let count = 0;
				this.articleContent.filter(item => item.type == 1).forEach(item => {
					count += (item.content || '').length;
				})
				return count
			}
		},
		onLoad(options) {
			
			this.articleId = options.articleId || null;
			
			this.oldArticleTitle = this.articleTitle;
			this.oldArticleContent = JSON.stringify(this.articleContent);
			
		},
		onShow() {
			
			this.getArticleInfo();
			
		},
		methods: {
			
			// 获取文章详情
			getArticleInfo() {
				
				if (this.articleId) {
					
					// 加载动画
					this.timer2 && clearTimeout(this.timer2);
					this.timer2 = this.$utils.loading.call(uni, '加载中...');
					
					this.$utils.request({
						uni,
						url: '/eso/article/edit/detail',
						data: {
							articleId: this.articleId
						},
						showErrorType: 2,
						success: res => {
							this.get_detail = true;
							this.publishType = (res.data.publishType || 1) * 1;
							this.articleTitle = res.data.articleTitle || '';
							if (res.data.articleContent.length > 0) this.articleContent =  res.data.articleContent;
						},
						callback: () => {
							clearTimeout(this.timer2);
							uni.hideLoading();
						}
					})
					
				}
				
			},
			
			// 处理文章变化
			handleChange() {
				
				this.timer1 && clearTimeout(this.timer1);
				this.timer1 = setTimeout(() => {
					
					if (!this.isRecord) {
						this.isRecord = true;
						return;
					}
					
					if (this.history.length !== this.currentStep) {
						let keys = ['articleContent', 'articleTitle'];
						keys.forEach(key => {
							
							let temp = this.history[this.currentStep].filter(val => val[0] === key)[0];
							if (temp) {
								if (key === 'articleContent') this.oldArticleContent = temp[1];
								else this.oldArticleTitle = temp[1];
							}else {
								
								let count = this.currentStep, flag = true;
								while (this.history[count]) {
									
									let temp = this.history[count].filter(val => val[0] === key)[0];
									if (temp) {
										flag = false;
										if (key === 'articleContent') this.oldArticleContent = JSON.parse(temp[1]);
										else this.oldArticleTitle = temp[1];
										break;
									}
									
									count ++;
									
								}
							}
							
						})
						this.history = this.history.slice(0, this.currentStep);
					}
					
					let temp = [];
					if (this.articleTitle !== this.oldArticleTitle) {
						temp.push(['articleTitle', this.oldArticleTitle]);
						this.oldArticleTitle = this.articleTitle;
					}
					if (JSON.stringify(this.articleContent) !== this.oldArticleContent) {
						temp.push(['articleContent', this.oldArticleContent]);
						this.oldArticleContent = JSON.stringify(this.articleContent);
					}
					
					this.history.push(temp);
					this.currentStep ++;
					this.overflow();
					
				}, this.time)
				
			},
			
			// 发布
			release(callback) {
				
				// 加载动画
				this.timer2 && clearTimeout(this.timer2);
				this.timer2 = this.$utils.loading.call(uni, '发布中...');
				
				let { articleCover, articleTitle, articleContent } = this;
					
				this.$utils.request({
					uni,
					url: this.publishType !== 1 || this.articleId ? '/eso/article/edit' : '/eso/article/create',
					data: {
						articleId: this.articleId,
						articleContent,
						articleCover,
						articleTitle: (articleTitle || '').trim().length <= 0 ? this.getTime() : articleTitle,
						publishType: 2,
					},
					showErrorType: 2,
					success: res => {
						this.$utils.toast.call(uni, res.msg);
						this.$utils.back();
						this.release_ed = true;
					},
					callback: () => {
						clearTimeout(this.timer2);
						uni.hideLoading();
						callback && callback();
					}
				})
				
			},
			
			// 保存
			save(callback) {
				
				if (this.publishType !== 1) return // 不做自动保存操作 - 正式文章
				
				if (this.get_detail) {
					this.get_detail = false;
					return;
				}
					
				let { articleCover, articleTitle, articleContent } = this;
				
				this.saveTip = '（保存中...）';
				this.$utils.request({
					uni,
					url: this.articleId ? '/eso/article/edit' : '/eso/article/create',
					data: {
						articleId: this.articleId,
						articleContent,
						articleCover,
						articleTitle: (articleTitle || '').trim().length <= 0 ? this.getTime() : articleTitle,
						publishType: this.publishType,
					},
					showErrorType: 2,
					success: res => {
						this.saveTip = '（已保存）';
						this.articleId = res.data.articleId;
					},
					fail: (res) => {
						this.saveTip = '（保存失败）';
					},
					callback
				})
				
			},
			
			// 防止历史栈过大
			overflow() {
				
				let len = this.history.length - this.maxLength;
				if (len > 0) {
					this.history = this.history.filter((val, index) => index >= len);
					this.currentStep = this.maxLength;
				}
				
			},
			
			// 处理输入框失焦
			handleBlur({ detail }, index) {
				
				this.position[0] = index;
				this.position[1] = detail.cursor;
				
			},
			
			// 获取当前时间
			getTime() {
					
				let date  = new Date();
				let year  = date.getFullYear(),
					month = date.getMonth() + 1,
					day   = date.getDate();
					
					return year + '-' + month + '-' + day;
				
			},
			
			// 销毁
			destroy() {
				
				this.timer1 && clearTimeout(timer1);
				this.timer2 && clearTimeout(timer2);
				this.timer3 && clearTimeout(timer3);
				
			}
			
		},
		onUnload() {
			
			if (!this.release_ed && this.publishType !== 1 && this.history.length > 0) {
				uni.showModal({
					title: '退出编辑',
					content: '当前编辑未保存发布，退出将放弃本次修改，是否确认？',
					confirmText: '发布',
					success: res => {
						// 点击确认发布正式文章
						this.release(this.destroy.bind(this));
					}
				});
			}else {
				
				// 草稿自动保存
				this.save(this.destroy.bind(this));
			}
			
		}
		// #ifndef H5 || MP
		,
		onBackPress(e) {
			
			let page = getCurrentPages();
			
			if (page[page.length - 2].route !== 'pages/mine/my-article/my-article') {
				
				this.$utils.toPage.call(uni, '/pages/mine/my-article/my-article', 'redirectTo');
				return true 
			}
				
		}
		// #endif
	}
</script>

<style lang="less">
	
	.setColor(@color) {
		.create-article.@{color} { 
			.g-left-box {
				margin-right: 15px;
				color: ~"@{@{color}-rule-bright}";
			}
			.g-right-box {
				font-size: 15px;
				color: ~"@{@{color}-main-bright}";
			}
			.cont {
				height: calc(100% - 45px);
				background-color: ~"@{@{color}-fore}";
				overflow-y: auto;
				.title-input {
					height: 55px;
					padding: 0 12px;
					.flex-y-c {
						height: 100%;
						width: 100%;
						border-bottom: 2px dashed ~"@{@{color}-sub}";
						.input-placeholder {
							color: ~"@{@{color}-rule-bright}";
						}
						.input {
							flex: 1;
							font-size: 22px;
							letter-spacing: 1px;
							color: ~"@{@{color}-rule-dark}";
						}
						
					}
				}
				.content-box {
					height: calc(100% - 55px);
					overflow-y: auto;
					padding: 15px 12px;
					.textarea-placeholder {
						color: ~"@{@{color}-rule-bright}";
					}
				}
			}
			.tool-bar {
				justify-content: space-around;
				height: 45px;
				background-color: ~"@{@{color}-bg}";
				.icon {
					font-size: 18px;
					color: ~"@{@{color}-rule-bright}";
				}
				&.active .icon {
					color: ~"@{@{color}-main-bright}";
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
