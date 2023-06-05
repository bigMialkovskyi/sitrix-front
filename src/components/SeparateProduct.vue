<template>
  <div id="app" class="app-container">
    <!-- <vueper-slides
      :visible-slides="3"
      :slide-ratio="1 / 4"
      :dragging-distance="70"
    > -->
    <vueper-slides class="slider" autoplay fixed-height="30vh">
      <!-- <template #arrow-left>
        <i class="icon icon-arrow-left" />
      </template>

      <template #arrow-right>
        <i class="icon icon-arrow-right" />
      </template> -->

      <vueper-slide
        class="slide"
        v-for="(slide, i) in slides"
        :key="i"
        :title="`<h1>` + `${slide.title}` + `<h1>`"
        :image="productImgURL + `${slide.media.path}`"
      />
      <template #pause>
        <i class="icon pause_circle_outline"></i>
      </template>
      <!-- <template #pause>
        <i class="icon pause_circle_outline"></i>
      </template> -->
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { productApi } from "@/api/product-api";

export default {
  components: { VueperSlides, VueperSlide },
  name: "SeparateProduct",
  data() {
    return {
      productImgURL: process.env.VUE_APP_API_URL,
      slides: [],
    };
  },

  created: async function () {
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      productApi.fetchAvailableProducts().then((products) => {
        products.forEach((element) => {
          this.slides.push(element);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/banner.scss";

.slider {
  background-color: #03bbff;
  // height: 20vh;
}

.slide {
  // height: 20vh;
  // border: 1px solid black;
  // height: 20vh;
  // width: 40vw;
  // background-color: #03bbff;
  // margin: 1vh;
  // background-size: 30%;
  // height: 20vh;
  // height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  
  h1 {
    font-size: 58px;
  }
}
</style>
