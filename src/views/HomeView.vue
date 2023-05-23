<template>
  <div class="home">
    <Banner />
    <GeneralInfo />
    <Products />
    <Advertisement />
    <Contacts />
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
import Banner from "@/components/Banner.vue";
import GeneralInfo from "@/components/GeneralInfo.vue";
import Products from "@/components/Products.vue";
import Contacts from "@/components/Contacts.vue";
import Advertisement from "@/components/Advertisement.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
    Banner,
    GeneralInfo,
    Products,
    Contacts,
    Advertisement
  },
};
</script>