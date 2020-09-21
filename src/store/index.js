import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        signOut() {
            state.user = {}
            console.log(state.user);
        }
    },
    plugins: [createPersistedState()]
})