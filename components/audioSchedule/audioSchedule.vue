<template>
	<view class="audio_content">
		<view class="audio_box">
			<view class="audio_process">
				<view class='slider'>
					<slider @change='sliderChange' @changing="sliderChangeIng" backgroundColor="#A3A4A6"
						activeColor='#FFFFFF' block-size="12" :value='proceessWidth' />
				</view>
				<view class="time_cons">
					<view class="duration">
						{{audioInfo.currentTime}}
					</view>
					<view class="end">
						{{audioInfo.duration}}
					</view>
				</view>
			</view>
			<view class="utils">
				<i class="cuIcon-sort icon_style"></i>
				<image @click="audioChange(-1)" class="change back" src="./pre-arrow.png" mode="">
				</image>
				<view class="center" @click="clickAudio">
					<image src="./stop.png" mode="" v-if="!audioStatus"></image>
					<image src="./paly.png" v-else></image>
				</view>
				<image @click="audioChange(1)" class="change next" src="./next-arrow.png" mode="">
				</image>
				<!-- 查看列表 -->
				<i class="cuIcon-sort icon_style"></i>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		debounce
	} from './debounce.js'
	import {
		versionCompare,
		formatTime
	} from './utils.js'
	const rateList = ["0.5", "0.8", "1.0", "1.25", "1.5", "2.0"];
	let innerAudioContext = null; // 声明实例
	export default {
		props: {
			classTitle: {
				type: String,
				default: ''
			},
			currentMedia: {
				type: Object,
				default: () => {},
			},
			mediaIndex: {
				// 当前媒体信息
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				audioStatus: true,
				proceessWidth: 0,
				innerAudioContext: null,
				audioInfo: {
					duration: "00:00",
					currentTime: "00:00",
					showRate: true,
				},
				currentRate: "1.0",
				timer: Date.now(), // 记录时间
			}
		},
		created() {
			this.innerAudioContext = uni.createInnerAudioContext();
			this.initAudio();
			this.audioInfo.showRate = this.isShowbeisuNumFn();
		},
		watch: {
			currentMedia(newValue, oldValue) {
				// 上报信息，开始重新处理
				console.log(newValue, oldValue, 'newValue, oldValue')
				this.reportProgress(oldValue);
				this.handleTimer();
				this.initAudio();
			},

		},
		beforeDestroy() {
			this.reportProgress(this.currentMedia);
			innerAudioContext.destroy();
			innerAudioContext = null;
		},
		methods: {
			// 上报数据
			reportProgress(currentMedia) {
				const duration = parseInt((Date.now() - this.timer) / 1000);
				let query = {
					content_id: currentMedia.id,
					viewing_record: this.proceessWidth, // 进度
					duration, // 此次学习秒数,初次加载和切换之后
				};
				this.$emit("durationsChange", {
					durations: innerAudioContext.currentTime,
					currentMedia,
				});
				// this.saveCourseDuration(query); // 上报数据到后端
			},
			// 处理时间
			handleTimer() {
				this.timer = Date.now();
			},
			//利用版本判断是否可以开启倍速
			isShowbeisuNumFn(version) {
				//利用版本判断是否倍速
				const {
					SDKVersion
				} = uni.getSystemInfoSync();
				return versionCompare(SDKVersion, "2.33.0");
			},
			// 音频初始化
			initAudio() {
				console.log('initAudio-=', this.currentMedia)
				const currentMedia = this.currentMedia;
				innerAudioContext = this.innerAudioContext;
				innerAudioContext.autoplay = true;
				innerAudioContext.obeyMuteSwitch = false;
				innerAudioContext.src = currentMedia.url;
				innerAudioContext.startTime = currentMedia.durations;
				this.$nextTick(() => {
					innerAudioContext.onPlay(() => {
						console.log("开始播放");
						this.audioStatus = true;
					});
					innerAudioContext.onCanplay(() => {
						this.audioInfo.duration = formatTime(parseInt(innerAudioContext.duration));
					});
					innerAudioContext.onError((res) => {
						console.log(res);
					});
					innerAudioContext.onEnded((res) => {
						console.log("播放完毕");
						this.audioStatus = false;
					});
					innerAudioContext.onTimeUpdate((res) => {
						console.log(innerAudioContext.currentTime, res, 'onTimeUpdate')
						this.audioInfo.currentTime = formatTime(
							parseInt(innerAudioContext.currentTime || 0) || 0
						);
						this.proceessWidth = parseInt(
							(innerAudioContext.currentTime / innerAudioContext.duration) * 100
						);
					});
				})
			},
			//拖动进度条事件
			sliderChange(e) {
				const proceess = e.detail.value;
				const duration = innerAudioContext.duration;
				innerAudioContext.seek(parseInt(duration * (proceess / 100)));
				innerAudioContext.play();
				this.audioStatus = true;
			},
			// 拖动中
			sliderChangeIng(e) {
				innerAudioContext.pause();
				this.audioStatus = false;
			},
			// 切换
			audioChange(num) {
				this.$emit("change", num);
			},
			//开始暂停
			clickAudio() {
				this.audioStatus = !this.audioStatus;
				const key = this.audioStatus ? "play" : "pause";
				innerAudioContext[key]();
			},
			// 设置播放速度
			setRate() {
				let index = rateList.findIndex((num) => this.currentRate === num);
				this.currentRate = rateList[index + 1] || rateList[0];
				let current = parseInt(innerAudioContext.currentTime) || 0;
				innerAudioContext.playbackRate = +this.currentRate;
				innerAudioContext.seek(current);
				this.audioStatus = true;
			},
		}
	}
