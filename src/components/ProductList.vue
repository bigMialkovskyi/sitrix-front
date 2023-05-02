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
        <li
          id="myElement"
          class="product-element"
          v-for="product in products"
          :key="product.id"
        >
          <div class="product-img-container">
            <img
              :src="`http://664326-vds-dm.penzyakov.gmhost.pp.ua:3093/${product.media.path}`"
              alt="product"
            />
          </div>

          <div class="about-product">
            <div class="product-name-container">
              <a v-if="locale == 'ua'" href="#" class="product-name">{{
                product.title
              }}</a>
              <a v-if="locale == 'en'" href="#" class="product-name">{{
                product.title_en
              }}</a>
            </div>
            <div class="product-desc-container">
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
      inView: false,
      locale: this.$i18n.locale,
    };
  },

  created: async function () {
    this.fetchProducts();
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
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/products.scss";

/////////////

.animated-element {
  animation: fade-in 1s ease-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

////////////

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
