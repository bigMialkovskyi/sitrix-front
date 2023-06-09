import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookie"

const state = {
  user: null,
  userID: null,
  devices: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUserID: (state) => state.userID,
  StateDevices: (state) => state.devices,
};

const actions = {
  async Register({ dispatch, commit }, form) {
    const response = await axios.post('auth/users/register', form)
    if (!response.data.success) return
    if (!response.data.token) return
    await commit("setUser", response.data.user.login);
    setCookie("token", response.data.token, 1)
  },

  async LogIn({ dispatch, commit }, form) {
    const response = await axios.post('auth/users/login', form)
    if (!response.data.success) return
    if (!response.data.token) return
    await commit("setUser", response.data.username);
    await commit("setUserID", response.data.user._id);
    await commit("setDevices", response.data.user.devices);
    setCookie("token", response.data.token, 1)
  },

  async LogOut({ commit }) {
    let user = null;
    let userID = null;
    let devices = null;
    commit("logout", user, userID, devices);
    deleteCookie("token")
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  setUserID(state, userID) {
    state.userID = userID;
  },
  setDevices(state, devices) {
    state.devices = devices;
  },
  logout(state, user, userID, devices) {
    state.user = user;
    state.userID = userID;
    state.devices = devices;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};