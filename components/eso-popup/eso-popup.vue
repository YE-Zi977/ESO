<template>
	<view class="popup" v-if="isShow1" v-show="isShow2">
		
		<view class="clack-box pointer" :animation="clackAnimationData" :class="[{'bg-1': !isClackBg}]" @click="$emit('change', false)">
			
		</view>
		
		<view class="center" @click.stop v-if="type === 'center'">
			<view class="in-box" :animation="boxAnimationData">
				<slot></slot>
			</view>
		</view>
		
		<view class="top" :animation="boxAnimationData" @click.stop v-if="type === 'top'">
			<slot></slot>
		</view>
		
		<view class="bottom" :animation="boxAnimationData" @click.stop v-if="type === 'bottom'">
			<slot></slot>
		</view>
		
		<view class="left" :animation="boxAnimationData" @click.stop v-if="type === 'left'">
			<slot></slot>
		</view>
		
		<view class="right" :animation="boxAnimationData" @click.stop v-if="type === 'right'">
			<slot></slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'popup',
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			// 是否弹出 v-model
			value: {
				type: Boolean,
				default: true
			},
			// 遮罩是否有背景
			isClackBg: {
				type: Boolean,
				default: true
			},
			// 弹出框类型
			type: {
				type: String,
				default: 'center'
			},
			// 动画时长
			duration: {
				type: Number,
				default: 230
			},
			// 使用v-if 还是 v-show(true)
			isToggle: {
				type: Boolean,
				default: true
			},
		},
		watch: {
			value(value) {
				
				if (value) {
					
					if (this.isToggle) {
						this.isShow2 = true;
					}else {
						this.isShow1 = true;
					}
					
					this.$nextTick(() => {
						
						this.animation1.opacity(1).step()
						this.clackAnimationData = this.animation1.export()
							
						this.checkAnimation(false)
						this.boxAnimationData = this.animation2.export()
						
						setTimeout(this.$emit.bind(this, 'open'), this.duration);
						
					})
					
				}else {
					
					this.checkAnimation()
					this.boxAnimationData = this.animation2.export()
					
					this.animation1.opacity(0).step()
					this.clackAnimationData = this.animation1.export()
						
					setTimeout(() => {
						if (this.isToggle) {
							this.isShow2 = false;
						}else {
							this.isShow1 = false;
						}
						this.$emit('close');
					}, this.duration);
						
				}
					
			}
		},
		data() {
			return {
				uni, // uni实例
				clackAnimationData: {},
				boxAnimationData: {},
				isShow1: true,
				isShow2: true
			};
		},
		created() {
			
			this.animation1 = uni.createAnimation({
				duration: this.duration
			})
			this.animation2 = uni.createAnimation({
				duration: this.duration
			})
			
			if (this.isToggle) {
				this.isShow2 = false;
			}else {
				this.isShow1 = false;
			}
			
			if (this.value) {
				
				if (this.isToggle) {
					this.isShow2 = true;
				}else {
					this.isShow1 = true;
				}
				
				this.$nextTick(() => {
					
					this.animation1.opacity(1).step()
					this.clackAnimationData = this.animation1.export()
						
					this.checkAnimation(false)
					this.boxAnimationData = this.animation2.export()
					
					setTimeout(this.$emit.bind(this, 'open'), this.duration);
					
				})
					
			}
			
		},
		methods: {
			
			checkAnimation(isClose = true) {
				
				switch(this.type) {
					case 'center':
					this.animation2.scale(isClose ? 0 : 1).step()
					break;
					case 'top':
					this.animation2.translateY(isClose ? '-100%' : 0).step()
					break;
					case 'bottom':
					this.animation2.translateY(isClose ? '100%' : 0).step()
					break;
					case 'left':
					this.animation2.translateX(isClose ? '-100%' : 0).step()
					break;
					case 'right':
					this.animation2.translateX(isClose ? '100%' : 0).step()
					break;
				}
				
			}
			
		}
	}
</script>

<style lang="less">
	
	.popup {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		.clack-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, .85);
			&.bg-1 {
				background-color: rgba(0, 0, 0, 0);
			}
			opacity: 0;
		}
		.center {
			position: absolute;
			top: 50%;
			left:50%;
			transform: translate(-50%, -50%);
			.in-box {
				transform: scale(0);
			}
		}
		.top {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			transform: translateY(-100%);
		}
		.bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			transform: translateY(100%);
		}
		.left {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			transform: translateX(-100%);
		}
		.right {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			transform: translateX(100%);
		}
	}

</style>
