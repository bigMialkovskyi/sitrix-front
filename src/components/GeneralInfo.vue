<template>
  <section id="general-info" class="general-info">
    <div class="container">
      <div class="about-us">
        <h1 class="about-us-title">{{ $t("about-us.title") }}</h1>

        <div class="about-us-desc desc-pt1">
          <span style="white-space: pre-line" class="about-us-text">
            <img
              class="first-desc-img"
              src="../assets/img/PCB-about.jpg"
              alt="PCB-about"
            />{{ $t("about-us.desc-pt1") }}
          </span>
        </div>

        <div class="about-us-desc desc-pt2">
          <span style="white-space: pre-line" class="about-us-text">
            <img
              class="second-desc-img"
              src="https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="PCB-about"
            />{{ $t("about-us.desc-pt2") }}
          </span>
        </div>
      </div>

      <h1 class="about-us-title">{{ $t("about-us.we-offer.title") }}</h1>
      <ul class="we-offer">
        <li class="offer-element" v-for="offer in offers" :key="offer.title">
          <div class="offer-icon-container">
            <img
              :src="require(`../assets/img/${offer.img_src}`)"
              alt="offer-icon"
            />
          </div>
          <h5>{{ $t(offer.offer_title) }}</h5>
          <p>{{ $t(offer.offer_desc) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import HelloI18n from "@/components/HelloI18n.vue";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";

export default {
  name: "GeneralInfo",
  components: {
    HelloI18n,
    LocaleSwitcher,
  },
  props: {},
  data: function () {
    return {
      offers: [
        {
          img_src: "support.svg",
          offer_title: "about-us.we-offer.consultation.title",
          offer_desc: "about-us.we-offer.consultation.text",
        },
        {
          img_src: "money-bag.svg",
          offer_title: "about-us.we-offer.budget-decision.title",
          offer_desc: "about-us.we-offer.budget-decision.text",
        },
        {
          img_src: "clean-hands.svg",
          offer_title: "about-us.we-offer.support.title",
          offer_desc: "about-us.we-offer.support.text",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/general_information.scss";
</style>