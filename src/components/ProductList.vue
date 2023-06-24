<template>
  <div class="group-type-box">
    <div class="direction-box">
      <!-- <a
        class="group-type-title unselectable"
        v-on:click="showProduct = !showProduct"
        >{{ group_type_title }}</a
      > -->
      <a class="group-type-title unselectable">{{ group_type_title }}</a>
      <!-- <p
        class="content-down direction-arrow"
        v-on:click="showProduct = !showProduct"
        v-if="!showProduct"
      ></p>
      <p
        class="content-up direction-arrow"
        v-on:click="showProduct = !showProduct"
        v-if="showProduct"
      ></p> -->
    </div>
    <transition name="fade">
      <ul class="product-list" v-if="showProduct">
        <li class="product-element" v-for="product in products" :key="product.id">
          <div class="product-img-container">
            <img
              :src="productImgURL + `${product.media.path}`"
              alt="product"
              class="product-img"
            />
          </div>

          <div ref="observerElement" class="about-product">
            <div v-if="inView" :class="{ after: inView }" class="product-name-container">
              <a v-if="locale == 'ua'" href="#" class="product-name">{{
                product.title
              }}</a>

              <a v-if="locale == 'en'" href="#" class="product-name">{{
                product.title_en
              }}</a>
            </div>

            <div v-if="inView" :class="{ after: inView }" class="product-desc-container">
              <p v-if="locale == 'ua'" class="desc-shadow product-desc">
                {{ product.description }}
              </p>

              <p v-if="locale == 'en'" class="desc-shadow product-desc">
                {{ product.description_en }}
              </p>
              <p class="more product-desc" @click="handleClick(product._id)">
                {{ $t("products.more-btn") }}
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
      productImgURL: process.env.VUE_APP_API_URL,
    };
  },

  created: async function () {
    this.fetchProducts();
  },

  mounted() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        this.inView = true;
        if (entry.isIntersecting) {
          entry?.target?.firstChild?.classList?.add("animate-title");
          entry?.target?.lastChild?.classList?.add("animate-desc");
        }

        // if (!entry.isIntersecting) {
        //   entry?.target?.firstChild?.classList?.remove("animate-title");
        //   entry?.target?.lastChild?.classList?.remove("animate-desc");
        // }
      });
    });

    setTimeout(() => {
      this.$refs.observerElement.forEach((elem) => observer.observe(elem));
    }, 2000);
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

    handleClick(productId) {
      this.$router.replace({
        name: "product-page",
        query: { id: productId },
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

.more {
  text-align: right;
  color: #1764c2;
  cursor: pointer;
  font-size: 1.2em;
}
.more:hover {
  color: white;
}

.desc-shadow {
  box-shadow: inset 0 4px 6px -3px #00bfff;
}

.animate-desc {
  animation-name: desc-animation;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation: desc-animation 1.5s ease-out;
}

.animate-title {
  animation-name: title-animation;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation: title-animation 1.5s ease-out;
}

@keyframes desc-animation {
  from {
    transform: translate(0, 60px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0px);
    opacity: 1;
  }
}

@keyframes title-animation {
  from {
    transform: translate(50px, 0px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0px);
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
