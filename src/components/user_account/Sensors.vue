<template>
  <div class="user-document">
    <ul v-if="devices.length" class="sensors-list">
      <li
        @click="selected = `${device.id}`"
        class="sensor-element"
        v-for="device in devices"
        :key="device.id"
      >
        <p class="device-name">{{ device.name || 0 }}</p>

        <div @click.stop class="preview-bar">
          <div class="preview-element">
            <img
              class="preview-element-icon"
              src="../../assets/img/battery-charging-vertical.svg"
              alt="batery"
            />
            {{ device.batteryStatus || 0 }}
          </div>
          <div class="preview-element">
            <img
              class="preview-element-icon"
              src="../../assets/img/temperature-low.svg"
              alt="batery"
            />
            <p>{{ device.measurements[0].airTemperature || 0 }}</p>
          </div>
          <div class="preview-element">
            <img
              class="preview-element-icon"
              src="../../assets/img/humidity-light.svg"
              alt="batery"
            />
            <p>{{ device.measurements[0].humidity || 0 }}</p>
          </div>
          <div class="preview-element">
            <img
              class="preview-element-icon"
              src="../../assets/img/p-button.svg"
              alt="batery"
            />
            <p>{{ device.measurements[0].pressure || 0 }}</p>
          </div>
          <div @click.stop="disconnectSensor()" class="preview-element">
            <img
              class="preview-element-icon"
              src="../../assets/img/trash.svg"
              alt="batery"
            />
          </div>
        </div>
      </li>
      <li @click="showModal = !showModal" class="sensor-element new-sensor-button">
        <p>add new sensor</p>
      </li>
    </ul>

    <div v-if="devices.length" class="chart">
      <div class="nav-bar">
        <ul class="options">
          <li @click="selectedParameter = `airTemperature`" class="option-element">
            air temperature
          </li>
          <li @click="selectedParameter = `soilTemperature`" class="option-element">
            soil temperature
          </li>
          <li @click="selectedParameter = `pressure`" class="option-element">pressure</li>
          <li @click="selectedParameter = `humidity`" class="option-element">humidity</li>
        </ul>
      </div>
      <canvas class="chart-element" id="myChart"></canvas>
    </div>
    <NewSensorWindow
      v-if="showModal"
      @close="showModal = false"
      @confirm="connectSensor"
    />
  </div>
</template>

<script>
import store from "@/store";
import { sensorApi } from "@/api/sensors-api";
import Chart from "chart.js/auto";
import NewSensorWindow from "@/components/user_account/NewSensorWindow.vue";
import axios from "axios";

