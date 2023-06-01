<template>
  <div id="app" class="app-container">
    <!-- You will need v-for loop fro the transition group to work! -->
    <transition-group
      id="list"
      name="swipe"
      tag="div"
      class="transition-container"
    >
      <!-- Very important, dont use index, as the key. Use some form of unique info, like the name i use here. -->
      <!-- <img
        v-for="(picture, i) in pictures"
        :key="picture.src"
        :src="picture.src"
        alt=""
        class="image"
      /> -->
      <img
        v-for="(picture) in pictures"
        :key="picture.src"
        :src="picture.src"
        alt=""
        class="image"
      />
    </transition-group>
    <button class="previous" @click="previous">back</button>
    <button class="next" @click="next">frwrd</button>
  </div>
</template>

<script>
import * as Hammer from "hammerjs";

export default {
  name: "SeparateProduct",
  data() {
    return {
      pictures: [
        {
          src: "https://images.unsplash.com/photo-1562821399-d2116888d16b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
          name: "picture1",
        },
        {
          src: "https://images.unsplash.com/photo-1549875202-c83686e7dad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
          name: "picture2",
        },
        {
          src: "https://images.unsplash.com/photo-1489423561257-34e31d8836b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1636&q=80",
          name: "picture3",
        },
        {
          src: "https://images.unsplash.com/photo-1567249601327-aee46508fbea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
          name: "picture4",
        },
        {
          src: "https://images.unsplash.com/photo-1532360007308-dae5348c77c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
          name: "picture",
        },
        {
          src: "https://images.unsplash.com/photo-1489423561257-34e31d8836b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1636&q=80",
          name: "picture5",
        },
        {
          src: "https://images.unsplash.com/photo-1567249601327-aee46508fbea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
          name: "picture6",
        },
        {
          src: "https://images.unsplash.com/photo-1532360007308-dae5348c77c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
          name: "picture7",
        },
        {
          src: "https://images.unsplash.com/photo-1489423561257-34e31d8836b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1636&q=80",
          name: "picture8",
        },
      ],
    };
  },

  created() {
    /* making automatic next-picture after 5 seconds */
    this.interval = setInterval(() => this.next(), 5000);
  },
  mounted() {
    const myElement = document.getElementById("list");

    /* hammer.js instance, after panend, he triggers the same method, like in the methods. */

    const that = this;
    const hammertime = new Hammer(myElement);

    hammertime.on("panend", function (ev) {
      if (ev.additionalEvent === "panright") {
        const lastSlide = that.pictures.pop();
        that.pictures = [lastSlide].concat(that.pictures);
      } else if (ev.additionalEvent === "panleft") {
        const firstPicture = that.pictures.shift();
        that.pictures = that.pictures.concat(firstPicture);
      }
    });
  },
  methods: {
    previous() {
      const lastSlide = this.pictures.pop();
      this.pictures = [lastSlide].concat(this.pictures);
    },
    next() {
      const firstPicture = this.pictures.shift();
      this.pictures = this.pictures.concat(firstPicture);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/banner.scss";

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.app-container {
  width: 100%;
  height: 100%;
}

.transition-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/*
  Pointer events none, will prevent the draggind of an image, when you want to swipe.
*/

.image {
  height: 500px;
  z-index: 10;
  pointer-events: none;
}

.image:first-child {
  z-index: 5;
}

.image:last-child {
  z-index: 5;
}

.previous {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 15;
}

.next {
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 15;
}

/*
  You can read about the 'move' property of the transition group here:
  https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions
*/
.swipe-move {
  transition: all 0.3s;
}
</style>
