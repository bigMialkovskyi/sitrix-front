<template>
  <section id="general-info" class="general-info">
    <div class="container">
      <div class="about-us">
        <h1 class="about-us-title">{{ $t("about-us.title") }}</h1>
        <div class="about-us-desc">
          <p class="about-us-text">{{ $t("about-us.desc") }}</p>
          <img src="../assets/img/PCB-about.jpg" alt="PCB-about" />
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
// import HelloI18n from "./components/HelloI18n.vue";
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
        // {
        //   img_src: "clean-hands.svg",
        //   // offer_title: this.$root.t('about-us.we-offer.consultation.title'),
        //   offer_title: "консультація",
        //   offer_desc:
        //     "Ми пропонуємо консультацію щодо організації проекту та вибору можливих рішень",
        // },
        // {
        //   img_src: "money-bag.svg",
        //   offer_title: "бюджетне рішення",
        //   offer_desc:
        //     "Наші прості та ергономічні розробки будуть по кишені кожному",
        // },
        // {
        //   img_src: "clean-hands.svg",
        //   offer_title: "підтримка",
        //   offer_desc:
        //     "Ми надаємо тех-підтримку та обсуговування наших товарів під час есплуатації",
        // },
        {
          img_src: "clean-hands.svg",
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