export default {
  name: "Sensors",
  store,

  components: {
    NewSensorWindow,
  },

  data() {
    return {
      showError: false,
      showModal: false,
      devices: [],
      selected: "",
      selectedParameter: "",
    };
  },

  mounted: async function () {
    // отримуємо список з датчиками та їх вимірами
    this.getSensorsList();
  },

  watch: {
    // новий рендер графіку якщо користувач обрав інний датчик
    async selected(newVal) {
      this.createChart();
    },

    // новий рендер графіку якщо користувач обрав інше вимірювання
    selectedParameter(newVal) {
      this.createChart();
    },

    // новий ренден графіку якщо змінилися виміри з графіку
    // в основному використовується для почткового рендеру коли "mounted" не встигає отримати і передати дані в "chart"
    devices() {
      this.createChart();
    },
  },

  methods: {
    async getSensorsList() {
      try {
        const data = {
          sensorsList: store.getters.StateDevices,
        };
        const response = await axios.post("/agro-gsm-sensor/get/measurements", data);

        this.devices = response.data.measForRespose;
      } catch (error) {
        console.error(error);
      }
    },

    //функція що повертає обраний користувачем датчик для побудови графіку з його показниками
    async selectDevice() {
      let result = {};
      if (!this.selected) return null;
      this.devices.forEach((element) => {
        if (element.id == this.selected) result = element;
      });
      return result;
    },

    // функція для отримання показників з датчика
    // для кожного показника створюється окремий масив щоб в подальшому будувати окремий графік
    async getMeas() {
      const airTemperature = [];
      const soilTemperature = [];
      const pressure = [];
      const humidity = [];
      const date = [];
      let device;

      // якщо користувач не обрав ніякого датчика створюємо графік з датчиком що є першим у списку
      // потрібен для першого рендеру при вході в особистий кабінет
      if ((await this.selectDevice()) == null) device = this.devices[0];
      else device = await this.selectDevice();

      device.measurements.some((element) => {
        airTemperature.unshift(element.airTemperature);
        soilTemperature.unshift(element.soilTemperature);
        pressure.unshift(element.pressure);
        humidity.unshift(element.humidity);
        date.unshift(element.updateTime.slice(4, 21));
        // для зручності та наглядності будується графік лише з перших 100 елементів
        // в перспективі:
        // 1 - реалізувати можливість зміни цього числа користувачем
        // 2 - ралізувати даний функціонал і на стороні сервера (щоб не завантажувати всі вимірювання якщо це не потрібно)
        return date.length == 100;
      });
      return {
        airTemperature,
        soilTemperature,
        pressure,
        humidity,
        date,
      };
    },

    // безпосередньо функція для побудови графіку надана відповідною бібліотекою
    async createChart() {
      // отримуємо масиви з вимірами
      // !!!!!!!
      // потрібна оптимізація
      // переписати код таким чином щоб функція отримувала лише потрібний їй в данимй момент масив в якості параметра
      // !!!!!!!
      const {
        airTemperature,
        soilTemperature,
        pressure,
        humidity,
        date,
      } = await this.getMeas();

      let grapharea = document.getElementById("myChart").getContext("2d");

      let measForRender = [];
      let label = "";

      // в залежності від обраного користувачем типу показника - створюється відповідний графік
      // за замовчуванням це температупа повітря
      switch (this.selectedParameter) {
        case "airTemperature":
          measForRender = airTemperature;
          label = "air temperature level";
          break;
        case "soilTemperature":
          measForRender = soilTemperature;
          label = "soil temperature level";
          break;
        case "pressure":
          measForRender = pressure;
          label = "pressure level";
          break;
        case "humidity":
          measForRender = humidity;
          label = "humidity level";
          break;
        default:
          measForRender = airTemperature;
          label = "air temperature level";
      }

      //canvas refresh
      let chartStatus = Chart.getChart("myChart"); // <canvas> id
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }

      // створення нового екземпляру графіка
      new Chart(grapharea, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: label,
              data: measForRender,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },

    // функція для підключення нового датчика
    async connectSensor({ userID, sensorID, sensorName }) {
      const form = {
        userID: userID,
        sensorID: sensorID,
        name: sensorName,
      };
      console.log(await sensorApi.connectDevice(form).data);
      // if (await sensorApi.connectDevice(form).data.success) console.log(123);
    },

    async disconnectSensor({ userID, sensorID, sensorName }) {
      // const form = {
      //   userID: userID,
      //   sensorID: sensorID,
      //   name: sensorName,
      // };
      console.log("ping");
      // console.log(await sensorApi.connectDevice(form).data);
      // if (await sensorApi.connectDevice(form).data.success) console.log(123);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";

.user-document {
  // display: flex;
  width: 100vw;
  height: 90vh;
  padding: 0 1vw;
  margin-bottom: 5vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.chart {
  grid-area: 1 / 2 / 6 / 6;
  // height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-element {
  // height: 80vh;
  // width: 70vw;
  width: 100%;
  height: 100%;
  // margin: auto;
}

.sensors-list {
  grid-area: 1 / 1 / 6 / 2;
  margin: 20px 0;
  // height: 80vh;
  // width: 20vw;
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background-color: rgb(0, 191, 255);
  box-shadow: 0px 0px 24px rgba(0, 0, 255, 0.2);
}

.sensor-element {
  padding: 0.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 1.5vh 0;
  height: 7vh;
  border-radius: 5px;
  // background-color: rgb(0, 191, 255);
  box-shadow: 0px -14px 14px rgba(0, 0, 255, 0.1) inset;
  border-top: 2px solid rgb(0, 255, 127, 0.5);
}

.sensor-element:hover {
  cursor: pointer;
  background-color: #87cefa;
}

.sensor-element:active {
  background-color: #1e90ff;
}

.sensor-element:focus {
  background-color: #1e90ff;
}

.device-name {
  margin-right: auto;
}

.options {
  display: flex;
  height: 6vh;
  width: 68vw;
  margin: 20px 0;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  background-color: rgb(0, 191, 255);
  box-shadow: 0px 0px 24px rgba(0, 0, 255, 0.2);
}

.option-element {
  display: flex;
  align-items: center;
  padding: 0 3%;
  height: 4vh;
  border-radius: 5px;
  background-color: rgb(0, 191, 255);
  box-shadow: 0px 0px 1vh rgba(0, 0, 255, 0.3);
  border-top: 1px solid rgb(0, 255, 127, 0.5);
  border-bottom: 1px solid rgb(0, 255, 127, 0.5);
}

.preview-bar {
  border-radius: 5px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.5vh;
}

.preview-element {
  display: flex;
  align-items: center;
}

.preview-element-icon {
  height: 2.5vh;
}

.option-element:hover {
  cursor: pointer;
  background-color: #87cefa;
}

.option-element:active {
  background-color: #1e90ff;
}

.option-element:focus {
  background-color: #1e90ff;
}

li {
  text-transform: uppercase;
}

.new-sensor-button {
  margin-top: auto;
  p {
    margin: auto;
  }
}
</style>
