<template>
	<view class="content">
		<view class="player">
			<view class="zp_bjt">
				<view class="title">
					<text class="fb_dmc">{{MusicName}}</text>
				</view>
				<view class="yp_xnr">
					<view class="sb_xyq" >
						<view class="sb_tx dh" :class="{'paused': !autoplay}">
							<text class="qq_dyq"></text>
							<text class="qs_deq"></text>
							<!-- <image :src="Picture" alt="" class="zq_xtb"></image> -->
							<image src="/static/111.jpg" alt="" class="zq_xtb"></image>
						</view>
						<image @click="FanBeiAutoplay()"
							:src="autoplay==true?'/static/ns_img/yp_tzhi.png':'/static/ns_img/yp_ztn.png'" alt=""
							class="yp_ztn"></image>
					</view>
				</view>
				<!-- 音频内容 -->
				<view class="yp_xnr">
					<view class="bf_xgc">
						<!-- <text class="cs_mzs">{{Name}}</text> -->
						<view class="gc_ksl">
							<scroll-view class="scrollLyrics" scroll-y="true">
								<view id="MusicLyrics" class="MusicLyrics" ref="MusicLyrics"
									:style="{'margin-top': top+'rpx'}">
									<text class="gc_xmc" v-for="item in Lyric" :ref="'TimeSlot'+item.TimeSlot"
										:class="['TimeSlot'+item.TimeSlot,item.TimeSlot === CurrentLocation ? 'Location' : '']"
										:key="item.TimeSlot">{{item.Text}}</text>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<!-- 音频内容 -->
			</view>
		</view>
		<view class="operating_button">
			<!-- 操作区域 -->
			<view class="flex collect justify-center align-center">
				<!-- 收藏分享 -->
				<i class="cuIcon-appreciate flex-sub icon_style"></i>
				<i class="cuIcon-appreciate flex-sub icon_style"></i>
				<i class="cuIcon-appreciate flex-sub icon_style"></i>
				<i class="cuIcon-appreciate flex-sub icon_style"></i>
				<i class="cuIcon-appreciate flex-sub icon_style"></i>
			</view>
			<!-- 进度条 和 播放 -->
			<view class="audio_schedule">
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
						<image @click="audioChange(-1)" class="change back" src="/static/ns_img/pre-arrow.png" mode="">
						</image>
						<view class="center" @click="FanBeiAutoplay">
							<image src="/static/ns_img/stop.png" mode="" v-if="!autoplay"></image>
							<image src="/static/ns_img/paly.png" v-else></image>
						</view>
						<image @click="audioChange(1)" class="change next" src="/static/ns_img/next-arrow.png" mode="">
						</image>
						<!-- 查看列表 -->
						<i class="cuIcon-sort icon_style"></i>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";

	const MusicName = ref("哈哈哈哈哈") // 音乐名称
	const autoplay = ref(false) // 音频状态，true表示正在播放，false表示暂停
	const FanBeiAutoplay = () => {
		// 点击图片上的播放按
		autoplay.value = !autoplay.value
	}

	// 模拟音频信息
	const proceessWidth = ref(50); // 进度条宽度
	const audioInfo = ref({
		currentTime: "02:30", // 当前播放时间
		duration: "05:00" // 音频总时长
	});

	// 模拟歌词数据
	const Name = ref("歌曲名"); // 歌曲名
	const Lyric = ref([{
			TimeSlot: 1,
			Text: "歌词1"
		},
		{
			TimeSlot: 2,
			Text: "歌词2"
		},
		{
			TimeSlot: 3,
			Text: "歌词3"
		},
		{
			TimeSlot: 3,
			Text: "歌词2"
		},
		{
			TimeSlot: 3,
			Text: "歌词32"
		},
		{
			TimeSlot: 3,
			Text: "歌词33"
		},
		// 其他歌词数据...
	]);
	const top = ref(0); // 歌词滚动的距离
	const CurrentLocation = ref(2); // 当前歌词的位置

	// 音频控制方法
	const sliderChange = (e) => {
		// 拖动进度条事件处理
		console.log("sliderChange", e);
	};

	const sliderChangeIng = (e) => {
		// 拖动进度条中事件处理
		console.log("sliderChangeIng", e);
	};

	const audioChange = (num) => {
		// 切换音频事件处理，num为1表示下一首，-1表示上一首
		console.log("audioChange", num);
	};
