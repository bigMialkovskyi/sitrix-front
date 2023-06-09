<template>
  <div id="app" class="app-container">
    <div class="product-banner h-1/3">
      <div class="advertisement-content-bg">
        <div class="product-banner-content">
          <div class="img-container">
            <img
              class="product-img"
              :src="productImgURL + `${slides[3].media.path}`"
              alt=""
            />
          </div>
          <h1 class="product-name">{{ slides[3].title }}</h1>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="desc-container">
        <p class="text-center text-lg">{{ slides[3].description }}</p>
      </div>
      <div class="specifications mt-5 mb-5">
        <p class="text-lg mt-5 mb-5 text-center uppercase">характеристики</p>
        <ul class="pl-5 pr5">
          <li class="flex mt-5 mb-5" v-for="item in specifications" :key="item.name">
            <div class="basis-1/2">
              <p class="text-lg text-left">{{ item.name }}</p>
            </div>
            <div class="basis-1/2">
              <p class="text-lg text-center">{{ item.value }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <vueper-slides class="slider" autoplay fixed-height="30vh" :dragging-distance="70">
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
      specifications: [
        {
          name: "Напруга живлення",
          value: "12В",
        },
        {
          name: "Напруга вхідного ШИМ",
          value: "5-12В",
        },
        {
          name: "Частота сигналу",
          value: "120Гц",
        },
        {
          name: "Робочий струм",
          value: "35А",
        },
        {
          name: "Максимальний струм",
          value: "40А",
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

  h1 {
    font-size: 58px;
    color: green;
  }
}

////////////////////////

@import "../styles/variables.scss";
@import "../styles/banner.scss";
////////////////////////////////////////////////////////////
//animation bg

.advertisement-content-bg {
  // background-image: url("../assets/img/strawberry.jpg");
  // background-image: url("https://images.pexels.com/photos/16678051/pexels-photo-16678051.jpeg");
  background-image: url("https://images.pexels.com/photos/3650647/pexels-photo-3650647.jpeg");
  background-size: cover;
  // padding: 5vh 0;

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
    // background-position: top;
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
    // background-position: top;
    background-position: left;
    background-size: 3000px;
  }
  to {
    background-position: right;
    background-size: 2750px;
  }
}

.product-banner-content {
  height: 100%;
  padding: 0 5vw;
  display: flex;
  // flex-direction: column;
  // align-items: center;
  // align-items: flex-start;
  justify-content: space-between;
  align-items: center;
  // background: rgba(30, 144, 255, 0.6);
  // background: linear-gradient(to right, rgb(30, 144, 255) 50%, rgba(30, 144, 255, 0) 90%);
  background: linear-gradient(to right, #03bbff 50%, rgba(30, 144, 255, 0) 90%);
}

// .product-img {
//   // height: 30vh;
//   width: 35vw;
// }

.content {
  margin: 5vh 5vw;
}

.product-name {
  // margin-right: 5vw;
  -webkit-text-stroke: 2px white;
  // -webkit-text-stroke: 2px #03bbff;
  color: rgba(30, 144, 255, 0);
  background-color: rgba(30, 144, 255, 0);
  font-style: normal;
  font-weight: 600;
  font-size: 78px;
  line-height: 120%;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding-left: 1%;
  margin-left: 1%;
}
</style>
