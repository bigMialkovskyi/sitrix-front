<template>
  <div v-if="slides.length" class="app-container">
    <div class="product-content-bg product-banner h-30vh">
      <div class="product-banner-content">
        <div class="img-container w-1/3">
          <img
            class="product-img"
            :src="productImgURL + `${productData.media.path}`"
            alt=""
          />
          <!-- <img
            class="product-img"
            :src="productImgURL + `${slides[3].media.path}`"
            alt=""
          /> -->
        </div>
        <!-- <h1 class="product-name xl:text-7xl lg:text-6xl md:text-5xl min-[300px]:text-5xl">
          {{ slides[3].title }}
        </h1> -->
        <h1 class="product-name xl:text-7xl lg:text-6xl md:text-5xl min-[300px]:text-5xl">
          {{ productData.title }}
        </h1>
      </div>
    </div>
    <!-- 
    <div class="m-5 p-10">
      <p v-if="locale == 'ua'" class="text-center text-lg">
        {{ slides[3].description }}
      </p>
      <p v-if="locale == 'en'" class="text-center text-lg">
        {{ slides[3].description_en }}
      </p>
    </div> -->

    <div class="m-5 p-10">
      <p v-if="locale == 'ua'" class="text-center text-lg">
        {{ productData.description }}
      </p>
      <p v-if="locale == 'en'" class="text-center text-lg">
        {{ productData.description_en }}
      </p>
    </div>

    <ul class="pr5">
      <div class="specifications mt-2 pt-5 pb-5 bg-gray">
        <p class="more-price text-lg mt-5 mb-5 text-center uppercase">
          {{ $t("product-page.specifications") }}
        </p>
      </div>
      <li
        class="pl-12 flex pt-5 pb-5"
        :class="{ 'bg-gray': productData.specifications.indexOf(item) % 2 }"
        v-for="item in productData.specifications"
        :key="item.name"
      >
        <!-- <li
          class="pl-12 flex pt-5 pb-5"
          :class="{ 'bg-gray': slides[3].specifications.indexOf(item) % 2 }"
          v-for="item in slides[3].specifications"
          :key="item.name"
        > -->
        <div class="basis-1/2">
          <p v-if="locale == 'ua'" class="text-lg text-left">{{ item.name }}</p>
          <p v-if="locale == 'en'" class="text-lg text-left">
            {{ item.name_en }}
          </p>
        </div>
        <div class="basis-1/2">
          <p v-if="locale == 'ua'" class="text-lg text-center">
            {{ item.value }}
          </p>
          <p v-if="locale == 'en'" class="text-lg text-center">
            {{ item.value_en }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { productApi } from "@/api/product-api";
import { toRaw } from "vue";

export default {
  components: { VueperSlides, VueperSlide },
  name: "ProductContent",
  data() {
    return {
      productImgURL: process.env.VUE_APP_API_URL,
      slides: [],
      isActive: true,
      locale: this.$i18n.locale,
      productData: null,
    };
  },

  props: {
    products: {
      type: Array,
      required: true,
    },
    currentProduct: {
      type: Object,
      // required: true,
    },
  },

  // mounted() {
  //   this.productData = this.currentProduct;
  //   let current = this.currentProduct;
  //   console.log(current);
  //   console.log(this.products);
  // },

  created: async function () {
    this.productData = this.currentProduct;
    let current = this.currentProduct;
    // console.log(current);
  },

  methods: {
    // fetchProducts() {
    //   productApi.fetchAvailableProducts().then((products) => {
    //     products.forEach((element) => {
    //       if (element.product_type == "for_farmers") this.slides.push(element);
    //     });
    //   });
    // },
  },

  updated: function () {
    // console.log(this.currentProduct);
  },

  watch: {
    "$i18n.locale": function (newVal, oldVal) {
      this.locale = newVal;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
// @import "../../styles/banner.scss";

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
