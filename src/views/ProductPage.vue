<template>
  <div class="app-container">
    <!-- <ProductContent
      v-if="currentProduct"
      :currentProduct="currentProduct"
      :products="slides"
    /> -->
    <ProductContent :currentProduct="currentProduct" :products="slides" />
    <div class="mt-5 mb-5">
      <div class="price-container p-5">
        <h1 class="more-price uppercase text-lg text-right">
          {{ $t("product-page.price") }}
        </h1>
      </div>

      <div class="more-container p-5">
        <h1 class="more-price uppercase text-lg">
          {{ $t("product-page.more") }}
        </h1>
      </div>
    </div>

    <vueper-slides
      class="slider mt-5 mb-5"
      fixed-height="30vh"
      :dragging-distance="70"
      :bullets="false"
    >
      <vueper-slide class="slide" v-for="(slide, i) in slides" :key="i">
        <template #content>
          <div class="flex justify-evenly items-center h-30vh">
            <div class="img-container w-1/3">
              <img
                class="product-img"
                :src="productImgURL + `${slide.media.path}`"
                alt="product-img"
              />
            </div>
            <h1
              @click="test(slide)"
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
import ProductContent from "@/components/product_page/ProductContent.vue";
import axios from "axios";

export default {
  components: { ProductContent, VueperSlides, VueperSlide },
  name: "ProductPage",
  data() {
    return {
      productImgURL: process.env.VUE_APP_API_URL,
      slides: [],
      isActive: true,
      locale: this.$i18n.locale,
      currentProduct: null,
    };
  },

  created: async function () {
    // this.fetchProducts();
    this.getInfo();
    console.log(this.currentProduct);
  },

  mounted() {},

  methods: {
    async getInfo() {
      try {
        const response = await axios.get("/products/get/all");
        const products = response.data.products;

        products.forEach((element) => {
          if (element.product_type == "for_farmers") {
            this.slides.push(element);
            if (this.$route.query.id == element._id) {
              console.log(element);
              this.currentProduct = element;
              console.log(this.currentProduct);
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },

    test(element) {
      console.log("ping");
      // this.currentProduct = element;
    },

    fetchProducts() {
      // console.log(this.$route.query.id);
      productApi.fetchAvailableProducts().then((products) => {
        console.log(products);
        products.forEach((element) => {
          if (element.product_type == "for_farmers") {
            this.slides.push(element);
            if (this.$route.query.id == element._id) {
              this.currentProduct = element;
            }
          }
        });
      });
    },
  },

  watch: {
    "$i18n.locale": function (newVal, oldVal) {
      this.locale = newVal;
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

.more-price {
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
  text-transform: uppercase;
  letter-spacing: 0.2em;
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

.more-container {
  background: linear-gradient(to right, #03bbff 10%, rgba(30, 144, 255, 0) 90%);
}

.price-container {
  background: linear-gradient(to left, #ff4703 10%, rgba(30, 144, 255, 0) 90%);
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
