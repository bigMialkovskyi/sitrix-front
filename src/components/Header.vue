<template>
  <header class="header">
    <div class="container">
      <router-link @click="showNav()" to="/">
        <div class="logo">
          <img class="logo-img" src="../assets/img/logo.png" alt="logo" />
          <p class="logo-text"><span class="logo-print">SITRIX</span></p>
        </div>
      </router-link>
      <div class="header-content">
        <div class="modal-blok">
          <a
            v-if="navigationMenu"
            @click="showMobileMenu = !showMobileMenu"
            class="menu-hamburger header-content-elem"
            href="#"
          >
            <img src="../assets/img/menu-hambuger.svg" alt="menu-hamburger" />
          </a>
          <ul
            v-if="navigationMenu"
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
            <li><a href="#general-info">{{ $t("header.about-us") }}</a></li>
            <li><a href="#contacts">{{ $t("header.contacts") }}</a></li>
          </ul>
        </div>

        <LocaleSwitcher />

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
        <router-link
          @click="hideNav()"
          v-if="!isLoggedIn"
          class="user-page-icon-box"
          to="/login"
        >
          <img
            class="user-page-icon"
            src="../assets/img/person-no-login.svg"
            alt="person icon"
          />
        </router-link>
        <router-link
          @click="hideNav()"
          v-if="isLoggedIn"
          class="user-page-icon-box"
          to="/user-page"
        >
          <img
            class="user-page-icon"
            src="../assets/img/person-logined.svg"
            alt="person icon"
          />
        </router-link>
        <span v-if="isLoggedIn" class="log-out-icon-box" @click="logout">
          <img
            class="user-page-icon"
            src="../assets/img/log-out.svg"
            alt="person icon"
          />
        </span>
      </div>
    </div>
  </header>
</template>

<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default {
  // setup() {
  //   const { t } = useI18n({
  //     inheritLocale: true,
  //     useScope: "local",
  //   });

  //   // Something todo ..

  //   return { t };
  // },

  name: "Header",
  components: { LocaleSwitcher },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  data: function () {
    return {
      showMobileMenu: false,
      navigationMenu: this.$store.getters.StateShowNavigation,
    };
  },

  mounted() {},

  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
    hideNav() {
      this.$store.commit("hideNavigation");
      this.navigationMenu = this.$store.getters.StateShowNavigation;
    },
    showNav() {
      this.$store.commit("showNavigation");
      this.navigationMenu = this.$store.getters.StateShowNavigation;
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