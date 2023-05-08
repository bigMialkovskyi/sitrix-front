<template>
  <div class="group-type-box">
    <div class="direction-box">
      <a class="group-type-title unselectable" v-on:click="showProduct = !showProduct">{{
        group_type_title
      }}</a>
      <p
        class="content-down direction-arrow"
        v-on:click="showProduct = !showProduct"
        v-if="!showProduct"
      ></p>
      <p
        class="content-up direction-arrow"
        v-on:click="showProduct = !showProduct"
        v-if="showProduct"
      ></p>
    </div>
    <transition name="fade">
      <ul class="product-list" v-if="showProduct">
        <li class="product-element" v-for="product in products" :key="product.id">
          <div class="product-img-container">
            <img :src="productImgURL+`${product.media.path}`" alt="product" />
          </div>

          <div ref="myElement" class="about-product">
            <div
              v-if="inView"
              :class="{ after: inView }"
              class="product-name-container animated-element"
            >
              <a v-if="locale == 'ua'" href="#" class="product-name">{{
                product.title
              }}</a>
              <a v-if="locale == 'en'" href="#" class="product-name">{{
                product.title_en
              }}</a>
            </div>
            <div
              v-if="inView"
              :class="{ after: inView }"
              class="product-desc-container animated-element"
            >
              <p v-if="locale == 'ua'" class="product-desc">
                {{ product.description }}
              </p>
              <p v-if="locale == 'en'" class="product-desc">
                {{ product.description_en }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { productApi } from "@/api/product-api";

export default {
  name: "Products",
  props: {
    render_product_type: String,
    group_type_title: String,
  },

  data: function () {
    return {
      products: [],
      error: null,
      showProduct: true,
      locale: this.$i18n.locale,
      inView: false,
      productImgURL: process.env.VUE_APP_PRODUCT_IMG_URL,
    };
  },

  created: async function () {
    this.fetchProducts();
  },

  mounted() {
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        this.inView = true;
      }
    });

    setTimeout(() => {
      observer.observe(this.$refs.myElement[0]);
      // observer.observe(this.$refs.myElement);
    }, 1000);
  },

  methods: {
    fetchProducts() {
      productApi.fetchAvailableProducts().then((products) => {
        products.forEach((element) => {
          if (element.product_type == this.render_product_type)
            this.products.push(element);
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
@import "../styles/products.scss";

.animated-element {
  animation: fade-in 2s ease-out;
  transform: translate(0, 20px);
  transition: 2s;
  // transition-duration: 4s;
  // transition-delay: 2s;
}

.after {
  transform: translate(0, 0px);
  // transition: 2s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

//////

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.direction-box {
  display: flex;
}

.direction-arrow {
  color: white;
  font-size: 28px;
  padding-left: 1em;
  padding-top: 0.5%;
  position: relative;
  z-index: 1;
  font-stretch: 200%;
}

.content-down::after {
  content: " \02C5";
}
.content-up::after {
  content: " \02C4";
}
</style>
