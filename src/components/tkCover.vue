<template>
  <div v-if="show" class="cover" :style="customCover" @click="click">
    <div class="btn-box">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'rgba(0,0,0,0.2)'
    },
    show: {
      type: Boolean,
      default: false
    },
    hideOnClick: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    middle: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    customCover () {
      let style
      style = `background:${this.color};`
      return style
    }
  },
  methods: {
    click () {
      this.hideOnClick ? this.show = false : this.show = false
    }
  },
  onUnload(){

  }

}
</script>

<style lang=scss>
  .cover {
    position: absolute;
    display: flex;
    flex-direction: column;
    width:100%;
    height: 100%;
    z-index:1001;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .btn-box{
    margin-top:55%;
  }
</style>
