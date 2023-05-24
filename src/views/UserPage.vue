<template>
  <!-- <section> -->
    <!-- <div class="container"> -->
    <div>
      <div class="user-page"></div>
      <Sensors />
    </div>
  <!-- </section> -->
</template>


<script>
import store from "@/store";
import { sensorApi } from "@/api/sensors-api";
import Sensors from "@/components/user_account/Sensors.vue";

export default {
  name: "UserPage",
  store,
  components: { Sensors },

  data() {
    return {
      showError: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
</style>