</script>

<style lang="scss" scoped>
	.content {
		background-image: radial-gradient(#615442, #424547);
		width: 100vw;
		height: 100vh;

		.player {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 300rpx;
			height: 100vh;
			width: 100%;
		}

		.operating_button {
			width: 100%;
			position: fixed;
			bottom: 0;

			.collect {
				text-align: center;
				margin-bottom: 10rpx;

				.icon_style {
					font-size: 40rpx;
					color: #fff;
				}
			}

			.audio_schedule {}
		}
	}

	.status_bar {
		top: 0;
		z-index: 10;
		/* width: 100%; */
		/*  #ifdef  APP-PLUS  */
		/* height: var(--status-bar-height); //覆盖样式 */
		/*  #endif  */
	}


	.zp_zgk {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.zp_bjt {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		top: 0;
		bottom: 0;
		/* background-color: rgba(0, 0, 0, 0.5); */
		height: calc(100vh - 660rpx);
	}

	.cs_znr {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		filter: blur(80rpx);
	}

	.zf_bst {
		display: block;
		width: 43rpx;
		height: 43rpx;
	}

	.bf_nrg {
		position: absolute;
		right: 40rpx;
		top: 70rpx;
	}

	/* 音频内容 */
	.yp_xnr {
		padding: 60rpx 40rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.zq_xtb {
		display: block;
		// width: 296rpx;
		// height: 296rpx;
		width: 480rpx;
		height: 480rpx;
		border-radius: 50%;
	}

	.sb_xyq {
		position: relative;
	}

	.qq_dyq {
		display: block;
		width: 520rpx;
		height: 520rpx;
		border: 3rpx solid #ffffff;
		position: absolute;
		left: -24rpx;
		top: -22rpx;
		border-radius: 50%;
		opacity: 0.4;
	}

	.qs_deq {
		display: block;
		width: 580rpx;
		height: 580rpx;
		border: 3rpx solid #ffffff;
		position: absolute;
		left: -56rpx;
		top: -54rpx;
		border-radius: 50%;
		opacity: 0.4;
	}

	.yp_ztn {
		display: block;
		width: 53rpx;
		height: 55rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -22rpx;
		margin-left: -22rpx;
	}

	.bf_xgc {
		width: 100%;
		z-index: 99;
	}

	.title {
		padding: 20rpx 0;
	}

	.fb_dmc {
		display: block;
		font-size: 42rpx;
		line-height: 56rpx;
		color: #ffffff;
		text-align: center;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.cs_mzs {
		display: block;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.gc_xmc {
		display: block;
		font-size: 30rpx;
		color: #ffffff;
		text-align: center;
		padding-bottom: 20rpx;
	}

	.gc_ksl {
		// max-height: 400rpx;  //歌词高度
		max-height: 160rpx;
		overflow: hidden;
	}

	#MusicLyrics {
		margin-bottom: 260rpx;

		transition-property: margin;
		transition-duration: 0.4s;
		/* Firefox 4 */
		-moz-transition-property: margin;
		-moz-transition-duration: 0.4s;
		/* Safari and Chrome */
		-webkit-transition-property: margin;
		-webkit-transition-duration: 0.4s;
		/* Opera */
		-o-transition-property: margin;
		-o-transition-duration: 0.4s;
	}

	.xb_bfz {
		position: fixed;
		bottom: 100rpx;
		width: calc(100% - 80rpx);
	}

	.st_sxl {
		display: block;
		width: 100%;
		height: 2rpx;
		background: #ffffff;
		opacity: 0.4;
	}

	.jg_jdw {
		position: relative;
	}

	.ss_jdx {
		position: absolute;
		left: 0;
		top: 0;
		width: 40%;
		height: 2rpx;
		background: #ffffff;
	}

	.ss_jdx::after {
		content: '';
		width: 10rpx;
		height: 10rpx;
		background: #ffffff;
		border-radius: 50%;
		position: absolute;
		left: 100%;
		top: -5rpx;
	}

	/* 音频内容 */
	.Location {
		color: #FF6D00;
		font-size: 36rpx;
	}

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

	.slider {
		width: 600rpx;
	}

	slider {
		margin: 0;
	}

	.sb_xyq .paused {
		animation-play-state: paused;
	}

	@keyframes rotateAnimation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}	
	.dh {
		animation: rotateAnimation 6s linear infinite;
	}
</style>