import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        users: null,
    },
    getters: {
        users: (state) => {
            return state.users;
        },
        isAuthenticated: (state) => {
            return !!state.users;
        },
    },
    mutations: {
        users(state, users) {
            state.users = users;
        },
    },
    actions: {
        users(context, users) {
            context.commit("users", users);
        },
    },
    modules: {},
});