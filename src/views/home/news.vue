<template>
  <essay :essayId="essayId"></essay>
</template>

<script>
// 文章详情组件
import Essay from './modules/Essay'
export default {
  components: {
    Essay
  },
  data () {
    return {
      // vueRouter传参essayId
      essayId: this.$route.params.essayId
    }
  }
}
</script>
