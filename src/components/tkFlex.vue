<!--
 a small example
<tk-flex :wrap="wrap" :gutter="20">
  <van-row>
    <van-col span="8">
      <van-loading color="red" />
    </van-col>
    <van-col span="8">
      <open-data class="userIcon" type="userAvatarUrl"></open-data>
    </van-col>
    <van-col span="8">
      <open-data class="userName" type="userNickName">123</open-data>
    </van-col>
  </van-row>
</tk-flex>-->

<template>
  <div :class="totalClass"
       :wrap="wrap"
       :column="column"
       :average="average"

       :between="between"
       :around="around"
       :stretch="stretch"

       :middle="middle"
       :top="top"
       :bottom="bottom"
       :baseline="baseline"

       :left="left"
       :center="center"
       :right="right"

       :wrapGutter="wrapGutter"
       :gutter="gutter">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    // 允许换行
    wrap: {
      type: Boolean,
      default: false
    },
    // 竖向排列
    column: {
      type: Boolean,
      default: false
    },
    // 等宽
    average: {
      type: Boolean,
      default: false
    },
    // 两端对齐
    between: {
      type: Boolean,
      default: false
    },
    // 两端等边距对齐
    around: {
      type: Boolean,
      default: false
    },
    // 交叉轴满高
    stretch: {
      type: Boolean,
      default: false
    },
    // 中部对齐（竖向）
    middle: {
      type: Boolean,
      default: false
    },
    // 顶部对齐
    top: {
      type: Boolean,
      default: false
    },
    // 底部对齐
    bottom: {
      type: Boolean,
      default: false
    },
    // 文字对齐
    baseline: {
      type: Boolean,
      default: false
    },
    // 左对齐
    left: {
      type: Boolean,
      default: false
    },
    // 中部对齐（横行）
    center: {
      type: Boolean,
      default: false
    },
    // 右对齐
    right: {
      type: Boolean,
      default: false
    },
    // 外层边距
    wrapGutter: {
      type: Boolean,
      default: true
    },
    // 边距，例如"8"或"8px"
    gutter: {
      type: String,
      default: '0'
    }
  },
  computed: {
    totalClass () {
      let str = ` flex-box flex-direction-row`
      this.wrap ? str += ' flex-wrap' : str += ''
      this.column ? str += ' flex-direction-column' : str += ''
      this.average ? str += ' flex-average' : str += ''

      this.between ? str += ' justify-content-between' : str += ''
      this.around ? str += ' justify-content-around' : str += ''
      this.stretch ? str += ' flex-stretch' : str += ''

      this.top ? str += ' flex-top' : str += ''
      this.middle ? str += ' flex-middle' : str += ''
      this.bottom ? str += ' flex-bottom' : str += ''
      this.baseline ? str += ' flex-baseline' : str += ''

      this.left ? str += ' flex-stretch' : str += ''
      this.center ? str += ' flex-center' : str += ''
      this.right ? str += ' flex-right' : str += ''

      this.wrapGutter ? str += ` gutter-${this.gutter}'` : str += ''

      return str
    }
  },
  methods: {

  }
}
</script>

<style lang=scss>
  .flex-box {
    display: flex;
  }
  .flex-wrap {
    flex-wrap:wrap;
  }
  .flex-direction-row {
    flex-direction : row;
  }
  .flex-direction-column {
    flex-direction : column;
  }
  .flex-box.flex-average>* {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
  }

  .justify-content-between {
    justify-content:space-between;
  }
  .justify-content-around {
    justify-content:space-around;
  }
  .flex-stretch {
    align-items: stretch;
  }

  .flex-top {
    align-items: flex-start;
  }
  .flex-middle {
    align-items: center;
  }
  .flex-bottom {
    align-items: flex-end;
  }
  .flex-baseline {
    align-items: baseline;
  }

  .flex-left {
     justify-content: flex-start;
  }
  .flex-center {
    justify-content: center;
  }
  .flex-right {
    justify-content: flex-end;
  }

  @for $i from 0 through 100 {
    .gutter-#{$i} {
       margin: $i*1px 0 0 $i*1px;
    }
  }

  /*取了个巧 这里组件外的class渲染会多一个_ 所以直接在这里面加上了*/
  @for $i from 1 through 12 {
    ._tk-grid-#{$i} {
      width: #{$i*100vmin/12};
    }
  }

</style>
