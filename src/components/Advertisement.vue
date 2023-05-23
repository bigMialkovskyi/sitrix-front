<template>
  <div>
    <div class="advertisement-content-bg">
      <div class="advertisement-content">
        <h1 class="slogan">
          {{ $t("advertisement.title") }}
        </h1>
        <h2 class="slogan-desc">{{ $t("advertisement.msg") }}</h2>
        <!-- <a href="#" @click="showModal = true">{{ $t("banner.button") }}</a> -->
      </div>
    </div>
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

  name: "Advertisement",
  data() {
    return {};
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

.advertisement-content-bg {
  //   background-image: url("https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  //   background-image: url("https://images.pexels.com/photos/5230966/pexels-photo-5230966.jpeg?auto=compress&cs=tinysrgb&w=1600");
//   background-image: url("../assets/img/greenhouse.jpg");
  background-image: url("../assets/img/strawberry.jpg");
  background-size: cover;
  padding: 5vh 0;
  //   width: 100%;

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
    background-position: left;
    background-size: 3000px;
  }
  to {
    background-position: right;
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

.advertisement-content {
  //   margin: 5vh 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
    // background: rgba(124, 252, 0, 0.6);
  background: rgba(30, 144, 255, 0.6);
  //   padding: 2%;
}

@media screen and (max-width: 767px) {
  .advertisement-content {
    padding: 7%;
  }

  .slogan {
    @include h3;
  }

  .slogan-desc {
    @include h5 ;
    font-weight: normal;
  }
}

@media screen and (max-width: 575px) {
  .advertisement-contentt {
    align-items: center;
    justify-content: center;
  }
}
</style>
