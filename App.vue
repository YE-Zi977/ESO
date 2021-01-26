<script>
	
	export default {
		onLaunch() {
			
			// #ifndef H5 || MP
			if (uni.getStorageSync('once_time')) {
					
				// 不是第一次进入APP 跳过登录页
				
				
			}else {
				
				uni.setStorageSync('once_time', +new Date());
				// 前往登录页
				uni.navigateTo({
					url: '/pages/user-login/user-login',
					animationType: 'none'
				})
				
			}
			// #endif
			
			// #ifdef H5 || MP
			// h5 和小程序 直接进入首页，跳过登录页，可在我的页面登录页
			// #endif
			
			// 设置主题
			let theme = uni.getStorageSync('$theme') || 'default', themeList = ['default', 'dark'];
			setTimeout(() => {
				if (themeList.indexOf(theme) > -1) this.$store.commit('setValue', {key: 'theme', value: theme});
			}, 0)
			
			this.$utils.back = this.$back.bind(this); // 将 $back 挂载到 $utils 
			
		},
		
		onShow() {
			this.$utils.log('App Show');
		},
		
		onHide() {
			this.$utils.log('App Hide');
		},
		
		methods: {
			
			// 返回
			$back(delta = 1) {
			
				// #ifdef H5
				const pages = getCurrentPages();
				if(pages.length <= 1) {
					
					let a = this.$router.go(-1);
					if(!a) uni.reLaunch({url:'/pages/main/main'});
					return;
					
				}
				// #endif
			
				uni.navigateBack({
					delta 
				});
				
			}
			
		}
		
	}
</script>

<style lang="less">
	
	/* #ifndef MP */
		@import 'http://at.alicdn.com/t/font_2226500_3r12ajdkncv.css';
	/*  #endif  */
	
	// uni组件公共样式
	.small .uni-swiper-dot { width: 6px !important; height: 6px !important; }
	.small .uni-swiper-dots-horizontal { bottom: 5px !important; }
	
	/*每个页面公共css */
	view, text {
		box-sizing: border-box;
	}
	.relative {
		position: relative;
	}
	.pointer {
		user-select: none;
		cursor: pointer;
	}
	.p-15 {
		padding: 15px;
	}
	.p-12 {
		padding: 12px;
	}
	.p-10 {
		padding: 10px;
	}
	.auto-img {
		display: block;
		width: 100%;
		height: 100%;
	}
	.flex {
		display: flex;
	}
	.flex-c {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flex-x-c {
		display: flex;
		justify-content: center;
	}
	.flex-y-c {
		display: flex;
		align-items: center;
	}
	.container1 {
		height: 100vh;
		overflow-y: auto;
		/* #ifndef H5 */
		&.h-1 {
			height: calc(100vh - var(--status-bar-height));
		}
		/*  #endif  */
	}
	.container2 {
		/* #ifndef H5 */
		height: calc(100vh - 45px - var(--status-bar-height));
		&.h-1 {
			height: calc(100vh - 44px - var(--status-bar-height));
		}
		/*  #endif  */
		/* #ifdef H5 */
		height: calc(100vh - 45px);
		&.h-1 {
			height: calc(100vh - 44px);
		}
		/*  #endif  */
		overflow-y: auto;
	}
	.container3 {
		/* #ifndef H5 */
		height: calc(100vh - 50px - var(--status-bar-height));
		/*  #endif  */
		/* #ifdef H5 */
		height: calc(100vh - 50px);
		/*  #endif  */
		overflow-y: auto;
	}
	.container4 {
		/* #ifndef H5 */
		height: calc(100vh - 95px - var(--status-bar-height));
		&.h-1 {
			height: calc(100vh - 94px - var(--status-bar-height));
		}
		/*  #endif  */
		/* #ifdef H5 */
		height: calc(100vh - 95px);
		&.h-1 {
			height: calc(100vh - 94px);
		}
		/*  #endif  */
		overflow-y: auto;
	}
	.no-data-box {
		display: flex;
		justify-content: center;
		align-items: center;
	    height: 100%;
		width: 100%;
	}
	/* 文本超出省略号 */
	.overflow {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-break: break-all;
	}
	/*两行 */
	.two-line{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break: break-all;
	}
	/*三行 */
	.three-line{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		word-break: break-all;
	}
	
</style>
