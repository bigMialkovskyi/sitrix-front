<template>
  <div>
    <div class="advertisement-content-bg">
      <div class="advertisement-content">
        <h1 class="slogan">
          {{ $t("advertisement.title") }}
        </h1>
        <h2 class="msg-desc">{{ $t("advertisement.msg") }}</h2>
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
  // background-image: url("../assets/img/strawberry.jpg");
  background-image: url("https://images.pexels.com/photos/16678051/pexels-photo-16678051.jpeg");
  background-size: cover;
  padding: 5vh 0;

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
    // background-position: top;
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
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(30, 144, 255, 0.6);
}

.msg-desc {
  color: $White;
  @include h4;
  margin: 20px 0px;
  text-transform: uppercase;
  text-align: center;
}

@media screen and (max-width: 767px) {
  .advertisement-content-bg {
    -webkit-animation: slidein 110s;
    animation: slidein 110s;
  }
  .advertisement-content {
    padding: 7%;
  }

  .slogan {
    @include h3;
  }

  .msg-desc {
    @include h5;
    font-weight: normal;
  }
}

@media screen and (max-width: 575px) {
  .advertisement-contentt {
    align-items: center;
    // justify-content: center;
    justify-content: flex-end;
  }
  .advertisement-content-bg {
    -webkit-animation: slidein 120s;
    animation: slidein 120s;
  }

  .msg-desc {
    @include text;
    font-weight: normal;
  }
}
</style>
