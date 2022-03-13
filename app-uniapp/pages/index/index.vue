<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title" v-text='title'></text>
		</view>
		<view v-text='count'></view>
		<button class='btn' @click='change(0)'>自减</button>
		<button class='btn' @click='change(1)'>自增</button>
		<QfButton text='我的点击' @qfclick='handle' />
		<u-button text="月薪10W"></u-button>
		<view v-for='item in 5'>
			<view @click='skip(item)'>商品{{item}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import QfButton from '@/components/QfButton.vue'

	export default {
		components: {
			QfButton
		},
		data() {
			return {
				title: 'Hello',
				ref: null
			}
		},
		computed: {
			...mapState('user', ['count'])
		},
		created() {
			console.log('--created', this.$store)
		},
		onLoad() {
			console.log('--onLoad', this.$store)
		},
		mounted() {
			const result = {name:'lisi',age:20, list:[{id:1,age:2},{id:2,age:3}]}
			console.log('result', JSON.parse(JSON.stringify(result)))
		},
		methods: {
			...mapMutations('user', ['changeCount']),
			change(flag) {
				if (flag) this.changeCount(1)
				else this.changeCount(-2)
			},
			handle(ev) {
				console.log('来自子组件的消息', ev)
			},
			skip(item) {
				console.log('skip')
				uni.navigateTo({
					url: "/pages/find/find?id="+item
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
