<template>
    <div >
        <!-- 倒计时 -->
<div >{{hr}}:{{min}}:{{sec}}</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      day: 0,
			hr: 0,
			min: 0,
      sec: 0,
      now : Date.parse(new Date('2020-9-09 16:10:10'))
    }
  },
 mounted: function () {
			this.countdown()
		},
		methods: {
			countdown: function () {
				// 定义结束时间戳
				const end = Date.parse(new Date('2020-9-09 18:10:10'))
        // 定义当前时间戳
        this.now = this.now + 1000
				// 做判断当倒计时结束时都为0
				if (this.now >= end) {
					this.day = 0
					this.hr = 0
					this.min = 0
					this.sec = 0
					return
				}
				// 用结束时间减去当前时间获得倒计时时间戳
				const msec = end - this.now
				let day = parseInt(msec / 1000 / 60 / 60 / 24) //算出天数
				let hr = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
				let min = parseInt(msec / 1000 / 60 % 60)//算出分钟数
				let sec = parseInt(msec / 1000 % 60)//算出秒数
				//给数据赋值
				this.day = day
				this.hr = hr > 9 ? hr : '0' + hr
				this.min = min > 9 ? min : '0' + min
				this.sec = sec > 9 ? sec : '0' + sec
				//定义this指向
				const that = this
				// 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
				setTimeout(function () {
					that.countdown()
				}, 1000)
			}
		}

};
</script>