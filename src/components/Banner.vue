<template>
  <div class="banner">
    <!-- <div class="container"> -->
    <!-- <div> -->
      <div class="banner-name-bg banner-name">
        <div class="banner-content">
          <h1 class="name"> sitrix</h1>
        </div>
      </div>
      <div class="banner-content-bg">
        <div  class="banner-content" v-if="!showModal">
          <h1 :data-value="`${sloganDataValue}`" class="slogan">{{ $t("banner.slogan") }}</h1>
          <!-- <h1 :data-value="banner.slogan-desc" class="slogan">{{ $t("banner.slogan") }}</h1> -->
          <h2 class="slogan-desc">{{ $t("banner.slogan-desc") }}</h2>
          <a href="#" @click="showModal = true">{{ $t("banner.button") }}</a>
        </div>
      </div>

      <div class="modal-container" v-if="showModal" @close="showModal = false">
        <form
          @submit="checkForm"
          action="mailto:sntelectronx@gmail.com"
          method="post"
          enctype="text/plain"
        >
          <label>{{ $t("banner.modal.name") }}</label>
          <input
            type="text"
            v-model="name"
            name="name"
            placeholder="Name"
          />
          <label>{{ $t("banner.modal.email") }}</label>
          <input
            type="email"
            v-model="email"
            name="email"
            placeholder="Email"
          />
          <label>{{ $t("banner.modal.message") }}</label>
          <textarea
            name="message"
            v-model="message"
            cols="30"
            rows="5"
            placeholder="Message"
          >
          </textarea>

          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li class="error-message" v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </p>

          <input type="submit" :value="$t('banner.modal.submit-btn')" />
        </form>
        <button class="close-btn" @click="clearErrors">{{ $t("banner.modal.close-btn") }}</button>
        <span class="top"></span>
        <span class="right"></span>
        <span class="bottom"></span>
        <span class="left"></span>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    // Something todo ..

    return { t };
  },

  name: "Banner",
  data() {
    return {
      showModal: false,
      errors: [],
      email: null,
      name: null,
      message: null,
      sloganDataValue: this.$root.$t("banner.slogan-transform"),
      letters: this.$root.$t("banner.letters"),
    };
  },

  watch: {
    "$i18n.locale": function (newVal, oldVal) {
      this.sloganDataValue = this.$root.$t("banner.slogan-transform");
      this.letters = this.$root.$t("banner.letters");
      this.animatedText(this.letters);
    },
  },

  mounted() {
    this.animatedText(this.letters);
  },

  methods: {
    animatedText: function (lettersArr) {
      const letters = lettersArr;

      let interval = null;
      let elem = document.querySelector(".slogan");

      elem.addEventListener("mouseover", (event) => {
        // console.log(this.$root.$t("banner.slogan"));

        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
          event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return event.target.dataset.value[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
          if (iteration >= event.target.dataset.value.length) {
            clearInterval(interval);
          }
          iteration += 1 / 3;
        }, 100);
      });
    },
    checkForm: function (e) {
      if (this.name && this.email && this.message) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.message) {
        this.errors.push("Message required.");
      }
      e.preventDefault();
    },

    clearErrors: function (e) {
      this.errors.length = 0;
      this.showModal = false;
    },
  },
};
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/banner.scss";
////////////////////////////////////////////////////////////
//animation bg

.banner-name-bg {
  margin: 5% 0;
  width: 100%;

  background-image: url("https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg");
  background-size: cover;
  // -webkit-animation: slidein 100s;
  // animation: slidein 100s;
  // -webkit-animation: slidein 70s;
  // animation: slidein 70s;
  -webkit-animation: bounce 70s;
  animation: bounce 70s;

  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;

  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}

@keyframes bounce {
  from {
    // background-position: top;
    background-position: top;
    background-size: 3000px;
  }
  to {
    background-position: -100px 0px;
    background-size: 2750px;
  }
}

.banner-content-bg {
  background-image: url("https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg");
  background-size: cover;
  width: 100%;

  // -webkit-animation: slidein 100s;
  // animation: slidein 100s;
  // -webkit-animation: slidein 70s;
  // animation: slidein 70s;
  -webkit-animation: slidein 70s;
  animation: slidein 70s;

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
    background-position: center;
    background-size: 3000px;
  }
  to {
    background-position: -100px 0px;
    background-size: 2750px;
  }
}

@keyframes slidein {
  from {
    // background-position: top;
    background-position: center;
    background-size: 3000px;
  }
  to {
    background-position: -100px 0px;
    background-size: 2750px;
  }
}
// @keyframes slidein {
//   from {
//     background-position: top left;
//     // background-position: center;
//     background-size: 3000px;
//   }
//   to {
//     // background-position: 100px 0px;
//     background-position: top right;
//     background-size: 2750px;
//   }
// }

////////////////////////////////////////////////////////////

* {
  box-sizing: border-box;
}

.modal-container {
  position: relative;
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: rgb(240, 248, 255);
  padding: 20px;
  width: 50%;
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.4), 0 28px 30px rgba(0, 0, 0, 0.3);
}

label {
  float: left;
}

input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.close-btn {
  color: red;
  padding: 6px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: red;
}

@media screen and (max-width: 767px) {
  .modal-container {
    width: 75%;
  }
}

@media screen and (max-width: 575px) {
  .modal-container {
    width: 100%;
  }
}
//////

span {
  position: absolute;
  border-radius: 100vmax;
}

.top {
  top: 0;
  left: 0;
  width: 0;
  height: 5px;
  //rgba(255, 49, 49, 0.5),
  //rgb(255, 49, 49)
  background: linear-gradient(
    90deg,
    transparent 50%,
    rgb(57, 255, 20),
    rgba(57, 255, 20, 0.5)
  );
}

.bottom {
  right: 0;
  bottom: 0;
  height: 5px;
  background: linear-gradient(
    90deg,
    rgb(57, 255, 20),
    rgba(57, 255, 20, 0.5),
    transparent 50%
  );
}

.right {
  top: 0;
  right: 0;
  width: 5px;
  height: 0;
  //   rgba(0, 255, 255, 0.5),
  // rgb(0, 255, 255)
  background: linear-gradient(
    180deg,
    transparent 30%,
    rgb(57, 255, 20),
    rgba(57, 255, 20, 0.5)
  );
}

.left {
  left: 0;
  bottom: 0;
  width: 5px;
  height: 0;
  background: linear-gradient(
    180deg,
    rgb(255, 255, 113),
    rgba(255, 255, 113, 0.5),
    transparent 70%
  );
}

.top {
  animation: animateTop 3s ease-in-out infinite;
}

.bottom {
  animation: animateBottom 3s ease-in-out infinite;
}

.right {
  animation: animateRight 3s linear infinite;
}

.left {
  animation: animateLeft 3s ease-in-out infinite;
}

@keyframes animateTop {
  25% {
    width: 100%;
    opacity: 1;
  }

  30%,
  100% {
    opacity: 0;
  }
}

@keyframes animateBottom {
  0%,
  50% {
    opacity: 0;
    width: 0;
  }

  75% {
    opacity: 1;
    width: 100%;
  }

  76%,
  100% {
    opacity: 0;
  }
}

@keyframes animateRight {
  0%,
  25% {
    opacity: 0;
    height: 0;
  }

  50% {
    opacity: 1;
    height: 100%;
  }

  55%,
  100% {
    height: 100%;
    opacity: 0;
  }
}

@keyframes animateLeft {
  0%,
  75% {
    opacity: 0;
    bottom: 0;
    height: 0;
  }

  100% {
    opacity: 1;
    height: 100%;
  }
}
</style>
