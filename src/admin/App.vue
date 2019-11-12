<template lang="pug">
  .wrapper        
    adminheader
    navigation
    router-view 
    .tooltips-container(:class="{'showed' : showed}")
        tooltip(type="error")
    
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import adminheader from "./components/adminheader.vue";
import navigation from "./components/navigation.vue";
import tooltip from "./components/tooltip.vue";

export default {
  name: "app",
  components: {
    adminheader,
    navigation,
    tooltip
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("tooltip", {
      showed: state => state.showed
    }),
  },
  methods: {
    ...mapActions("tooltip", ["closeTooltip"])
  },
  watch: {
    showed(value) {
      if (value === true) {
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.closeTooltip();
        }, 3000);
      }
    }
  }

};
</script>

<style lang="postcss">
html {
  scroll-behavior: smooth;
}
body,
html {
  height: 100%;
}

table {
  padding: 0;
  margin: 0;
}

body {
  font-family: "Open Sans", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.42;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  margin: 0px;
}

.wrapper {
  overflow: hidden;
  min-height: 100%;
  position: relative;
}

.container {
  margin: 0 auto;
  max-width: 1480px;
  width: 95%;
}

.maincontent {
  height: 100%;
}

.fullscreen-section {
  height: 100vh;
  min-height: 650px;
}

button {
  border: 0;
  cursor: pointer;
}

* {
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  margin: 0;
}

p {
  margin: 0;
  padding: 0;
}

button[type="button"] {
  cursor: pointer;
  background-color: transparent;
}

a {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.title {
  font-weight: 700;
  font-size: 36px;
  color: white;
}

.error {
  font-size: 10px;
  color: red;
  height: 15px;
}

.tooltips-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 110%);
  visibility: hidden;
  transition: 0.3s;
  &.showed {
    transform: translate(-50%, 0%);
    visibility: visible;
  }
}
</style>




