import axios from 'axios';
import store from "@/store";

let sensorsList = store.getters.StateDevices;

const data = {
	sensorsList: sensorsList
}

const getMeasurements = async () => {
	return await axios
		.post(`/agro-gsm-sensor/get/measurements`, data)
		.then(res => res.data.measForRespose)
		.catch(e => {
			console.error(e);
			return
		});
};

const connectDevice = async (form) => {
	try {
		const response = await axios.post("/agro-gsm-sensor/user/connect", form);
		return response
	} catch (error) {
		console.error(error);
	}
}


const disconnectDevice = async (form) => {
	try {
		const response = await axios.post("/agro-gsm-sensor/user/disconnect", form);
		return response
	} catch (error) {
		console.error(error);
	}
}

const getUser = async (form) => {
	try {
		const response = await axios.post("/agro-gsm-sensor/user/connect", form);
		return response
	} catch (error) {
		console.error(error);
	}
}

export const sensorApi = {
	getMeasurements,
	connectDevice,
	disconnectDevice,
	getUser
};