<template>
  <div class="locale-switcher-container">
    <img
      class="globe-icon"
      src="../assets/img/globe-with-meridians.svg"
      alt="person icon"
    />
    <select v-model="$i18n.locale" class="select-element">
      <option
        class="option"
        v-for="(locale, i) in locales"
        :key="`locale-${i}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return { locales: ["ua", "en"] };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.locale-switcher-container {
  margin: 0;
  padding: 0.5vh;
  display: flex;
  align-items: center;
  //   width: 50px;
  height: 50px;
  background-color: #00bfff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  box-shadow: 0px -14px 14px rgba(0, 0, 255, 0.1) inset;
}

.locale-switcher-container:hover {
  cursor: pointer;
  background-color: #87cefa;
}

.locale-switcher-container:active {
  background-color: #1e90ff;
}

.select-element {
  background: rgba(0, 0, 0, 0);
  border-radius: 10px;
}

.globe-icon {
  width: 24px;
  height: 24px;
}

.option {
  border-radius: 10px;
}
</style>
