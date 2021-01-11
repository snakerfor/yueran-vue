<template>
  <essay :essayId="essayId"></essay>
</template>

<script>
import { mapState } from 'vuex'
// 文章详情组件
import Essay from './modules/Essay'
export default {
  components: {
    Essay
  },
  data () {
    return {
      // vueRouter传参essayId
      essayId: 25
    }
  },
  computed: {
    ...mapState({
      routerAll: state => state.permission.routers
    })
  },
  created: function () {
    console.info(this.$router.currentRoute)
    console.info(this.routerAll)
    const re = []
    this.routerAll.forEach(t => {
      if (t.children) {
        const ms = t.children.filter(m => {
          return m.name === this.$router.currentRoute.name || (m.children != null && m.children.filter(n => { return m.name === this.$router.currentRoute.name }).length > 0)
        })
        if (ms.length > 0) {
          re.push(ms)
        }
      }
    })
    console.info(re)
  }
}
</script>
