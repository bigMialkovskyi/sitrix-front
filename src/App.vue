<template>
  <div id="app" v-cloak>
    <component :is="layout">
      <router-view />
    </component>

    <transition name="fade">
      <div id="pagetop" class="fixed" v-show="scY > 300" @click="toTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4a5568"
          stroke-width="1"
          stroke-linecap="square"
          stroke-linejoin="arcs"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import defaultLayout from "@/layouts/default.vue";

export default {
  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  components: {
    Header,
    defaultLayout,
  },
  computed: {
    layout: () => {
      return "defaultLayout";
    },
  },
};
</script>

<style lang="scss">
@import "./styles/default_styles.scss";
@import "./styles/variables.scss";

#app {
  min-height: 100vh;
}

.fixed {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
