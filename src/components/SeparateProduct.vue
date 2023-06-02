<template>
  <div id="app" class="app-container">
    <!-- <vueper-slides>
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :content="slide.content"
      >
      </vueper-slide>
    </vueper-slides> -->

    <vueper-slides
      :visible-slides="3"
      :slide-ratio="1 / 4"
      :dragging-distance="70"
    >
      <template #arrow-left>
        <i class="icon icon-arrow-left" />
      </template>

      <template #arrow-right>
        <i class="icon icon-arrow-right" />
      </template>

      <vueper-slide
        class="slide"
        v-for="i in slides.length"
        :key="i"
        :title="i.toString()"
      />
    </vueper-slides>
  </div>
</template>

<script>
// import * as Hammer from "hammerjs";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  name: "SeparateProduct",
  data() {
    return {
      slides: [
        {
          title: "Slide #1",
          content: "Slide 1 content.",
        },
        {
          title: "Slide #2",
          content: "Slide 2 content.",
        },
        {
          title: "Slide #3",
          content: "Slide 2 content.",
        },
        {
          title: "Slide #4",
          content: "Slide 2 content.",
        },
        {
          title: "Slide #5",
          content: "Slide 2 content.",
        },
        {
          title: "Slide #6",
          content: "Slide 2 content.",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/banner.scss";

.slide {
  border: 1px solid black;
  margin: 1vh;
}
</style>
