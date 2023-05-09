<template>
  <header class="header">
    <div class="container">
      <router-link to="/">
        <div class="logo">
          <img class="logo-img" src="../assets/img/logo.png" alt="logo" />
          <p class="logo-text"><span class="logo-print">SITRIX</span></p>
        </div>
      </router-link>
      <div class="header-content">
        <div class="modal-blok">
          <a
            v-if="isShowNavigation"
            @click="showMobileMenu = !showMobileMenu"
            class="menu-hamburger header-content-elem"
            href="#"
          >
            <img src="../assets/img/menu-hambuger.svg" alt="menu-hamburger" />
          </a>
          <ul
            v-if="isShowNavigation"
            class="header-menu"
            :class="{ active: showMobileMenu }"
          >
            <li class="down">
              <a href="#our-products">{{ $t("header.product") }}</a>
              <ul class="submenu">
                <li>
                  <img src="../assets/img/ear-of-corn.svg" alt="icon" /><a
                    href="#for_farmers"
                    >{{ $t("header.product-menu.for-farmers") }}</a
                  >
                </li>
                <li>
                  <img src="../assets/img/weight-scale.svg" alt="icon" /><a
                    href="#measuring_device"
                    >{{ $t("header.product-menu.measuring-devices") }}</a
                  >
                </li>
              </ul>
            </li>
            <li>
              <a href="#general-info">{{ $t("header.about-us") }}</a>
            </li>
            <li>
              <a href="#contacts">{{ $t("header.contacts") }}</a>
            </li>
          </ul>
        </div>

        <ul class="tel header-menu">
          <li class="down">
            <img src="../assets/img/tel.png" alt="tel" />
            <a href="tel:(067) 570 34 89">(067) 570 34 89</a>
            <ul class="submenu">
              <li>
                <img src="../assets/img/tel.png" alt="tel" />
                <a href="tel:(067) 570 34 89">(067) 570 34 89</a>
              </li>
              <li>
                <img src="../assets/img/tel.png" alt="tel" />
                <a href="tel:(067) 570 34 89">(067) 570 34 89</a>
              </li>
            </ul>
          </li>
        </ul>

        <LocaleSwitcher />

        <router-link v-if="!isLoggedIn" class="user-page-icon-box" to="/login">
          <img
            class="user-page-icon"
            src="../assets/img/person-no-login.svg"
            alt="person icon"
          />
        </router-link>
        <router-link v-if="isShowProfileBtn" class="user-page-icon-box" to="/user-page">
          <img
            class="user-page-icon"
            src="../assets/img/person-logined.svg"
            alt="person icon"
          />
        </router-link>
        <span v-if="isShowLogout" class="log-out-icon-box" @click="logout">
          <img class="user-page-icon" src="../assets/img/log-out.svg" alt="person icon" />
        </span>
      </div>
    </div>
  </header>
</template>

<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";

export default {
  name: "Header",
  components: { LocaleSwitcher },

  data: function () {
    return {
      showMobileMenu: false,
    };
  },

  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
    isShowLogout: function () {
      return this.isLoggedIn && this.$route.name === "UserPage";
    },
    isShowProfileBtn: function () {
      return this.isLoggedIn && this.$route.name !== "UserPage";
    },
    isShowNavigation: function () {
      return this.$route.name === "home";
    },
  },

  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
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
@import "../styles/header.scss";
@import "../styles/menu-hamburger.scss";

.logo-print {
  margin-right: 0.5vh;
  margin-left: -1.25vh;
}

.header-content > * {
  margin: 0 2vh 0 2vh;
}

.active {
  display: block;
}

.user-page-icon {
  width: 18px;
  height: 18px;
}

.user-page-icon-box,
.log-out-icon-box {
  width: 50px;
  height: 50px;
  background-color: #00bfff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  box-shadow: 0px -14px 14px rgba(0, 0, 255, 0.1) inset;
}

.user-page-icon-box:hover {
  cursor: pointer;
  background-color: #87cefa;
}

.user-page-icon-box:active {
  background-color: #1e90ff;
}
</style>