</script>

<style lang="less" scoped>
	.audio_content {
		width: 100%;
		// padding: 24rpx;
		box-sizing: border-box;

		.audio_box {
			min-height: 300rpx;
			// background: linear-gradient(360deg, #A1A2A4 0%, #898A8C 100%);
			// border-radius: 42rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			// margin-bottom: 16rpx;
			align-items: center;
			// padding: 46rpx 64rpx;
			box-sizing: border-box;
			position: relative;

			.beisu {
				position: absolute;
				top: 254rpx;
				left: 558rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				text-align: center;
				height: 70rpx;

				.num {
					font-size: 30rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 30rpx;
				}

				.text {
					font-size: 22rpx;
					color: #FFFFFF;
					line-height: 22rpx;
				}
			}

			.course_name {
				width: 100%;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 37rpx;
				text-align: center;
				margin-bottom: 10rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.audio_title {
				// margin: 10rpx;
				width: 100%;
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 48rpx;
				text-align: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.audio_process {
				position: relative;
				top: 0;
				left: 0;
				transform: translateY(24rpx);
				margin-bottom: 6rpx;

				.audio_line {
					width: 582rpx;
					height: 4rpx;
					background: #A3A4A6;
					// height: 8rpx;
					// width: 520rpx;
					// background: rgba(37, 48, 91, 0.21);
					// border-radius: 5rpx;
					// opacity: 0.58;

				}

				.audio_line_on {
					position: absolute;
					top: 0;
					left: 0;
					width: 50%;
					height: 4rpx;
					background: #FFFFFF;

				}

				.audio_point {
					position: absolute;
					top: -12rpx;
					left: 0;
					width: 24rpx;
					height: 24rpx;
					background: #FFFFFF;
					border-radius: 50%;
					font-size: 22rpx;
					line-height: 22rpx;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.time_cons {
					width: 100%;
					margin-top: 10rpx;
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 33rpx;
				}
			}

			.utils {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 16rpx;
				.icon_style {
					font-size: 56rpx;
					color: #FFFFFF;
				}
				.center {
					margin: 0 70rpx;

					image {
						display: block;
						width: 96rpx;
						height: 96rpx;
					}
				}

				.change {
					display: block;
					width: 48rpx;
					height: 36rpx;
				}
				.back {
					margin-left: 70rpx;
				}
				.next {
					margin-right: 70rpx;
				}
			}

		}
	}

	.slider {
		width: 600rpx;
	}

	slider {
		margin: 0;
	}
</style>