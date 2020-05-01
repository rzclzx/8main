<template>
  <canvas ref="id" :id="id"></canvas>
</template>

<script>
  export default {
    name: 'market-canvas',
    props: {
      id: {
        required: true
      },
      casChangeBg1: {
        type: Boolean
      },
      casChangeBg2: {
        type: Boolean
      },
      casChangeBg3: {
        type: Boolean
      },
      casChangeBg4: {
        type: Boolean
      },
      casChangeBg5: {
        type: Boolean
      },
      casChangeBg6: {
        type: Boolean
      },
      casChangeBg7: {
        type: Boolean
      },
      casId: {
        type: Number
      }
    },
    data () {
      return {
        bar: [],
        max: null,
        min: null,
        xRatio: null,
        yRatio: null
      }
    },
    watch: {
      casChangeBg1 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg1) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      },
      casChangeBg2 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg2) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      },
      casChangeBg3 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg3) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      },
      casChangeBg4 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg4) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      },
      casChangeBg5 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg5) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      },
      casChangeBg6 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg6) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      },
      casChangeBg7 () {
        if ((this.casId === Number(this.$refs.id.id)) && this.casChangeBg7) {
          this.enterBg()
        } else if (this.casId === Number(this.$refs.id.id)) {
          this.outBg()
        }
      }
    },
    methods: {
      getBars () {
        return this.marketApi.getBar(this.id, '1min', Date.parse(new Date()) - 60000 * 21)
      },
      // 行情最大值
      getMax (bar) {
        let max = 0
        for (let i = 0; i < bar.length; i++) {
          if (bar[i].close * 1 > max) {
            max = bar[i].close * 1
          }
        }
        return max
      },
      // 行情最小值
      getMin (bar) {
        let min = bar[0].close * 1
        for (let i = 1; i < bar.length; i++) {
          if (bar[i].close * 1 < min) {
            min = bar[i].close * 1
          }
        }
        return min
      },
      // X轴比例
      getXRatio (width, sort) {
        return (width / 20) * sort * 2
      },
      // Y轴比例
      getYRatio (height, close) {
        let max = this.getMax(this.bar)
        let min = this.getMin(this.bar)
        return ((max - close) / (max - min)) * (height - 16) + 8
      },
      drawCanvas () {
        let canvas = this.$refs.id
        let ctx = canvas.getContext('2d')
        let width = canvas.offsetWidth
        let height = canvas.offsetHeight
        ctx.lineWidth = 1
        ctx.strokeStyle = '#276474'
        let my_gradient = ctx.createLinearGradient(0,0,0,170)
        my_gradient.addColorStop(0, "#1B2741")
//      my_gradient.addColorStop(0.8, "#11112c")
        my_gradient.addColorStop(1, "#11112c")
//      ctx.globalAlpha = 0.5
        ctx.fillStyle = my_gradient
        this.getBars()
          .then(res => {
            this.bar = res.data.bar_data
          })
          .then(() => {
            ctx.beginPath()
            ctx.moveTo(-1, this.getYRatio(height, this.bar[0].close))
            for (let i = 1; i < this.bar.length; i++) {
              ctx.lineTo(this.getXRatio(width, i), this.getYRatio(height, this.bar[i].close * 1))
            }
            ctx.lineTo(width * 2 - 1, height * 2)
            ctx.lineTo(-1, height * 2)
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
          })
      },
      enterBg () {
        let canvas = this.$refs.id
        let ctx = canvas.getContext('2d')
        let width = canvas.offsetWidth
        let height = canvas.offsetHeight
        ctx.lineWidth = 2
        ctx.strokeStyle = '#276474'
        ctx.beginPath()
        ctx.moveTo(-1, this.getYRatio(height, this.bar[0].close))
        for (let i = 1; i < this.bar.length; i++) {
          ctx.lineTo(this.getXRatio(width, i), this.getYRatio(height, this.bar[i].close * 1))
        }
        ctx.lineTo(width * 2 - 1, height * 2)
        ctx.lineTo(-1, height * 2)
        ctx.closePath()
        ctx.stroke()
      },
      outBg () {
        let canvas = this.$refs.id
        let ctx = canvas.getContext('2d')
        let width = canvas.offsetWidth
        let height = canvas.offsetHeight
        ctx.clearRect(0,0,width * 2,height * 2)
        this.drawCanvas()
      }
    },
    mounted () {
      this.drawCanvas()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
