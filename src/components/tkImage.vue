<template>
    <img :src="src" :style="style"/>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    style () {
      let style = `height:${this.height};width:${this.width}`
      return style
    }
  },
  methods: {

  }
}
</script>

<style lang=scss>

</style>
