<template>
  <div id="app" class="app-container">
    <div class="product-content-bg product-banner h-30vh">
      <div class="product-banner-content">
        <div class="img-container w-1/3">
          <img
            class="product-img"
            :src="productImgURL + `${slides[3].media.path}`"
            alt=""
          />
        </div>
        <h1 class="product-name xl:text-7xl lg:text-6xl md:text-5xl min-[300px]:text-5xl">
          {{ slides[3].title }}
        </h1>
      </div>
    </div>

    <div class="m-5">
      <p class="text-center text-lg">{{ slides[3].description }}</p>
    </div>

    <ul class="pr5">
      <div class="specifications mt-2 pt-5 pb-5 bg-gray">
        <p class="text-lg mt-5 mb-5 text-center uppercase">характеристики</p>
      </div>
      <li
        class="pl-12 flex pt-5 pb-5"
        :class="{ 'bg-gray': item.index % 2 }"
        v-for="item in specifications"
        :key="item.name"
      >
        <div class="basis-1/2">
          <p class="text-lg text-left">{{ item.name }}</p>
        </div>
        <div class="basis-1/2">
          <p class="text-lg text-center">{{ item.value }}</p>
        </div>
      </li>
    </ul>

    <!-- <vueper-slides
      class="slider mt-5 mb-5"
      autoplay
      fixed-height="30vh"
      :dragging-distance="70"
    > -->
    <vueper-slides class="slider mt-5 mb-5" fixed-height="30vh" :dragging-distance="70">
      <vueper-slide class="slide" v-for="(slide, i) in slides" :key="i">
        <template #content>
          <!-- <div class="vueperslide__content-wrapper" style="flex-direction: row"> -->
          <div class="flex justify-evenly items-center h-30vh">
            <div class="img-container w-1/3">
              <img
                class="product-img"
                :src="productImgURL + `${slide.media.path}`"
                alt="product-img"
              />
            </div>
            <h1
              class="product-name xl:text-7xl lg:text-6xl md:text-5xl min-[300px]:text-5xl"
            >
              {{ slide.title }}
            </h1>
          </div>
        </template>

        <template #pause>
          <i class="icon pause_circle_outline"></i>
        </template>
      </vueper-slide>
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
      isActive: true,
      specifications: [
        {
          name: "Напруга живлення",
          value: "12В",
          index: 1,
        },
        {
          name: "Напруга вхідного ШИМ",
          value: "5-12В",
          index: 2,
        },
        {
          name: "Частота сигналу",
          value: "120Гц",
          index: 3,
        },
        {
          name: "Робочий струм",
          value: "35А",
          index: 4,
        },
        {
          name: "Максимальний струм",
          value: "40А",
          index: 5,
        },
      ],
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
  background-size: contain;
  background-repeat: no-repeat;

  // h1 {
  //   font-size: 58px;
  //   color: green;
  // }
}

.product-img {
  max-height: 30vh;
}
////////////////////////////////////////////////////////////
//animation bg

.product-content-bg {
  background-image: url("https://images.pexels.com/photos/3650647/pexels-photo-3650647.jpeg");
  background-size: cover;

  -webkit-animation: slidein 100s;
  animation: slidein 100s;

  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;

  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}

@-webkit-keyframes slidein {
  from {
    background-position: right;
    background-size: 3000px;
  }
  to {
    background-position: left;
    background-size: 2750px;
  }
}

@keyframes slidein {
  from {
    background-position: left;
    background-size: 3000px;
  }
  to {
    background-position: right;
    background-size: 2750px;
  }
}

.product-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-banner-content {
  height: 100%;
  width: 100%;
  padding: 0 5vw;
  display: flex;

  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #03bbff 50%, rgba(30, 144, 255, 0) 90%);
}

.product-name {
  -webkit-text-stroke: 1px white;
  color: rgba(30, 144, 255, 0);
  background-color: rgba(30, 144, 255, 0);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding-left: 1%;
  margin-left: 1%;
}

.product-name:hover {
  -webkit-text-stroke: 1px white;
  color: white;
  background-color: rgba(30, 144, 255, 0);
}

.bg-gray {
  background: rgba(192, 192, 192, 0.2);
}
</style>
