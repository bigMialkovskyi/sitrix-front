<template>
  <section id="our-products" class="our-products">
    <div class="products">
      <h1 class="products-title">{{ $t("products.title") }}</h1>
      <div class="product-type-container for-farmers">
        <ProductList
          id="for_farmers"
          render_product_type="for_farmers"
          :group_type_title="$t('products.categories.agro')"
        />
      </div>
      <!-- <div class="product-type-container measuring-devices">
        <ProductList
          id="measuring_device"
          render_product_type="measuring_device"
          :group_type_title="$t('products.categories.meas')"
        />
      </div> -->
      <!-- <div id="other" class="product-type-container other">
        <ProductList render_product_type="other" group_type_title="Інше" />
      </div> -->
      <!-- <Hexagon /> -->
    </div>
  </section>
</template>

<script>
// import Hexagon from "@/components/Hexagon.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Products",
  components: {
    // Hexagon,
    ProductList,
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/products.scss";
</style>