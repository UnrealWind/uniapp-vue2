<template>
  <van-icon  :name="iconName" :size="iconSize" :color="iconColor"/>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      name:{
        type: String,
        required: true
      }
    },
    computed: {
      iconName () {
        // 这里也可以接受url
        return `${this.name}`
      },
      iconSize () {
        return `${this.size}px`
      },
      iconColor () {
        return `${this.color}`
      }
    },
    methods: {

    }
  }
</script>

<style lang=scss>

</style>
