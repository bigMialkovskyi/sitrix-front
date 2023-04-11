const state = {
    showNavigation: true,
};

const getters = {
    StateShowNavigation: (state) => state.showNavigation
};

const actions = {};

const mutations = {
    hideNavigation(state) {
        state.showNavigation = false;
    },
    showNavigation(state) {
        state.showNavigation = true;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};